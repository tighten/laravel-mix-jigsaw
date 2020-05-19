# Jigsaw plugin for Laravel Mix

[![MIT License](https://img.shields.io/github/license/tightenco/laravel-mix-jigsaw)](https://github.com/tightenco/laravel-mix-jigsaw/blob/master/LICENSE.md)
[![Latest Stable Version](https://img.shields.io/npm/v/laravel-mix-jigsaw)](https://www.npmjs.com/package/laravel-mix-jigsaw)
[![Total Downloads](https://img.shields.io/npm/dt/laravel-mix-jigsaw)](https://www.npmjs.com/package/laravel-mix-jigsaw)

`laravel-mix-jigsaw` is a [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) plugin containing the build tasks for the [Jigsaw](https://github.com/tightenco/jigsaw) static site generator.

```js
const mix = require('laravel-mix');
require('laravel-mix-jigsaw');

mix.jigsaw()
   .js('source/_assets/js/main.js', 'js')
   .sass('source/_assets/sass/main.scss', 'css');
```

## Installation

```sh
npm install laravel-mix-jigsaw --save-dev
```

## Usage

Require the module in your `webpack.mix.js`.

```js
const mix = require('laravel-mix');
require('laravel-mix-jigsaw');
```

Enable the build tasks by calling `.jigsaw()` anywhere in your Mix build chain.

```js
mix.js('source/_assets/js/main.js', 'js')
   .sass('source/_assets/sass/main.scss', 'css')
   .jigsaw();
```

You can pass the plugin an object containing custom options if necessary.

```js
mix.jigsaw({
    browserSync: true,
    watch: [
        'config.php',
        'source/**/*.md',
        'source/**/*.php',
        'source/**/*.scss',
        '!source/**/cache/*',
    ],
});
```

## Credits

Huge thanks to [Brandon](https://github.com/Log1x) for creating the initial package!

## License

Laravel Mix Jigsaw is provided under the [MIT License](LICENSE.md).
