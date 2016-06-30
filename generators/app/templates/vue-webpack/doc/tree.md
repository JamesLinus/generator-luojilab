## 目录结构

│ 
│─ build
│   │  assetsInsert.js 					# webpack 模板build hash文件注入模板插件
│   │  build.js 						# webpack 生产 build 配置
│   │  getEntries.js 					# webpack 入口收集插件
│   │  README.md
│   │  webpack.base.js   			 	# webpack 基础配置
│   │  webpack.config.js    			# webpack 开发配置
│   └─ webpack.production.config.js 	# webpack 生产配置
│
│─ client
│    │─ images 							# 图片文件目录
│    │  └─ page_1_image.jpg
│    │─ js
│    │   │ components
│    │   └─ project
│    │     		└─ page1 				# 单页项目目录
│    │       		│  app.vue 			# vue文件
│    │       		└─ main.js 			# 入口文件
│    └─sass 
│       │─base 							# sass 基础样式
│       │ 	└─ base.scss
│      	│─components
│      	│  	└─ libs 					# sass 组件样式
│       │	   	└─ var.scss
│      	└─ project 						# sass 工程样式
│        	│  index.scss
│        	└─ page2.scss
│─ public 								# 静态文件目录
│	│  dist 							# webpack 输出 js image css 到这里
│	└─ favicon.ico
│
│─ server 								# nodejs 
│	│ middleware 						# 中间件
│   │    │  router.js
│   │    └─ time.js
│	│─ routes  							# 路由配置
│   │     │  index.js
│   │     └─ page2.js
│	└─ views 							# 视图模板
│        └─page1 						# 单页工程
│           │  index-tpl.html 			# 单页模板 用于webpack 插件自动注入filename.hash.ext
│           └─ index.html 				# webpack生成的真实模板文件
│
│ ─ config 								# 接口配置
│   │  development.json
│   └─ production-0.json
│
│  .babelrc 							# babel环境配置文件
│  .gitignore 							# 忽略无需git控制的文件  比如 node_modules
│  ecosystem.json						# pm2 部署配置
│  package.json 						# 项目配置
└─ app.js 								# express 逻辑代码入口文件