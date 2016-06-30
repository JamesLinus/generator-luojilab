/**
 *
 * @authors yuqiu (yuqiu@luojilab.com)
 * @date    2016-05-06 11:42:56
 * @version $Id$
 */

var through2 = require('through2');
var path = require('path');
var fs = require('fs');
var vinylRead = require('vinyl-read');
var _ = require('lodash');


module.exports = function() {
	var map = {};
	return through2.obj(function(file, encoding, cb) {
		var jsPath = path.relative(file.base, file.path);
		map['project/' + jsPath.split('.')[0]] = jsPath.replace('.js', '');
		cb();
	}, function(cb) {
		var routerPath = path.join(__dirname, '../../routes/');
		var jsonData = JSON.stringify(map).replace('{','{\n\t').replace(/,/g,',\n\t').replace('}','\n}');
		fs.writeFileSync(path.join(__dirname, './mainMap.json'), jsonData);
		var files = vinylRead.sync([routerPath + '*.js', '! ' + routerPath + 'api.js', '! ' + routerPath + 'login.js', '! ' + routerPath + 'editor.js']);
		files.forEach(function(el, index) {
			var content = el._contents.toString();
			var contentArray = content.split('distJs: ').map(function(val, key) {
				if (key > 0) {
					var jsPathArr = JSON.parse(_.replace(_.split(val, ']', 1) + ']', /'/g, '"'));
					var newArr = _.map(jsPathArr, function(val) {
						if(val.indexOf('project') > -1){
							return 'project/' + map[val.split('.')[0]];
						}else{
							return val;
						}
					});
					return _.replace(val, _.split(val, ']', 1) + ']', JSON.stringify(newArr));
				} else {
					return val;
				}
			});
			fs.writeFileSync(el.path,contentArray.join('distJs: '));
		});
		var htmlFiles = vinylRead.sync(path.join(__dirname, '../../views/include/footer.html'));
		htmlFiles.forEach(function(el, index) {
			var content = el._contents.toString();
			content = content.replace(/project\/common((\.|-)[A-Za-z0-9]+)*\.js/g, 'project/' + (map['project/common'] ||'common') + '.js');
			fs.writeFileSync(el.path,content);
		});
		cb();
	});
};
