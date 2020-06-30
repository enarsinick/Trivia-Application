const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

// Logs message
gulp.task('message', async() => {
    return console.log('Gulp is running...');
});

// Copy all HTML files to dist folder
gulp.task('copyHTML', async() => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/snippets/*.html')
        .pipe(gulp.dest('dist/snippets'));
});

// Copy CSS file to dist folder
gulp.task('moveCSS', async() => {
    gulp.src('src/styles/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

// Move asset folder to dist folder
gulp.task('moveAssets', async() => {
    gulp.src('src/assets/*')
        .pipe(gulp.dest('dist/assets'));
});

// Copy all HTML page snippets to dist folder
gulp.task('copyHTMLSnip', async() => {
    gulp.src('src/snippets/*.html')
        .pipe(gulp.dest('dist/snippets'));
});


// Minify JS to dist folder
gulp.task('minifyJS', async() => {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});


gulp.task('default', gulp.parallel(['message','copyHTML','copyHTMLSnip','minifyJS','moveCSS', 'moveAssets']));

gulp.task('watch', async() => {
    gulp.watch('src/*.html', gulp.parallel(['copyHTML']));
    gulp.watch('src/snippets/*.html', gulp.parallel(['copyHTMLSnip']));
    gulp.watch('src/js/*.js', gulp.parallel(['minifyJS']));
    gulp.watch('src/styles/css/*.css', gulp.parallel(['moveCSS']));
    gulp.watch('src/assets', gulp.parallel(['moveAssets']));
});