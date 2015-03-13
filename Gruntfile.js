module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var
        vendors = [
            'backbone',
            'backbone.marionette',
            'backbone.radio',
            'jquery',
            'lodash',
            'swig'
        ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                transform: [
                    'babelify',
                    [
                        'stringify',
                        {
                            extensions: ['.html'],
                            minify: true
                        }
                    ],
                    'aliasify'
                ]
            },

            vendor: {
                files: {
                    'dist/vendor.js': []
                },
                options: {
                    require: vendors
                }
            },

            dev: {
                options: {
                    debug: true,
                    external: vendors
                },
                files: {
                    'dist/mdashboard.js': [
                        'browserify-shims/*.js',
                        'src/**/*.js'
                    ]
                }
            },

            prod: {
            }
        },

        watch: {
            devjs: {
                files: [
                    'browserify-shims/*.js',
                    'src/**/*.js'
                ],
                tasks: ['browserify:dev']
            }
        }
    });

    grunt.registerTask('default', ['browserify:dev']);
    grunt.registerTask('dev', ['watch:devjs']);
};
