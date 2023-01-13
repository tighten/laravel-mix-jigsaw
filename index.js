const mix = require('laravel-mix');
const { spawn } = require('child_process');
const { existsSync } = require('fs');
const { normalize, resolve } = require('path');
const glob = require('glob');
const hasbin = require('hasbin');

const bin = existsSync('./vendor/bin/jigsaw') ? normalize('./vendor/bin/jigsaw') : hasbin('jigsaw', (result) => {
    if (result) return 'jigsaw';
    console.error('Could not find Jigsaw; please install it with Composer.');
    process.exit(1);
});

const env = process.env.NODE_ENV === 'development' ? 'local' : process.env.NODE_ENV;

const jigsaw = () => spawn(bin, ['build', env], { stdio: 'inherit', shell: true }).on('exit', (code) => {
    if (code > 0) {
        console.warn(`\nJigsaw build failed, see above.`);
    }
});

// Picks up everything except new files created directly in 'source/'
const watch = ({ files, dirs, notDirs }) => (compilation, callback) => {
    files.flatMap(pattern => glob.sync(pattern))
        .map(file => compilation.fileDependencies.add(resolve(file)));
    dirs.flatMap(pattern => glob.sync(pattern))
        .filter(dir => !notDirs.includes(dir))
        .map(dir => compilation.contextDependencies.add(resolve(dir)));
    callback();
}

mix.extend('jigsaw', new class {
    config = {
        watch: {
            files: [
                'config.php',
                'bootstrap.php',
                'blade.php',
                'listeners/**/*.php',
                'source/*.md',
                'source/*.php',
                'source/*.html',
            ],
            dirs: ['source/*/'],
            notDirs: ['source/_assets/', 'source/assets/'],
        },
    }
    register(config = {}) {
        Array.isArray(config.watch)
            ? this.config.watch.files.push(...config.watch)
            : this.config.watch = { ...this.config.watch, ...config.watch };
    }
    webpackPlugins() {
        const watchConfig = this.config.watch;
        return [new class {
            apply(compiler) {
                compiler.hooks.afterCompile.tapAsync('JigsawWatchPlugin', watch(watchConfig));
                compiler.hooks.afterDone.tap('JigsawBuildPlugin', jigsaw);
            }
        }];
    }
});
