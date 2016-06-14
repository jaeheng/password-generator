// 引入组件
var 
    gulp = require('gulp'),
    jshint = require('gulp-jshint'), // js 代码检查
    less = require('gulp-less'), // 编译less
    concat = require('gulp-concat'), // 合并文件
    uglify = require('gulp-uglify'), // 混淆压缩js代码
    rename = require('gulp-rename'), // 重命名文件
    sourcemaps = require('gulp-sourcemaps'), // 生成map
    LessAutoprefix = require('less-plugin-autoprefix'), // less自动添加前缀插件
    LessPluginCleanCSS = require('less-plugin-clean-css'), // less压缩插件
    clean = require('gulp-clean'), // 删除文件或文件夹
    autoprefixer,
    cleanCSSPlugin;

cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});
autoprefixer = new LessAutoprefix({ browsers: ['last 2 versions'] });

// 配置
var config = {
    bowerDir:'./bower_components',
    distDir: './dist',
    srcDir: './src',
    lessDir: './src/css',
    jsDir: './src/js',
    distTask: ['lint', 'less', 'scripts', 'images']
};

// 检查脚本
gulp.task('lint', function() {
    gulp.src(config.srcDir + '/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译less
gulp.task('less', function() {
    gulp.src(config.lessDir + '/app.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefixer,cleanCSSPlugin]
        }))
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest(config.distDir));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src([
            config.jsDir + '/password.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.distDir));
});

// 清空dist文件夹
gulp.task('clean', function () {
    gulp.src(config.distDir + '/*', {read: false})
        .pipe(clean());
});

// 清空dist文件夹
gulp.task('images', function () {
    gulp.src(config.srcDir + '/images/*')
        .pipe(gulp.dest(config.distDir + '/images'));
});

// 打包
gulp.task('dist', config.distTask);

// 监控文件
gulp.task('watch', function() {
    gulp.watch([config.jsDir + '/*.js', config.lessDir + '/*.less'], config.distTask);
});

// 默认任务
gulp.task('default', ['dist', 'watch']);


// 帮助
gulp.task('help', function() {
    console.log("\n +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ");
    console.log("   gulp lint          检查代码");
    console.log("   gulp less          编译less");
    console.log("   gulp scripts       合并，压缩js文件");
    console.log("   gulp images        打包图片文件");
    console.log("   gulp clean         清空dist文件夹");
    console.log("   gulp watch         监控js,less文件");
    console.log("   gulp default       执行'lint', 'less', 'scripts', 'watch'");
    console.log("   gulp dist          执行'clean', 'lint', 'less', 'scripts'");
    console.log(" +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n");
});