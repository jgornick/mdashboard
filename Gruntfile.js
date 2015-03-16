module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var
        vendors = [
            'backbone',
            'backbone.marionette',
            'backbone.radio',
            'jquery',
            'lodash',
            'swig',
            'request'
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

            dist: {
                options: {
                    debug: true,
                    external: vendors
                },
                files: {
                    'dist/data-source.js': [
                        'browserify-shims/*.js',
                        'dist/data-source.es6'
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
                    'src/**/*.js',
                    'dist/data-source.es6'
                ],
                tasks: [
                    'browserify:dist'
                ]
            }
        }
    });

    grunt.registerTask('default', ['browserify:vendor', 'browserify:dev', 'browserify:dist']);
    grunt.registerTask('dev', ['watch:devjs']);
};
