const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

// Logs message
gulp.task('message', async() => {
    return console.log('Gulp is running...');
});

// Compile Sass to CSS into the src folder
gulp.task('sass', async() => {
    gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/styles/css'));
});

// Copy all HTML files to dist folder
gulp.task('copyHTML', async() => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/snippets/*.html')
        .pipe(gulp.dest('dist/snippets'));
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

// Minify CSS to dist folder
gulp.task('minifyCSS', async() => {
    gulp.src('src/styles/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('default', gulp.parallel(['message','sass','copyHTML','copyHTMLSnip','minifyJS','minifyCSS']));

gulp.task('watch', async() => {
    gulp.watch('src/styles/*.scss', gulp.parallel(['sass']));
    gulp.watch('src/*.html', gulp.parallel(['copyHTML']));
    gulp.watch('src/snippets/*.html', gulp.parallel(['copyHTMLSnip']));
    gulp.watch('src/js/*.js', gulp.parallel(['minifyJS']));
    gulp.watch('src/styles/css/*.css', gulp.parallel(['minifyCSS']));
});