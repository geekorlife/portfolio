var path = require("path");

module.exports = {
    devtool: 'eval', // or eval
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/public/",
        filename: "app.js"
    },
    devServer:{
        inline: true,
        host: '192.168.2.8',
        historyApiFallback: true,
        port: 3333
    },
    module:{
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
    // test environment build
    test: function (config) {
        return {
            entry: 'webpack.tests.js',
            output: _.assign({}, config.output, {
                // client assets are output to dist/test/
                path: path.join(config.output.path, 'test'),
                publicPath: undefined // no assets CDN
            }),
            devtool: 'inline-source-map', // sourcemap support
            plugins: config.plugins.concat(
                new webpack.DefinePlugin({
                    'typeof window': JSON.stringify("object")
                })
            )
        };
    }
}