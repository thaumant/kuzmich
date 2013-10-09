module.exports = (grunt) ->

	grunt.initConfig(
		pkg: grunt.file.readJSON 'package.json'

		coffee:
			comple:
				files:
					'dist/kuzmich-browser.js': 'dist/kuzmich-browser.coffee'
					'dist/kuzmich-node.js': 'dist/kuzmich-node.coffee'

		uglify:
			options:
				compress: true
			minify:
				files:
					'dist/kuzmich-browser.min.js': 'dist/kuzmich-browser.js'
					'dist/kuzmich-node.min.js': 'dist/kuzmich-node.js'
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
		contents = grunt.file.read('kuzmich.coffee') + '\n\trules = ' + rules + '\n\t'
		grunt.file.write 'dist/kuzmich-browser.coffee', contents

	grunt.registerTask 'concat:node', 'Builds node footer', ->
		contents = grunt.file.read('kuzmich.coffee') + '\n\trules = require("./rules.json")\n\t'
		grunt.file.write 'dist/kuzmich-node.coffee', contents

	grunt.registerTask 'clear', 'Clears concatenated coffee files after built', ->
		grunt.file.delete('dist/kuzmich-browser.coffee')
		grunt.file.delete('dist/kuzmich-node.coffee')


	grunt.registerTask 'concat', ['translate-rules', 'concat:browser', 'concat:node']
	grunt.registerTask 'build', ['concat', 'coffee', 'uglify', 'clear']
	grunt.registerTask 'build:noclear', ['concat', 'coffee', 'uglify']