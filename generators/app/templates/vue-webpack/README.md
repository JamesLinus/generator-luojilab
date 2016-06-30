# generator-luojilab

## Start

1. Clone this repo.

2. Install dependencies.

        npm install
        npm install supervisor -g
        npm install cross-env -g


3. Try these out.

    * `npm run dev` 开发
    * `npm run build` 打包 
    * `npm start` 生产环境运行 

## 目录
.babelrc 							# babel环境配置文件
.gitignore 							# 忽略无需git控制的文件  比如 node_modules
ecosystem.json						# pm2 部署配置
package.json 						# 项目配置
app.js 								# express 逻辑代码入口文件

config 								# 接口配置
server 								# nodejs 
public 								# 静态文件目录
client								# 前端工程目录
build 								# webpack 配置目录

详细请看 doc 目录下相关文件

## 开发

1. 创建前端工程

	client/js/project/new_project_name/

	目录下包含 main.js

	```javascript
	import Vue from 'vue'
	
	...

	```

2. 创建views模板

	server/views/new_project_name/template/

	目录下包含 index.html

	```html
	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <title>example - page1</title>
	    <!-- webpack输出的css 会被写入在这里 -->
	    <!--covInject-style-here-->
	</head>
	<body>
	    <app></app>
	    <!-- webpack输出的js 会被指向这里 -->
	    <!--covInject-script-here-->
	</body>
	</html>

	```
3. 创建路由

	server/router/new_project_name.js

	```javascript
	var express = require('express');
	var router = express.Router();

	router.get('/', function(req, res) {
	    res.render('page1/index');
	});

	module.exports = router;

	```



## 部署方式

本地安装PM2, 然后把自己的ssh key上传到 50服务器，接着到项目的根目录下

	pm2 deploy ecosystem.json testing


### 其他工具

*  [node-inspector](https://github.com/node-inspector/node-inspector)：本地调试


