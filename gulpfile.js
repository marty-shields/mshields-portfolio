//modules to inport
var gulp = require('gulp');


gulp.task('default', ['watch']);
gulp.task('watch', function(){
  gulp.watch('src/*.html', ['htmlHome']);
  gulp.watch('src/uni/*.html', ['htmlUni']);
  gulp.watch('src/projects/*.html', ['htmlProjects']);
  gulp.watch('src/css/*.css', ['cssSrc']);
  gulp.watch('src/scss/*.scss', ['sassSrc']);
  gulp.watch('src/js/*.js', ['jsSrc']);
  gulp.watch('src/img/*', ['imgSrc']);
});

//bootstrap tasks
gulp.task('LoadComponents', function() {
  //js
  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('public/javascripts'));
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('public/javascripts'));
  gulp.src('node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest('public/javascripts'));
  //css
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('public/stylesheets'));
});

//minify all files over to dist
gulp.task('htmlHome', function(){
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlUni', function(){
  gulp.src('src/uni/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist/uni'));
});

gulp.task('htmlProjects', function(){
  gulp.src('src/projects/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist/projects'));
});

gulp.task('cssSrc', function(){
    gulp.src('src/css/*.css')
      .pipe(gulp.dest('dist/css'));
});
gulp.task('jsSrc', function(){
  gulp.src('src/js/*.js')
    .pipe(minify({
      ext:{
        min:'.js'
      },
      preserveComments: 'some',
      noSource: 'true'
    }))
    .pipe(gulp.dest('dist/js'));
});
gulp.task('sassSrc', function () {
  gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('imgSrc', function () {
  gulp.src('src/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
});
