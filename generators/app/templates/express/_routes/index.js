var express = require('express');
var router = express.Router();
var Thenjs = require('thenjs');

/**
 * 访问 -> http://localhost:5555/
 */
router.get('/', function(req, res, next) {
    res.render('application/index/index', {
        title: '首页',
        cssArray: ['project/index/index'],
        jsArray: ['project/index/main'],
        distJs: ['project/index/main']
    });
});


/**
 * 访问 -> http://localhost:5555/index/start
 */
router.get('/index/start', function(req, res, next) {
    res.render('application/index/start', {
        title: '开始',
        cssArray: ['project/index/index'],
        jsArray: ['project/start/main'],
        distJs: ['project/start/main']
    });
});

module.exports = router;
