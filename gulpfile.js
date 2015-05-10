


var require = require || null;
var console = console || null;

var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var filter = require('gulp-filter');
var log = require('gulp-print');
var replace = require('gulp-replace');
var reactTools = require('react-tools');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var tsd = require('gulp-tsd');
var closureCompiler = require('gulp-closure-compiler');
var runSequence = require('run-sequence');

var config = {
  build: 'build',
  public: 'public',
  js_generated: 'build/js',
  ts_typings: './typings/**',
  ts_sources: [
    './src/**/*.ts',
    './typings/**/*.ts'
  ]
};

gulp.task('clean', function(cb) {
  return gulp.src(config.build)
             .pipe(clean());
});

gulp.task('tsd', function (callback) {
    tsd({
        command: 'reinstall',
        config: './typings/tsd.json'
    }, callback);
});

gulp.task('copy', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return gulp.src(config.ts_sources, {base: '.'})
             .pipe(gulp.dest( config.build ));
});

gulp.task('jsx', function() {

  function jsx(all, match)
  {
    var reactCode;

    if( match )
    {
      try {
        reactCode = reactTools.transform(match, { harmony: false });
      }
      catch (ex) {
        console.error('Problem transforming the following:\n' + match + '\n\n' + ex);
      }
    }

    // console.log("jsx =>" + arguments[1]);

    return '(' + reactCode + ')';
  }

  gulp.src(config.build + '/src/**/*.ts')
      .pipe(replace(/ReactJSX.*`([^`\\]*(\\.[^`\\]*)*)`([^`\\\)]*(\\.[^`\\\)]*)*)\)/gm, jsx))
      // .pipe(log())
      .pipe(gulp.dest(config.build + '/src/'));
});

gulp.task('build', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down

  var ts_options = {                          // Use to override the default options, http://gruntjs.com/configuring-tasks#options
      target: 'es5',                          // 'es3' (default) | 'es5'
      sourceMap: false,                       // true (default) | false
      declaration: false,                     // true | false (default)
      removeComments: false,                  // true (default) | false
      noImplicitAny: true,                    // Warn on expressions and declarations with an implied 'any' type.
      module: 'commonjs',
      outDir: config.js_generated,
      fast: 'never'
  };

  // var ts_project = ts.createProject('tsconfig.json');

  return gulp.src( config.build + '/src/**/*.ts')
        // .pipe(log())
        .pipe(ts(ts_options))
        .pipe(log())
        .pipe(gulp.dest( config.build + '/js/'));
});

gulp.task('bundle', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down

  // var ts_project = ts.createProject('tsconfig.json');

  return gulp.src( config.build + '/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(log())
        .pipe(gulp.dest( config.public + '/js/'));
});

gulp.task('minify', function() {

  var options = {
      // [REQUIRED] Path to closure compiler
      compilerPath: './node_modules/closure-compiler/lib/vendor/compiler.jar',
      fileName: 'bundle.min.js',

      // [OPTIONAL] set to true if you want to check if files were modified
      // before starting compilation (can save some time in large sourcebases)
      checkModified: true,

      // [OPTIONAL] Set Closure Compiler Directives here
      compilerFlags: {
        // closure_entry_point: 'App.main',
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        define: [
          // 'goog.DEBUG=false'
        ],
        externs: [
          'externs/browserify.js',
          'externs/react.js'
        ],
        jscomp_off: [
          'checkTypes',
          'fileoverviewTags'
        ],
        extra_annotation_name: 'jsx',
        // summary_detail_level: 3,
        language_in: 'ECMASCRIPT5_STRICT',
        // only_closure_dependencies: true,
        // .call is super important, otherwise Closure Library will not work in strict mode.
        output_wrapper: '(function(){%output%}).call(window);',
        warning_level: 'QUIET'
      },
      // [OPTIONAL] Set exec method options
      execOpts: {
          /**
           * Set maxBuffer if you got message "Error: maxBuffer exceeded."
           * Node default: 200*1024
           */
          maxBuffer: 999999 * 1024
      },
      // [OPTIONAL] Java VM optimization options
      // see https://code.google.com/p/closure-compiler/wiki/FAQ#What_are_the_recommended_Java_VM_command-line_options?
      // Setting one of these to 'true' is strongly recommended,
      // and can reduce compile times by 50-80% depending on compilation size
      // and hardware.
      // On server-class hardware, such as with Github's Travis hook,
      // TieredCompilation should be used; on standard developer hardware,
      // d32 may be better. Set as appropriate for your environment.
      // Default for both is 'false'; do not set both to 'true'.
      d32: false, // will use 'java -client -d32 -jar compiler.jar'
      TieredCompilation: true // will use 'java -server -XX:+TieredCompilation -jar compiler.jar'
  };

  return gulp.src(config.public + '/js/bundle.js')
            .pipe(closureCompiler(options))
            .pipe(log())
            .pipe(gulp.dest(config.public + '/js/'));
});

gulp.task('debug', function(callback) {
  runSequence(
    'clean',
    'copy',
    'jsx',
    'build',
    'bundle',
    callback);
});

gulp.task('release', ['debug'], function(callback) {
  runSequence(
    'minify',
    callback);
});

gulp.task('default', ['release']);
