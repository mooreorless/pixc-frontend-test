const gulp = require('gulp');
const babel = require('gulp-babel');
const path = require('path');
const del = require('del');

const cfg = {
  src: {
    js: ['./src/**/*.js', '!node_modules/**/*.js'],
    html: './src/**/*.html',
    css: './src/**/*.css',
    assets: ['./src/**/*.png', './src/**/*.jpg'],
    node_modules: ['./node_modules/**/*']
  },
  dest: './'
};

const srcs = Object.keys(cfg.src).map(k => cfg.src[k]);

gulp.task('clean', () => del([
  'public/**/*',
  'assets/**/*',
  '*.html',
]));

gulp.task('babel', ['clean'], () => {
  gulp.src(cfg.src.js)
  .pipe(babel())
  .pipe(gulp.dest(path.join(cfg.dest, 'public')));
});

gulp.task('copy', ['clean'], () => {
  gulp.src(cfg.src.html)
  .pipe(gulp.dest(path.join(cfg.dest, 'public')));
});

gulp.task('node_modules', ['clean'], () => {
  gulp.src(cfg.src.node_modules)
  .pipe(gulp.dest(path.join(cfg.dest, 'public/node_modules')));
});

gulp.task('assets', ['clean'], () => {
  gulp.src(cfg.src.assets)
  .pipe(gulp.dest(path.join(cfg.dest, 'public')));
});

gulp.task('css', ['clean'], () => {
  gulp.src(cfg.src.css)
  .pipe(gulp.dest(path.join(cfg.dest, 'public')));
});

gulp.task('build', ['babel', 'copy', 'node_modules', 'assets',
'css']);

gulp.task('default', ['build']);

