const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },

  devtool: 'source-map',

  resolve: { extensions: ['.ts', '.ts', '.js', '.json'] },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: 'awesome-typescript-loader' }, { loader: 'tslint-loader' }],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'src/manifest.json' }, { from: 'src/assets', to: 'assets',toType: 'dir' }]),
  ],
};
