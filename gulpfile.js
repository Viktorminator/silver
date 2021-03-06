/*global -$ */
'use strict';
// generated on 2015-03-22 using generator-tapp 0.1.4
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('templates', function () {
  gulp.src('app/*.jade')
    .pipe($.jade())
    .on('error', $.util.log)
    .pipe(gulp.dest('dist'));
});

gulp.task('templatesMin', ['styles', 'scripts'], function () {
  var assets = $.useref.assets({searchPath: ['.', '.tmp']});

  gulp.src('app/**/*.jade')
    .pipe($.jade({pretty: true}))
    .on('error', $.util.log)
    .pipe(assets)
//    .pipe($.if('*.js', $.uglify()))
//    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  gulp.src('app/styles/**/*.styl')
    .pipe($.stylus({
      compress: false
    }))
    .on('error', $.util.log)
    .pipe($.concat('main.css'))
    .pipe($.postcss([
      require('autoprefixer-core')({ browsers: ['> 2%']})
    ]))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function () {
  gulp.src('app/scripts/**/*.coffee')
    .pipe($.coffee())
    .on('error', $.util.log)
//    .pipe($.uglify())
    .pipe(gulp.dest('.tmp/scripts'))
});

gulp.task('fonts', function () {
  gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
  gulp.src('app/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', function () {
  gulp.src([
    'app/*.*',
    '!app/*.jade'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function () {
  gulp.start(['templatesMin', 'fonts', 'images', 'extras']);
  gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: false}));
});

gulp.task('htmlto', function() {
  gulp.src('dist/*.html').pipe(gulp.dest('../sterling/public/site_templ'));
});

gulp.task('stylusto', function() {
  gulp.src('app/styles/*.styl').pipe(gulp.dest('../sterling/vendor/assets/stylesheets/spree/frontend'));
});

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/*.jade')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('default', ['build'], function () {
});

gulp.task('serve:develop', ['clean'], function () {
  gulp.start(['templates', 'fonts', 'styles', 'scripts']);

  browserSync({
    notify: true,
    port: 9000,
    server: {
      baseDir: ['dist', '.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'dist/**/*.html',
    'dist/styles/**/*.css',
    'dist/scripts/**/*.coffee',
    'dist/scripts/**/*.js',
    'dist/fonts/**/*',
    'app/images/**/*'
  ]).on('change', reload);

  gulp.watch('app/**/*.jade', ['templates', reload]);
  gulp.watch('app/scripts/**/*.coffee', ['scripts', reload]);
  gulp.watch('app/styles/**/*.styl', ['styles', reload]);
  gulp.watch('bower.json', ['wiredep', reload]);
});

gulp.task('serve:production', ['build'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });

  gulp.watch([
    'dist/*.html',
    'dist/styles/**/*.css',
    'dist/scripts/**/*.js',
    'dist/fonts/**/*',
    'dist/images/**/*'
  ]).on('change', reload);
});

gulp.task('serve', ['serve:develop'], 
function () {
});
