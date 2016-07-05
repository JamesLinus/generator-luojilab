var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    path = require('path'),
    glob = require('glob'),
    _s = require('underscore.string');

var luojilabGenerators = yeoman.Base.extend({
    // 初始化
    initializing: function() {
        // this.pkg = require('../package.json');
    },
    constructor: function() {
        yeoman.Base.apply(this, arguments);
        // add option to skip install
        this.option('skip-install');
    },

    // 提示
    prompting: {
        say: function() {
            console.log(this.options['skip-install']);
            this.log(yosay(chalk.yellow.bold('Welcome to ') +
                chalk.magenta("luojilab-workflow") +
                chalk.yellow.bold(' Yeoman generator,') +
                chalk.yellow.bold('More configs in ') +
                chalk.red('`.luojilabrc`')));

            this.log(chalk.magenta('开始配置工作流:'));
        },
        basic: function() {
            var done = this.async();

            var prompts = [{
                name: 'projectName',
                message: '项目名: ',
                default: 'project-xxx'
            }, {
                name: 'version',
                message: '版本号: ',
                default: '0.0.1'
            }, {
                name: 'authorName',
                message: '作者: ',
                default: 'author'
            }];

            this.prompt(prompts, function(props) {
                for (var prop in props) {
                    if (props.hasOwnProperty(prop)) {
                        this[prop] = props[prop];
                    }
                }
                this.options.projectName = _s.slugify(props.projectName);
                var features = props.features;

                function hasFeature(feat) {
                    return features.indexOf(feat) !== -1;
                }
                // include gulp config
                // this.includeRem = hasFeature('includeRem');
                // this.includeWebp = hasFeature('includeWebp');
                done();
            }.bind(this));
        },
        dir: function() {

            if (this.options.createDirectory !== undefined) {
                return true;
            }

            var done = this.async();
            var prompt = [{
                type: 'confirm',
                name: 'createDirectory',
                message: 'Would you like to create a new directory for your project?'
            }];

            this.prompt(prompt, function(response) {
                this.options.createDirectory = response.createDirectory;
                done();
            }.bind(this));
        },
        dirname: function() {

            if (!this.options.createDirectory || this.options.dirname) {
                return true;
            }

            var done = this.async();
            var prompt = [{
                type: 'input',
                name: 'dirname',
                message: 'Enter directory name'
            }];

            this.prompt(prompt, function(response) {
                this.options.dirname = response.dirname;
                done();
            }.bind(this));
        },
        type: function() {

            if (this.options.node || this.options.static) {
                return true;
            }

            var done = this.async();
            var prompt = [{
                type: 'list',
                name: 'type',
                message: 'Choose which way to build your project:',
                choices: [
                    'Front and back separation',
                    'Front'
                ]
            }];

            this.prompt(prompt, function(responses) {
                this.options.node = responses.type.match(/^Front$/i) === null;
                done();
            }.bind(this));
        },
        type_separation: function() {
            if (this.options.node) {
                var done = this.async();
                var prompt = [{
                    type: 'list',
                    name: 'type_separation',
                    message: 'Enter directory name',
                    choices: [
                        'express + require + gulp + webpack',
                        'vue + vue-route + webpack'
                    ]
                }];

                this.prompt(prompt, function(responses) {
                    this.options.express = responses.type_separation.match(/^express/i) !== null;
                    this.options.vue = responses.type_separation.match(/^vue/i) !== null;
                    done();
                }.bind(this));
            }
        },
        type_front: function() {
            if (!this.options.node) {
                console.log('type_front');
                //TODO @lvjinlong
            }
        }
    },

    writing: function() {
        console.log(this.options);

        // create directory
        if (this.options.createDirectory) {
            this.destinationRoot(this.options.dirname);
        }

        // express separation
        if (this.options.node && this.options.express) {
            this.sourceRoot(path.join(__dirname, 'templates', 'express'));
            glob.sync('**', {
                cwd: this.sourceRoot()
            }).map(function(file) {
                this.template(file, file.replace(/^_/, ''));
            }, this);
        }

        // vue separation
        if (this.options.node && this.options.vue) {
            this.sourceRoot(path.join(__dirname, 'templates', 'vue-webpack'));

            glob.sync('*.*', {
                cwd: this.sourceRoot()
            }).map(function(file) {
                this.copy(file, file.replace(/^_/, ''));
            }, this);

            glob.sync('*/', {
                cwd: this.sourceRoot()
            }).map(function(file) {
                this.directory(file, file.replace(/^_/, ''));
            }, this);
        }
    },
    // 4. 目录建立完成后
    end: function() {
        if (!this.options['skip-install']) this.npmInstall();
    }
});

module.exports = luojilabGenerators;
