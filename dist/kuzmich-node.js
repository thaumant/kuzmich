(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function() {
    var apply_rule, cases, find_rule_global, find_rule_local, gcase, gender, genders, inflect, kuzmich, nametype, nametypes, rules, _i, _j, _k, _len, _len1, _len2;
    genders = ['male', 'female', 'androgynous'];
    nametypes = ['first', 'last', 'middle'];
    cases = ['nominative', 'genitive', 'dative', 'accusative', 'instrumental', 'prepositional'];
    kuzmich = function(name, params) {
      var _ref, _ref1, _ref2;
      if (_ref = params.gender, __indexOf.call(genders, _ref) < 0) {
        throw new Error('Valid gender is required as parameter');
      }
      if (_ref1 = params["case"], __indexOf.call(cases, _ref1) < 0) {
        throw new Error('Valid case is required as parameter');
      }
      if (_ref2 = params.nametype, __indexOf.call(nametypes, _ref2) < 0) {
        throw new Error('Valid nametype is required as parameter');
      }
      return inflect(params.gender, name, params["case"], "" + params.nametype + "name");
    };
    for (_i = 0, _len = genders.length; _i < _len; _i++) {
      gender = genders[_i];
      if (!(kuzmich[gender] != null)) {
        kuzmich[gender] = {};
      }
      for (_j = 0, _len1 = nametypes.length; _j < _len1; _j++) {
        nametype = nametypes[_j];
        if (!(kuzmich[gender][nametype] != null)) {
          kuzmich[gender][nametype] = {};
        }
        for (_k = 0, _len2 = cases.length; _k < _len2; _k++) {
          gcase = cases[_k];
          kuzmich[gender][nametype][gcase] = (function(gender, nametype, gcase) {
            return function(name) {
              return inflect(gender, name, gcase, "" + nametype + "name");
            };
          })(gender, nametype, gcase);
        }
      }
    }
    if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
      module.exports = kuzmich;
    } else if (typeof window !== "undefined" && window !== null) {
      window.kuzmich = kuzmich;
    }
    kuzmich.detect_gender = function(middlename) {
      middlename = middlename.toLowerCase();
      switch (middlename.slice(middlename.length - 2, middlename.length)) {
        case 'ич':
          return 'male';
        case 'на':
          return 'female';
        default:
          return 'androgynous';
      }
    };
    inflect = function(gender, name, gcase, nametype) {
      var i, nametype_rulesets, parts;
      nametype_rulesets = rules[nametype];
      i = 0;
      parts = name.split('-');
      parts = parts.map(function(part) {
        var first_word, rule;
        first_word = ++i === 1 && parts.size > 1;
        rule = find_rule_global(gender, name, nametype_rulesets, {
          first_word: first_word
        });
        if (rule) {
          return apply_rule(name, gcase, rule);
        } else {
          return name;
        }
      });
      return parts.join('-');
    };
    find_rule_global = function(gender, name, nametype_rulesets, features) {
      var key, rule, tags, val;
      if (features == null) {
        features = {};
      }
      tags = (function() {
        var _results;
        _results = [];
        for (key in features) {
          val = features[key];
          if (val === true) {
            _results.push(key);
          }
        }
        return _results;
      })();
      if (nametype_rulesets.exceptions != null) {
        rule = find_rule_local(gender, name, nametype_rulesets.exceptions, true, tags);
        if (rule) {
          return rule;
        }
      }
      return find_rule_local(gender, name, nametype_rulesets.suffixes, false, tags);
    };
    find_rule_local = function(gender, name, ruleset, match_whole_word, tags) {
      var rule, sample, tag, test, _l, _len3, _len4, _m, _ref;
      for (_l = 0, _len3 = ruleset.length; _l < _len3; _l++) {
        rule = ruleset[_l];
        if (rule.tags && ((function() {
          var _len4, _m, _ref, _results;
          _ref = rule.tags;
          _results = [];
          for (_m = 0, _len4 = _ref.length; _m < _len4; _m++) {
            tag = _ref[_m];
            if (__indexOf.call(tags, tag) < 0) {
              _results.push(tag);
            }
          }
          return _results;
        })()).length > 0) {
          continue;
        }
        if (rule.gender !== 'androgynous' && gender !== rule.gender) {
          continue;
        }
        name = name.toLowerCase();
        _ref = rule.test;
        for (_m = 0, _len4 = _ref.length; _m < _len4; _m++) {
          sample = _ref[_m];
          test = match_whole_word ? name : name.slice(name.length - sample.length);
          if (test === sample) {
            return rule;
          }
        }
      }
    };
    apply_rule = function(name, gcase, rule) {
      var char, mod, _l, _len3;
      if (gcase === 'nominative') {
        mod = '.';
      } else if (__indexOf.call(cases, gcase) >= 0) {
        mod = rule.mods[cases.indexOf(gcase) - 1];
      } else {
        throw new Error("Unknown grammatic case: " + gcase);
      }
      for (_l = 0, _len3 = mod.length; _l < _len3; _l++) {
        char = mod[_l];
        switch (char) {
          case '.':
            break;
          case '-':
            name = name.slice(0, name.length - 1);
            break;
          default:
            name += char;
        }
      }
      return name;
    };
    return rules = require("./rules.json");
  })();

}).call(this);
