var webpack = require("webpack"),
	path = require("path");

// Karma configuration
// Generated on Mon May 11 2015 14:13:57 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
		"./*.test.js"
    ],
    preprocessors: {
		"./*.test.js": ["webpack"]
    },
	webpack: {
		module: {
			loaders: [
                { 
                    test: /\.js$/, 
                    exclude: /node_modules/, 
                    loader: 'babel',
                    query: {presets: ['es2015', 'react']}
                },
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'sass']
                }
            ]
		},
		plugins: [
			new webpack.ResolverPlugin([
				new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
			])
		],
		resolve: {
			root: [path.join(__dirname, "./bower_components"), path.join(__dirname, "./src")]
		}
	},
	webpackMiddleware: {
		noInfo: true
	},
	plugins: [
		require("karma-webpack"),
		require("karma-jasmine"),
		require("karma-chrome-launcher")
	],
    reporters: ["dots"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false
  });
};