kuzmich = require '../dist/kuzmich-node.js'

describe 'Склонение простых фамилий', ->

	it 'женские', ->
		fngrp = kuzmich.female.last
		expect(fngrp.genitive		'Маша').toBe 'Маши'
		expect(fngrp.dative			'Маша').toBe 'Маше'
		expect(fngrp.accusative		'Маша').toBe 'Машу'
		expect(fngrp.instrumental	'Маша').toBe 'Машей'
		expect(fngrp.prepositional	'Маша').toBe 'Маше'




describe 'Склонение сложных фамилий', ->

	it 'мужские - в дательном падеже', ->
		fn = kuzmich.male.last.dative
		expect(fn 'Бильжо').toBe 'Бильжо'
		expect(fn 'Ничипорук').toBe 'Ничипоруку'
		expect(fn 'Щусь').toBe 'Щусю'
		expect(fn 'Фидря').toBe 'Фидре'
		expect(fn 'Белоконь').toBe 'Белоконю'
		expect(fn 'Добробаба').toBe 'Добробабе'
		expect(fn 'Исайченко').toBe 'Исайченко'
		expect(fn 'Бондаришин').toBe 'Бондаришину'
		expect(fn 'Дубинка').toBe 'Дубинке'
		expect(fn 'Сирота').toBe 'Сироте'
		expect(fn 'Воевода').toBe 'Воеводе'
		expect(fn 'Волож').toBe 'Воложу'
		expect(fn 'Кравец').toBe 'Кравцу'
		expect(fn 'Самотечний').toBe 'Самотечнему'
		expect(fn 'Цой').toBe 'Цою'
		expect(fn 'Шопен').toBe 'Шопену'
		expect(fn 'Сосковец').toBe 'Сосковцу'

	it 'женские - в дательном падеже', ->
		fn = kuzmich.female.last.dative
		expect(fn 'Бильжо').toBe 'Бильжо'
		expect(fn 'Ничипорук').toBe 'Ничипорук'
		expect(fn 'Щусь').toBe 'Щусь'
		expect(fn 'Фидря').toBe 'Фидре'
		expect(fn 'Белоконь').toBe 'Белоконь'
		expect(fn 'Добробаба').toBe 'Добробабе'
		expect(fn 'Исайченко').toBe 'Исайченко'
		expect(fn 'Бондаришин').toBe 'Бондаришин'
		expect(fn 'Дубинка').toBe 'Дубинке'
		expect(fn 'Сирота').toBe 'Сироте'
		expect(fn 'Воевода').toBe 'Воеводе'
		expect(fn 'Гулыга').toBe 'Гулыге'
		expect(fn 'Дейнека').toBe 'Дейнеке'
		expect(fn 'Джанджагава').toBe 'Джанджагава'
		expect(fn 'Забейворота').toBe 'Забейворота'
		expect(fn 'Окуджава').toBe 'Окуджаве'