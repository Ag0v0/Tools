const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
// const sass = require('sass');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const webserver = require('gulp-webserver');

const cssHandler = function () {
    return gulp
        .src('./src/css/*.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'));
};

const jsHandler = function () {
    return gulp
        .src('./src/js/*.js')
        .pipe(babel({
            // babel@7: presets: ['es2015']
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
};

const htmlHandler = function () {
    return gulp
        .src('./src/pages/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            minifyCSS: true,
            minifyJS: true,
            removeStyleLinkTypeAttributes: true,
            removeScriptTypeAttributes: true,
        }))
        .pipe(gulp.dest('./dist/pages/'));
};

const imgHandler = function () {
    return gulp
        .src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images/'));
};

const videoHandler = function () {
    return gulp
        .src('./src/videos/**/*')
        .pipe(gulp.dest('./dist/videos/'));
};
 
const audioHandler = function () {
    return gulp
        .src('./src/audios/**/*')
        .pipe(gulp.dest('./dist/audios/'));
};

const libHandler = function () {
    return gulp
        .src('./src/lib/**/*')
        .pipe(gulp.dest('./dist/lib/'));
};

const fontHandler = function () {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'));
};

const delHandler = function () {
    return del(['./dist']);
};

const webHandler = function() {
    return gulp
        .src('./dist')
        .pipe(webserver({
            host: '',
            port: '',
            livereload: true,
            open: '',
            proxies: [
                {
                   source: '',
                   targrt: ''
                }
            ]
        }));
};

const watchHandler = function() {
    gulp.watch('./src/sass/*.scss', 'sassHandler');
    gulp.watch('./src/css/*.css', 'cssHandler');
    gulp.watch('./src/js/*.js', 'jsHandler');
    gulp.watch('./src/pages/*.html', 'htmlHandler');
};

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,
        // sassHandler,
        jsHandler,
        htmlHandler,
        imgHandler,
        videoHandler,
        audioHandler,
        libHandler,
        fontHandler
    ),
    webHandler,
    watchHandler
);