var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var runSequence = require('run-sequence');

var config = {
    dist: 'dist/',
    src: 'src/',
    cssIn: 'src/css/**/*.css',
    cssOut: 'dist/css/',
    jsIn: 'src/js/**/*.js',
    jsOut: 'dist/js/',
    imgIn: 'src/imgs/**/*.{jpg,jpeg,png,gif}',
    imgOut: 'dist/imgs/',
    htmlIn: 'src/*.html',
    htmlOut: 'dist/',
    scssIn: 'src/scss/**/*.scss',
    scssOut: 'src/css',
    cssOutName: 'style.css',
    jsOutName: 'script.js',
    cssReplaceOut: 'css/style.css',
    jsReplaceOut: 'js/script.js'
};

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('serve', ['sass'], function () {
    browserSync({
        server: config.src
    });
    gulp.watch([config.htmlIn, config.jsIn], ['reload']);
    gulp.watch(config.scssIn, ['sass']);
});

gulp.task('sass', function () {
    return gulp.src(config.scssIn)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scssOut))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src(config.cssIn)
        //.pipe(concat(config.cssOutName))
        .pipe(cleanCss())
        .pipe(gulp.dest(config.cssOut));
});

gulp.task('js', function () {
    return gulp.src(config.jsIn)
        //.pipe(concat(config.jsOutName))
        .pipe(uglify())
        .pipe(gulp.dest(config.jsOut));
});

gulp.task('img', function () {
    return gulp.src(config.imgIn)
        .pipe(changed(config.imgOut))
        .pipe(imagemin())
        .pipe(gulp.dest(config.imgOut));
});

gulp.task('html', function () {
    return gulp.src(config.htmlIn)
        /*.pipe(htmlReplace({
            'css': config.cssReplaceOut,
            'js': config.jsReplaceOut,
        }))*/
        .pipe(htmlMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('clean', function () {
    return del(['dist/js', 'dist/css', 'dist/index.html', 'dist/imgs']);
});

gulp.task('clean', function () {
    return del([config.dist + 'js', config.dist + 'css', config.dist + 'index.html', config.dist + 'imgs']);
});


gulp.task('build', function () {
    runSequence('clean', ['html', 'js', 'css', 'img']);
});

gulp.task('default', ['serve']);