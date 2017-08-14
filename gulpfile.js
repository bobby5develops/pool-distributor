//require the necessary packages for this project
var gulp = require('gulp'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    templates = require('handlebars');
var reload = browserSync.reload;
var config = {
    sassPath: './app/scss/pool_dealer.scss',
    sassDest: './distribution/css/'
};


// copy any html files in app/ to distribution/
gulp.task('copyHtml', function() {
    gulp.src('app/*.html').pipe(gulp.dest('distribution'));
});



//create sass task manager
gulp.task('styles', function () {
    //define the source
    gulp.src('./app/scss/*.scss')
        .pipe(sass({
            style: 'compressed',
            loadPath: './app/css'
        }))
        .pipe(gulp.dest(config.sassDest))
        .pipe(browserSync.reload({stream:true}));
});


//images
gulp.task('img', function () {
   gulp.src('app/img/*.png')
       .pipe(gulp.dest('distribution/img/'));
});

gulp.task('build-data', function () {
    return gulp.src('app/js/model/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('dealers.json'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('distribution/js/model/'));
});


//javascript
gulp.task('build-js', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('pool_dealer.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(util.env.type === 'production' ? uglify() : util.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('distribution/js/'));
});


//watch files for changes, and reload
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: './app'
        }
    });
    //define watch task
    gulp.watch(['./app/*.html', config.sassPath, './app/js/*.js', './app/js/model/*.json'],{cwd: 'app'}, reload);
});

//define default task
gulp.task('default', ['copyHtml', 'styles', 'img', 'build-js', 'build-data', 'serve']);
