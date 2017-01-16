var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: null,
  entry: './js/index.js',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file',
      query: {
        name: './assets/media/[name].[ext]'
      }
    }]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.min.[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new FaviconsWebpackPlugin({
      logo: './favicon.svg',
      prefix: 'assets/icons/',
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,

      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: true,
        yandex: false,
        windows: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ],
};
