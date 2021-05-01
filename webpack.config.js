const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rules = require('./webpack/module/rules');

/** @type import('webpack').Configuration */
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'inline-source-map',
  entry: {
    global: `${__dirname}/src/globals/global.ts`,
    main: `${__dirname}/src/pages/main.ts`,
    child: `${__dirname}/src/pages/child/index.ts`,
  },
  output: {
    path: `${__dirname}/dist`,
  },
  devServer: {
    hot: true,
    port: process.env.PORT ? Number(process.env.PORT) : 8888,
    contentBase: `${__dirname}/src`,
    watchContentBase: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/pages/index.html`,
      chunks: ['global', 'main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'child/index.html',
      template: `${__dirname}/src/pages/child/index.html`,
      chunks: ['global', 'child'],
    }),
    new HtmlWebpackPlugin({
      filename: 'child/grandchild/index.html',
      template: `${__dirname}/src/pages/child/grandchild/index.html`,
    }),
    new MiniCssExtractPlugin(),
  ],
  watch: process.env.NODE_ENV === 'production',
  module: {
    rules,
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
      '~': `${__dirname}/src`,
    },
    extensions: ['.ts', '.js'],
  },
};
