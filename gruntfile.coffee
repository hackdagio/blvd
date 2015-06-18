module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    aws: grunt.file.readJSON 'aws-keys.json'
    blvd: grunt.file.readJSON '../config.json'

    # coffee task
    coffee:
      startup:
        expand: true
        flatten: false
        cwd: 'src/'
        src: [ '**/*.coffee' ]
        dest: 'app/'
        ext: '.js'

      app_angular:
        options:
          bare: false
          join: true
        files:
          '../public/js/app.js': '../scripts/**/*.coffee'
    # / coffee task

    # uglify task
    uglify:
      app_angular:
        options:
          mangle: false
          preserveComments: 'some'
        files: [{
          expand: true
          cwd: '../public/js/'
          src: [
            '*.js'
            '!*.min.gz.js'
            '!*.min.js'
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
          dest: '../public/js/vendor/'
          ext: '.min.js'
        }]
    # / uglify task

    # clean task
    clean:
      options:
        force: true
      app_angular: ['../public/js/*.js', '!../public/js/*.min.js']
    # / clean task

    # stylus task
    stylus:
      app_style:
        options:
          urlfunc:
            name: 'baseUrl'
            limit: false
            paths: ['../public']
          limit: false
        files:
          '../public/stylesheets/style.min.css': '../stylesheets/style.styl'
    # / stylus task

    # compress task
    compress:

      app_angular:
        options:
          mode: 'gzip'
        files: [{
          expand: true
          cwd: '../public/js/'
          src: [
            '*.min.js'
          ]
          dest: '../public/js/'
          ext: '.min.gz.js'
        }]

      app_vendor:
        options:
          mode: 'gzip'
        files: [{
          expand: true
          cwd: '../public/js/vendor/'
          src: [
            '**/*.min.js'
          ]
          dest: '../public/js/vendor/'
          ext: '.min.gz.js'
        }]

    # s3 task
    aws_s3:
      options:
        accessKeyId: '<%= aws.AWSAccessKeyId %>'
        secretAccessKey: '<%= aws.AWSSecretKey %>'
        uploadConcurrency: 5
        bucket: 'blvd-assets'
        signatureVersion: 'v4'
        progress: 'progressBar'

      app_vendor:
        files: [{
          action: 'upload'
          expand: true
          cwd: '../public/js/vendor/'
          src: ['**.min.js']
          dest: '<%= blvd.product.id %>/assets/js/vendor/'
          differential: true
          params:
            CacheControl: 'public, max-age=86400'
        }, {
          action: 'upload'
          expand: true
          cwd: '../public/js/vendor/'
          src: ['**.min.gz.js']
          dest: '<%= blvd.product.id %>/assets/js/vendor/'
          differential: true
          params:
            CacheControl: 'public, max-age=86400'
            ContentEncoding: 'gzip'
        }]

      app_img:
        files: [{
          action: 'upload'
          expand: true
          cwd: '../public/img/'
          src: ['**']
          dest: '<%= blvd.product.id %>/assets/img/'
          differential: true
          params:
            CacheControl: 'public, max-age=86400'
        }]

      app_fonts:
        files: [{
          action: 'upload'
          expand: true
          cwd: '../public/fonts/'
          src: ['**']
          dest: '<%= blvd.product.id %>/assets/webfonts/'
          params:
            CacheControl: 'public, max-age=30686016'
        }]
    # / s3 task

    # watch task
    watch:

      app_angular:
        files: [
          '../scripts/*.coffee'
          '../scripts/**/*.coffee'
        ]
        tasks: [
          'coffee:app_angular'
          'uglify:app_angular'
          'compress:app_angular'
        ]

      app_vendor:
        files: [
          '../public/vendor/*.js'
          '!../public/vendor/*.min.js'
        ]
        tasks: ['uglify:app_vendor', 'compress:app_vendor']

      app_style:
        files: [
          '../stylesheets/**'
        ]
        tasks: ['stylus:app_style']

    # / watch task

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-aws-s3'
  grunt.loadNpmTasks 'grunt-contrib-compress'


  # production startup
  grunt.registerTask 'production', [
    'coffee:startup'

    'coffee:app_angular'
    'uglify:app_angular'
    'clean:app_angular'
    'compress:app_angular'

    'uglify:app_vendor'
    'compress:app_vendor'

    'stylus:app_style'
  ]

  grunt.registerTask 'upload', [
    'compress'
    'aws_s3'
  ]
  
  return