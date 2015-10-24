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
        files: ['bower.json', 'package.json'],
        pushTo: 'origin'
      }
    }
  });
  
  // Register the default task
  grunt.registerTask('default', []);
};

