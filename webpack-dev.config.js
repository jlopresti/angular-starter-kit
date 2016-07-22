var path = require('path');
var webpack = require('webpack');
var loaders = require("./webpack-loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var jadeHotLoader = require.resolve('./loaders/jade-loader');

var PATHS = {
  app: path.join(__dirname, 'src/index.dev.ts'),
  vendor: path.join(__dirname, 'src/vendor.ts'),
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
    vendor: PATHS.vendor
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
    loaders: loaders.concat([  { test: /\.less$/, loader: 'style!css!less', exclude:[/node_modules/] },
  { test: /\.css$/, loader: 'style!css', exclude:[/node_modules/]  },
  { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"), include:[/node_modules/]  },
  { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader?outputStyle=expanded"), include:[/node_modules/]  } ]),
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
            'windows.jQuery': 'jquery',
            'windows.jquery': 'jquery'
        }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("css/[name].css"),
  ]
};
