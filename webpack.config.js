const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const posthtml = require('posthtml')
const include = require('posthtml-include')

/** @type import('webpack').Configuration */
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production': 'development',
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'inline-source-map',
  entry: {
    global: `${__dirname}/src/globals/global.ts`,
    main: `${__dirname}/src/pages/main.ts`,
    child: `${__dirname}/src/pages/child/index.ts`,
  },
  output: {
    path: `${__dirname}/dist`
  },
  devServer: {
    hot: true,
    port: process.env.PORT ? Number(process.env.PORT) : 8888, 
    contentBase: `${__dirname}/src`,
    watchContentBase: true,
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
      chunks: ['global'],
    }),
    new MiniCssExtractPlugin(),
  ],
  watch: process.env.NODE_ENV === 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sourceMap: process.env.NODE_ENV === 'production',
            },
          }
        ]
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: {
            preprocessor:(content, loaderContext) =>{
              try {
                return posthtml([include({ encoding: 'utf8', root: './src' })]).process(content, {sync: true,}).html;
              } catch(error){
                loaderContext.emitError(error);
                return content;
              }
            }
          }
        },
      },
    ]
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
      '~': `${__dirname}/src`,
    },
    extensions: [
      '.ts','.js',
    ]
  }
};
