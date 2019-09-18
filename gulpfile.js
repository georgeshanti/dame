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
	console.log(url);
	child.execSync(`electron ${url}`, (err, stdout, stderr)=>{
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
	return;
});

gulp.task('run-ui',(cb)=>{
	child.exec("cd src/ui && npm start", (err, stdout, stderr)=>{
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});