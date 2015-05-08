module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('check-code-style', [
      // 'jshint:all',
      'tslint:all'
  ]);

  grunt.registerTask('debug', [
    'tsd',
    'clean',
    'copy:tsx',
    'copy:typings',
    // 'tslint:all',
    'ts:app',
    'browserify:dist',
    // 'jshint:all',
  ]);

  grunt.registerTask('release', [
    'tsd',
    'clean',
    'copy:tsx',
    'copy:typings',
    'replace:jsx',
    // 'tslint:all',
    'ts:app',
    'browserify:dist',
    // 'jshint:all',
    'closureCompiler:bundle'
  ]);

  grunt.registerTask('test', [
      'check-code-style'
  ]);

  grunt.registerTask('serve', [
      'connect:public:keepalive'
  ]);

  grunt.registerTask('default', ['release']);
};
