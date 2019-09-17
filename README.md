# Laravel Mix Jigsaw

![Latest Stable Version](https://img.shields.io/npm/v/laravel-mix-jigsaw?style=flat-square)
![Total Downloads](https://img.shields.io/npm/dt/laravel-mix-jigsaw?style=flat-square)

This is a simple proof of concept of the [Jigsaw](https://github.com/tightenco/jigsaw) [build tasks](https://github.com/tightenco/jigsaw/tree/master/stubs/mix/tasks) written as a Laravel Mix plugin. Maybe it will be more one day?

## Installation

Install via Yarn:

```bash
$ yarn add laravel-mix-jigsaw --dev
```

## Usage

### Basic Usage

```js
const mix = require('laravel-mix');
            require('laravel-mix-jigsaw');

mix.jigsaw()
   .js('source/_assets/js/main.js', 'js')
   .sass('source/_assets/sass/main.scss', 'css')
   .options({
     processCssUrls: false,
   }).version();
```

### Configuration

```js
mix.jigsaw({
  browserSync: true,
  disableSuccessNotifications: true,
  publicPath: 'source/assets/build',
  watched: [
    'config*.php',
    'bootstrap.php',
    'blade.php',
    'listeners/**/*.php',
    'source/**/*.php',
    'source/**/*.md',
    'source/**/_assets/*',
    '!source/**/_tmp/*'
  ],
});
```

## Bug Reports

If you discover a bug in Laravel Mix Jigsaw, please [open an issue](https://github.com/log1x/laravel-mix-jigsaw/issues).

## Contributing

Contributing whether it be through PRs, reporting an issue, or suggesting an idea is encouraged and appreciated.

## License

Laravel Mix Jigsaw is provided under the [MIT License](https://github.com/log1x/laravel-mix-jigsaw/blob/master/LICENSE.md).
