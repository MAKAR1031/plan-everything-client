const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: [
        './js/index.js'
    ],
    output: {
        path: __dirname + "/public",
        publicPath: '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/style.css')
    ],
    devServer: {
        contentBase: __dirname + '/public',
        port: 3000,
        historyApiFallback: true
    }
};
