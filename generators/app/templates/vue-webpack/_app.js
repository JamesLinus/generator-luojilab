var express = require('express');
var path = require('path');
var consolidate = require('consolidate');
var nunjucks = require('nunjucks')
var timer = require('./server/middleware/time');
var routerConfig = require('express-auto-router');

var config = require('config')
var NODE_ENV = process.env.NODE_ENV || 'production';
var isDev = NODE_ENV === 'development';
var app = express();
var port = 3000;

app.use(timer);

// local variables for all views
app.locals.env = NODE_ENV;
app.locals.reload = true;
global.apiUrl = config.get(NODE_ENV).apiUrl;

var env = nunjucks.configure('server/views', {
    autoescape: true,
    watch: true,
    express: app,
    tags: {
        variableStart: '##',
        variableEnd: '##'
    }
});

env.addGlobal('env', app.get('env'));
env.addGlobal('baseUrl', config.get(NODE_ENV).baseUrl);
env.addGlobal('staticJsUrl', config.get(NODE_ENV).staticJsUrl);

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'html');

console.log('init', NODE_ENV, apiUrl);

if (isDev) {

    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./build/webpack.config.js');

    var compiler = webpack(webpackDevConfig);

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {

        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
    
    routerConfig(app, {
        dirPath: __dirname + '/server/routes/',
        map: {
            'index': '/',
            'api': '/api/*',
            'proxy': '/proxy/*'
        }
    });

    // add "reload" to express, see: https://www.npmjs.com/package/reload
    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(server, app);

    server.listen(port, function(){
        console.log('App (dev) is now running on port 3000!');
    });
} else {
    routerConfig(app, {
        dirPath: __dirname + '/server/routes/',
        map: {
            'index': '/',
            'api': '/api/*',
            'proxy': '/proxy/*'
        }
    });

    // static assets served by express.static() for production
    app.use(express.static(path.join(__dirname, 'public')));

     //线上使用OneAPM监控性能
    var OneAPM = require('oneapm');
    //线上使用sentry报警提示
    var raven = require('raven');
    var client = new raven.Client('http://da7c09c667bb4ea2864e6d401bc49107:21a634657d794138b2edb76bedcad2db@sentry.luojilab.com/23');
    client.patchGlobal();
    
    app.listen(port, function () {
        console.log('App (production) is now running on port 3000!');
    });
}
