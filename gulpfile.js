const gulp = require('gulp');
const ts = require('gulp-typescript');
const child = require('child_process');

var tsProject = ts.createProject('src/main/tsconfig.json');

gulp.task('compile-main',()=>{
	var tsResult = tsProject.src().pipe(tsProject());

	return tsResult.js.pipe(gulp.dest('src/main/main-build'));
});

gulp.task('run-main-dev',(cb)=>{
	url = "src/main/main-build/index.js";
	let electron = child.exec(`cd src/main && electron .`);
	electron.stdout.on('data',(data)=>{
		console.log(data);
	})
	electron.stderr.on('data',(data)=>{
		console.log(data);
	})
	return;
});

gulp.task('run-ui',(cb)=>{
	let react = child.exec("cd src/ui && npm start");
	react.stdout.on('data',(data)=>{
		console.log(data);
	})
	react.stderr.on('data',(data)=>{
		console.log(data);
	})
});