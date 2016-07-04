'use strict'

var fs = require('fs')

function cov() {
}

var injectScript = function (data, file) {
	 return data.replace('<!--covInject-script-here-->', '<script src="dist/' + file.replace('./', '') + '"></script>')	
}
var injectStyle = function (data, file) {
	 return data.replace('<!--covInject-style-here-->', '<link rel="stylesheet" href="dist/' + file.replace('./', '') + '">')	
}

var injectSource = function (chunkName, files) {
	fs.readFile(__dirname + '/../server/views/' + chunkName + '/template/index.html', 'utf8', (err, data) => {
	 	if (err) throw err;
	 	data = injectScript(data, files[0])
	 	if (files[1]) {
	 		data = injectStyle(data, files[1])
	 	}
	 	fs.writeFile(__dirname + '/../server/views/' + chunkName + '/index.html', data, (writeErr) => {
		    if(writeErr) throw writeErr;
		})
	});
}


cov.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
  	
  	compilation.chunks.map(chunk => {
  		injectSource(chunk.name, chunk.files)
  	})
  	callback()
  })
};

module.exports = cov;