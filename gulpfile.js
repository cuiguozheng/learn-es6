var gulp = require('gulp'), /*引入 gulp模块*/
	connect = require('gulp-connect'), /*引入 启动服务模块*/
	include = require('gulp-include'), /*引入 拼接html模板模块*/
	concat = require('gulp-concat'), /*引入 拼接js模板模块*/
	babel = require("gulp-babel"), /*引入 es6 babel模块*/
	es2015 = require("babel-preset-es2015"), /*引入 es6编译模块模块*/
	stage_2 = require("babel-preset-stage-2");

//gulp server
gulp.task('server', function(){
	connect.server({
		root: './build',
		port: 8080,
		livereload: true
	});
});

//html task
gulp.task('html', function(){
	gulp.src('src/view/*.html')
		.pipe(include())
		.pipe(gulp.dest('build/view'));
});

//js task
gulp.task('js', function(){
	gulp.src('src/js/entrance/*.es6')
	.pipe(babel({presets:[es2015,stage_2]}))
	.pipe(gulp.dest('build/static/js')); /*es6转js必须在webpack之前，否则webpack找不到要包装的js会报错*/
});

//boundle task
gulp.task('boundle', function(){
	gulp.src('src/js/libs/jquery.min.js')
		.pipe(concat('boundle.min.js'))
		.pipe(gulp.dest('build/static/js'));
});

gulp.task('reload', function(){
	gulp.src('build/view/*.html')
		.pipe(connect.reload());
});

//watcher
gulp.task('watcher', function(){
	gulp.watch(['src/js/modules-es6/**/*.es6','src/js/entrance/*.es6'],['js','reload']);
	gulp.watch('src/view/**/*',['html', 'reload']);
});

//dev
gulp.task('dev',['html', 'js','boundle','server'],function(){
	gulp.start('watcher');
});