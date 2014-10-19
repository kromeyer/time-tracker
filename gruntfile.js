module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['fonts/*'],
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        src: ['bower_components/bootstrap/dist/fonts/*'],
                        dest: 'fonts/',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },
        concat: {
            build: {
                options: {
                    process: function (src, filepath) {
                        // replace '../fonts/' with '../../fonts/' in bootstrap.min.css
                        return src.replace(/..\/fonts\//g, '../../fonts/');
                    }
                },
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/bootswatch.com.superhero.css/index.css'
                ],
                dest: 'css/build/app.min.css'
            }
        },
        jshint: {
            files: [ 'package.json', 'bower.json', 'gruntfile.js', 'js/src/**/*.js', 'js/test/**/*.js' ],
            options: {
                strict: true
            }
        },
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    basePath: '',
                    files: [
                        'bower_components/moment/moment.js',
                        'bower_components/moment/locale/de.js',
                        'bower_components/moment-duration-format/lib/moment-duration-format.js',
                        'bower_components/angular/angular.js',

                        'bower_components/angular-mocks/angular-mocks.js',

                        'js/src/timeTracker/module.js',
                        'js/src/timeTracker/momentInputDirective.js',
                        'js/src/timeTracker/entryRepositoryService.js',
                        'js/src/timeTracker/calculationService.js',
                        'js/src/timeTracker/controller.js',
                        'js/src/timeTracker/entryController.js',
                        'js/src/app.js',

                        'js/test/**/*.js'
                    ],
                    exclude: [],
                    browsers: ['Chrome'],
                    autoWatch: false,
                    singleRun: true
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    sourceMap: true,
                    preserveComments: 'all'
                },
                src: [
                    'bower_components/moment/moment.js',
                    'bower_components/moment/locale/de.js',
                    'bower_components/moment-duration-format/lib/moment-duration-format.js',
                    'bower_components/angular/angular.js',

                    'js/src/timeTracker/module.js',
                    'js/src/timeTracker/momentInputDirective.js',
                    'js/src/timeTracker/entryRepositoryService.js',
                    'js/src/timeTracker/calculationService.js',
                    'js/src/timeTracker/controller.js',
                    'js/src/timeTracker/entryController.js',
                    'js/src/app.js'
                ],
                dest: 'js/build/app.min.js'
            },
            prod: {
                src: [
                    'bower_components/moment/moment.js',
                    'bower_components/moment/locale/de.js',
                    'bower_components/moment-duration-format/lib/moment-duration-format.js',
                    'bower_components/angular/angular.js',

                    'js/src/timeTracker/module.js',
                    'js/src/timeTracker/momentInputDirective.js',
                    'js/src/timeTracker/entryRepositoryService.js',
                    'js/src/timeTracker/calculationService.js',
                    'js/src/timeTracker/controller.js',
                    'js/src/timeTracker/entryController.js',
                    'js/src/app.js'
                ],
                dest: 'js/build/app.min.js'
            }
        },
        watch: {
            js: {
                files: [ 'package.json', 'bower.json', 'gruntfile.js', 'js/src/**/*.js', 'js/test/**/*.js' ],
                tasks: [ 'js:dev' ]
            }
        }
    });

    grunt.registerTask('css', [ 'concat' ]);
    grunt.registerTask('js:dev', [ 'jshint', 'karma', 'uglify:dev' ]);
    grunt.registerTask('js:prod', [ 'jshint', 'karma', 'uglify:prod' ]);
    grunt.registerTask('default', [ 'clean', 'copy', 'css', 'js:prod' ]);
};
