var path = require('path');
var fs = require('fs');
var glob = require('glob');

var paths = {
    dev : {
        js : __dirname + '/../client/js/'
    }
};

function getEntry(hotMiddlewareScript) {
    var pattern = paths.dev.js + 'project/**/main.js';
    var array = glob.sync(pattern);
    var newObj = {};

    array.map(function(el){
        var reg = new RegExp('project/(.*)/main.js','g');
        reg.test(el);
        if (hotMiddlewareScript) {
        	newObj[RegExp.$1] = [el, hotMiddlewareScript];
        } else {
        	newObj[RegExp.$1] = el;
        }
    });
    return newObj;
}

module.exports = getEntry