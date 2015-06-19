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
            '!*.min.js'
            '!*.min.js.gz'
          ]
          dest: '../public/js/'
          ext: '.min.js'
        }]

      app_vendor:
        options:
          preserveComments: false
        files: [{
          expand: true
          cwd: '../assets/vendor/'
          src: [
            '**/*.js'
          ]
          dest: '../public/js/vendor/'
          ext: '.min.js'
        }]
    # / uglify task

    # clean task
    clean:
      options:
        force: true
      app_angular: ['../public/js/*.js', '!../public/js/*.min.js', '!../public/js/*.min.js.gz']
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

    jsonmin:
      app_language:
        options:
          stripWhitespace: true
          stripComments: true
        files: [{
          expand: true
          cwd: '../lang/'
          src: [
            '*.json'
          ]
          dest: '../public/language/'
          ext: '.min.json'
        }]

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
            '!*.js'
            '!*.min.js.gz'
          ]
          dest: '../public/js/'
          ext: '.min.js.gz'
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
          ext: '.min.js.gz'
        }]

      app_language:
        options:
          mode: 'gzip'
        files: [{
          expand: true
          cwd: '../public/language/'
          src: [
            '**/*.min.json'
            '!**/*.min.json.gz'
          ]
          dest: '../public/language/'
          ext: '.min.json.gz'
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
            CacheControl: 'public, must-revalidate, proxy-revalidate, max-age=86400'
        }, {
          action: 'upload'
          expand: true
          cwd: '../public/js/vendor/'
          src: ['**.min.js.gz']
          dest: '<%= blvd.product.id %>/assets/js/vendor/'
          differential: true
          params:
            CacheControl: 'public, must-revalidate, proxy-revalidate, max-age=86400'
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
          cwd: '../assets/fonts/'
          src: ['**']
          dest: '<%= blvd.product.id %>/assets/webfonts/'
          params:
            CacheControl: 'public, max-age=30686016'
        }]

      app_language:
        files: [{
          action: 'upload'
          expand: true
          cwd: '../public/language/'
          src: ['**.min.json']
          dest: '<%= blvd.product.id %>/assets/language/'
          params:
            CacheControl: 'public, must-revalidate, proxy-revalidate, max-age=0'
        }, {
          action: 'upload'
          expand: true
          cwd: '../public/language/'
          src: ['**.min.json.gz']
          dest: '<%= blvd.product.id %>/assets/language/'
          params:
            ContentEncoding: 'gzip'
            CacheControl: 'public, must-revalidate, proxy-revalidate, max-age=0'
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
          '../assets/vendor/**/*.js'
        ]
        tasks: ['uglify:app_vendor', 'compress:app_vendor', 'aws_s3:app_vendor']

      app_style:
        files: [
          '../stylesheets/**'
        ]
        tasks: ['stylus:app_style']

      app_language:
        files: [
          '../lang/*.json'
        ]
        tasks: ['jsonmin:app_language', 'compress:app_language', 'aws_s3:app_language']

    # / watch task

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-aws-s3'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-jsonmin'


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

    'jsonmin:app_language'
    'compress:app_language'
  ]

  grunt.registerTask 'upload', [
    'compress'
    'aws_s3'
  ]
  
  return