/**
 *
 * @authors yuqiu (yuqiu@wantni.com)
 * @date    2016-03-03 15:11:12
 * @version $Id$
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var streamBuffers = require('stream-buffers');



/* GET home page. */
router.get('/', function(req, res, next) {
    var exec_start_at = Date.now();
    var url = req.originalUrl.replace('/api/', global.apiUrl);
    var cookie = [];
    for (var key in req.cookies) {
        cookie.push(key+'=' + req.cookies[key]);
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

router.post('/', upload.any(), function(req, res, next) {
    var exec_start_at = Date.now();
    var url = req.originalUrl.replace('/api/', global.apiUrl + 'api/');
    res.set('Content-type', 'application/json');
    var cookie = [];
    var formData = {};
    for (var key in req.cookies) {
        cookie.push(key+'=' + req.cookies[key]);
    }
    if (req.files && req.files.length > 0) {
        var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer();
        myReadableStreamBuffer.put(req.files[0].buffer);
        formData = {
            file: {
                value : fs.createReadStream(__dirname + '/../' + req.files[0].path),
                options: {
                    filename : req.files[0].filename
                }
            }
        };
    } else {
        formData = req.body;
    }
    res.set('X-Execution-Time', String(Date.now() - exec_start_at));
    if(url.indexOf('api/user/login') > -1 ){
        cookie = [];
    }
    request({
        method: 'POST',
        uri: url,
        headers: {
            Cookie: cookie.join(';')
        },
        formData: formData //req.body //这里有错误
    }, function(error, response, body) {
        if (error) {
            console.error(error);
        }
        if(req.files && req.files.length > 0){
            fs.unlink(__dirname + '/../' + req.files[0].path);
        }
        try {
            body = JSON.parse(body);
        }catch (e){
            body  = {
                status_code : 500,
                erroe: 'JSON格式错误'
            };
        }
        res.set('X-Execution-Api-Time', String(Date.now() - exec_start_at));
        res.set('x-powered-by', 'luojilab');
        if(response && response.statusCode === 302){
            res.status(302);
            res.redirect(response.headers.location);
        }else{
            res.send(body);
        }
    });
});

module.exports = router;
