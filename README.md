# Jigsaw plugin for Laravel Mix

[![MIT License](https://img.shields.io/github/license/tightenco/laravel-mix-jigsaw)](https://github.com/tightenco/laravel-mix-jigsaw/blob/master/LICENSE.md)
[![Latest Stable Version](https://img.shields.io/npm/v/laravel-mix-jigsaw)](https://www.npmjs.com/package/laravel-mix-jigsaw)
[![Total Downloads](https://img.shields.io/npm/dt/laravel-mix-jigsaw)](https://www.npmjs.com/package/laravel-mix-jigsaw)

`laravel-mix-jigsaw` is a [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) plugin for the [Jigsaw](https://github.com/tightenco/jigsaw) static site generator. It watches your Jigsaw site's files and triggers a new Mix build when it detects changes.

```js
const mix = require('laravel-mix');
require('laravel-mix-jigsaw');

mix.jigsaw()
    .js('source/_assets/js/main.js', 'js')
    .css('source/_assets/css/main.css', 'css')
    .version();
```

## Installation

```sh
npm install -D laravel-mix-jigsaw
```

## Usage

Require the module in your `webpack.mix.js` file.

```js
const mix = require('laravel-mix');
require('laravel-mix-jigsaw');
```

Enable the build tasks by calling `.jigsaw()` anywhere in your Mix build chain.

```js
mix.js('source/_assets/js/main.js', 'js')
    .css('source/_assets/css/main.css', 'css')
    .jigsaw();
```

By default this plugin watches common Jigsaw file paths and triggers a new build when it detects changes. To add watched paths or override the watcher configuration, pass a config object to `.jigsaw()`:

```js
// Add additional file paths to watch
mix.jigsaw({
    watch: ['config.*.php'],
});

// Override the default config
mix.jigsaw({
    watch: {
        files: ['source/posts/*.blade.php'],
        notDirs: ['source/_assets/', 'source/assets/', 'source/ignore/'],
    },
});
```

If you use [Laravel Mix's built-in BrowserSync integration](https://laravel-mix.com/docs/6.0/browsersync), you may need to configure it to watch Jigsaw's paths:

```js
mix.jigsaw()
    .browserSync({
        server: 'build_local',
        files: ['build_*/**'],
    });
```

## Caveats

- The plugin **cannot** detect the creation of new files immediately inside the `source/` directory of your site. If you create a new file like `source/home.blade.php`, you'll need to stop and restart Mix.
- With v1 of the plugin it was possible to add additional Webpack plugins/tasks that would run after the Jigsaw build but before Mix finished compiling assets. This created compatibility issues between this plugin and Mix itself, and was removed in v2. If you need to perform additional processing after your Jigsaw site is built, like minifying its HTML, you can do so using a Jigsaw [event listener](https://jigsaw.tighten.co/docs/event-listeners/).

## Credits

Huge thanks to [Brandon Nifong](https://github.com/Log1x) for creating the initial version of this plugin!

## License

Laravel Mix Jigsaw is provided under the [MIT License](LICENSE.md).
