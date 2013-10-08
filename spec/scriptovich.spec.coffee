scriptovich = require '../dist/scriptovich-node.min.js'

describe 'scriptovich', ->

	it 'detects male gender by middlename', ->
		expect(scriptovich.detect_gender 'Петрович').toBe('male')

	it 'detects female gender by middlename', ->
		expect(scriptovich.detect_gender 'Петровна').toBe('female')

	it 'defines any unknown middlename type as androgynous', ->
		expect(scriptovich.detect_gender 'Блабла').toBe('androgynous')