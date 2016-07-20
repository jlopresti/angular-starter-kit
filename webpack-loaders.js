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
        { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
        { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
        { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
        { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
        { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' },

       { test: /\.less$/, loader: 'style!css!less' },
       { test: /\.css$/, loader: 'style!css' }
];
