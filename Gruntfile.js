/* jshint node: true */
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        npmPackage: grunt.file.readJSON('package.json'),
        bowerPackage: grunt.file.readJSON('bower.json'),

        uglify: {
            min: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'dist',
                    ext: '.min.js'
                }],
                options: {

                }
            }
        },

        copy: {
            jsFiles: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'dist'
                }]
            }
        },

        concat: {
            standalone: {
                src: ['node_modules/fastsearch/dist/fastsearch.js', 'dist/fastselect.js'],
                dest: 'dist/fastselect.standalone.js'
            },
            standaloneMin: {
                src: ['node_modules/fastsearch/dist/fastsearch.min.js', 'dist/fastselect.min.js'],
                dest: 'dist/fastselect.standalone.min.js'
            }
        },

        jshint: {
            options: {
                'jshintrc': '.jshintrc'
            },
            all: ['src','Gruntfile.js']
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            scripts: {
                files: {
                    src: [
                        'src/**/*.js'
                    ]
                }
            }
        },

        sass: {
            min: {
                files: {
                    'dist/fastselect.min.css': 'src/fastselect.scss'
                },
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false,
                    precision: 5
                }
            },
            expandend: {
                files: {
                    'dist/fastselect.css': 'src/fastselect.scss'
                },
                options: {
                    outputStyle: 'expandend',
                    sourceMap: false,
                    precision: 5
                }
            }
        },

        watch: {
            jsFiles: {
                expand: true,
                files: ['src/**/*.js'],
                tasks: ['jshint', 'jscs', 'uglify', 'copy', 'concat'],
                options: {
                    spawn: false
                }
            },
            cssFiles: {
                expand: true,
                files: ['src/**/*.scss', 'demo/scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            demoFiles: {
              expand: true,
              files: ['demo/**/*.html'],
              tasks: ['includereplace'],
              options: {
                  spawn: false
              }
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['package.json', 'bower.json'],
                tagName: '%VERSION%',
                push: false
            }
        },

        includereplace: {
            dist: {
                options: {
                    globals: {
                        repositoryUrl: '<%= npmPackage.repository.url %>',
                        npmRepositoryName: '<%= npmPackage.name %>',
                        bowerRepositoryName: '<%= bowerPackage.name %>'
                    },
                    prefix: '{{ ',
                    suffix: ' }}'
                },
                src: 'demo/index.html',
                dest: 'index.html'
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint',  'jscs', 'uglify', 'copy', 'concat', 'sass', 'includereplace']);

};
