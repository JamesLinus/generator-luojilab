var webpack = require('webpack');
var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base')
var getEntries = require('./getEntries')

var publicPath = 'http://localhost:3000/dist/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var assetsInsert = require('./assetsInsert')

module.exports = merge(baseConfig, {
  entry: getEntries(hotMiddlewareScript),
  devtool: '#eval-source-map',
  output: {
    filename: './[name].[hash].js',
    path: path.resolve('./public/dist'),
    publicPath: publicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new assetsInsert()
  ]
})