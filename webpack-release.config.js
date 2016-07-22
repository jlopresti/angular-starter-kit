var path = require('path');
var webpack = require('webpack');
var loaders = require("./webpack-loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var PATHS = {
  app: path.join(__dirname, 'src/index.dev.ts'),
  vendor: path.join(__dirname, 'src/vendor.ts'),
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
  { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader?outputStyle=expanded")  }
    )
  },
  plugins: [
      new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
            'windows.jquery': 'jquery'
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
    })
  ]
};
