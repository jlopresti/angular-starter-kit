var path = require('path');
var webpack = require('webpack');
var loaders = require("./webpack-loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var jadeHotLoader = require.resolve('./loaders/jade-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PATHS = {
  app: path.join(__dirname, 'src/index.dev.ts'),
  vendor: path.join(__dirname, 'src/bundles/vendor.ts'),
  vendorDev: path.join(__dirname, 'src/bundles/vendor.dev.ts'),
  build: path.join(__dirname, 'builds'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  devtool: "source-map",
  watch: true,
  cache: true,
  debug: true,
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/dev-server',
      PATHS.app
    ],
    vendor: [PATHS.vendor, PATHS.vendorDev]
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].bundle.js',
    sourceMapFilename: 'js/[name].bundle.js.map',
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json', '.less']
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: loaders.concat([  { test: /\.less$/, loader: 'style!css?sourceMap!less?sourceMap', exclude:[/node_modules/] },
  { test: /\.css$/, loader: 'style!css?sourceMap', exclude:[/node_modules/]  },
  { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"), include:[/node_modules/]  },
  { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader?outputStyle=expanded"), include:[/node_modules/]  },
    { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg)$/, loader: 'url?limit=10000&name=fonts/[name].[ext]' },
  { test: /\.(jpe?g|png|gif|ico)$/, loader: 'url?limit=10000&name=img/[name].[ext]' },
  { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file?name=fonts/[name].[ext]' } ]),
    postLoaders:[
      { test: /\.html/, loader: jadeHotLoader }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
      title: 'My App',
      template: 'index.template.ejs',
      filename: 'index.html'
    })
  ]
};
