const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlLoaderPreprocessor = require('./html-loader/preprocessor');

/** @type import('webpack').RuleSetRule[] */
module.exports = [
  {
    test: /\.ts$/,
    use: [
      {
        loader: 'ts-loader',
        options: { allowTsInNodeModules: true },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      {
        loader: 'sass-loader',
        options: {
          sourceMap: process.env.NODE_ENV === 'production',
        },
      },
    ],
  },
  {
    test: /\.html$/i,
    use: {
      loader: 'html-loader',
      options: {
        preprocessor: htmlLoaderPreprocessor,
      },
    },
  },
];
