/**
 * Created by lvjinlong .
 * Date: 15/12/2
 * Time : 下午11:04
 */
var path = require('path'),
    fs = require('fs'),
    glob = require('glob'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        filename: 'common.[chunkhash].js'
    });


var paths = {
    dev: {
        js: __dirname + '/../../public/dev/js/'
    },
    dist: {
        js: __dirname + '/../../public/dist/js/'
    }
};



function getEntry() {
    var pattern = paths.dev.js + 'project/**/main.js';
    var array = glob.sync(pattern);
    var newObj = {};
    array.map(function(el) {
        var reg = new RegExp('project/(.*).js', 'g');
        reg.test(el);
        newObj[RegExp.$1] = el;
    });
    return newObj;
}

module.exports = {
    entry: getEntry(),
    output: {
        path: paths.dist.js + 'project/',
        filename: "[name].[chunkhash].js",
        chunkFilename: "[id].[chunkhash].js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }]
    },
    externals: {
        'Zepto': 'window.Zepto',
        '$': 'window.Zepto'
    },
    amd: {
        jQuery: true
    },
    plugins: [commonsPlugin,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    resolve: {
        root: path.resolve(paths.dev.js),
        extensions: ['', '.js'],
        alias: {}
    }

};
