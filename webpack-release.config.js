var path = require('path');
var webpack = require('webpack');
var loaders = require("./webpack-loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PATHS = {
  app: path.join(__dirname, 'src/index.release.ts'),
  vendor: path.join(__dirname, 'src/bundles/vendor.ts'),
  build: path.join(__dirname, 'builds'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  devtool: "source-map",
  debug: true,
  entry: {
    app: PATHS.app,
    vendor: PATHS.vendor
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json', '.scss']
  },
  module: {
    loaders: loaders.concat(
  { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader") },
  { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader?outputStyle=expanded")  },
    { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg)$/, loader: 'url?limit=10000&name=/fonts/[name].[ext]' },
  { test: /\.(jpe?g|png|gif|ico)$/, loader: 'url?limit=10000&name=/img/[name].[ext]' },
  { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file?name=/fonts/[name].[ext]' }
    )
  },
  plugins: [
      new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      verbose: true,
      minimize: true,
      mangle: false,
      compress: {
        warnings: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'index.template.ejs',
      filename: 'index.html'
    })
  ]
};
