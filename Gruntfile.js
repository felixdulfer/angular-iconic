'use strict';

module.exports = function(grunt) {

  // Load tasks when needed
  require('jit-grunt')(grunt, {
    buildcontrol: 'grunt-build-control'
  });

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
    clean: ['dist', 'angular-iconic.min.js'],
    copy: {
      pages: {
        files: [
          {
            expand: true,
            src: ['angular-iconic.js', 'CNAME'],
            dest: 'dist/'
          },
          {
            expand: true,
            src: ['bower_components/**'],
            dest: 'dist/'
          },
          {
            expand: true,
            cwd: 'example/',
            src: ['**'],
            dest: 'dist/'
          }
        ]
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: 'angular-iconic.map'
        },
        files: {
          'angular-iconic.min.js': ['angular-iconic.js']
        }
      }
    },
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:felixdulfer/angular-iconic.git',
          branch: 'gh-pages'
        }
      },
      // local: {
      //   options: {
      //     remote: '../',
      //     branch: 'build'
      //   }
      // }
    },
    bump: {
      options: {
        files: ['{bower,package}.json'],
        commitFiles: ['-a'],
        pushTo: 'origin'
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'uglify',
    'copy:pages',
    'buildcontrol:pages'
  ]);

  grunt.registerTask('serve', [
    'connect:livereload',
    'watch'
  ]);

  // Register the default task
  grunt.registerTask('default', ['server']);
};

