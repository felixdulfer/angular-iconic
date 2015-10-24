'use strict';

module.exports = function(grunt) {

  // Load tasks when needed
  require('jit-grunt')(grunt, {});

  // Report timing for tasks
  require('time-grunt')(grunt);

  // Configure tasks
  grunt.initConfig({
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['*.{html,js}', 'example/*.{html,js}']
      }
    },
    connect: {
      options: {
        hostname: '0.0.0.0',
        port: process.env.PORT || 9000,
        livereload: process.env.LIVE_RELOAD || true
      },
      livereload: {
        options: {
          base: ['.','example'],
          open: true
        }
      }
    },
    bump: {
      options: {
        files: ['{bower,package}.json'],
        commitFiles: ['-a'],
        pushTo: 'origin'
      }
    }
  });

  grunt.registerTask('serve',[
    'connect:livereload',
    'watch'
  ]);

  // Register the default task
  grunt.registerTask('default', ['server']);
};

