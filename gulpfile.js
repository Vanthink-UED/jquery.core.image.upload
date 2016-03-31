// this file is just for online deploying 
// you can see /projects/fe.deploy.sh
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var path = require('path'); 
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var path = {
    'css':['./src/*.css'],
    'js':['./src/*.js']
};


gulp.task('minifycss',function(){
        return gulp.src(path['css'])
        .pipe(plumber())
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('uglifyjs',function(){
        return gulp.src(path['js'])
        .pipe(plumber())
        .pipe(uglify({mangle:false}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));

});
gulp.task('concat', function() {
  return gulp.src('./dist/*.js')
    .pipe(concat('jquery.core.image.upload.full.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default',['uglifyjs','minifycss','concat']);

