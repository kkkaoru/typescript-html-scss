/** @type import('webpack').Configuration */
module.exports = {
  mode: process.env.NODE_ENV = 'production' ? 'production': 'development',
  entry: `${__dirname}/src/main.ts`,
  output: {
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts','.js',
    ]
  }
};
