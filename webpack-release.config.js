var path = require('path');
var webpack = require('webpack');
var loaders = require("./webpack-loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PATHS = {
  app: path.join(__dirname, 'src/index.ts'),
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
    filename: 'js/[name].[hash].bundle.js',
    publicPath: '/'
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
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/[name].[hash].bundle.js'),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("css/[name].[hash].css"),
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
      template: 'ejs!./index.template.ejs',
      filename: 'index.html',
      favicon : 'favicon.ico',
      inject: false
    }),
        new webpack.DefinePlugin({
      '__DEV__': process.env.DEV_ENV || false
    })
  ]
};
