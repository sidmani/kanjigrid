const { merge } = require('webpack-merge');
const Compression = require('compression-webpack-plugin');
// const SitemapPlugin = require('sitemap-webpack-plugin').default;
// const CopyPlugin = require('copy-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const common = require('./webpack.config');

// const paths = [
//   {
//     path: '/',
//     priority: '0.8',
//     changefreq: 'weekly',
//   },
// ];

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
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
  plugins: [
    // new CopyPlugin([{
    //   from: 'static/robots.txt',
    // }]),
    // new FaviconsWebpackPlugin('./static/phydela_favicon.png'),
    // new SitemapPlugin('https://www.phydela.com', paths),
    new Compression(),
  ],
});
