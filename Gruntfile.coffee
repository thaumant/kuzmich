module.exports = (grunt) ->

	grunt.initConfig(
		pkg: grunt.file.readJSON('package.json')

		concat:
			node:
				src: ['header-node.coffee', 'scriptovich.coffee']
				dest: 'dist/scriptovich-node.coffee'
	)

	grunt.loadNpmTasks('grunt-contrib-concat')