var webpack = require('webpack');
var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base')
var getEntries = require('./getEntries')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var assetsInsert = require('./assetsInsert')

var productionConf = merge(baseConfig, {
    entry: getEntries(),
    output: {
        filename: './[name].[hash].js',
        path: path.resolve('./public/dist'),
        publicPath: './'
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
            sass: ExtractTextPlugin.extract("css!sass")
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ExtractTextPlugin('./[name].[hash].css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new assetsInsert()
    ]
})

productionConf.module.loaders = [
            {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url?limit=8192&context=client&name=[path][name].[hash:7].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass'),
            }]

module.exports = productionConf