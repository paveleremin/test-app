'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt){

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        appConfig: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= appConfig.app %>/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            less: {
                files: ['<%= appConfig.app %>/**/*.less'],
                tasks: ['less:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= appConfig.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= appConfig.app %>/img/{,*/}*.{png,jpg,jpeg,gif}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect){
                        var modRewrite = require('connect-modrewrite');

                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= appConfig.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= appConfig.app %>/**/*.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= appConfig.dist %>/{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        replace: {
            removeMarkedStrings: {
                options: {
                    patterns: [{
                        match: /.*?\/\/\n/g,
                        replacement: ''
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // Compiles LESS to CSS and generates necessary files if requested
        less: {
            options: {
                paths: [
                    './bower_components',
                ]
            },
            dist: {
                options: {
                    cleancss: false,
                    report: 'gzip'
                },
                files: [{
                    src: "<%= appConfig.app %>/_configuration/main.less",
                    dest: ".tmp/_configuration/main.less"
                }]
            },
            server: {
                options: {
                    sourceMap: true,
                    sourceMapBasepath: '<%= appConfig.app %>/',
                    sourceMapRootpath: '../'
                },
                files: [{
                    expand: true,
                    cwd: '<%= appConfig.app %>/less',
                    src: 'main.less',
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= appConfig.dist %>/scripts/*.js',
                    '<%= appConfig.dist %>/styles/*.css'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            dist: {
                src: '<%= appConfig.app %>/index.html',
                options: {
                    dest: '<%= appConfig.dist %>',
                    flow: {
                        html: {
                            steps: {
                                js: ['concat', 'uglifyjs'],
                                css: ['cssmin']
                            },
                            post: {}
                        }
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: [
                '<%= appConfig.dist %>/**/*.html'
            ],
            css: [
                '<%= appConfig.dist %>/styles/*.css'
            ],
            js: [
                '<%= appConfig.dist %>/scripts/*.js'
            ],
            options: {
                assetsDirs: [
                    '<%= appConfig.dist %>/img'
                ],
                patterns: {
                    js: [
                        [/(img\/.*?\.(?:gif|jpeg|jpg|png))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= appConfig.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= appConfig.dist %>/img'
                }]
            }
        },

        htmlmin: {
            options: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                collapseBooleanAttributes: true,
                removeCommentsFromCDATA: true,
                removeOptionalTags: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= appConfig.dist %>',
                    src: ['**/*.html'],
                    dest: '<%= appConfig.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: ['script.js'],
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appConfig.app %>',
                    dest: '<%= appConfig.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '**/*.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/img',
                    dest: '<%= appConfig.dist %>/img',
                    src: ['generated/*']
                }]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'less:server'
            ],
            dist: [
                'less:dist',
                'imagemin'
            ]
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target){
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'replace:removeMarkedStrings',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};
