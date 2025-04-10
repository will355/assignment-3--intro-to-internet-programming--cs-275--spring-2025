const { src, dest, watch, series, parallel } = require('gulp');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();


// Paths
const paths = {
    js: 'scripts/main.js',
    css: 'styles/main.css',
    html: 'index.html',
    dist: 'prod'
};

// Lint JS
const lintJS = () => {
    return src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format());
};

// Lint CSS
const lintCSS = () => {
    return src(paths.css)
        .pipe(stylelint({
            reporters: [{ formatter: 'string', console: true }]
        }));
};

// Transpile JS
const js = () => {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('scripts'))
        .pipe(browserSync.stream());
};

const serve = () => {
    browserSync.init({
        server: { baseDir: './' }
    });

    watch(paths.js, series(lintJS, js)).on('change', browserSync.reload);
    watch(paths.css, lintCSS).on('change', browserSync.reload);
    watch(paths.html).on('change', browserSync.reload);
};

const clean = async () => {
    const del = (await import('del')).deleteSync || (await import('del')).default;
    return del([paths.dist]);
};


// Build CSS
const buildCSS = () => {
    return src(paths.css)
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(`${paths.dist}/styles`));
};

// Build JS
const buildJS = () => {
    return src(paths.js)
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(`${paths.dist}/scripts`));
};

// Copy HTML
const copyHTML = () => {
    return src(paths.html)
        .pipe(dest(paths.dist));
};

exports.default = series(lintCSS, lintJS, js, serve);
exports.build = series(clean, lintCSS, lintJS, parallel(buildCSS, buildJS, copyHTML));
