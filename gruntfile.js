module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      target: {
        expand: true,
        flatten: false,
        cwd: '../scripts/',
        src: ['**/*.coffee'],
        dest: '../public/js/',
        ext: '.js'
      }
    },
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: '../public/js/',
          src: ['**/*.js'],
          dest: '../public/js/',
          ext: '.min.js'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('make-coffee', ['coffee']);
  grunt.registerTask('make-uglify', ['uglify']);

};