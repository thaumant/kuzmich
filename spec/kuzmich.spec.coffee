kuzmich = require '../dist/kuzmich-node.min.js'

describe 'kuzmich', ->

	it 'detects male gender by middlename', ->
		expect(kuzmich.detect_gender 'Петрович').toBe('male')

	it 'detects female gender by middlename', ->
		expect(kuzmich.detect_gender 'Петровна').toBe('female')

	it 'defines any unknown middlename type as androgynous', ->
		expect(kuzmich.detect_gender 'Блабла').toBe('androgynous')