
	scriptovich =

		lastname: (name, gender, gcase) ->
			inflect(gender, name, gcase, 'lastname')

		firstname: (name, gender, gcase) ->
			inflect(gender, name, gcase, 'firstname')

		middlename: (name, gender, gcase) ->
			inflect(gender, name, gcase, 'middlename')

		patronymic: @middlename

		detect_gender: (middlename) ->
			middlename = middlename.toLowerCase()
			switch middlename[middlename.length-2...middlename.length]
				when 'ич' then 'male'
				when 'на' then 'femail'
				else 'androgynous'




	cases = ['nominative', 'genitive', 'dative', 'accusative', 'instrumental', 'prepositional']
	# rules --> nametype_rulesets --> ruleset (exceptions and suffixes) --> rule --> modificator (mod)

	inflect = (gender, name, gcase, nametype) ->
		nametype_rulesets = rules[nametype]
		i = 0
		parts = name.split('-')
		parts = parts.map (part) ->
			first_word = ++i == 1 and parts.size > 1
			rule = find_rule_global gender, name, nametype_rulesets, first_word: first_word
			if rule then apply_rule name, gcase, rule else name
		parts.join '-'


	find_rule_global = (gender, name, nametype_rulesets, features = {}) ->
		tags = (key for key, val of features when val is true)
		if nametype_rulesets.exceptions?
			rule = find_rule_local gender, name, nametype_rulesets.exceptions, true, tags
			return rule if rule
		find_rule_local gender, name, nametype_rulesets.suffixes, false, tags


	find_rule_local = (gender, name, ruleset, match_whole_word, tags) ->
		for rule in ruleset
			if rule.tags and (tag for tag in rule.tags when tag not in tags).length > 0 then continue
			if rule.gender isnt 'androgynous' and gender isnt rule.gender then continue
			name = name.toLowerCase()
			for sample in rule.test
				test = if match_whole_word then name else name[name.length - sample.length ..]
				return rule if test == sample


	apply_rule = (name, gcase, rule) ->
		if		gcase == 'nominative'	then mod = '.'
		else if gcase in cases			then mod = rule.mods[cases.indexOf(gcase) - 1]
		else	throw new Error("Unknown grammatic case: #{gcase}");
		for char in mod
			switch char
				when '.' then
				when '-' then name = name[0 ... name.length-1]
				else name += char
		name