var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    pngquant = require('imagemin-pngquant'), //png图片处理
    webpack = require('webpack-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    mainmaps = require('./plugins/md5.js'),
    webpackConfig = require('./plugins/webpack.config.js'),
    gulpSequence = require('gulp-sequence');

var paths = {
    dev: {
        dir: './dev',
        css: './dev/css/**/*.css',
        img: './dev/images/**/*.{gif,jpg,png,svg,ico}'
    },
    dist: {
        dir: './dist',
        css: './dist/css',
        img: './dist/images',
        js: './dist/js/project',
        main: ['./dist/js/project/**/main.*.js', './dist/js/project/**/common.*.js']
    }
};


module.exports = function(gulp, config) {
    //清除css
    gulp.task('sassClean', function() {
        return gulp.src(paths.dev.dir + '/css/').pipe($.clean());
    });

    //sass编译
    gulp.task('sass', function() {
        gulp.src(paths.dev.dir + '/scss/project/**/*.scss')
            .pipe(sourcemaps.init())
            //.pipe($.sass.sync({outputStyle: 'compressed'}).on('error', $.sass.logError))
            .pipe($.sass.sync().on('error', $.sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.dev.dir + '/css/project/'));
    });

    //清除dist下所有内容
    gulp.task('cleanAllDist', function() {
        return gulp.src(paths.dist.dir).pipe($.clean());
    });

    //压缩images
    gulp.task('images', function() {
        return gulp.src(paths.dev.img)
            .pipe($.imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(paths.dist.img));
    });

    //js压缩
    gulp.task('js', function() {
        //打包压缩js
        return gulp.src('')
            .pipe(webpack(webpackConfig))
            .pipe(gulp.dest(paths.dist.js));
    });

    //移dev下css到dist中
    gulp.task('css', function() { //sh5 css压缩
        return gulp.src([paths.dev.css])
            .pipe($.cleanCss())
            .pipe(gulp.dest(paths.dist.css));
    });

    //sass监听
    gulp.task('sass:watch', function() {
        gulp.watch(paths.dev.dir + '/scss/**/*.scss', ['sass']);
    });

    gulp.task('main-path-replace', function() {
        //打包压缩js
        gulp.src(paths.dist.main)
            .pipe(mainmaps());
    });

    gulp.task('build_dist', gulpSequence(
        'sassClean',
        'sass',
        'cleanAllDist',
        'images',
        'js',
        'css',
        'main-path-replace'
    ));
};
