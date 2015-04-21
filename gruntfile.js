module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: '../scripts/',
        src: ['*.coffee'],
        dest: '../public/js/',
        ext: '.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default', ['coffee']);

};