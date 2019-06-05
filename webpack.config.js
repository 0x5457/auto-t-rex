const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    // filename: '[name].js',
    filename: 'ai.js',
    path: path.resolve(__dirname, 'docs'),
  },

  devtool: 'source-map',

  resolve: { extensions: ['.ts', '.js', '.json'] },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'source-map-loader' },
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
      },
    ],
  },
};
