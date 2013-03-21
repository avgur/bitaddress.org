module.exports = (grunt) ->
    path = require 'path'
    
    config =
        app:
            source: path.resolve __dirname, '../Source'
            output: path.resolve __dirname, 'out/Release'
    config.static =
        source: config.app.source + '/public'
        output: config.app.output + '/public'
            
    grunt.initConfig
        config: config
        coffeelint:
            options:
                max_line_length:
                    value: 160
                    level : "warn"
                indentation:
                    value: 4
            self: [ 'Gruntfile.coffee' ]
        jshint:
            options:
                laxbreak: true
            app: [
                config.app.source + '/*.js'
                config.static.source + '/js/*.js'
                config.static.source + '/js/core/*.js'
            ]
        clean:
            app:  [ config.app.output ]
            app_complete: [ config.static.output + '/build.txt' ]
        mkdir:
            app:
                options:
                    create: [
                        # config.app.output
                        config.static.output
                    ]
        copy:
            app:
                files: [
                    {
                        expand: true
                        cwd: config.app.source
                        src: ['*.js*']
                        dest: config.app.output
                        filter: 'isFile'
                    }
                ]
        requirejs:
            app:
                options:
                    appDir: config.static.source
                    dir: config.static.output
                    mainConfigFile: config.static.source + '/js/main.js'
                    baseUrl: 'js'
                    removeCombined: true
                    fileExclusionRegExp: /(^\.)|(\.md$)/
                    modules: [
                        name: 'main'
                    ]


    grunt.loadNpmTasks 'grunt-mkdir'
    grunt.loadNpmTasks 'grunt-coffeelint'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-requirejs'
    grunt.loadTasks 'tasks'
 
    grunt.registerTask 'assemble_app', ['jshint:app', 'clean:app', 'mkdir:app', 'copy:app', 'requirejs:app', 'clean:app_complete']
    
    grunt.registerTask 'default', ['coffeelint:self', 'assemble_app']