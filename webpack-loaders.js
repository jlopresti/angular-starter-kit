var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [
  { test: /\.ts$/, loader: 'ng-annotate?add=true&sourcemap=true!ts-loader' },
  { test: /\.html$/, loader: 'html-loader'},
  { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg)$/, loader: 'url?limit=10000&name=fonts/[name].[hash].[ext]' },
  { test: /\.(jpe?g|png|gif|ico)$/, loader: 'url?limit=10000&name=img/[name].[hash].[ext]' },
  { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file?name=fonts/[name].[hash].[ext]' },
  {
            test: require.resolve("jquery"),
            loader: "expose?$!expose?jQuery"
        }
];
