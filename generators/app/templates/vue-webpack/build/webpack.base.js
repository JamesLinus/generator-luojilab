var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')
var baseConfig = {
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
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
            loader: 'style!css',
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }]
    },
    vue: {
        loaders: {
            sass: 'style!css!sass'
        }
    }
};

module.exports = baseConfig;
