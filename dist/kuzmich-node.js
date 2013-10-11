(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function() {
    var apply_rule, find_rule_global, find_rule_local, gcase, gender, inflect, kuzmich, nametype, predef, rules, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    predef = {
      genders: ['male', 'female', 'androgynous'],
      nametypes: ['first', 'last', 'middle'],
      cases: ['nominative', 'genitive', 'dative', 'accusative', 'instrumental', 'prepositional']
    };
    kuzmich = function(name, params) {
      var parname, _i, _len, _ref, _ref1;
      _ref = Object.keys(predef);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        parname = _ref[_i];
        if (_ref1 = params[parname], __indexOf.call(predef[parname], _ref1) < 0) {
          throw new Error("Valid " + gender + " is required as parameter");
        }
      }
      return inflect(params.gender, name, params["case"], "" + params.nametype + "name");
    };
    _ref = predef.genders;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      gender = _ref[_i];
      if (!(kuzmich[gender] != null)) {
        kuzmich[gender] = {};
      }
      _ref1 = predef.nametypes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        nametype = _ref1[_j];
        if (!(kuzmich[gender][nametype] != null)) {
          kuzmich[gender][nametype] = {};
        }
        _ref2 = predef.cases;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          gcase = _ref2[_k];
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
      var rule, sample, tag, test, _l, _len3, _len4, _m, _ref3;
      for (_l = 0, _len3 = ruleset.length; _l < _len3; _l++) {
        rule = ruleset[_l];
        if (rule.tags && ((function() {
          var _len4, _m, _ref3, _results;
          _ref3 = rule.tags;
          _results = [];
          for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
            tag = _ref3[_m];
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
        _ref3 = rule.test;
        for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
          sample = _ref3[_m];
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
      } else if (__indexOf.call(predef.cases, gcase) >= 0) {
        mod = rule.mods[predef.cases.indexOf(gcase) - 1];
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
