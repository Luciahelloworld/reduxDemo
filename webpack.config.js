var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry: {
		app: path.resolve(APP_PATH, 'app.js')
	},
	output: {
		path: BUILD_PATH,
		filename: "bundle.js"
	},

	node: {
		fs: "empty"
	},

	devtool: 'eval-source-map',

	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},

	resolve: {
		extensions: ['','.js','.jsx'],
		root:APP_PATH
	},

	module: {
		preLoaders:[],
		loaders:[
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				include: APP_PATH
			}
		]
	},

	plugins: [
		new HtmlwebpackPlugin({
			title: 'My first redux app'
		})
	]
}
