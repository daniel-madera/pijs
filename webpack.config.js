var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: "inline-sourcemap",
  entry: "./js/index.js",
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file',
      query: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }]
  },
  output: {
    publicPath: 'http://localhost:8080/',
    // path: path.join(__dirname, '/'),
    filename: 'app.min.js'
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html'
    }),
    new FaviconsWebpackPlugin({
      logo: './favicon.svg',
      persistentCache: true,
      inject: true,
    })
  ]
};
