var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [
  { test: /\.ts$/, loader: 'ts-loader' },
  { test: /\.html$/, loader: 'html-loader'}
];
