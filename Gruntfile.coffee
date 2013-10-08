module.exports = (grunt) ->

	grunt.initConfig(
		pkg: grunt.file.readJSON 'package.json'

		coffee:
			comple:
				files:
					'dist/scriptovich-browser.js': 'dist/scriptovich-browser.coffee'
					'dist/scriptovich-node.js': 'dist/scriptovich-node.coffee'

		uglify:
			options:
				compress: true
			minify:
				files:
					'dist/scriptovich-browser.min.js': 'dist/scriptovich-browser.js'
					'dist/scriptovich-node.min.js': 'dist/scriptovich-node.js'
	)

	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-uglify'

	grunt.registerTask 'translate-rules', 'Translates rules.yml to rules.json', ->
		require 'js-yaml'
		require('fs').writeFileSync('./dist/rules.json', JSON.stringify require './rules.yml')

	grunt.registerTask 'concat:browser', 'Builds browser footer from rules.json', ->
		grunt.task.requires 'translate-rules'
		rules = grunt.file.read('dist/rules.json')
		contents = grunt.file.read('scriptovich.coffee') + '\n\trules = ' + rules + '\n\t'
		grunt.file.write 'dist/scriptovich-browser.coffee', contents

	grunt.registerTask 'concat:node', 'Builds node footer', ->
		contents = grunt.file.read('scriptovich.coffee') + '\n\trules = require("./rules.json")\n\t'
		grunt.file.write 'dist/scriptovich-node.coffee', contents

	grunt.registerTask 'clear', 'Clears concatenated coffee files after built', ->
		grunt.file.delete('dist/scriptovich-browser.coffee')
		grunt.file.delete('dist/scriptovich-node.coffee')


	grunt.registerTask 'concat', ['translate-rules', 'concat:browser', 'concat:node']
	grunt.registerTask 'build', ['concat', 'coffee', 'uglify', 'clear']
	grunt.registerTask 'build:noclear', ['concat', 'coffee', 'uglify']