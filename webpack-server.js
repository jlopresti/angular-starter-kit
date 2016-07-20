var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack-dev.config');
console.log(config.output.publicPath)

new WebpackDevServer(webpack(config), {
  contentBase: 'builds',  //location for base of dev server
	hot: true, //hot module replacement
	historyApiFallback: true, //support html5 history api routers like ui-router
  noInfo: false,
publicPath:'/',
  quiet: false,
  stats: {
    colors: true
  }
}).listen(8000, 'localhost', function (err, result) {
	if (err) {
		console.log(err);
	}
	console.log('Listening at http://localhost:8000/');
});
