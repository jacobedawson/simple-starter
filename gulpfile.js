//=====Load Dependencies=====//
const gulp = require('gulp'); // task runner
const sass = require('gulp-sass'); // sass to css
const postcss = require('gulp-postcss'); // postcss functionality
const babel = require('gulp-babel'); // es6 to 5 conversion, requires babel-preset-es2015
const watch = require('gulp-watch'); // watch for changes??
const rename = require('gulp-rename'); // rename files & folders
const del = require('del'); // del files & folders
const concat = require('gulp-concat'); // merge files
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
const reload = browserSync.reload;
const cssnano = require('cssnano'); // minify css
const autoprefixer = require('autoprefixer'); // autoprefix css

//======Project Variables=====//

//=====Style URLs
const STYLE_SRC = './src/sass/**/**/*.scss';
const STYLE_DEST = './dist/';
const STYLE_WATCH = './src/sass/**/**/*.scss';

//=====JS URLs
const JS_SRC = './src/js/**/*.js';
const JS_DEST = './dist/js/';
const JS_WATCH = './src/js/*.js';

//=====SASS > CSS=====//
gulp.task('sass', () => {
    const processors = [
        autoprefixer,
        cssnano
    ];
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(postcss(processors))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(STYLE_DEST))
        .pipe(browserSync.stream());
});


//=====JS=====//
gulp.task('js', () => {
    gulp.src(JS_SRC)
        .pipe(concat('main.js'))
        .pipe(
            babel({
                presets: ['es2015']
            })
        )
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(JS_DEST))
});

// Browser reload
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false,
        injectChanges: true
    });
});

gulp.task('default', ['sass', 'js', 'browser-sync'], () => {
    gulp.watch(STYLE_WATCH, ['sass']);
    gulp.watch(JS_WATCH, ['js', reload]);
});