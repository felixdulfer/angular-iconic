'use strict';

module.exports = function(grunt) {

  // Load tasks when needed
  require('jit-grunt')(grunt, {});

  // Report timing for tasks
  require('time-grunt')(grunt);

  // Configure tasks
  grunt.initConfig({
    bump: {
      options: {
        commitFiles: ['-a'],
        pushTo: 'origin'
      },
      package: {
        files: ['{bower,package}.json', 'angular-iconic.js'],
        regex: false
      },
      source: {
        files: ['angular-iconic.js'],
        regex: '@version:\\s*'
      }
    }
  });

  // Register the default task
  grunt.registerTask('default', []);
};

