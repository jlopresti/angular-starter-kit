var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [
  {
    test: /\.ts$/,
    loader: 'ts-loader'
  },
  {
    test: /\.html$/,
    loader: 'html-loader'
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"),
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader?outputStyle=expanded")
  }
];
