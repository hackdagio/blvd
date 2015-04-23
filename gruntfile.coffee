module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    watch:
      app_core:
        files: [
          '../scripts/*.coffee'
          '../scripts/**/*.coffee'
        ]
        tasks: [
          'coffee:app_core'
          'uglify:app_core'
        ]
      app_vendor:
        files: [
          '../public/vendor/*.js'
          '!../public/vendor/*.min.js'
        ]
        tasks: [
          'uglify:app_vendor'
        ]
      www:
        files: [
          'src/*.coffee'
          'src/**/*.coffee'
        ]
        tasks: [
          'coffee:www'
        ]

    coffee:
      www:
        expand: true
        flatten: false
        cwd: 'src/'
        src: [ '**/*.coffee' ]
        dest: 'app/'
        ext: '.js'
      app_core:
        expand: true
        flatten: false
        cwd: '../scripts/'
        src: [ '**/*.coffee' ]
        dest: '../public/js/'
        ext: '.js'

    uglify:
      options:
        mangle: false
        preserveComments: 'some'
      app_core:
        files: [{
          expand: true
          cwd: '../public/js/'
          src: [
            '**/*.js'
            '!**/*.min.js'
          ]
          dest: '../public/js/'
          ext: '.min.js'
        }]
      app_vendor:
        files: [{
          expand: true
          cwd: '../public/vendor/'
          src: [
            '**/*.js'
            '!**/*.min.js'
          ]
          dest: '../public/vendor/'
          ext: '.min.js'
        }]


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'startup-production', [
    'coffee:www'
    'coffee:app_core'
    'uglify:app_core'
    'uglify:app_vendor'
  ]

  # only intended for dev envs
  grunt.registerTask 'watch-changes', [ 'watch' ]
  return