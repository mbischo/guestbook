module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-annotate');

    var config = {
        lessSrcDir: 'src/less',
        cssDistDir: 'web-app/css'
    };

    var lessFiles = {
        '<%= pkg.cssDistDir %>/main.css' : ['<%= pkg.lessSrcDir %>/main.less']
    };

    var jsUnminifiedTestFiles = [
        'vendor/lodash/dist/lodash.js',
        'vendor/jquery/jquery.js',
        'vendor/angular/angular.js',
        'vendor/angular-ui/build/angular-ui.js',
        'vendor/angular-ui/build/angular-ui-ieshiv.js',
        'vendor/angular-mocks/angular-mocks.js',
        'vendor/angular-bootstrap/ui-bootstrap.js',
        'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
        'vendor/angular-animate/angular-animate.js',
        'vendor/angular-route/angular-route.js',
        'js/**/*.js',
        '../test/js/unit/**/*.js'
    ];


    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: config,
         // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['{.tmp,src}/js/{,*/}*.js'],
                tasks: ['newer:jshint:all']
            },
            jsTest: {
                files: ['test/js/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            lessCss: {
                files: 'src/less/**/*.less',
                tasks: ['less']
            }
        },

        jshint: {
            all: ['src/js/**/*.js'],
            options:{
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                unused: false,
                browser: true,
                strict: true,
                jquery: true,
                globals:{
                    angular:true,
                    console: true
                },
                reporter: 'jslint',
                reporterOutput: 'build/reports/jshint/jshint.xml'
            }
        },

        clean: {
            compiled: {
                src: ['<%= pkg.cssDistDir %>']
            }
        },

        less: {
            development: {
                options: {
                    paths: ['<%= pkg.lessSrcDir %>'],
                    yuicompress: false
                },
                files: lessFiles
            },
            production: {
                options: {
                    paths: ['<%= pkg.lessSrcDir %>'],
                    yuicompress: true
                },
                files: lessFiles
            }
        },

        lesslint: {
            src: ['<%= pkg.lessSrcDir %>/**/*.less']
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        csslint: {
            options: {
                formatters: [
                    {id: 'lint-xml', dest: 'build/reports/csslint/csslint.xml'}
                ],
                // IDs until re-use needed. Re-factor scaredy cats!
                ids: false,
                // Yes, never import css. Collapse it.
                import: 2,
                // who cares about IE 6 and 7?
                "box-sizing": false,
                // Assuming we know the box model...
                "box-model": false,
                // Pretty rather than accessible, I guess
                "outline-none": false,
                // This OSCSS principal isn't very DRY
                "qualified-headings": false,
                "unique-headings": false,
                // Yeah it's slow. It's also spec
                "universal-selector": false,

                //TODO these are the errors we found we enabling linting
                "duplicate-background-images": false,
                "overqualified-elements": false,
                "important": false,
                "known-properties": false,
                "fallback-colors": false,
                "star-property-hack": false,
                "duplicate-properties": false,
                "display-property-grouping": false,
                "compatible-vendor-prefixes": false,
                "adjoining-classes": false,
                "vendor-prefix": false,
                "text-indent": false,
                "unqualified-attributes": false
            },
            src: ['<%= pkg.cssDistDir %>/**/*.css']
        },
        // Test settings
        karma: {
            options: {
                configFile: 'test/js/config/karma.conf.js',
                port: grunt.option('port') || 9876
            },
            unit: {
                options: {
                    files: [
                        'vendor/lodash/dist/lodash.min.js',
                        'vendor/jquery/jquery.min.js',
                        'vendor/angular/angular.min.js',
                        'vendor/angular-ui/build/angular-ui.min.js',
                        'vendor/angular-ui/build/angular-ui-ieshiv.min.js',
                        'vendor/angular-mocks/angular-mocks.js',
                        'vendor/angular-bootstrap/ui-bootstrap.min.js',
                        'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'vendor/angular-animate/angular-animate.min.js',
                        'vendor/angular-route/angular-route.min.js',
                        'js/**/*.min.js',
                        '../test/js/unit/**/*.js'
                    ]
                },
                singleRun: true,
                browsers: ['Firefox']
            },
            devUnit: {
                options: {
                    files: jsUnminifiedTestFiles
                },
                singleRun: true,
                browsers: ['Firefox']
            },
            devUnitDebugFireFox: {
                options: {
                    files: jsUnminifiedTestFiles
                },
                singleRun: false,
                browsers: ['Firefox']
            },
            devUnitDebugChrome: {
                options: {
                    files: jsUnminifiedTestFiles
                },
                singleRun: false,
                browsers: ['Chrome']
            },
            debug: {
                singleRun: false,
                browsers: ['Chrome']
            },
            phantom: {
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    // Runs Javascript unit tests then JS and CSS static analysis in one convenient task
    grunt.registerTask('dev-check', ['dev-test', 'jshint', 'lesslint']);

    grunt.registerTask('dev-assemble', ['clean:compiled', 'less:development']);

    //dev-run does a clean, compile, and watch
    //This is used by the Grails Event system to integrate reloading
    grunt.registerTask('dev-run', ['dev-assemble', 'watch']);

    // tests non-minified js code
    grunt.registerTask('dev-test-chrome', ['dev-assemble', 'karma:devUnitDebugChrome']);
    grunt.registerTask('dev-test-firefox', ['dev-assemble', 'karma:devUnitDebugFireFox']);
    grunt.registerTask('dev-test', ['dev-assemble', 'karma:devUnit']);
};
