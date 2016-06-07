var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    var exec_start_at = Date.now();
    var url = req.originalUrl.replace('/api/', global.apiUrl + 'api/');
    var cookie = [];
    for (var key in req.cookies) {
        cookie.push(key + '=' + req.cookies[key]);
    }
    res.set('X-Execution-Time', String(Date.now() - exec_start_at));
    request({
        url: url,
        headers: {
            Cookie: cookie.join(';')
        }
    }, function(error, response, body) {
        if (error) {
            console.error(error);
        }
    }).on('response', function(response) {
        response.headers['X-Execution-Api-Time'] = String(Date.now() - exec_start_at);
        response.headers['x-powered-by'] = 'luojilab';
    }).pipe(res);
});

/* POST. */
router.post('/', function(req, res, next) {
    var exec_start_at = Date.now();
    var url = req.originalUrl.replace('/api/', global.apiUrl + 'api/');
    res.set('Content-type', 'application/json');
    var cookie = [];
    var formData = {};
    for (var key in req.cookies) {
        cookie.push(key + '=' + req.cookies[key]);
    }
    res.set('X-Execution-Time', String(Date.now() - exec_start_at));

    request({
        method: 'POST',
        uri: url,
        headers: {
            Cookie: cookie.join(';')
        },
        formData: formData
    }, function(error, response, body) {
        if (error) {
            console.error(error);
        }
        try {
            body = JSON.parse(body);
        } catch (e) {
            body = {
                status_code: 500,
                erroe: 'JSON格式错误'
            };
        }
        res.set('X-Execution-Api-Time', String(Date.now() - exec_start_at));
        res.set('x-powered-by', 'luojilab');
        if (response.statusCode === 302) {
            console.log('302');
            console.log(response.headers.location);
            res.status(302);
            res.redirect(response.headers.location);
        } else {
            res.send(body);
        }
    });
});

module.exports = router;
