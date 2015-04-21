module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      coffee: {
        files: ['../scripts/*.coffee','../scripts/**/*.coffee'],
        tasks: ['coffee:compile', 'uglify:minify']
      }
    },
    coffee: {
      compile: {
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
      minify: {
        files: [{
          expand: true,
          cwd: '../public/js/',
          src: ['**/*.js','!**/*.min.js'],
          dest: '../public/js/',
          ext: '.min.js'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('make-coffee', ['coffee']);
  grunt.registerTask('make-uglify', ['uglify']);
  grunt.registerTask('watch-coffee', ['watch']);

};