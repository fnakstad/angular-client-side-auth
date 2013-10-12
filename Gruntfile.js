module.exports = function(grunt) {

    // Load tasks
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['server/tests/**/*.js']
            }
        }

    });

    grunt.registerTask('serverTests', 'mochaTest');
    grunt.registerTask('test', 'serverTests');

};