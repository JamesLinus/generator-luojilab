var config = require('config');
var configEnv = process.env.SERVER_CONFIG || config.util.getEnv('NODE_ENV');
var express = require('express');
var path = require('path');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var timer = require('./middleware/time');
var routerConfig = require('./middleware/router');
var configrc = require('rc')('luojilab');

global.apiUrl = config.get(configEnv).apiUrl;

console.log('init', configEnv, apiUrl);

var env = nunjucks.configure('views', {
    autoescape: true,
    watch: true,
    express: app,
    tags: {
        variableStart: '##',
        variableEnd: '##'
    }
});

env.addGlobal('env', app.get('env'));
env.addGlobal('staticBaseUrl', config.get(configEnv).staticBaseUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(timer);
if (app.get('env') === 'development') {
    app.use(express.static(path.join(__dirname, '/public/dev')));
} else {
    app.use(express.static(path.join(__dirname, '/public/dist')));
}
routerConfig(app, {
    dirPath: __dirname + '/routes/'
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    if (req.originalUrl.search(/(.jpeg|.jpg|.png|.css|.js)$/g) > -1) {
        res.status(err.status).end();
        return;
    }
    res.render('error/404', {
        message: err.message,
        error: err
    });
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).end();
});

app.listen(configrc.port, function(){
	console.log('http port '+ configrc.port +' start');
});
