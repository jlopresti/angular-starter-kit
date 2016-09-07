var path = require('path');
var webpack = require('webpack');
var loaders = require("./webpack-loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extend = require('extend');

var defaultConfig = require('./src/configs/config.json')
var envConfig = null;
var isDev = (process.env.DEV_ENV === 'dev')
if(isDev){
  envConfig = require('./src/configs/config.dev.json')
}else{
  envConfig = require('./src/configs/config.prd.json')
}

var PATHS = {
  app: path.join(__dirname, 'src/index.ts'),
  build: path.join(__dirname, 'builds'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  entry: [PATHS.app],
  output: {
    filename: 'build.js',
    path: 'tmp'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json', '.less'],
    alias : {
      assets : path.join(__dirname, 'src', 'assets'),
      common : path.join(__dirname, 'src', 'common')
    }
  },
  resolveLoader: {
    modulesDirectories: ["node_modules"]
  },
  devtool: "inline-source-map",
  debug:true,
  module: {
      loaders: loaders.concat([  { test: /\.less$/, loader: 'style!css!less', exclude:[/node_modules/] },
  { test: /\.css$/, loader: 'style!css', exclude:[/node_modules/]  },
  { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"), include:[/node_modules/]  },
  { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader?outputStyle=expanded"), include:[/node_modules/]  }]),
    postLoaders: [
      {
        test: /^((?!\.spec\.ts).)*.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'istanbul-instrumenter'
      }
    ]
  },
  plugins: [
      new webpack.SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(ts|js)($|\?)/i // process .js and .ts files only
  }),
      new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("app.css", { allChunks: true }),
        new webpack.DefinePlugin({
      '__DEV__': process.env.DEV_ENV || false,
      'DataConfig': JSON.stringify(extend(true, {}, defaultConfig, envConfig))
    })
  ]
};
