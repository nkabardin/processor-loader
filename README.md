# processor-loader

`processor-loader` is a webpack loader that can apply any string processing functions to loaded source. It could be useful when you need to prepare source code before passing it to another loader and you don't want to write webpack loaders for each of this cases.

Example use cases:
 * You have a bunch of CSS files with wrong paths and you want to fix it before passing it to `css-loader`
 * You have a code that is using global variable `$` but you want it to use `window.jQuery` instead.
 * You have a third-party CSS that is using some image, but you want to replace this image with another one.
 * You want to quickly try out your webpack loader idea without setting up loader repo and introducing npm dependency.

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## Installation

`npm install processor-loader --save-dev`

## Usage

Each processor is just a simple function that takes string with source and returns string with processed source. You can have as many processors as you want and you can choose individual processors for each case.

Example webpack configuration:

``` js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel", "processor?replaceImage,changeLicense"],
            },
            {
                test: /\.scss?$/,
                loaders: ["style", "css", "postcss", "processor?fixCSSPaths", "sass"]
            }
        ]
    },

    processors: {
        fixCSSPaths: function (source) {
            return source.replace(/..\/..\/assets\/lib\//g, "../assets/");
        },
        replaceImage: function (source) {
            return source.replace(/myImage.gif/g, "myImage.png");
        },
        changeLicense: function (source) {
            return source.replace(/MIT/g, "BSD");
        }
    }
};
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
