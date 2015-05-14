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
#      app_core:
#        expand: true
#        flatten: false
#        cwd: '../scripts/'
#        src: [ '**/*.coffee' ]
#        dest: '../public/js/'
#        ext: '.js'
      app_core:
        options:
          bare: false
          join: true
        files:
          '../public/js/app.js': '../scripts/**/*.coffee'

    uglify:
      app_core:
        options:
          mangle: false
          preserveComments: 'some'
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
        options:
          preserveComments: false
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

    stylus:
      app_core:
        options:
          urlfunc:
            name: 'url'
            limit: false
            paths: ['../public']
          limit: false
        files:
          '../public/stylesheets/style.min.css': '../stylesheets/style.styl'

    clean:
      options:
        force: true
      app_core: ['../public/js/*.js', '!../public/js/*.min.js']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-stylus'


  grunt.registerTask 'startup-production', [
    'coffee:www'
    'coffee:app_core'
    'uglify:app_core'
    'uglify:app_vendor'
    'stylus:app_core'
    'clean:app_core'
  ]

  # only intended for dev envs
  grunt.registerTask 'watch-changes', [ 'watch' ]
  return