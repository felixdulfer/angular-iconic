'use strict';

module.exports = function(grunt) {
  
  // Load tasks when needed
  require('jit-grunt')(grunt, {});

  // Report timing for tasks
  require('time-grunt')(grunt);
  
  // Configure tasks
  grunt.initConfig({});
  
  // Register the default task
  grunt.registerTask('default', []);
};

