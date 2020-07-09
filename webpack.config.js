const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: './src/index.js',
  output: {
    filename: 'app.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: 'node_modules/sql.js/dist/sql-wasm.wasm',
      }],
    }),
    new HtmlWebpackPlugin({
      title: 'Kanji Grid',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover',
        description: '',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(mp4|svg|png|jpe?g|gif|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node-modules/,
      },
    ],
  },
};
