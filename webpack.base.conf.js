var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var SwigWebpackPlugin = require('swig-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var jsPath = path.resolve(__dirname, './public/javascripts');
var cssPath = path.resolve(__dirname, './public/stylesheets');

var publicPath = '/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    entry: {
        index: [
            './public/javascripts/index.js',
            hotMiddlewareScript
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: publicPath
    },
    resolve: {
        extensions: ['','.jsx','.js']
    },
    devtool: '#eval-source-map',
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'swig-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader"),
                include: cssPath
            },
            {
                test: /\.scss$/,
                loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('[name].bundle.css', {allChunks: true}),
        // new HtmlWebpackPlugin({
        //     title: '云阅读周报2系统',
        //     template: 'views/index.html',
        // })
    ]
};

module.exports = devConfig;