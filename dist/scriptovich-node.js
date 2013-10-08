(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function() {
    var apply_rule, cases, find_rule_global, find_rule_local, inflect, rules, scriptovich;
    scriptovich = {
      lastname: function(name, gender, gcase) {
        return inflect(gender, name, gcase, 'lastname');
      },
      firstname: function(name, gender, gcase) {
        return inflect(gender, name, gcase, 'firstname');
      },
      middlename: function(name, gender, gcase) {
        return inflect(gender, name, gcase, 'middlename');
      },
      patronymic: this.middlename,
      detect_gender: function(middlename) {
        middlename = middlename.toLowerCase();
        switch (middlename.slice(middlename.length - 2, middlename.length)) {
          case 'ич':
            return 'male';
          case 'на':
            return 'female';
          default:
            return 'androgynous';
        }
      }
    };
    if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
      module.exports = scriptovich;
    } else if (typeof window !== "undefined" && window !== null) {
      window.scriptovich = scriptovich;
    }
    cases = ['nominative', 'genitive', 'dative', 'accusative', 'instrumental', 'prepositional'];
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
      var rule, sample, tag, test, _i, _j, _len, _len1, _ref;
      for (_i = 0, _len = ruleset.length; _i < _len; _i++) {
        rule = ruleset[_i];
        if (rule.tags && ((function() {
          var _j, _len1, _ref, _results;
          _ref = rule.tags;
          _results = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            tag = _ref[_j];
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
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          sample = _ref[_j];
          test = match_whole_word ? name : name.slice(name.length - sample.length);
          if (test === sample) {
            return rule;
          }
        }
      }
    };
    apply_rule = function(name, gcase, rule) {
      var char, mod, _i, _len;
      if (gcase === 'nominative') {
        mod = '.';
      } else if (__indexOf.call(cases, gcase) >= 0) {
        mod = rule.mods[cases.indexOf(gcase) - 1];
      } else {
        throw new Error("Unknown grammatic case: " + gcase);
      }
      for (_i = 0, _len = mod.length; _i < _len; _i++) {
        char = mod[_i];
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
