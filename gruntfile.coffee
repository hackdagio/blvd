module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    aws: grunt.file.readJSON 'aws-keys.json'
    blvd: grunt.file.readJSON '../config.json'


    # jade task
    jade:
      app_views:
        options:
          data:
            debug: false
            data: grunt.file.readJSON('../config.json')
        files: [{
          expand: true
          cwd: '../views/'
          src: [
            '**/*.jade'
          ]
          dest: '../public/views/'
          ext: '.html'
        }]

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
      app_angular: [
        '../public/js/*.js', 
        '!../public/js/*.min.js', 
        '!../public/js/*.min.js.gz'
      ]
    # / clean task

    # stylus task
    stylus:
      app_style:
        options:
          urlfunc:
            name: 'baseUrl'
            limit: false
            paths: ['../stylesheets/images']
          limit: false
        files:
          '../public/stylesheets/style.min.css': '../stylesheets/style.styl'
      avenue_gateway_style:
        options:
          limit: false
        files:
          '../public/stylesheets/avenue.min.css': '../stylesheets/avenue.styl'
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

      app_fonts:
        options:
          mode: 'gzip'
        files: [{
          expand: true
          cwd: '../assets/fonts/'
          src: [
            '**/*.woff'
          ]
          dest: '../public/fonts/'
          ext: '.woff.gz'
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
          cwd: '../assets/img/'
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
        }, {
          action: 'upload'
          expand: true
          cwd: '../public/fonts/'
          src: ['**']
          dest: '<%= blvd.product.id %>/assets/webfonts/'
          params:
            ContentEncoding: 'gzip'
            CacheControl: 'public, max-age=30686016'
        }]
    # / s3 task

    # watch task
    watch:

      app_views:
        files: [
          '../views/*.jade'
          '../views/**/*.jade'
        ]
        tasks: ['jade:app_views']

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
        tasks: ['uglify:app_vendor', 'compress:app_vendor']

      app_style:
        files: [
          '../stylesheets/**'
          '!../stylesheets/avenue.styl'
        ]
        tasks: ['stylus:app_style']

      avenue_gateway_style:
        files: [
          '../stylesheets/avenue.styl'
        ]
        tasks: ['stylus:avenue_gateway_style']

      app_language:
        files: [
          '../lang/*.json'
        ]
        tasks: ['jsonmin:app_language']

    # / watch task

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-aws-s3'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-jsonmin'
  grunt.loadNpmTasks 'grunt-contrib-jade'


  # production startup
  grunt.registerTask 'production', [
    'coffee:startup'

    'jade:app_views'

    'coffee:app_angular'
    'uglify:app_angular'
    'clean:app_angular'
    'compress:app_angular'

    'uglify:app_vendor'
    'compress:app_vendor'

    'stylus:app_style'
    'stylus:avenue_gateway_style'

    'jsonmin:app_language'
  ]

  grunt.registerTask 'upload', [
    'compress'
    'aws_s3'
  ]
  
  return
