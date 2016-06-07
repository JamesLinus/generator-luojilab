var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    _s = require('underscore.string');

var luojilabGenerators = yeoman.Base.extend({
    // 初始化
    initializing: function() {
        // this.pkg = require('../package.json');
    },

    // 提示
    prompting: function() {
        var done = this.async();

        this.log(yosay(chalk.yellow.bold('Welcome to ') +
            chalk.magenta("luojilab-workflow") +
            chalk.yellow.bold(' Yeoman generator,') +
            chalk.yellow.bold('More configs in ') +
            chalk.red('`.luojilabrc`')));

        this.log(chalk.magenta('开始配置工作流:'));

        var prompts = [{
                name: 'projectName',
                message: '项目名: ',
                default: 'project-xxx',
                store: true
            }, {
                name: 'version',
                message: '版本号: ',
                default: '0.0.1'
            }, {
                name: 'authorName',
                message: '作者: ',
                default: 'author',
                store: true
            },
            // {
            //
            //     type: 'checkbox',
            //     name: 'features',
            //     message: '▬▬▬▬ 选择更多功能 <空格键> ▬▬▬▬',
            //     choices: [{
            //         name: '开启: 文件 Reversion 支持      // js文件采用 MD5 新文件名',
            //         value: 'includeReversion',
            //         checked: true
            //     }]
            // },
            {
                type: 'confirm',
                name: 'needNpmInstall',
                message: chalk.green('配置完成, 项目创建成功!') +
                    '\n  是否自动执行 ' +
                    chalk.yellow('`npm install & npm run zip`') +
                    ' ?',
                store: true
            }
        ];


        this.prompt(prompts, function(props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }

            this.projectName = _s.slugify(props.projectName);
            var features = props.features;

            function hasFeature(feat) {
                return features.indexOf(feat) !== -1;
            }
            // include gulp config
            // this.includeLivereload = hasFeature('includeLivereload');
            // this.includeRem = hasFeature('includeRem');
            // this.includeWebp = hasFeature('includeWebp');
            // this.includeChanged = hasFeature('includeChanged');
            // this.includeReversion = _s.classify(hasFeature('includeReversion')).toLowerCase();
            done();
        }.bind(this));
    },
    writing: function() {

        this.directory('_tasks', '_tasks');
        this.directory('_views', 'views');
        this.directory('_config', 'config');
        this.directory('_middleware', 'middleware');
        this.directory('_model', 'model');
        this.directory('_routes', 'routes');
        this.directory('_public', 'public');


        this.copy('_app.js', 'app.js');
        this.copy('_package.json', 'package.json');
        this.copy('_ecosystem.json', 'ecosystem.json');
        this.copy('_.luojilabrc', '.luojilabrc');
        this.copy('_.gitignore', '.gitignore');

        //http://editorconfig.org/
        this.copy('_.editorconfig', '.editorconfig');

    },
    // 4. 目录建立完成后
    end: function() {
        this.installDependencies({
            skipInstall: !this.needNpmInstall,
            callback: function() {
                if (this.needNpmInstall) {
                    this.spawnCommand('npm', ['run', 'zip']);
                } else {
                    this.log(chalk.green('工作流初始化完毕, 请 `npm install` 安装依赖, 然后执行 `npm run zip` 打包压缩后'));
                }

            }.bind(this)
        });
    }
});

module.exports = luojilabGenerators;
