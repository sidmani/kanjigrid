const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    port: 8000,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]___[local]',
              },
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
        exclude: /main\.css$/,
      },
      {
        test: /main\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
});
