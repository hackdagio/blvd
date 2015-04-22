module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      coffee: {
        files: ['../scripts/*.coffee','../scripts/**/*.coffee'],
        tasks: ['coffee:compile_core', 'uglify:minify_core']
      }
    },
    coffee: {
      compile_core: {
        expand: true,
        flatten: false,
        cwd: '../scripts/',
        src: ['**/*.coffee'],
        dest: '../public/js/',
        ext: '.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        preserveComments: 'all'
      },
      minify_core: {
        files: [{
          expand: true,
          cwd: '../public/js/',
          src: ['**/*.js','!**/*.min.js'],
          dest: '../public/js/',
          ext: '.min.js'
        }]
      },
      minify_vendor: {
        files: [{
          expand: true,
          cwd: '../public/vendor/',
          src: ['**/*.js','!**/*.min.js'],
          dest: '../public/vendor/',
          ext: '.min.js'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('make-coffee', ['coffee:compile_core']);
  grunt.registerTask('make-uglify', ['uglify:minify_core', 'uglify:minify_vendor']);

  // only intended for dev envs
  grunt.registerTask('watch-coffee', ['watch']);

};