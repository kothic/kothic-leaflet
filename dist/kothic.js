(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* globals document, ImageData */

const parseFont = require('./lib/parse-font')

exports.parseFont = parseFont

exports.createCanvas = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width, height })
}

exports.createImageData = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
}

exports.loadImage = function (src) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img')

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = () => { cleanup(); resolve(image) }
    image.onerror = () => { cleanup(); reject(new Error(`Failed to load the image "${src}"`)) }

    image.src = src
  })
}

},{"./lib/parse-font":2}],2:[function(require,module,exports){
'use strict'

/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
  , styles = 'italic|oblique'
  , variants = 'small-caps'
  , stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
  , units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
  , string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+'

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp(`(${weights}) +`, 'i')
const styleRe = new RegExp(`(${styles}) +`, 'i')
const variantRe = new RegExp(`(${variants}) +`, 'i')
const stretchRe = new RegExp(`(${stretches}) +`, 'i')
const sizeFamilyRe = new RegExp(
  '([\\d\\.]+)(' + units + ') *'
  + '((?:' + string + ')( *, *(?:' + string + '))*)')

/**
 * Cache font parsing.
 */

const cache = {}

const defaultHeight = 16 // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = function (str) {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str)
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  }

  // Optional, unordered properties.
  let weight, style, variant, stretch
  // Stop search at `sizeFamily.index`
  let substr = str.substring(0, sizeFamily.index)
  if ((weight = weightRe.exec(substr))) font.weight = weight[1]
  if ((style = styleRe.exec(substr))) font.style = style[1]
  if ((variant = variantRe.exec(substr))) font.variant = variant[1]
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75
      break
    case 'pc':
      font.size *= 16
      break
    case 'in':
      font.size *= 96
      break
    case 'cm':
      font.size *= 96.0 / 2.54
      break
    case 'mm':
      font.size *= 96.0 / 25.4
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75
      break
    case 'q':
      font.size *= 96 / 25.4 / 4
      break
  }

  return (cache[str] = font)
}

},{}],3:[function(require,module,exports){
// Generated automatically by nearley, version unknown
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function nth(n) {
    return function(d) {
        return d[n];
    };
}


// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function $(o) {
    return function(d) {
        var ret = {};
        Object.keys(o).forEach(function(k) {
            ret[k] = d[o[k]];
        });
        return ret;
    };
}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "csscolor", "symbols": [{"literal":"#"}, "hexdigit", "hexdigit", "hexdigit", "hexdigit", "hexdigit", "hexdigit"], "postprocess": 
        function(d) {
            return {
                "r": parseInt(d[1]+d[2], 16),
                "g": parseInt(d[3]+d[4], 16),
                "b": parseInt(d[5]+d[6], 16),
            }
        }
        },
    {"name": "csscolor", "symbols": [{"literal":"#"}, "hexdigit", "hexdigit", "hexdigit"], "postprocess": 
        function(d) {
            return {
                "r": parseInt(d[1]+d[1], 16),
                "g": parseInt(d[2]+d[2], 16),
                "b": parseInt(d[3]+d[3], 16),
            }
        }
        },
    {"name": "csscolor$string$1", "symbols": [{"literal":"r"}, {"literal":"g"}, {"literal":"b"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "csscolor", "symbols": ["csscolor$string$1", "_", {"literal":"("}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":")"}], "postprocess": $({"r": 4, "g": 8, "b": 12})},
    {"name": "csscolor$string$2", "symbols": [{"literal":"h"}, {"literal":"s"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "csscolor", "symbols": ["csscolor$string$2", "_", {"literal":"("}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":")"}], "postprocess": $({"h": 4, "s": 8, "l": 12})},
    {"name": "csscolor$string$3", "symbols": [{"literal":"r"}, {"literal":"g"}, {"literal":"b"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "csscolor", "symbols": ["csscolor$string$3", "_", {"literal":"("}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "decimal", "_", {"literal":")"}], "postprocess": $({"r": 4, "g": 8, "b": 12, "a": 16})},
    {"name": "csscolor$string$4", "symbols": [{"literal":"h"}, {"literal":"s"}, {"literal":"l"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "csscolor", "symbols": ["csscolor$string$4", "_", {"literal":"("}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "decimal", "_", {"literal":")"}], "postprocess": $({"h": 4, "s": 8, "l": 12, "a": 16})},
    {"name": "hexdigit", "symbols": [/[a-fA-F0-9]/]},
    {"name": "colnum", "symbols": ["unsigned_int"], "postprocess": id},
    {"name": "colnum", "symbols": ["percentage"], "postprocess": 
        function(d) {return Math.floor(d[0]*255); }
        },
    {"name": "eval$string$1", "symbols": [{"literal":"e"}, {"literal":"v"}, {"literal":"a"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "eval$ebnf$1", "symbols": ["AS"], "postprocess": id},
    {"name": "eval$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "eval", "symbols": ["eval$string$1", "_", {"literal":"("}, "_", "eval$ebnf$1", "_", {"literal":")"}], "postprocess": nth(4)},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "+", left: a, right: b})},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "-", left: a, right: b})},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "P"], "postprocess": ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "*", left: a, right: b})},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "P"], "postprocess": ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "/", left: a, right: b})},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"%"}, "_", "P"], "postprocess": ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "%", left: a, right: b})},
    {"name": "MD", "symbols": ["P"], "postprocess": id},
    {"name": "P", "symbols": [{"literal":"("}, "_", "AS", "_", {"literal":")"}], "postprocess": nth(2)},
    {"name": "P", "symbols": ["N"], "postprocess": id},
    {"name": "N", "symbols": ["float"], "postprocess": ([x]) => ({type: 'number', value: x})},
    {"name": "N", "symbols": ["func"], "postprocess": id},
    {"name": "N", "symbols": ["dqstring"], "postprocess": ([x]) => ({type: 'string', value: x})},
    {"name": "float", "symbols": ["int", {"literal":"."}, "int"], "postprocess": (d) => parseFloat(d[0] + d[1] + d[2])},
    {"name": "float", "symbols": ["int"], "postprocess": (d) => parseInt(d[0])},
    {"name": "func$ebnf$1$subexpression$1", "symbols": ["_", "function_arg"]},
    {"name": "func$ebnf$1", "symbols": ["func$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func", "symbols": ["term", "_", {"literal":"("}, "func$ebnf$1", "_", {"literal":")"}], "postprocess": ([func, _1, _2, args]) => ({type: 'function', func: func, args: args ? args[1] : []})},
    {"name": "function_arg", "symbols": ["AS"], "postprocess": ([arg]) => [arg]},
    {"name": "function_arg", "symbols": ["function_arg", "_", {"literal":","}, "_", "AS"], "postprocess": ([args, _1, _2, _3, arg]) => args.concat(arg)},
    {"name": "css$ebnf$1", "symbols": []},
    {"name": "css$ebnf$1", "symbols": ["css$ebnf$1", "rule"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "css", "symbols": ["_", "css$ebnf$1"], "postprocess": ([_1, rules]) => rules},
    {"name": "rule$ebnf$1", "symbols": ["action"]},
    {"name": "rule$ebnf$1", "symbols": ["rule$ebnf$1", "action"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "rule", "symbols": ["selectors", "rule$ebnf$1"], "postprocess": ([s, a]) => ({selectors: s, actions: a ? a.reduce((x,y) => x.concat(y), []) : []})},
    {"name": "rule", "symbols": ["import"], "postprocess": ([imp]) => ({'import' : imp})},
    {"name": "selectors", "symbols": ["selector"]},
    {"name": "selectors", "symbols": ["selectors", "_", {"literal":","}, "_", "selector"], "postprocess": ([list, _1, _2, _3, item]) => list.concat(item)},
    {"name": "selectors", "symbols": ["nested_selector"]},
    {"name": "selector$ebnf$1", "symbols": []},
    {"name": "selector$ebnf$1", "symbols": ["selector$ebnf$1", "class"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selector$ebnf$2", "symbols": ["zoom"], "postprocess": id},
    {"name": "selector$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$3", "symbols": ["attributes"], "postprocess": id},
    {"name": "selector$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$4", "symbols": ["pseudoclasses"], "postprocess": id},
    {"name": "selector$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$5", "symbols": ["layer"], "postprocess": id},
    {"name": "selector$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector", "symbols": ["type", "selector$ebnf$1", "selector$ebnf$2", "selector$ebnf$3", "selector$ebnf$4", "selector$ebnf$5", "_"], "postprocess": 
        ([type, classes, zoom, attributes, pseudoclasses, layer]) => ({
            type: type,
            zoom: zoom,
            attributes: attributes,
            pseudoclasses: pseudoclasses,
            classes: classes,
            layer: layer
          })
                                                      },
    {"name": "nested_selector", "symbols": ["selector", "__", "selector"], "postprocess": ([parent, _, child]) => {child.parent = parent; return child;}},
    {"name": "nested_selector", "symbols": ["nested_selector", "__", "selector"], "postprocess": ([parent, _, child]) => {child.parent = parent; return child;}},
    {"name": "pseudoclasses$ebnf$1", "symbols": ["pseudoclass"]},
    {"name": "pseudoclasses$ebnf$1", "symbols": ["pseudoclasses$ebnf$1", "pseudoclass"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pseudoclasses", "symbols": ["pseudoclasses$ebnf$1"], "postprocess": id},
    {"name": "pseudoclass", "symbols": ["_", {"literal":":"}, "term"], "postprocess": ([_1, _2, pseudoclass]) => pseudoclass},
    {"name": "layer$string$1", "symbols": [{"literal":":"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "layer", "symbols": ["_", "layer$string$1", "term"], "postprocess": ([_1, _2, value]) => value},
    {"name": "attributes$ebnf$1", "symbols": ["attribute"]},
    {"name": "attributes$ebnf$1", "symbols": ["attributes$ebnf$1", "attribute"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "attributes", "symbols": ["attributes$ebnf$1"], "postprocess": id},
    {"name": "attribute", "symbols": ["_", {"literal":"["}, "predicate", {"literal":"]"}], "postprocess": ([_0, _1, predicates, _2]) => predicates},
    {"name": "predicate", "symbols": ["tag"], "postprocess": ([tag]) => ({type: "presence", key: tag})},
    {"name": "predicate", "symbols": ["tag", "_", "operator", "_", "value"], "postprocess": ([tag, _1, op, _2, value]) => ({type: "cmp", key: tag, value: value, op: op})},
    {"name": "predicate", "symbols": [{"literal":"!"}, "tag"], "postprocess": ([_, tag]) => ({type: "absence", key: tag})},
    {"name": "predicate$string$1", "symbols": [{"literal":"~"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "predicate", "symbols": ["tag", "predicate$string$1", "regexp"], "postprocess": ([tag, op, value]) => ({type: "regexp", key: tag, value: value, op: op})},
    {"name": "tag", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "string", "symbols": ["dqstring"], "postprocess": id},
    {"name": "string$ebnf$1", "symbols": [/[a-zA-Z0-9:_\-]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[a-zA-Z0-9:_\-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"], "postprocess": ([chars]) => chars.join("")},
    {"name": "term$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "term$ebnf$1", "symbols": ["term$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "term", "symbols": ["term$ebnf$1"], "postprocess": ([chars]) => chars.join("")},
    {"name": "operator", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "operator$string$1", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$1"], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "operator$string$2", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$2"], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "operator$string$3", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$3"], "postprocess": id},
    {"name": "zoom", "symbols": ["_", {"literal":"|"}, /[zs]/, "zoom_interval"], "postprocess":  ([_, pipe, type, value]) => {
        	                                                 value.type = type;
        	                                                 return value;
        }
                                                      },
    {"name": "zoom_interval", "symbols": ["unsigned_int"], "postprocess": ([value]) => ({begin: value, end: value})},
    {"name": "zoom_interval$ebnf$1", "symbols": ["unsigned_int"], "postprocess": id},
    {"name": "zoom_interval$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "zoom_interval$ebnf$2", "symbols": ["unsigned_int"], "postprocess": id},
    {"name": "zoom_interval$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "zoom_interval", "symbols": ["zoom_interval$ebnf$1", {"literal":"-"}, "zoom_interval$ebnf$2"], "postprocess": ([begin, interval, end]) => ({begin: begin, end: end})},
    {"name": "regexp$ebnf$1", "symbols": []},
    {"name": "regexp$ebnf$1", "symbols": ["regexp$ebnf$1", "regexp_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "regexp$ebnf$2", "symbols": []},
    {"name": "regexp$ebnf$2", "symbols": ["regexp$ebnf$2", "regexp_flag"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "regexp", "symbols": [{"literal":"/"}, "regexp$ebnf$1", {"literal":"/"}, "regexp$ebnf$2"], "postprocess": ([_1, arr, _2, flags]) => ({regexp: arr.join(""), flags: flags.join("")})},
    {"name": "regexp_char", "symbols": [/[^\/]/]},
    {"name": "regexp_char", "symbols": [{"literal":"/"}]},
    {"name": "regexp_flag", "symbols": [{"literal":"i"}]},
    {"name": "regexp_flag", "symbols": [{"literal":"g"}]},
    {"name": "regexp_flag", "symbols": [{"literal":"m"}]},
    {"name": "action$ebnf$1", "symbols": ["statement"]},
    {"name": "action$ebnf$1", "symbols": ["action$ebnf$1", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "action", "symbols": [{"literal":"{"}, "_", "action$ebnf$1", {"literal":"}"}, "_"], "postprocess": ([_1, _2, statements, _3, _4]) => (statements)},
    {"name": "action", "symbols": [{"literal":"{"}, "_", {"literal":"}"}, "_"], "postprocess": () => []},
    {"name": "statement", "symbols": ["string", "_", {"literal":":"}, "_", "statement_value", "_", {"literal":";"}, "_"], "postprocess": ([key, _1, _2, _3, value, _4]) => ({action: "kv", k: key, v: value})},
    {"name": "statement$string$1", "symbols": [{"literal":"e"}, {"literal":"x"}, {"literal":"i"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$1", "_", {"literal":";"}, "_"], "postprocess": () => ({action: "exit"})},
    {"name": "statement$string$2", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$2", "class", "_", {"literal":";"}, "_"], "postprocess": ([_1, cls]) => ({action: 'set_class', v: cls})},
    {"name": "statement$string$3", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$3", "_", "tag", "_", {"literal":";"}, "_"], "postprocess": ([_1, _2, tag]) => ({action: 'set_tag', k: tag})},
    {"name": "statement$string$4", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$4", "_", "tag", "_", {"literal":"="}, "_", "statement_value", "_", {"literal":";"}, "_"], "postprocess": ([_1, _2, tag, _3, _4, _5, value]) => ({action: 'set_tag', k: tag, v: value})},
    {"name": "class$ebnf$1$subexpression$1", "symbols": [{"literal":"!"}, "_"]},
    {"name": "class$ebnf$1", "symbols": ["class$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "class$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "class", "symbols": ["_", "class$ebnf$1", {"literal":"."}, "term"], "postprocess": ([_1, not, _2, cls]) => ({'class': cls, not: not ? !!not : false})},
    {"name": "type$string$1", "symbols": [{"literal":"w"}, {"literal":"a"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$1"], "postprocess": id},
    {"name": "type$string$2", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$2"], "postprocess": id},
    {"name": "type$string$3", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"l"}, {"literal":"a"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$3"], "postprocess": id},
    {"name": "type$string$4", "symbols": [{"literal":"a"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$4"], "postprocess": id},
    {"name": "type$string$5", "symbols": [{"literal":"l"}, {"literal":"i"}, {"literal":"n"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$5"], "postprocess": id},
    {"name": "type$string$6", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"n"}, {"literal":"v"}, {"literal":"a"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$6"], "postprocess": id},
    {"name": "type", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "statement_value", "symbols": ["dqstring"], "postprocess": ([x]) => ({type: 'string', v: x})},
    {"name": "statement_value", "symbols": ["csscolor"], "postprocess": ([x]) => ({type: 'csscolor', v: x})},
    {"name": "statement_value", "symbols": ["eval"], "postprocess": ([x]) => ({type: 'eval', v: x})},
    {"name": "statement_value", "symbols": ["uqstring"], "postprocess": ([x]) => ({type: 'string', v: x})},
    {"name": "import$string$1", "symbols": [{"literal":"@"}, {"literal":"i"}, {"literal":"m"}, {"literal":"p"}, {"literal":"o"}, {"literal":"r"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "import$string$2", "symbols": [{"literal":"u"}, {"literal":"r"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "import$ebnf$1$subexpression$1", "symbols": ["_", "term"]},
    {"name": "import$ebnf$1", "symbols": ["import$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "import$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "import", "symbols": ["import$string$1", "_", "import$string$2", "_", {"literal":"("}, "_", "dqstring", "_", {"literal":")"}, "import$ebnf$1", "_", {"literal":";"}], "postprocess": (d) => ({ url: d[6], pseudoclass: d[9] ? d[9][1] : null})},
    {"name": "uqstring$ebnf$1", "symbols": ["spchar"]},
    {"name": "uqstring$ebnf$1", "symbols": ["uqstring$ebnf$1", "spchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "uqstring", "symbols": ["uqstring$ebnf$1"], "postprocess": ([chars]) => chars.join("")},
    {"name": "spchar", "symbols": [/[a-zA-Z0-9\-_:.,\\\/]/]},
    {"name": "mcomment$string$1", "symbols": [{"literal":"/"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mcomment$ebnf$1", "symbols": []},
    {"name": "mcomment$ebnf$1", "symbols": ["mcomment$ebnf$1", /[^*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mcomment$ebnf$2", "symbols": []},
    {"name": "mcomment$ebnf$2$subexpression$1$ebnf$1", "symbols": [{"literal":"*"}]},
    {"name": "mcomment$ebnf$2$subexpression$1$ebnf$1", "symbols": ["mcomment$ebnf$2$subexpression$1$ebnf$1", {"literal":"*"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mcomment$ebnf$2$subexpression$1$ebnf$2", "symbols": []},
    {"name": "mcomment$ebnf$2$subexpression$1$ebnf$2", "symbols": ["mcomment$ebnf$2$subexpression$1$ebnf$2", /[^*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mcomment$ebnf$2$subexpression$1", "symbols": ["mcomment$ebnf$2$subexpression$1$ebnf$1", /[^\/*]/, "mcomment$ebnf$2$subexpression$1$ebnf$2"]},
    {"name": "mcomment$ebnf$2", "symbols": ["mcomment$ebnf$2", "mcomment$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mcomment$ebnf$3", "symbols": []},
    {"name": "mcomment$ebnf$3", "symbols": ["mcomment$ebnf$3", {"literal":"*"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mcomment$string$2", "symbols": [{"literal":"*"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mcomment", "symbols": ["mcomment$string$1", "mcomment$ebnf$1", "mcomment$ebnf$2", "mcomment$ebnf$3", "mcomment$string$2"], "postprocess": () => null},
    {"name": "mcomment$string$3", "symbols": [{"literal":"/"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mcomment$ebnf$4", "symbols": []},
    {"name": "mcomment$ebnf$4", "symbols": ["mcomment$ebnf$4", /[^\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mcomment", "symbols": ["mcomment$string$3", "mcomment$ebnf$4", {"literal":"\n"}], "postprocess": () => null},
    {"name": "wschar", "symbols": ["mcomment"], "postprocess": () => null}
]
  , ParserStart: "css"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

},{}],4:[function(require,module,exports){
'use strict';

const nearley = require("nearley");

const grammar = require("./grammar.js");

function parse(text) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(text.trim());

  if (!parser.results) {
    throw "Unexpected end of file"
  }

  if (parser.results.length != 1) {
    throw new Error("Ambiguous grammar detected. This error most likely indicates an error in MapCSS grammar. Please report an issue to the library developers.");
  }

  return parser.results[0];
}

const parser = {
  parse: parse
}

if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
  module.exports = parser;
} else {
  window.MapCSSParser = parser;
}

},{"./grammar.js":3,"nearley":5}],5:[function(require,module,exports){
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;        // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;

    Rule.prototype.toString = function(withCursorAt) {
        function stringifySymbolSequence (e) {
            return e.literal ? JSON.stringify(e.literal) :
                   e.type ? '%' + e.type : e.toString();
        }
        var symbolSequence = (typeof withCursorAt === "undefined")
                             ? this.symbols.map(stringifySymbolSequence).join(' ')
                             : (   this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(' ')
                                 + " ● "
                                 + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(' ')     );
        return this.name + " → " + symbolSequence;
    }


    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }

    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };

    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
        }
        return state;
    };

    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        } while (node.left);
        children.reverse();
        return children;
    };

    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };


    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }


    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;

        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
            var state = states[w];

            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for (var i = wantedBy.length; i--; ) { // this line is hot
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }

                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }

            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }

                // predict
                if (wants[exp]) {
                    wants[exp].push(state);

                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [state];
                    this.predict(exp);
                }
            }
        }
    }

    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    }

    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }


    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    }


    function StreamLexer() {
      this.reset("");
    }

    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    }

    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return {value: ch};
        }
    }

    StreamLexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak,
      }
    }

    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var line = buffer.substring(this.lastLineBreak, nextLineBreak)
            var col = this.index - this.lastLineBreak;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += "  " + line + "\n"
            message += "  " + Array(col).join(" ") + "^"
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }
    }


    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;

        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer,
        };
        for (var key in (options || {})) {
            this.options[key] = options[key];
        }

        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;

        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [column];

        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }

    // create a reserved token for indicating a parse fail
    Parser.fail = {};

    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);

        var token;
        while (token = lexer.next()) {
            // We add new states to table[current+1]
            var column = this.table[this.current];

            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }

            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);

            // Advance all tokens that expect the symbol
            var literal = token.text !== undefined ? token.text : token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) :
                    expect.type ? expect.type === token.type
                                : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                    nextColumn.states.push(next);
                }
            }

            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added

            nextColumn.process();

            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var message = this.lexer.formatError(token, "invalid syntax") + "\n";
                message += "Unexpected " + (token.type ? token.type + " token: " : "");
                message += JSON.stringify(token.value !== undefined ? token.value : token) + "\n";
                var err = new Error(message);
                err.offset = this.current;
                err.token = token;
                throw err;
            }

            // maybe save lexer state
            if (this.options.keepHistory) {
              column.lexerState = lexer.save()
            }

            this.current++;
        }
        if (column) {
          this.lexerState = lexer.save()
        }

        // Incrementally keep track of results
        this.results = this.finish();

        // Allow chaining, for whatever it's worth
        return this;
    };

    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };

    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;

        // Incrementally keep track of results
        this.results = this.finish();
    };

    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding')
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };

    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1]
        column.states.forEach(function (t) {
            if (t.rule.name === start
                    && t.dot === t.rule.symbols.length
                    && t.reference === 0
                    && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {return c.data; });
    };

    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule,
    };

}));

},{}],6:[function(require,module,exports){
'use strict';

module.exports = partialSort;

// Floyd-Rivest selection algorithm:
// Rearrange items so that all items in the [left, k] range are smaller than all items in (k, right];
// The k-th element will have the (k - left + 1)th smallest value in [left, right]

function partialSort(arr, k, left, right, compare) {
    left = left || 0;
    right = right || (arr.length - 1);
    compare = compare || defaultCompare;

    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            partialSort(arr, k, newLeft, newRight, compare);
        }

        var t = arr[k];
        var i = left;
        var j = right;

        swap(arr, left, k);
        if (compare(arr[right], t) > 0) swap(arr, left, right);

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) i++;
            while (compare(arr[j], t) > 0) j--;
        }

        if (compare(arr[left], t) === 0) swap(arr, left, j);
        else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

},{}],7:[function(require,module,exports){
'use strict';

module.exports = rbush;

var quickselect = require('quickselect');

function rbush(maxEntries, format) {
    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

    // max entries in a node is 9 by default; min node fill is 40% for best performance
    this._maxEntries = Math.max(4, maxEntries || 9);
    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

    if (format) {
        this._initFormat(format);
    }

    this.clear();
}

rbush.prototype = {

    all: function () {
        return this._all(this.data, []);
    },

    search: function (bbox) {

        var node = this.data,
            result = [],
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return result;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf) result.push(child);
                    else if (contains(bbox, childBBox)) this._all(child, result);
                    else nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return result;
    },

    collides: function (bbox) {

        var node = this.data,
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return false;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) return true;
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return false;
    },

    load: function (data) {
        if (!(data && data.length)) return this;

        if (data.length < this._minEntries) {
            for (var i = 0, len = data.length; i < len; i++) {
                this.insert(data[i]);
            }
            return this;
        }

        // recursively build the tree with the given data from stratch using OMT algorithm
        var node = this._build(data.slice(), 0, data.length - 1, 0);

        if (!this.data.children.length) {
            // save as is if tree is empty
            this.data = node;

        } else if (this.data.height === node.height) {
            // split root if trees have the same height
            this._splitRoot(this.data, node);

        } else {
            if (this.data.height < node.height) {
                // swap trees if inserted one is bigger
                var tmpNode = this.data;
                this.data = node;
                node = tmpNode;
            }

            // insert the small tree into the large tree at appropriate level
            this._insert(node, this.data.height - node.height - 1, true);
        }

        return this;
    },

    insert: function (item) {
        if (item) this._insert(item, this.data.height - 1);
        return this;
    },

    clear: function () {
        this.data = createNode([]);
        return this;
    },

    remove: function (item, equalsFn) {
        if (!item) return this;

        var node = this.data,
            bbox = this.toBBox(item),
            path = [],
            indexes = [],
            i, parent, index, goingUp;

        // depth-first iterative tree traversal
        while (node || path.length) {

            if (!node) { // go up
                node = path.pop();
                parent = path[path.length - 1];
                i = indexes.pop();
                goingUp = true;
            }

            if (node.leaf) { // check current node
                index = findItem(item, node.children, equalsFn);

                if (index !== -1) {
                    // item found, remove the item and condense tree upwards
                    node.children.splice(index, 1);
                    path.push(node);
                    this._condense(path);
                    return this;
                }
            }

            if (!goingUp && !node.leaf && contains(node, bbox)) { // go down
                path.push(node);
                indexes.push(i);
                i = 0;
                parent = node;
                node = node.children[0];

            } else if (parent) { // go right
                i++;
                node = parent.children[i];
                goingUp = false;

            } else node = null; // nothing found
        }

        return this;
    },

    toBBox: function (item) { return item; },

    compareMinX: compareNodeMinX,
    compareMinY: compareNodeMinY,

    toJSON: function () { return this.data; },

    fromJSON: function (data) {
        this.data = data;
        return this;
    },

    _all: function (node, result) {
        var nodesToSearch = [];
        while (node) {
            if (node.leaf) result.push.apply(result, node.children);
            else nodesToSearch.push.apply(nodesToSearch, node.children);

            node = nodesToSearch.pop();
        }
        return result;
    },

    _build: function (items, left, right, height) {

        var N = right - left + 1,
            M = this._maxEntries,
            node;

        if (N <= M) {
            // reached leaf level; return leaf
            node = createNode(items.slice(left, right + 1));
            calcBBox(node, this.toBBox);
            return node;
        }

        if (!height) {
            // target height of the bulk-loaded tree
            height = Math.ceil(Math.log(N) / Math.log(M));

            // target number of root entries to maximize storage utilization
            M = Math.ceil(N / Math.pow(M, height - 1));
        }

        node = createNode([]);
        node.leaf = false;
        node.height = height;

        // split the items into M mostly square tiles

        var N2 = Math.ceil(N / M),
            N1 = N2 * Math.ceil(Math.sqrt(M)),
            i, j, right2, right3;

        multiSelect(items, left, right, N1, this.compareMinX);

        for (i = left; i <= right; i += N1) {

            right2 = Math.min(i + N1 - 1, right);

            multiSelect(items, i, right2, N2, this.compareMinY);

            for (j = i; j <= right2; j += N2) {

                right3 = Math.min(j + N2 - 1, right2);

                // pack each entry recursively
                node.children.push(this._build(items, j, right3, height - 1));
            }
        }

        calcBBox(node, this.toBBox);

        return node;
    },

    _chooseSubtree: function (bbox, node, level, path) {

        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

        while (true) {
            path.push(node);

            if (node.leaf || path.length - 1 === level) break;

            minArea = minEnlargement = Infinity;

            for (i = 0, len = node.children.length; i < len; i++) {
                child = node.children[i];
                area = bboxArea(child);
                enlargement = enlargedArea(bbox, child) - area;

                // choose entry with the least area enlargement
                if (enlargement < minEnlargement) {
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    targetNode = child;

                } else if (enlargement === minEnlargement) {
                    // otherwise choose one with the smallest area
                    if (area < minArea) {
                        minArea = area;
                        targetNode = child;
                    }
                }
            }

            node = targetNode || node.children[0];
        }

        return node;
    },

    _insert: function (item, level, isNode) {

        var toBBox = this.toBBox,
            bbox = isNode ? item : toBBox(item),
            insertPath = [];

        // find the best node for accommodating the item, saving all nodes along the path too
        var node = this._chooseSubtree(bbox, this.data, level, insertPath);

        // put the item into the node
        node.children.push(item);
        extend(node, bbox);

        // split on node overflow; propagate upwards if necessary
        while (level >= 0) {
            if (insertPath[level].children.length > this._maxEntries) {
                this._split(insertPath, level);
                level--;
            } else break;
        }

        // adjust bboxes along the insertion path
        this._adjustParentBBoxes(bbox, insertPath, level);
    },

    // split overflowed node into two
    _split: function (insertPath, level) {

        var node = insertPath[level],
            M = node.children.length,
            m = this._minEntries;

        this._chooseSplitAxis(node, m, M);

        var splitIndex = this._chooseSplitIndex(node, m, M);

        var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
        newNode.height = node.height;
        newNode.leaf = node.leaf;

        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);

        if (level) insertPath[level - 1].children.push(newNode);
        else this._splitRoot(node, newNode);
    },

    _splitRoot: function (node, newNode) {
        // split root node
        this.data = createNode([node, newNode]);
        this.data.height = node.height + 1;
        this.data.leaf = false;
        calcBBox(this.data, this.toBBox);
    },

    _chooseSplitIndex: function (node, m, M) {

        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

        minOverlap = minArea = Infinity;

        for (i = m; i <= M - m; i++) {
            bbox1 = distBBox(node, 0, i, this.toBBox);
            bbox2 = distBBox(node, i, M, this.toBBox);

            overlap = intersectionArea(bbox1, bbox2);
            area = bboxArea(bbox1) + bboxArea(bbox2);

            // choose distribution with minimum overlap
            if (overlap < minOverlap) {
                minOverlap = overlap;
                index = i;

                minArea = area < minArea ? area : minArea;

            } else if (overlap === minOverlap) {
                // otherwise choose distribution with minimum area
                if (area < minArea) {
                    minArea = area;
                    index = i;
                }
            }
        }

        return index;
    },

    // sorts node children by the best axis for split
    _chooseSplitAxis: function (node, m, M) {

        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
            xMargin = this._allDistMargin(node, m, M, compareMinX),
            yMargin = this._allDistMargin(node, m, M, compareMinY);

        // if total distributions margin value is minimal for x, sort by minX,
        // otherwise it's already sorted by minY
        if (xMargin < yMargin) node.children.sort(compareMinX);
    },

    // total margin of all possible split distributions where each node is at least m full
    _allDistMargin: function (node, m, M, compare) {

        node.children.sort(compare);

        var toBBox = this.toBBox,
            leftBBox = distBBox(node, 0, m, toBBox),
            rightBBox = distBBox(node, M - m, M, toBBox),
            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
            i, child;

        for (i = m; i < M - m; i++) {
            child = node.children[i];
            extend(leftBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(leftBBox);
        }

        for (i = M - m - 1; i >= m; i--) {
            child = node.children[i];
            extend(rightBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(rightBBox);
        }

        return margin;
    },

    _adjustParentBBoxes: function (bbox, path, level) {
        // adjust bboxes along the given tree path
        for (var i = level; i >= 0; i--) {
            extend(path[i], bbox);
        }
    },

    _condense: function (path) {
        // go through the path, removing empty nodes and updating bboxes
        for (var i = path.length - 1, siblings; i >= 0; i--) {
            if (path[i].children.length === 0) {
                if (i > 0) {
                    siblings = path[i - 1].children;
                    siblings.splice(siblings.indexOf(path[i]), 1);

                } else this.clear();

            } else calcBBox(path[i], this.toBBox);
        }
    },

    _initFormat: function (format) {
        // data format (minX, minY, maxX, maxY accessors)

        // uses eval-type function compilation instead of just accepting a toBBox function
        // because the algorithms are very sensitive to sorting functions performance,
        // so they should be dead simple and without inner calls

        var compareArr = ['return a', ' - b', ';'];

        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

        this.toBBox = new Function('a',
            'return {minX: a' + format[0] +
            ', minY: a' + format[1] +
            ', maxX: a' + format[2] +
            ', maxY: a' + format[3] + '};');
    }
};

function findItem(item, items, equalsFn) {
    if (!equalsFn) return items.indexOf(item);

    for (var i = 0; i < items.length; i++) {
        if (equalsFn(item, items[i])) return i;
    }
    return -1;
}

// calculate node's bbox from bboxes of its children
function calcBBox(node, toBBox) {
    distBBox(node, 0, node.children.length, toBBox, node);
}

// min bounding rectangle of node children from k to p-1
function distBBox(node, k, p, toBBox, destNode) {
    if (!destNode) destNode = createNode(null);
    destNode.minX = Infinity;
    destNode.minY = Infinity;
    destNode.maxX = -Infinity;
    destNode.maxY = -Infinity;

    for (var i = k, child; i < p; i++) {
        child = node.children[i];
        extend(destNode, node.leaf ? toBBox(child) : child);
    }

    return destNode;
}

function extend(a, b) {
    a.minX = Math.min(a.minX, b.minX);
    a.minY = Math.min(a.minY, b.minY);
    a.maxX = Math.max(a.maxX, b.maxX);
    a.maxY = Math.max(a.maxY, b.maxY);
    return a;
}

function compareNodeMinX(a, b) { return a.minX - b.minX; }
function compareNodeMinY(a, b) { return a.minY - b.minY; }

function bboxArea(a)   { return (a.maxX - a.minX) * (a.maxY - a.minY); }
function bboxMargin(a) { return (a.maxX - a.minX) + (a.maxY - a.minY); }

function enlargedArea(a, b) {
    return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) *
           (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
}

function intersectionArea(a, b) {
    var minX = Math.max(a.minX, b.minX),
        minY = Math.max(a.minY, b.minY),
        maxX = Math.min(a.maxX, b.maxX),
        maxY = Math.min(a.maxY, b.maxY);

    return Math.max(0, maxX - minX) *
           Math.max(0, maxY - minY);
}

function contains(a, b) {
    return a.minX <= b.minX &&
           a.minY <= b.minY &&
           b.maxX <= a.maxX &&
           b.maxY <= a.maxY;
}

function intersects(a, b) {
    return b.minX <= a.maxX &&
           b.minY <= a.maxY &&
           b.maxX >= a.minX &&
           b.maxY >= a.minY;
}

function createNode(children) {
    return {
        children: children,
        height: 1,
        leaf: true,
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };
}

// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
// combines selection algorithm with binary divide & conquer approach

function multiSelect(arr, left, right, n, compare) {
    var stack = [left, right],
        mid;

    while (stack.length) {
        right = stack.pop();
        left = stack.pop();

        if (right - left <= n) continue;

        mid = left + Math.ceil((right - left) / n / 2) * n;
        quickselect(arr, mid, left, right, compare);

        stack.push(left, mid, mid, right);
    }
}

},{"quickselect":6}],8:[function(require,module,exports){
/*
 (c) 2013, Darafei Praliaskouski, Vladimir Agafonkin, Maksim Gurtovenko
 Kothic JS is a full-featured JavaScript map rendering engine using HTML5 Canvas.
 http://github.com/kothic/kothic-js
*/

'use strict';

const MapCSS = require("./style/mapcss");
const StyleManager = require("./style/style-manager");
const Gallery = require("./style/gallery")
const Renderer = require("./renderer/renderer");

/**
 ** Available options:
 ** getFrame:Function — Function, will be called prior the heavy operations
 ** debug {boolean} — render debug information
 ** browserOptimizations {boolean} — enable set of optimizations for HTML5 Canvas implementation
 **/
function Kothic(css, options={}) {
  this.setOptions(options);

  const mapcss = new MapCSS(css, options.mapcss);

  this.styleManager = new StyleManager(mapcss, {groupFeaturesByActions: this.browserOptimizations});

  const images = mapcss.listImageReferences();
  const gallery = new Gallery(options.gallery || {});

  this.rendererPromise = gallery.preloadImages(images).then(() => {
     return new Renderer(gallery, {
      groupFeaturesByActions: this.browserOptimizations,
      debug: this.debug,
      getFrame: this.getFrame
    });
  }, (err) => console.error(err));
}

Kothic.prototype.setOptions = function(options) {
  if (options && typeof options.debug !== 'undefined') {
    this.debug = !!options.debug;
  } else {
    this.debug = false;
  }

  if (options && typeof options.getFrame === 'function') {
    this.getFrame = options.getFrame;
  } else {
    if (typeof window !== "undefined") {
      this.getFrame = function (fn) {
        var reqFrame = window.requestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.msRequestAnimationFrame;

        reqFrame.call(window, fn);
      }
    } else {
      this.getFrame = function(callback) {
        setTimeout(callback, 0);
      }
    }
  }

  if (options && typeof options.browserOptimizations !== 'undefined') {
    this.browserOptimizations = !!options.browserOptimizations;
  } else {
    this.browserOptimizations = false;
  }
};

Kothic.prototype.render = function (canvas, geojson, zoom, callback) {

  const width = canvas.width;
  const height = canvas.height;

  var ctx = canvas.getContext('2d');

  //TODO: move to options node-canvas specific setting
  //ctx.globalCompositeOperation = 'copy'

  const bbox = geojson.bbox;
  const hscale = width / (bbox[2] - bbox[0]);
  const vscale = height / (bbox[3] - bbox[1]);
  function project(point) {
    return [
      (point[0] - bbox[0]) * hscale,
      height - ((point[1] - bbox[1]) * vscale)
    ];
  }

  console.time('styles');

  // setup layer styles
  // Layer is an array of objects, already sorted
  const layers = this.styleManager.createLayers(geojson.features, zoom);

  console.timeEnd('styles');

  this.rendererPromise.then((renderer) => {
    renderer.render(layers, ctx, width, height, project, callback);
  }).catch((err) => console.error(err))
};

module.exports = Kothic;

},{"./renderer/renderer":14,"./style/gallery":18,"./style/mapcss":19,"./style/style-manager":22}],9:[function(require,module,exports){
'use strict';

const colors = require('../utils/colors.js');

function deg(rad) {
	return rad * 180 / Math.PI;
}

function rad(deg) {
	return deg * Math.PI / 180;
}

function quadrant(angle) {
  if (angle < Math.PI / 2 && angle > -Math.PI / 2)  {
    return '1,3';
  } else {
    return '2,4';
  }
}

function createSegments(points) {
  const segments = [];
  //TODO: Make this angle configurable
  const maxSegmentAngle = rad(45);

  // Offset of each segment from the beginning og the line
  var offset = 0;
  for (var i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];

    const dx = end[0] - start[0];
    const dy = end[1] - start[1];

    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx ** 2 + dy ** 2);

    // Try to attach current point to a previous segment
    if (segments.length > 0) {
      const prevSegment = segments[segments.length - 1];
      const prevAngle = prevSegment.angles[prevSegment.angles.length - 1];

      // Angles more than 180 degrees are reversed to different direction
      var angleDiff = Math.abs(prevAngle - angle);
      if (angleDiff > Math.PI) {
        angleDiff = (2 * Math.PI) - angleDiff;
      }

      // The segment can be continued, if
      // 1. Angle between two parts is lesser then maxSegmentAngle to avoid sharp corners
      // 2. Part is direcred to the same hemicircle as the previous segment
      //
      // Otherwise, the new segment will be created
      if (angleDiff < maxSegmentAngle && quadrant(angle) == prevSegment.quadrant) {
        prevSegment.points.push(end);
        prevSegment.angles.push(angle);
        prevSegment.partsLength.push(length);
        prevSegment.length += length;
        offset += length;
        continue;
      }
    }

    segments.push({
      angles: [angle],
      partsLength: [length],
      offset: offset,
      length: length,
      points: [start, end],
      quadrant: quadrant(angle)
    });

    offset += length;
  }

  return segments;
}

/** Find index of segemnt part and offset from beginning of the part by offset.
 ** This method is used to put label to the center of a segment
 ** @param parts {array} array of segment parts length
 ** @param offset {float} expected offset
 **/
function calculateOffset(parts, offset) {
  var totalOffset = 0;

  for (var i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (totalOffset + part > offset) {
      return [i, offset - totalOffset];
    } else {
      totalOffset += part;
    }
  }

  throw new Error("Sanity check: path is shorter than an offset");
}

function drawGlyph(ctx, glyph, hasHalo=false) {
  ctx.translate(glyph.position[0], glyph.position[1]);
  ctx.rotate(glyph.angle);
	if (hasHalo) {
  	ctx.strokeText(glyph.glyph, glyph.offset[0], glyph.offset[1]);
	} else {
		ctx.fillText(glyph.glyph, glyph.offset[0], glyph.offset[1]);
	}

  ctx.rotate(-glyph.angle);
  ctx.translate(-glyph.position[0], -glyph.position[1]);
}

function renderSegments(ctx, segments) {
  ctx.save();
  segments.forEach((seg) => {
    ctx.strokeStyle = colors.nextColor();
    ctx.lineWidth = 3;
    ctx.beginPath()
    ctx.moveTo(seg.points[0][0], seg.points[0][1]);
    for (var i = 1; i < seg.points.length; i++) {
      ctx.lineTo(seg.points[i][0], seg.points[i][1]);
    }
    ctx.stroke();
  });
  ctx.restore();
}

function calculateGlyphsPositions(segment, glyphs) {
  const textWidth = glyphs.reduce((acc, glyph) => acc + glyph.width, 0);

  //Reverse segment to avoid text, flipped upside down
  if (segment.quadrant == '2,4') {
    segment.angles = segment.angles.map((angle) => angle - Math.PI);
    segment.partsLength.reverse();
    segment.points.reverse();
		segment.quadrant = '1,3'
  }

	//Align text to the middle of current segment
  const startOffset = (segment.length - textWidth) / 2;

	// Get point index and offset from that point of the starting position
	// 'index' is an index of current segment partsLength
	// 'offset' is an offset from the beggining of the part
  var [index, offset] = calculateOffset(segment.partsLength, startOffset);
  for (var i = 0; i < glyphs.length; i++) {
    const glyph = glyphs[i];

		const startPointIndex = index;
    const offsetX = offset;

		//Iterate by points until space for current glyph was reserved
		var reserved = 0;
    while (reserved < glyph.width) {
      const requiredSpace = glyph.width - reserved;
			//Current part is longer than required space
      if (segment.partsLength[index] > offset + requiredSpace) {
        offset += requiredSpace;
        reserved += requiredSpace;
        break;
      }

			//Current part is shorter than required space. Reserve the whole part
			//and increment index
      reserved += segment.partsLength[index] - offset;
      index += 1;
      offset = 0;
    }

		// Text glyph may cover multiple segment parts, so a glyph angle should
		// be averaged between start ans end position
		const angle = adjustAngle(segment.points[startPointIndex], segment.angles[startPointIndex], segment.points[index], segment.angles[index], offset, 0);

		glyph.position = segment.points[startPointIndex];
		glyph.angle = angle;
		glyph.offset = [offsetX, 0];
  }

	return glyphs;
}

function adjustAngle(pointStart, angleStart, pointNext, angleNext, offsetX, offsetY) {
	//If glyph can be fitted to a single segment part, no adjustment is needed
	if (pointStart === pointNext) {
		return angleStart;
	}

	//Draw a line from start point to end point of a glyph
	const x = pointNext[0] + offsetX * Math.sin(angleNext) + offsetY * Math.sin(angleNext);
	const y = pointNext[1] + offsetX * Math.cos(angleNext) + offsetY * Math.cos(angleNext);

	//return angle of this line
	return Math.atan2(y - pointStart[1], x - pointStart[0]);
}

function checkCollisions(segment, collisions) {
	const box = segment.points.reduce((acc, point) => ({
			minX: Math.min(acc.minX, point[0]),
			minY: Math.min(acc.minY, point[1]),
			maxX: Math.max(acc.maxX, point[0]),
			maxY: Math.max(acc.maxX, point[1])
		}), {minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity});

		return collisions.check(box);
}

function render(ctx, points, text, hasHalo, collisions, debug=false) {
  const glyphs = text.split("")
      .map((l) => {
        const metrics = ctx.measureText(l);
        return {
          glyph: l,
          width: metrics.width,
          ascent: metrics.emHeightAscent,
          descent: metrics.emHeightDescent,
        }
      });

  const textWidth = glyphs.reduce((acc, glyph) => acc + glyph.width, 0);

  var segments = createSegments(points);

  if (debug) {
    renderSegments(ctx, segments);
  }

  //TODO: Merge first and last segments if possible

  segments = segments.filter((seg) => seg.length > textWidth);

	segments = segments.filter((seg) => checkCollisions(seg, collisions))


  //TODO Choose best segments

  //Render text
  segments.forEach((seg) => {
		const positions = calculateGlyphsPositions(seg, glyphs);

		if (hasHalo) {
			positions.forEach((glyph) => {
				drawGlyph(ctx, glyph, true);
			});
		}
		positions.forEach((glyph) => {
			drawGlyph(ctx, glyph, false);
		});
	});
}

module.exports.render = render;

},{"../utils/colors.js":25}],10:[function(require,module,exports){
'use strict';
const geom = require('../utils/geom');

function renderIcon(ctx, feature, nextFeature, {projectPointFunction, collisionBuffer, gallery}) {
  //TODO: Refactor, calculate representative point only once
  const point = geom.getReprPoint(feature.geometry, projectPointFunction);
  if (!point) {
    return;
  }

  const actions = feature.actions;

  const image = gallery.getImage(actions['icon-image']);
  if (!image) {
    return;
  }

  var w = image.width, h = image.height;

  //Zoom image according to values, specified in MapCSS
  if (actions['icon-width'] || actions['icon-height']) {
    if (actions['icon-width']) {
      w = actions['icon-width'];
      h = image.height * w / image.width;
    }
    if (actions['icon-height']) {
      h = actions['icon-height'];
      if (!actions['icon-width']) {
        w = image.width * h / image.height;
      }
    }
  }

  if (!actions['allow-overlap']) {
    if (collisionBuffer.checkPointWH(point, w, h, feature.kothicId)) {
      return;
    }
  }


  const x = Math.floor(point[0] - w / 2);
  const y = Math.floor(point[1] - h / 2);

  ctx.save();
  ctx.beginPath();
  //ctx.strokeStyle = 'black'
  //ctx.lineWidth = 1
  ctx.ellipse(point[0], point[1], w / 2, h / 2, 0, 0, 2*Math.PI);
  //ctx.rect(x, y, w, h);
  ctx.clip("evenodd");
  //ctx.stroke()
  ctx.drawImage(image, x, y, w, h);
  ctx.restore();

  const padding = parseFloat(actions['-x-kothic-padding']);
  collisionBuffer.addPointWH(point, w, h, padding, feature.kothicId);
}

module.exports.render = renderIcon;

},{"../utils/geom":27}],11:[function(require,module,exports){
//'use strict';
const path = require('./path');
const contextUtils = require('../utils/style');

//TODO: Refactor to class
module.exports = {
  pathOpened: false,
  renderCasing: function (ctx, feature, nextFeature, {projectPointFunction, tileWidth, tileHeight, groupFeaturesByActions}) {
    const actions = feature.actions;
    const nextActions = nextFeature && nextFeature.actions;

   if (!this.pathOpened) {
     this.pathOpened = true;
      ctx.beginPath();
   }

    //TODO: Is MapCSS spec really allows a fallback from "casing-dashes" to "dashes"?
    const dashes = actions['casing-dashes'] || actions['dashes'];
    path(ctx, feature.geometry, dashes, false, projectPointFunction, tileWidth, tileHeight);

    if (groupFeaturesByActions &&
        nextFeature &&
        nextFeature.key === feature.key) {
      return;
    }

    const style = {
      'lineWidth': 2 * actions["casing-width"] + actions['width'],
      'strokeStyle': actions["casing-color"],
      'lineCap': actions["casing-linecap"] || actions['linecap'],
      'lineJoin': actions["casing-linejoin"] || actions['linejoin'],
      'globalAlpha': actions["casing-opacity"]
    }

    contextUtils.applyStyle(ctx, style);

    ctx.stroke();
    this.pathOpened = false;
  },

  render: function (ctx, feature, nextFeature, {projectPointFunction, tileWidth, tileHeight, groupFeaturesByActions, gallery}) {
    const actions = feature.actions;
    const nextActions = nextFeature && nextFeature.actions;
    if (!this.pathOpened) {
      this.pathOpened = true;
       ctx.beginPath();
    }

    path(ctx, feature.geometry, actions['dashes'], false, projectPointFunction, tileWidth, tileHeight);

    if (groupFeaturesByActions &&
        nextFeature &&
        nextFeature.key === feature.key) {
      return;
    }

    const defaultLinejoin = actions['width'] <= 2 ? "miter" : "round";
    const defaultLinecap = actions['width'] <= 2 ? "butt" : "round";

    var strokeStyle;
    if ('image' in actions) {
      const image = gallery.getImage(actions['image']);
      if (image) {
        strokeStyle = ctx.createPattern(image, 'repeat');
      }
    }
    strokeStyle = strokeStyle || actions['color'];

    const style = {
      'strokeStyle': strokeStyle,
      'lineWidth': actions['width'],
      'lineCap': actions['linecap'] || defaultLinejoin,
      'lineJoin': actions['linejoin'] || defaultLinecap,
      'globalAlpha': actions['opacity'],
      'miterLimit': 4
    }

    contextUtils.applyStyle(ctx, style);
    ctx.stroke();

    this.pathOpened = false;
  }
};

},{"../utils/style":28,"./path":12}],12:[function(require,module,exports){
'use strict';

const geom = require('../utils/geom');

/**
 ** Render features on Canvas
 **/

function drawRing(points, ctx, tileWidth, tileHeight, drawOnTileEdges) {
  if (points.length <= 1) {
    //Geometry is too short
    return;
  }

  ctx.moveTo(points[0][0], points[0][1]);

  //TODO: Those constants MUST be configured un upper design level
  const padding = 50; // how many pixels to draw out of the tile to avoid path edges when lines crosses tile borders
  const skip = 1; // do not draw line segments shorter than this

  for (let j = 1, pointsLen = points.length; j < pointsLen; j++) {
    const point = points[j];
    //const prevPoint = points[j - 1]

    //TODO: Make padding an option to let user prepare data with padding
    // continue path off the tile by some amount to fix path edges between tiles
    if ((j === 0 || j === pointsLen - 1) && geom.isOnTileBoundary(point, tileWidth, tileHeight)) {
      let k = j;
      let dist, dx, dy;
      do {
        k = j ? k - 1 : k + 1;
        if (k < 0 || k >= pointsLen) {
          break;
        }

        const prevPoint = points[k];

        dx = point[0] - prevPoint[0];
        dy = point[1] - prevPoint[1];
        dist = Math.sqrt(dx * dx + dy * dy);
      } while (dist <= skip);

      // all points are so close to each other that it doesn't make sense to
      // draw the line beyond the tile border, simply skip the entire line from
      // here
      if (k < 0 || k >= pointsLen) {
        break;
      }

      point[0] = point[0] + padding * dx / dist;
      point[1] = point[1] + padding * dy / dist;
    }

    if (!drawOnTileEdges && geom.checkSameBoundary(point, points[j - 1], tileWidth, tileHeight)) {
      // Don't draw lines on tile boundaries
      ctx.moveTo(point[0], point[1]);
    } else {
      // Draw a line or filling contour
      ctx.lineTo(point[0], point[1]);
    }
  }
}

module.exports = function(ctx, geometry, dashes, drawOnTileEdges, projectPointFunction, tileWidth, tileHeight) {
  var type = geometry.type,
    coords = geometry.coordinates;

  //Convert single feature to a mult-type to make rendering easier
  if (type === "Polygon") {
    coords = [coords];
    type = "MultiPolygon";
  } else if (type === "LineString") {
    coords = [coords];
    type = "MultiLineString";
  }

  if (dashes) {
    ctx.setLineDash(dashes);
  } else {
    ctx.setLineDash([]);
  }

  if (type === "MultiPolygon") {
    //Iterate by Polygons in MultiPolygon
    for (let i = 0, polygonsLength = coords.length; i < polygonsLength; i++) {
      //Iterate by Rings of the Polygon
      for (let j = 0, ringsLength = coords[i].length; j < ringsLength; j++) {
        const points = coords[i][j].map(projectPointFunction);

        drawRing(points, ctx, tileWidth, tileHeight, drawOnTileEdges);
      }
    }
  } else if (type === "MultiLineString") {
    //Iterate by Lines in MultiLineString
    for (let i = 0, linesLength = coords.length; i < linesLength; i++) {
      const points = coords[i].map(projectPointFunction);

      drawRing(points, ctx, tileWidth, tileHeight, false)
    }
  }
};

},{"../utils/geom":27}],13:[function(require,module,exports){
//'use strict';

const path = require('./path');
const contextUtils = require('../utils/style');

module.exports = {
  pathOpened: false,
  render: function (ctx, feature, nextFeature, {projectPointFunction, tileWidth, tileHeight, groupFeaturesByActions, gallery}) {
    const actions = feature.actions;
    const nextActions = nextFeature && nextFeature.actions;
    if (!this.pathOpened) {
      this.pathOpened = true;
      ctx.beginPath();
    }

    path(ctx, feature.geometry, false, true, projectPointFunction, tileWidth, tileHeight);

    if (groupFeaturesByActions &&
        nextFeature &&
        nextFeature.key === feature.key) {
      return;
    }

    if ('fill-color' in actions) {
      // first pass fills with solid color
      let style = {
        fillStyle: actions["fill-color"],
        globalAlpha: actions["fill-opacity"] || actions['opacity']
      };

      contextUtils.applyStyle(ctx, style);
      ctx.fill();
    }

    if ('fill-image' in actions) {
      // second pass fills with texture
      const image = gallery.getImage(actions['fill-image']);
      if (image) {
        let style = {
          fillStyle: ctx.createPattern(image, 'repeat'),
          globalAlpha: actions["fill-opacity"] || actions['opacity']
        };
        contextUtils.applyStyle(ctx, style);
        ctx.fill();
      }
    }

    this.pathOpened = false;
  }
};

},{"../utils/style":28,"./path":12}],14:[function(require,module,exports){
'use strict';

const CollisionBuffer = require("../utils/collisions");
const canvasContext = require("../utils/style");
const flow = require("../utils/flow");

const line = require("./line");
const polygon = require("./polygon");
const text = require("./text");
const shield = require("./shield");
const icon = require("./icon");

const renders = {
  casing: line.renderCasing,
  line: line.render,
  polygon: polygon.render,
  text: text.render,
  icon: icon.render,
  shield: shield.render
}

function Renderer(gallery, options) {
  this.groupFeaturesByActions = options.groupFeaturesByActions || false;
  this.debug = options.debug || false;
  this.projectPointFunction = options.projectPointFunction;
  this.getFrame = options.getFrame;
  this.gallery = gallery;
}

Renderer.prototype.renderBackground = function(layers, ctx, width, height, zoom) {
  ctx.fillStyle = '#ddd';
  ctx.fillRect(0, 0, width, height);

  //TODO: StyleManager should create background as a layer instead of messing with styles manually
  // var style = this.styleManager.restyle(styles, {}, {}, zoom, 'canvas', 'canvas');
  //
  // var fillRect = function () {
  //     ctx.fillRect(-1, -1, width + 1, height + 1);
  // };
  //
  // for (var i in style) {
  //     polygon.fill(ctx, style[i], fillRect);
  // }
}

function renderCollisions(ctx, node) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 1;
  if (node.leaf) {
    node.children.forEach((box) => ctx.strokeRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY));
  } else {
    node.children.forEach((child) => renderCollisions(ctx, child));
  }
}

Renderer.prototype.render = function(layers, ctx, tileWidth, tileHeight, projectPointFunction, callback) {
  const self = this;

  var collisionBuffer = new CollisionBuffer(tileHeight, tileWidth);
  // render the map
  canvasContext.applyDefaults(ctx);

  const context = {
    collisionBuffer: collisionBuffer,
    gallery: this.gallery,
    tileWidth: tileWidth,
    tileHeight: tileHeight,
    projectPointFunction: projectPointFunction,
    groupFeaturesByActions: self.groupFeaturesByActions
  }

  const funcs = layers.map((layer) => ((next) => {
    const features = layer.features;

    //TODO: Emit event
    console.time(layer.render);

    const renderFn = renders[layer.render];
    for (var j = 0, len = features.length; j < len; j++) {
      renderFn(ctx, features[j], features[j + 1], context);
    }

    //TODO: Emit event
    console.timeEnd(layer.render);

    next();
  }));

  flow.series(funcs, self.getFrame, () => {
    if (self.debug) {
      renderCollisions(ctx, collisionBuffer.buffer.data);
    }
    callback();
  });
}

module.exports = Renderer;

},{"../utils/collisions":24,"../utils/flow":26,"../utils/style":28,"./icon":10,"./line":11,"./polygon":13,"./shield":15,"./text":16}],15:[function(require,module,exports){
'use strict';

const path = require('./path');
const contextUtils = require('../utils/style');
const geom = require('../utils/geom');

module.exports = {
  render: function (ctx, feature, nextFeature, {projectPointFunction, collisionBuffer, gallery}) {
    const actions = feature.actions;

    const point = geom.getReprPoint(feature.geometry, projectPointFunction);
    if (!point) {
      return;
    }

    var img, len = 0, found = false, i, sgn;

    if (actions["shield-image"]) {
      img = gallery.getImage(actions["shield-image"]);
    }

    const style = {
      font: contextUtils.composeFontDeclaration(actions["shield-font-family"] || actions["font-family"], actions["shield-font-size"] || actions["font-size"], actions),
      fillStyle: actions["shield-text-color"],
      globalAlpha: actions["shield-text-opacity"] || actions['opacity'],
      textAlign: 'center',
      textBaseline: 'middle'
    };

    contextUtils.applyStyle(ctx, style);

    var text = String(style['shield-text']),
      textWidth = ctx.measureText(text).width,
      letterWidth = textWidth / text.length,
      collisionWidth = textWidth + 2,
      collisionHeight = letterWidth * 1.8;

    if (feature.type === 'LineString') {
      len = geom.getPolyLength(feature.coordinates);

      if (Math.max(collisionHeight / hs, collisionWidth / ws) > len) {
        return;
      }

      for (i = 0, sgn = 1; i < len / 2; i += Math.max(len / 30, collisionHeight / ws), sgn *= -1) {
        var reprPoint = geom.getAngleAndCoordsAtLength(feature.coordinates, len / 2 + sgn * i, 0);
        if (!reprPoint) {
          break;
        }

        reprPoint = [reprPoint[1], reprPoint[2]];

        point = geom.transformPoint(reprPoint, ws, hs);
        if (img && !actions["allow-overlap"] && collisionBuffer.checkPointWH(point, img.width, img.height, feature.kothicId)) {
          continue;
        }
        if ((!actions["allow-overlap"]) &&
                        collisionBuffer.checkPointWH(point, collisionWidth, collisionHeight, feature.kothicId)) {
          continue;
        }
        found = true;
        break;
      }
    }

    if (!found) {
      return;
    }

    if (style["shield-casing-width"]) {
      contextUtils.applyStyle(ctx, {
        fillStyle: style["shield-casing-color"] || "#000000",
        globalAlpha: style["shield-casing-opacity"] || style['opacity'] || 1
      });
      var p = style["shield-casing-width"] + (style["shield-frame-width"] || 0);
      ctx.fillRect(point[0] - collisionWidth / 2 - p,
        point[1] - collisionHeight / 2 - p,
        collisionWidth + 2 * p,
        collisionHeight + 2 * p);
    }

    if (style["shield-frame-width"]) {
      contextUtils.applyStyle(ctx, {
        fillStyle: style["shield-frame-color"] || "#000000",
        globalAlpha: style["shield-frame-opacity"] || style['opacity'] || 1
      });
      ctx.fillRect(point[0] - collisionWidth / 2 - style["shield-frame-width"],
        point[1] - collisionHeight / 2 - style["shield-frame-width"],
        collisionWidth + 2 * style["shield-frame-width"],
        collisionHeight + 2 * style["shield-frame-width"]);
    }

    if (style["shield-color"]) {
      contextUtils.applyStyle(ctx, {
        fillStyle: style["shield-color"] || "#000000",
        globalAlpha: style["shield-opacity"] || style['opacity'] || 1
      });
      ctx.fillRect(point[0] - collisionWidth / 2,
        point[1] - collisionHeight / 2,
        collisionWidth,
        collisionHeight);
    }

    if (img) {
      ctx.drawImage(img,
        Math.floor(point[0] - img.width / 2),
        Math.floor(point[1] - img.height / 2));
    }
    contextUtils.applyStyle(ctx, {
      fillStyle: style["shield-text-color"] || "#000000",
      globalAlpha: style["shield-text-opacity"] || style['opacity'] || 1
    });

    ctx.fillText(text, point[0], Math.ceil(point[1]));
    if (img) {
      collisionBuffer.addPointWH(point, img.width, img.height, 0, feature.kothicId);
    }

    collisionBuffer.addPointWH(point, collisionHeight, collisionWidth,
      (parseFloat(style["shield-casing-width"]) || 0) + (parseFloat(style["shield-frame-width"]) || 0) + (parseFloat(style["-x-mapnik-min-distance"]) || 30), feature.kothicId);

  }
};

},{"../utils/geom":27,"../utils/style":28,"./path":12}],16:[function(require,module,exports){
'use strict';

const geom = require('../utils/geom');
const contextUtils = require('../utils/style');
//var textOnPath = require("./textonpath").textOnPath;
const textOnPath = require("./curvedtext").render

function renderText(ctx, feature, nextFeature, {projectPointFunction, collisionBuffer}) {
  const actions = feature.actions;

  const hasHalo = 'text-halo-radius' in actions && parseInt(actions['text-halo-radius']) > 0;

  const style = {
    lineWidth: actions['text-halo-radius'],
    font: contextUtils.composeFontDeclaration(actions['font-family'], actions['font-size'], actions),
    fillStyle: actions['text-color'],
    strokeStyle: actions['text-halo-color'],
    globalAlpha: actions['text-opacity'] || actions['opacity'],
    textAlign: 'center',
    textBaseline: 'middle'
  };

  contextUtils.applyStyle(ctx, style);

  var text = String(actions.text).trim();
  if (actions['text-transform'] === 'uppercase') {
    text = text.toUpperCase();
  } else if (actions['text-transform'] === 'lowercase') {
    text = text.toLowerCase();
  } else if (actions['text-transform'] === 'capitalize') {
    text = text.replace(/(^|\s)\S/g, function(ch) { return ch.toUpperCase(); });
  }

  if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'Point') {
    //TODO: Refactor, calculate representative point only once
    const point = geom.getReprPoint(feature.geometry, projectPointFunction);
    if (!point) {
      return;
    }

    const textWidth = ctx.measureText(text).width;
    const letterWidth = textWidth / text.length;
    const width = textWidth;
    const height = letterWidth * 2.5;
    const offsetY = actions['text-offset'];

    const center = [point[0], point[1] + offsetY];
    if (!actions['text-allow-overlap']) {
      if (collisionBuffer.checkPointWH(center, width, height, feature.kothicId)) {
        return;
      }
    }

    if (hasHalo) {
      ctx.strokeText(text, center[0], center[1]);
    }
    ctx.fillText(text, center[0], center[1]);

    const padding = parseFloat(actions['-x-kothic-padding']);
    collisionBuffer.addPointWH(point, width, height, padding, feature.kothicId);
  } else if (feature.geometry.type === 'LineString') {
    const points = feature.geometry.coordinates.map(projectPointFunction);
    textOnPath(ctx, points, text, hasHalo, collisionBuffer);
  }
}

module.exports.render = renderText;

},{"../utils/geom":27,"../utils/style":28,"./curvedtext":9}],17:[function(require,module,exports){
'use strict';

const EVAL_FUNCTIONS = {
  min: function (/*...*/) {
    return Math.min.apply(null, arguments);
  },

  max: function (/*...*/) {
    return Math.max.apply(null, arguments);
  },

  any: function (/*...*/) {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof(arguments[i]) !== 'undefined' && arguments[i] !== '') {
        return arguments[i];
      }
    }

    return '';
  },

  num: function (arg) {
    const n = parseFloat(arg);
    return isNaN(n) ? 0 : n;
  },

  str: function (arg) {
    return '' + arg;
  },

  int: function (arg) {
    const n = parseInt(arg, 10);
    return isNaN(n) ? 0 : n;
  },

  sqrt: function (arg) {
    return Math.sqrt(arg);
  },

  cond: function (arg, trueExpr, falseExpr) {
    trueExpr = trueExpr || true;
    falseExpr = falseExpr || false;

    return arg ? trueExpr : falseExpr;
  },

  metric: function (arg) {
    if (/\d\s*mm$/.test(arg)) {
      return 0.001 * parseFloat(arg);
    } else if (/\d\s*cm$/.test(arg)) {
      return 0.01 * parseFloat(arg);
    } else if (/\d\s*dm$/.test(arg)) {
      return 0.1 * parseFloat(arg);
    } else if (/\d\s*km$/.test(arg)) {
      return 1000 * parseFloat(arg);
    } else if (/\d\s*(in|")$/.test(arg)) {
      return 0.0254 * parseFloat(arg);
    } else if (/\d\s*(ft|')$/.test(arg)) {
      return 0.3048 * parseFloat(arg);
    } else {
      return parseFloat(arg);
    }
  },

  join: function () {
    if (arguments.length === 2 && Object.prototype.toString.call(arguments[1]) === '[object Array]') {
      return arguments[1].join(arguments[0]);
    }
    var tagString = "";

    for (var i = 1; i < arguments.length; i++) {
      tagString = tagString.concat(arguments[0]).concat(arguments[i]);
    }

    return tagString.substr(arguments[0].length);
  },

  split: function (sep, text) {
    return text.split(sep);
  },

  get: function(arr, index) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      return "";
    }

    if (!/^[0-9]+$/.test(index) || index >= arr.length) {
      return "";
    }

    return arr[index];
  },

  set: function(arr, index, text) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      return arr;
    }

    if (!/^[0-9]+$/.test(index)) {
      return arr;
    }

    arr[index] = text;

    return arr;
  },

  count: function(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      return 0;
    }

    return arr.length;
  },

  list: function() {
    return Array.from(arguments);
  },

  append: function(lst, v) {
    if (Object.prototype.toString.call(lst) !== '[object Array]') {
      return [];
    }

    lst.push(v);

    return lst;
  },

  contains: function(lst, v) {
    if (Object.prototype.toString.call(lst) !== '[object Array]') {
      return false;
    }

    return (lst.indexOf(v) >= 0);
  },

  sort: function(lst) {
    if (Object.prototype.toString.call(lst) !== '[object Array]') {
      return [];
    }

    lst.sort();

    return lst;
  },

  reverse: function(lst) {
    if (Object.prototype.toString.call(lst) !== '[object Array]') {
      return [];
    }

    return lst.reverse();
  },
};

function evalBinaryOp(left, op, right) {
  switch (op) {
  case '+':
    return left + right;
  case '-':
    return left - right;
  case '*':
    return left * right;
  case '/':
    return left / right;
  case '%':
    return left % right;
  default:
    throw new TypeError("Unexpected binary opertator in eval " + JSON.stringify(op));
  }
}

function evalFunc(func, args, tags, actions, locales) {
  switch (func) {
  case 'tag':
    if (args.length != 1) {
      throw new Error("tag() function allows only one argument");
    }
    return args[0] in tags ? tags[args[0]] : '';
  case 'prop':
    if (args.length != 1) {
      throw new Error("prop() function allows only one argument");
    }
    return args[0] in actions ? actions[args[0]] : '';
  case 'localize':
    if (args.length != 1) {
      throw new Error("localize() function allows only one argument");
    }
    for (var i = 0; i < locales.length; i++) {
      const tag = args[0] + ':' + locales[i];
      if (tag in tags) {
        return tags[tag];
      }
    }

    return args[0] in tags ? tags[args[0]] : '';
  default:
    if (!(func in EVAL_FUNCTIONS)) {
      throw new Error("Unexpected function in eval " + JSON.stringify(func));
    }
    return EVAL_FUNCTIONS[func].apply(this, args);
  }
}

function evalExpr(expr, tags={}, actions={}, locales=[]) {
  if (!expr) {
    return null;
  }
  switch (expr.type) {
  case "binary_op":
    return evalBinaryOp(evalExpr(expr.left, tags, actions, locales), expr.op, evalExpr(expr.right, tags, actions, locales));
  case "function":
    return evalFunc(expr.func, expr.args.map((x) => evalExpr(x, tags, actions)), tags, actions, locales);
  case "string":
  case "number":
    return expr.value;
  default:
    throw new TypeError("Unexpected expression type " + JSON.stringify(expr));
  }
}

function appendKnownTags(tags, expr, locales) {

  switch (expr.type) {
  case "binary_op":
    appendKnownTags(tags, expr.left);
    appendKnownTags(tags, expr.right);
    break;
  case "function":
    if (expr.func === "tag") {
      if (expr.args && expr.args.length == 1) {
        const tag = evalExpr(expr.args[0], {}, {});
        tags[tag] = 'kv';
      }
    } else if (expr.func === "localize") {
      if (expr.args && expr.args.length == 1) {
        const tag = evalExpr(expr.args[0], {}, {});
        tags[tag] = 'kv';
        locales.map((locale) => tag + ":" + locale)
          .forEach((k) => tags[k] = 'kv');
      }
    } else {
      expr.args.forEach((arg) => appendKnownTags(tags, arg, locales));
    }
    break;
  case "string":
  case "number":
    break;
  default:
    throw new TypeError("Unexpected eval type " + JSON.stringify(expr));
  }
}

module.exports = {
  evalExpr: evalExpr,
  appendKnownTags: appendKnownTags
};

},{}],18:[function(require,module,exports){
const path = require('path');
const { loadImage } = require('canvas')

function Gallery(options) {
  this.localImagesDirectory = options && options.localImagesDirectory;
  this.images = {};
}

Gallery.prototype.preloadImages = function(images) {
  const self = this;
  const uriRegexp = /https?:\/\//;

  //External images
  var promises = images.filter((image) => image.match(uriRegexp))
      .map((image) => loadImage(image).then((data) => self.images[image] = data));

  if (this.localImagesDirectory) {
    const localPromises = images.filter((image) => !image.match(uriRegexp))
      .map((image) => loadImage(path.join(self.localImagesDirectory, image)).then((data) => self.images[image] = data));
    promises = promises.concat(localPromises);
  }

  promises = promises.map((promise) => promise);

  return Promise.all(promises);
}

Gallery.prototype.getImage = function(image) {
  return this.images[image];
}

module.exports = Gallery;

},{"canvas":1,"path":29}],19:[function(require,module,exports){
'use strict';

const rules = require("./rules");
const mapcss = require("mapcss");

/**
 ** @constructor
 ** @param {string} css — MapCSS style in a plain text
 ** @param {Object} options — style options
 ** @param {Object} options.cache:Object — cache implementation. If not specified, caching will be disabled.
 ** @param {Object} options.locales:Array[String] list of supported locales sorted by most prefered first. If not specified, localization will be disabled
 **/
function MapCSS(css, options={}) {
  if (typeof(css) !== 'string' ) {
    throw new TypeError("'css' parameter is required");
  }

  const ast = mapcss.parse(css);

  this.rules = ast;

  if (options.cache) {
    this.cache = options.cache;
  } else {
    this.cache = null;
  }

  if (options.locales) {
    this.locales = options.locales;
  } else {
    this.locales = [];
  }

  this.knownTags = rules.listKnownTags(ast, this.locales);
  this.images = rules.listKnownImages(ast);
}

MapCSS.prototype.listImageReferences = function() {
  return this.images;
}

MapCSS.prototype.createCacheKey = function(tags, zoom, featureType) {
  var keys = [];
  for (var k in tags) {
    //Test only tags, mentioned in CSS selectors
    if (k in this.knownTags) {
      if (this.knownTags[k] === 'kv') {
        //Tag key and values are checked in MapCSS
        keys.push(k + "=" + tags[k]);
      } else {
        //Only tag presence is checked in MapCSS, we don't need to take value in account
        keys.push(k);
      }
    }
  }

  return [zoom, featureType, keys.join(':')].join(':');
}

/**
 ** Apply MapCSS to a feature and return set of layer styles
 ** @param tags {Object} — maps of the feature properties
 ** @param zoom {int} — current zoom level
 ** @param featureType {String} ­— Feature geometry type in terms of GeoJSON
 ** @returns {Object} — {'layer': {'property': 'value'}}
 **/
MapCSS.prototype.apply = function(tags, zoom, featureType) {
  var key;

  if (this.cache) {
    key = this.createCacheKey(tags, zoom, featureType);

    if (this.cache && key in this.cache) {
      return this.cache[key];
    }
  }

  const classes = [];
  const layers = rules.apply(this.rules, tags, classes, zoom, featureType, this.locales);

  if (this.cache) {
    this.cache[key] = layers;
  }
  return layers;
}

module.exports = MapCSS;

},{"./rules":21,"mapcss":4}],20:[function(require,module,exports){
'use strict';

function matchSelector(selector, tags, classes, zoom, featureType) {
  if (!matchFeatureType(selector.type, featureType)) {
    return false;
  }

  if (!matchZoom(selector.zoom, zoom)) {
    return false;
  }

  if (!matchAttributes(selector.attributes, tags)) {
    return false;
  }

  if (!matchClasses(selector.classes, classes)) {
    return false;
  }

  return true;
}


/**
 ** Has side effects for performance reasons (argumant if modified)
 ** knownTags:{tag: 'k'|'kv'}
 ** attributes:[{type, key, value}]
 **/
function appendKnownTags(knownTags, attributes) {
  if (!attributes) {
    return;
  }

  for (var i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    switch (attr.type) {
    case 'presence':
    case 'absence':
      if (knownTags[attr.key] != 'kv') {
        knownTags[attr.key] = 'k';
      }
      break;
    case 'cmp':
    case 'regexp':
      //'kv' should override 'k'
      knownTags[attr.key] = 'kv';
      break;
    }
  }
}


/**
 ** range:Object = {type: 'z', begin: int, end: int}
 ** zoom:int
 **/
function matchZoom(range, zoom) {
  if (!range) {
    return true;
  }

  if (range.type !== 'z') {
    throw new Error("Zoom selector '" + range.type + "' is not supported");
  }

  return zoom >= (range.begin || 0) && zoom <= (range.end || 9000);
}

/**
 ** @param selectorType {string} — "node", "way", "relation", "line", "area", "canvas", "*"
 ** @param featureType {string} — "Point", "MultiPoint", "Polygon", "MultiPolygon", "LineString", "MultiLineString"
 **/
function matchFeatureType(selectorType, featureType) {
  if (selectorType === '*') {
    return true;
  }

  switch (featureType) {
  case 'LineString':
  case 'MultiLineString':
    return selectorType === 'way' || selectorType === 'line';
  case 'Polygon':
  case 'MultiPolygon':
    return selectorType === 'way' || selectorType === 'area';
  case 'Point':
  case 'MultiPoint':
    return selectorType === 'node';
  default:
    //Note: Canvas and Relation are virtual features and cannot be supported at this level
    throw new TypeError("Feature type is not supported: " + featureType);
  }
}

function matchAttributes(attributes, tags) {
  if (!attributes) {
    return true;
  }

  for (var i = 0; i < attributes.length; i++) {
    if (!matchAttribute(attributes[i], tags)) {
      return false;
    }
  }

  return true;
}

/**
 ** Classes are concatenated by AND statement
 ** selectorClasses:[{class:String, not:Boolean}]
 ** classes:[String]
 **/
function matchClasses(selectorClasses, classes) {
  if (!selectorClasses) {
    return true;
  }

  for (var i = 0; i < selectorClasses.length; i++) {
    const selClass = selectorClasses[i];
    if (!matchClass(selClass, classes)) {
      return false;
    }
  }

  return true;
}

function matchClass(selectorClass, classes) {
  for (var i = 0; i < classes.length; i++) {
    const cls = classes[i];
    if (selectorClass.class == cls) {
      return !selectorClass.not;
    }
  }
  return false;
}

/**
 ** op:String — one of "=", "!=", "<", "<=", ">", ">="
 ** expect:String — expected value
 ** value:String — actual value
 **/
function compare(op, expect, value) {
  // parseFloat returns NaN if failed, and NaN compared to anything is false, so
  // no additional type checks are required
  const val = parseFloat(value);
  const exp = parseFloat(expect);

  switch (op) {
  case '=':
    return isNaN(val) || isNaN(exp) ? expect == value : val == exp;
  case '!=':
    return isNaN(val) || isNaN(exp) ? expect != value : val != exp;
  case '<':
    return val < exp;
  case '<=':
    return val <= exp;
  case '>':
    return val > exp;
  case '>=':
    return val >= exp;
  default:
    return false;
  }
}


/**
 ** regexp:String — regular expression
 ** flags:String — regular expression flags
 ** value:String — actual value
 **/
function regexp(regexp, flags, value) {
  const re = new RegExp(regexp, flags);
  return re.test(value);
}

/**
 ** Match tags against single attribute selector
 ** attr:{type:String, key:String, value:String}
 ** tags:{*: *}
 **/
function matchAttribute(attr, tags) {
  switch (attr.type) {
  case 'presence':
    return attr.key in tags;
  case 'absence':
    return !(attr.key in tags);
  case 'cmp':
    return attr.key in tags && compare(attr.op, attr.value, tags[attr.key]);
  case 'regexp':
    return attr.key in tags && regexp(attr.value.regexp, attr.value.flags, tags[attr.key]);
  default:
    throw new Error("Attribute type is not supported: " + attr.type);
  }
}

module.exports = {
  matchZoom: matchZoom,
  matchFeatureType: matchFeatureType,
  matchAttributes: matchAttributes,
  matchAttribute: matchAttribute,
  matchClasses: matchClasses,
  matchSelector: matchSelector,
  appendKnownTags: appendKnownTags
}

},{}],21:[function(require,module,exports){
'use strict';

const matchers = require("./matchers");
const evalProcessor = require("./eval");

/**
 ** Extract all tags, referenced in MapCSS rules.
 **
 ** @param rules {array} — list of MapCSS rules from AST
 ** @param locales {array} — list of supported locales
 ** @return {Object} ­tags — map of tags
 **   key — tag name
 **   value — 'k' if tag value is not used
 **           'kv' if tag value is used
 **/
function listKnownTags(rules, locales=[]) {
  const tags = {};
  rules.forEach((rule) => {
    rule.selectors.forEach((selector) => {
      matchers.appendKnownTags(tags, selector.attributes);
    });

    rule.actions.forEach((action) => {
      const value = action.v;

      if (action.action === 'kv' && action.k === 'text') {
        if (value.type === "string") {
          //Support 'text: "tagname";' syntax sugar statement
          tags[value.v] = 'kv';
        } else if (value.type === "eval") {
          //Support tag() function in eval
          evalProcessor.appendKnownTags(tags, value.v, locales);
        }
      }
    });
  });

  return tags;
}

/**
 ** Extract all images, referenced in MapCSS rules.
 ** @param rules {array} — list of MapCSS rules from AST
 ** @return {array} — unique list of images
 **/
function listKnownImages(rules) {
  const images = {};

  const imageActions = ['image', 'shield-image', 'icon-image', 'fill-image'];

  rules.forEach((rule) => {
    rule.actions.forEach((action) => {
      const value = action.v;

      if (action.action === 'kv' && imageActions.includes(action.k)) {
        if (value.type === "string") {
          images[value.v.trim()] = true;
        }
      }
    });
  });

  return Object.keys(images);
}

/**
 ** Apply MapCSS style to a specified feature in specified context
 ** @param rules {array} — list of MapCSS rules from AST
 ** @param tags {Object} — key-value map of feature properties
 ** @param classes {array} — list of feature classes
 ** @param zoom {int} — zoom level in terms of tiling scheme
 ** @param featureType {string} — feature type in terms of GeoJSON features
 ** @param locales {array} — list of supported locales in prefered order
 ** @returns {Object} — map of layers for rendering
 **
 ** NB: this method is called for each rendered feature, so it must be
 ** as performance optimized as possible.
 **/
function apply(rules, tags, classes, zoom, featureType, locales) {
  const layers = {};

  for (var i = 0; i < rules.length; i++) {
    const rule = rules[i];

    const ruleLayers = applyRule(rule, tags, classes, zoom, featureType, locales);
    var exit = false;
    for (var layer in ruleLayers) {
      layers[layer] = layers[layer] || {};
      if ('exit' in ruleLayers[layer]) {
        exit = true;
        delete ruleLayers[layer]['exit'];
      }
      Object.assign(layers[layer], ruleLayers[layer]);
    }

    if (exit) {
      break;
    }
  }

  return layers;
}

/**
 ** return {layer, {prop, value}};
 **/
function applyRule(rule, tags, classes, zoom, featureType, locales) {
  const selectors = rule.selectors;
  const actions = rule.actions;
  const result = {};

  for (var i = 0; i < selectors.length; i++) {
    const selector = selectors[i];
    if (matchers.matchSelector(selector, tags, classes, zoom, featureType)) {
      const layer = selector.layer || 'default';
      const properties = result[layer] || {}
      const props = unwindActions(actions, tags, properties, locales, classes);

      result[layer] = Object.assign(properties, props);

      if ('exit' in properties) {
        break;
      }
    }
  }

  return result;
}

function unwindActions(actions, tags, properties, locales, classes) {
  const result = {};

  for (var i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.action) {
    case 'kv':
      if (action.k === 'text') {
        if (action.v.type === 'string') {
          if (action.v.v in tags) {
            result[action.k] = tags[action.v.v];
          } else {
            result[action.k] = '';
          }
        } else {
          result[action.k] = unwindValue(action.v, tags, properties, locales);
        }
      } else {
        const value = unwindValue(action.v, tags, properties, locales);
        result[action.k] = value;
      }
      break;
    case 'set_class':
      if (!classes.includes(action.v.class)) {
        classes.push(action.v.class);
      }
      break;
    case 'set_tag':
      tags[action.k] = unwindValue(action.v, tags, properties, locales);
      break;
    case 'exit':
      result['exit'] = true;
      return result;
    default:
      throw new TypeError("Action type is not supproted: " + JSON.stringify(action));
    }
  }
  return result;
}

function unwindValue(value, tags, properties, locales) {
  switch (value.type) {
  case 'string':
    return value.v;
  case 'csscolor':
    return formatCssColor(value.v);
  case 'eval':
    return evalProcessor.evalExpr(value.v, tags, properties, locales);
  default:
    throw new TypeError("Value type is not supproted: " + JSON.stringify(value));
  }
}

function formatCssColor(color) {
  if ('r' in color && 'g' in color && 'b' in color && 'a' in color) {
    return "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
  } else if ('r' in color && 'g' in color && 'b' in color) {
    return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
  } else if ('h' in color && 's' in color && 'l' in color && 'a' in color) {
    return "hsla(" + color.h + ", " + color.s + ", " + color.l + ", " + color.a + ")";
  } else if ('h' in color && 's' in color && 'l' in color) {
    return "hsl(" + color.h + ", " + color.s + ", " + color.l + ")";
  }

  throw new TypeError("Unexpected color space " + JSON.stringify(color));
}

module.exports = {
  listKnownTags: listKnownTags,
  listKnownImages: listKnownImages,
  apply: apply,
}

},{"./eval":17,"./matchers":20}],22:[function(require,module,exports){
'use strict';

const supports = require("./supports");

/**
 ** @param options {Object}
 ** @param options.groupFeaturesByActions {boolean} sort features by performed actions.
 **     This optimization significately improves performance in Chrome canvas implementation, but slows down node-canvas
 **/
function StyleManager(mapcss, options) {
  this.mapcss = mapcss;

  this.groupFeaturesByActions = (options && options.groupFeaturesByActions) || false;
}

function checkActions(actions, requiredActions) {
  for (var k in actions) {
    if (requiredActions.includes(k)) {
      return true;
    }
  }

  return false;
}

//TODO Extract to supports.js
function createRenders(featureType, actions) {
  const renders = {};

  supports.forEach((renderSpec) => {
    if (!renderSpec.featureTypes.includes(featureType)) {
      return;
    }

    if (!checkActions(actions, renderSpec.requiredActions)) {
      return;
    }

    const renderActions = {
      'major-z-index': renderSpec.priority
    };

    renderSpec.actions.forEach((spec) => {
      const value = extractActionValue(spec, actions);
      if (typeof(value) !== 'undefined' && value != null) {
        renderActions[spec.action] = value;
      }
    });

    renders[renderSpec.name] = renderActions;
  });

  return renders;
}

function extractActionValue(spec, actions) {
  //TODO: Override values by priority. e.g. fill-opacity <- opacity <- default
  if (!(spec.action in actions)) {
    return typeof(spec.default) !== 'undefined' ? spec.default : null;
  }

  var value = actions[spec.action];
  switch (spec.type) {
  case 'number':
    value = parseFloat(value);
    break;
  case 'dashes':
    value = value.split(",").map(parseFloat);
    break;
  case 'boolean':
    value = value === 'true' ? true : !!value;
    break;
  case 'string':
    value = value === '' ? null : value;
    break;
  case 'color':
  case 'uri':
  default:
    break;
  }
  return [value, spec.default].find((x) => x !== null && typeof(x) !== 'undefined');
}



StyleManager.prototype.createFeatureRenders = function(feature, kothicId, zoom) {
  const featureActions = this.mapcss.apply(feature.properties, zoom, feature.geometry.type);

  const layers = {};

  for (var layerName in featureActions) {
    const renders = createRenders(feature.geometry.type, featureActions[layerName]);
    for (var render in renders) {
      const actions = renders[render];
      const zIndex = parseInt(actions['z-index']) || 0;
      const majorZIndex = parseInt(actions['major-z-index']);
      delete actions['z-index'];
      delete actions['major-z-index'];

      const restyledFeature = {
        kothicId: kothicId,
        geometry: feature.geometry,
        actions: actions,
      };

      if (this.groupFeaturesByActions) {
        restyledFeature['key'] = JSON.stringify(actions);
      }

      const layer = [zIndex, majorZIndex, layerName, render].join(',');

      layers[layer] = restyledFeature;
    }
  }
  return layers;
}
/**
 ** @param a {array} [zIndex, majorZIndex, layerName, render]
 ** @return <0 — prefer a
 ** @return >0 — prefer b
 **/
function compareLayers(a, b) {
  const layerNameA = a[2];
  const layerNameB = b[2];

  const zIndexA = parseInt(a[0]);
  const zIndexB = parseInt(b[0]);

  const majorZIndexA = parseInt(a[1]);
  const majorZIndexB = parseInt(b[1]);
  if (layerNameA == layerNameB) {
    if (majorZIndexA != majorZIndexB) {
      return majorZIndexA - majorZIndexB;
    }

    if (zIndexA != zIndexB) {
      return zIndexA - zIndexB;
    }

    throw new Error("Duplicate layers: " + JSON.stringify(a) + " and " + JSON.stringify(b));
  } else if (layerNameA == 'default') {
    return -1;
  } else if (layerNameB == 'default') {
    return 1;
  } else {
    if (zIndexA != zIndexB) {
      return zIndexA - zIndexB;
    }

    return layerNameA.localeCompare(layerNameB);
  }
}
/**
 **
 **
 ** @return {array} [{render: 'casing', zIndex: 0, features: []}, {render: 'line', features: []}, {render: 'line', features: []}]
 **
 **/
StyleManager.prototype.createLayers = function(features, zoom) {
  const layers = {};

  for (var i = 0; i < features.length; i++) {
    const renders = this.createFeatureRenders(features[i], i + 1, zoom);

    for (var key in renders) {
      layers[key] = layers[key] || [];

      layers[key].push(renders[key]);
    }
  }

  const result = [];
  const layerKeys = Object.keys(layers)   // ["0,casings", "1,lines"]
    .map((k) => k.split(","))             // [["0", "casings"], ["1", "lines"]]
    .sort(compareLayers)
    .forEach(([zIndex, majorZIndex, layerName, render]) => {
      const features = layers[[zIndex, majorZIndex, layerName, render].join(',')];

      if (this.groupFeaturesByActions) {
        features.sort((a, b) => a.key.localeCompare(b.key));
      }

      result.push({
        render: render,
        zIndex: parseInt(zIndex),
        majorZIndex: parseInt(majorZIndex),
        objectZIndex: layerName,
        features: features
      });
    });

  return result;
}

module.exports = StyleManager;

},{"./supports":23}],23:[function(require,module,exports){
module.exports = [
  {
    "name": "polygon",
    "featureTypes": ["Polygon", "MultiPolygon"],
    "requiredActions": ["fill-color", "fill-image"],
    "actions": [
      {
        "action": "z-index",
        "default": 0,
        "type": "number"
      }, {
        "action": "fill-color",
        "default": "rgb(0, 0, 0)",
        "type": "color"
      }, {
        "action": "fill-image",
        "type": "uri"
      }, {
        "action": "fill-opacity",
        "type": "number",
        "default": 1
      },
    ],
    "priority": 10
  }, {
    "name": "casing",
    "featureTypes": ["LineString", "MultiLineString", "Polygon", "MultiPolygon"],
    "requiredActions": ["casing-width"],
    "actions": [
      {
        "action": "z-index",
        "default": 0,
        "type": "number"
      }, {
        "action": "casing-width",
        "default": 1,
        "type": "number"
      }, {
        "action": "width",
        "default": 0,
        "type": "number"
      }, {
        "action": "casing-color",
        "default": "rgb(0, 0, 0)",
        "type": "color"
      }, {
        "action": "casing-dashes",
        "type": "dashes"
      }, {
        "action": "casing-opacity",
        "default": 1,
        "type": "number"
      }, {
        "action": "casing-linecap",
        "default": "butt",
        "type": "string"
      }, {
        "action": "casing-linejoin",
        "default": "round",
        "type": "string"
      }, {
        "action": "linecap",
        "default": "butt",
        "type": "string"
      }, {
        "action": "linejoin",
        "default": "round",
        "type": "string"
      },

    ],
    "priority": 20
  }, {
    "name": "line",
    "featureTypes": ["LineString", "MultiLineString", "Polygon", "MultiPolygon"],
    "requiredActions": ["width", "image"],
    "actions": [
      {
        "action": "z-index",
        "default": 0,
        "type": "number"
      }, {
        "action": "width",
        "type": "number"
      }, {
        "action": "image",
        "type": "uri"
      }, {
        "action": "color",
        "type": "color",
        "default": "rgb(0, 0, 0)"
      }, {
        "action": "dashes",
        "type": "dashes"
      }, {
        "action": "opacity",
        "type": "number",
        "default": 1
      }, {
        "action": "linecap",
        "type": "string"
      }, {
        "action": "linejoin",
        "type": "string"
      },
    ],
    "priority": 30
  }, {
    "name": "icon",
    "featureTypes": ["Point", "MultiPoint", "Polygon", "MultiPolygon"],
    "requiredActions": ["icon-image"],
    "actions": [
      {
        "action": "z-index",
        "default": 0,
        "type": "number"
      }, {
        "action": "icon-image",
        "type": "uri"
      }, {
        "action": "icon-width",
        "type": "number"
      }, {
        "action": "icon-height",
        "type": "number"
      }, {
        "action": "allow-overlap",
        "type": "boolean"
      }, {
        "action": "-x-kothic-padding",
        "type": "number",
        "default": 20
      }
    ],
    "priority": 40
  }, {
    "name": "text",
    "featureTypes": ["LineString", "MultiLineString", "Point", "MultiPoint", "Polygon", "MultiPolygon"],
    "requiredActions": ["text"],
    "actions": [
      {
        "action": "z-index",
        "default": 0,
        "type": "number"
      }, {
        "action": "text",
        "type": "string"
      }, {
        "action": "text-color",
        "type": "color",
        "default": "#000000"
      }, {
        "action": "text-opacity",
        "type": "number",
        "default": 1
      }, {
        "action": "text-halo-radius",
        "type": "number"
      }, {
        "action": "text-halo-color",
        "type": "color",
        "default": "#000000"
      }, {
        "action": "font-family",
        "type": "string"
      }, {
        "action": "font-size",
        "type": "string"
      }, {
        "action": "text-transform",
        "type": "string"
      }, {
        "action": "text-offset",
        "type": "number"
      }, {
        "action": "text-allow-overlap",
        "type": "boolean"
      }, {
        "action": "-x-kothic-padding",
        "type": "number",
        "default": 20
      }
    ],
    "priority": 50
  }, {
    "name": "shield",
    "featureTypes": ["LineString", "MultiLineString"],
    "requiredActions": ["shield-image", "shield-text"],
    "actions": [
      {
        "action": "z-index",
        "default": 0,
        "type": "number"
      }, {
        "action": "shield-image",
        "type": "uri"
      }, {
        "action": "shield-text",
        "type": "string"
      }, {
        "action": "shield-text-color",
        "type": "color",
        "default": "#000000"
      }, {
        "action": "shield-text-opacity",
        "type": "number",
      }, {
        "action": "opacity",
        "type": "number",
      }, {
        "action": "shield-font-family",
        "type": "string"
      }, {
        "action": "shield-font-size",
        "type": "string"
      }, {
        "action": "font-family",
        "type": "string"
      }, {
        "action": "font-size",
        "type": "string"
      }, {
        "action": "shield-casing-width",
        "type": "number"
      }, {
        "action": "shield-casing-color",
        "default": "#000000",
        "type": "color"
      }, {
        "action": "shield-casing-opacity",
        "default": 1,
        "type": "number"
      }, {
        "action": "shield-frame-width",
        "type": "number"
      }, {
        "action": "shield-frame-color",
        "default": "#000000",
        "type": "color"
      }, {
        "action": "shield-frame-opacity",
        "default": 1,
        "type": "number"
      }, {
        "action": "allow-overlap",
        "type": "boolean"
      }, {
        "action": "-x-kothic-padding",
        "type": "number",
        "default": 20
      }
    ],
    "priority": 60
  },
];

},{}],24:[function(require,module,exports){
'use strict';
const rbush = require('rbush');

const CollisionBuffer = function (height, width) {
  this.buffer = rbush(256);
  this.height = height;
  this.width = width;
};

function getBoxFromPoint(point, width, height, padding, id) {
  const dx = width / 2 + padding;
  const dy = height / 2 + padding;

  return {
    minX: point[0] - dx,
    minY: point[1] - dy,
    maxX: point[0] + dx,
    maxY: point[1] + dy,
    id: id
  };
}

CollisionBuffer.prototype.addPointWH = function (point, width, height, padding, id) {
  this.buffer.insert(getBoxFromPoint(point, width, height, padding, id));
}

CollisionBuffer.prototype.addPoints = function (params) {
  const points = params.map((args) => getBoxFromPoint.apply(null, args));
  this.buffer.load(points);
}

CollisionBuffer.prototype.check = function(box) {
  const result = this.buffer.search(box);
  return result.length == 0;
}

CollisionBuffer.prototype.checkPointWH = function (point, width, height, id) {
  const box = getBoxFromPoint(point, width, height, 0);

  //Always show collision outside the CollisionBuffer
  //TODO: Why do we need this???
  if (box.minX < 0 || box.minY < 0 || box.maxX > this.width || box.maxY > this.height) {
    return true;
  }

  const result = this.buffer.search(box);

  for (var i = 0, len = result.length; i < len; i++) {
    // Object with same ID doesn't induce a collision, but different ids does
    if (id !== result[i].id) {
      return true;
    }
  }

  return false;
}

module.exports = CollisionBuffer;

},{"rbush":7}],25:[function(require,module,exports){
const colors = {
  'aliceblue': '#F0F8FF',
  'antiquewhite': '#FAEBD7',
  'aqua': '#00FFFF',
  'aquamarine': '#7FFFD4',
  'azure': '#F0FFFF',
  'beige': '#F5F5DC',
  'bisque': '#FFE4C4',
  'black': '#000000',
  'blanchedalmond': '#FFEBCD',
  'blue': '#0000FF',
  'blueviolet': '#8A2BE2',
  'brown': '#A52A2A',
  'burlywood': '#DEB887',
  'cadetblue': '#5F9EA0',
  'chartreuse': '#7FFF00',
  'chocolate': '#D2691E',
  'coral': '#FF7F50',
  'cornflowerblue': '#6495ED',
  'cornsilk': '#FFF8DC',
  'crimson': '#DC143C',
  'cyan': '#00FFFF',
  'darkblue': '#00008B',
  'darkcyan': '#008B8B',
  'darkgoldenrod': '#B8860B',
  'darkgray': '#A9A9A9',
  'darkgreen': '#006400',
  'darkgrey': '#A9A9A9',
  'darkkhaki': '#BDB76B',
  'darkmagenta': '#8B008B',
  'darkolivegreen': '#556B2F',
  'darkorange': '#FF8C00',
  'darkorchid': '#9932CC',
  'darkred': '#8B0000',
  'darksalmon': '#E9967A',
  'darkseagreen': '#8FBC8F',
  'darkslateblue': '#483D8B',
  'darkslategray': '#2F4F4F',
  'darkslategrey': '#2F4F4F',
  'darkturquoise': '#00CED1',
  'darkviolet': '#9400D3',
  'deeppink': '#FF1493',
  'deepskyblue': '#00BFFF',
  'dimgray': '#696969',
  'dimgrey': '#696969',
  'dodgerblue': '#1E90FF',
  'firebrick': '#B22222',
  'floralwhite': '#FFFAF0',
  'forestgreen': '#228B22',
  'fuchsia': '#FF00FF',
  'gainsboro': '#DCDCDC',
  'ghostwhite': '#F8F8FF',
  'gold': '#FFD700',
  'goldenrod': '#DAA520',
  'gray': '#808080',
  'green': '#008000',
  'greenyellow': '#ADFF2F',
  'grey': '#808080',
  'honeydew': '#F0FFF0',
  'hotpink': '#FF69B4',
  'indianred': '#CD5C5C',
  'indigo': '#4B0082',
  'ivory': '#FFFFF0',
  'khaki': '#F0E68C',
  'lavender': '#E6E6FA',
  'lavenderblush': '#FFF0F5',
  'lawngreen': '#7CFC00',
  'lemonchiffon': '#FFFACD',
  'lightblue': '#ADD8E6',
  'lightcoral': '#F08080',
  'lightcyan': '#E0FFFF',
  'lightgoldenrodyellow': '#FAFAD2',
  'lightgray': '#D3D3D3',
  'lightgreen': '#90EE90',
  'lightgrey': '#D3D3D3',
  'lightpink': '#FFB6C1',
  'lightsalmon': '#FFA07A',
  'lightseagreen': '#20B2AA',
  'lightskyblue': '#87CEFA',
  'lightslategray': '#778899',
  'lightslategrey': '#778899',
  'lightsteelblue': '#B0C4DE',
  'lightyellow': '#FFFFE0',
  'lime': '#00FF00',
  'limegreen': '#32CD32',
  'linen': '#FAF0E6',
  'magenta': '#FF00FF',
  'maroon': '#800000',
  'mediumaquamarine': '#66CDAA',
  'mediumblue': '#0000CD',
  'mediumorchid': '#BA55D3',
  'mediumpurple': '#9370DB',
  'mediumseagreen': '#3CB371',
  'mediumslateblue': '#7B68EE',
  'mediumspringgreen': '#00FA9A',
  'mediumturquoise': '#48D1CC',
  'mediumvioletred': '#C71585',
  'midnightblue': '#191970',
  'mintcream': '#F5FFFA',
  'mistyrose': '#FFE4E1',
  'moccasin': '#FFE4B5',
  'navajowhite': '#FFDEAD',
  'navy': '#000080',
  'oldlace': '#FDF5E6',
  'olive': '#808000',
  'olivedrab': '#6B8E23',
  'orange': '#FFA500',
  'orangered': '#FF4500',
  'orchid': '#DA70D6',
  'palegoldenrod': '#EEE8AA',
  'palegreen': '#98FB98',
  'paleturquoise': '#AFEEEE',
  'palevioletred': '#DB7093',
  'papayawhip': '#FFEFD5',
  'peachpuff': '#FFDAB9',
  'peru': '#CD853F',
  'pink': '#FFC0CB',
  'plum': '#DDA0DD',
  'powderblue': '#B0E0E6',
  'purple': '#800080',
  'red': '#FF0000',
  'rosybrown': '#BC8F8F',
  'royalblue': '#4169E1',
  'saddlebrown': '#8B4513',
  'salmon': '#FA8072',
  'sandybrown': '#F4A460',
  'seagreen': '#2E8B57',
  'seashell': '#FFF5EE',
  'sienna': '#A0522D',
  'silver': '#C0C0C0',
  'skyblue': '#87CEEB',
  'slateblue': '#6A5ACD',
  'slategray': '#708090',
  'slategrey': '#708090',
  'snow': '#FFFAFA',
  'springgreen': '#00FF7F',
  'steelblue': '#4682B4',
  'tan': '#D2B48C',
  'teal': '#008080',
  'thistle': '#D8BFD8',
  'tomato': '#FF6347',
  'turquoise': '#40E0D0',
  'violet': '#EE82EE',
  'wheat': '#F5DEB3',
  'white': '#FFFFFF',
  'whitesmoke': '#F5F5F5',
  'yellow': '#FFFF00',
  'yellowgreen': '#9ACD32'
}

const colors_values = Object.values(colors)
  .sort((a, b) => 0.5 - Math.random());
var index = 0;

function nextColor() {
  const color = colors_values[index++];
  if (index > colors_values.length) {
    index = 0;
  }
  return color;
}

module.exports.nextColor = nextColor;

},{}],26:[function(require,module,exports){
'use strict';
function series(fns, getFrame, callback) {
  if (fns.length == 0) {
    return callback();
  }

  var current = 0;

  function next() {
    if (current >= fns.length) {
      callback();
    } else {
      getFrame(() => fns[current++](next));
    }
  }

  next();
}

module.exports.series = series;

},{}],27:[function(require,module,exports){
/**
  * Collection of geometry utillities
  */

// check if the point [in XY coordinates] is on tile's edge
// returns 4-bits bitmask of affected tile boundaries:
//   bit 0 - left
//   bit 1 - right
//   bit 2 - top
//   bit 3 - bottom
exports.isOnTileBoundary = function(p, tile_width, tile_height) {
  var r = 0;
  if (p[0] === 0) {
    r |= 1;
  } else if (p[0] === tile_width) {
    r |= 2;
  }

  if (p[1] === 0) {
    r |= 4;
  } else if (p[1] === tile_height) {
    r |= 8;
  }
  return r;
}

/* check if 2 points are both on the same tile boundary
 *
 * If points of the object are on the same tile boundary it is assumed
 * that the object is cut here and would originally continue beyond the
 * tile borders.
 *
 * This check does not catch the case where the object is located exactly
 * on the tile boundaries, but this case can't properly be detected here.
 */
exports.checkSameBoundary = function(p, q, tile_width, tile_height) {
  var bp = exports.isOnTileBoundary(p, tile_width, tile_height);

  if (!bp) {
    return false;
  }

  return (bp & exports.isOnTileBoundary(q, tile_width, tile_height));
}

// get a single point representing geometry feature (e.g. centroid)
exports.getReprPoint = function (geometry, projectPointFunction) {
  switch (geometry.type) {
  case 'Point':
    point = geometry.coordinates;
    break;
  case 'Polygon':
    //TODO: Don't expect we're have this field. We may have plain JSON here,
    // so it's better to check a feature property and calculate polygon centroid here
    // if server doesn't provide representative point
    point = geometry.reprpoint;
    break;
  case 'LineString':
    // Use center of line here
    // TODO: This approach is pretty rough: we need to check not only single point,
    // for label placing, but any point on the line
    var len = exports.getPolyLength(geometry.coordinates);
    var point = exports.getAngleAndCoordsAtLength(geometry.coordinates, len / 2, 0);
    point = [point[1], point[2]];
    break;
  case 'GeometryCollection':
    //TODO: Disassemble geometry collection
    return;
  case 'MultiPoint':
    //TODO: Disassemble multi point
    return;
  case 'MultiPolygon':
    point = geometry.reprpoint;
    break;
  case 'MultiLineString':
    //TODO: Disassemble geometry collection
    return;
  }
  return projectPointFunction(point);
};

// Calculate length of line
exports.getPolyLength = function (points) {
  var length = 0;

  for (var i = 1; i < points.length; i++) {
    var c = points[i],
      pc = points[i - 1],
      dx = pc[0] - c[0],
      dy = pc[1] - c[1];

    length += Math.sqrt(dx * dx + dy * dy);
  }
  return length;
};

exports.getAngleAndCoordsAtLength = function (points, dist, width) {
  var x, y,
    length = 0,
    angle, sameseg = true,
    gotxy = false;

  width = width || 0; // by default we think that a letter is 0 px wide

  for (var i = 1; i < points.length; i++) {
    if (gotxy) {
      sameseg = false;
    }

    var c = points[i],
      pc = points[i - 1],
      dx = c[0] - pc[0],
      dy = c[1] - pc[1];

    var segLen = Math.sqrt(dx * dx + dy * dy);

    if (!gotxy && length + segLen >= dist) {
      var partLen = dist - length;
      x = pc[0] + dx * partLen / segLen;
      y = pc[1] + dy * partLen / segLen;

      gotxy = true;
    }

    if (gotxy && length + segLen >= dist + width) {
      var partLen = dist + width - length;

      dx = pc[0] + dx * partLen / segLen;
      dy = pc[1] + dy * partLen / segLen;
      angle = Math.atan2(dy - y, dx - x);

      if (sameseg) {
        return [angle, x, y, segLen - partLen];
      } else {
        return [angle, x, y, 0];
      }
    }

    length += segLen;
  }
};

},{}],28:[function(require,module,exports){
'use strict';

/**
 ** Utillity class for managing Canvas context style properties
 **/

const defaultCanvasStyle = {
  strokeStyle: 'rgba(0,0,0,0.5)',
  fillStyle: 'rgba(0,0,0,0.5)',
  lineWidth: 1,
  lineCap: 'round',
  lineJoin: 'round',
  textAlign: 'center',
  textBaseline: 'middle'
};

/**
 ** Compose font declaration string for Canvas context
 **/
exports.composeFontDeclaration = function(name='', size=9, style) {
  var family = name ? name + ', ' : '';
  name = name.toLowerCase();

  var parts = [];
  if (style['font-style'] === 'italic' || style['font-style'] === 'oblique') {
    parts.push(style['font-style']);
  }

  if (style['font-variant'] === 'small-caps') {
    parts.push(style['font-variant']);
  }

  if (style['font-weight'] === 'bold') {
    parts.push(style['font-weight']);
  }

  parts.push(size + 'px');

  if (name.indexOf('serif') !== -1 && name.indexOf('sans-serif') === -1) {
    family += 'Georgia, serif';
  } else {
    family += '"Helvetica Neue", Arial, Helvetica, sans-serif';
  }
  parts.push(family);

  return parts.join(' ');
}

/**
 ** Apply styles to Canvas context
 **/
exports.applyStyle = function(ctx, style) {
  for (var key in style) {
    if (style.hasOwnProperty(key)) {
      ctx[key] = style[key];
    }
  }
}

/**
 ** Apply default style to Canvas context
 **/
exports.applyDefaults = function(ctx) {
  exports.applyStyle(ctx, defaultCanvasStyle);
}

},{}],29:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":30}],30:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],31:[function(require,module,exports){
//TODO: Extract kothic-leaflet to another project
window.L.Kothic = require("kothic");

//window.MapCSS = require("./src/style/mapcss");

// if (options && typeof options.devicePixelRatio !== 'undefined') {
//     this.devicePixelRatio = options.devicePixelRatio;
// } else {
//     this.devicePixelRatio = 1;
// }

// if (typeof canvas === 'string') {
// TODO: Avoid document
//     canvas = document.getElementById(canvas);
// }
// TODO: Consider moving this logic outside
// var devicePixelRatio = 1; //Math.max(this.devicePixelRatio || 1, 2);

// if (devicePixelRatio !== 1) {
//     canvas.style.width = width + 'px';
//     canvas.style.height = height + 'px';
//     canvas.width = canvas.width * devicePixelRatio;
//     canvas.height = canvas.height * devicePixelRatio;
// }
// ctx.scale(devicePixelRatio, devicePixelRatio);


window.Kothic.loadJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        try {
          callback(JSON.parse(xhr.responseText));
        } catch (err) {
          console.error(url, err);
        }
      } else {
        console.debug("failed:", url, xhr.status);
      }
    }
  }
  xhr.open("GET", url, true);
  xhr.send(null);
}

},{"kothic":8}]},{},[31])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9rb3RoaWMtanMvbm9kZV9tb2R1bGVzL2NhbnZhcy9icm93c2VyLmpzIiwiLi4va290aGljLWpzL25vZGVfbW9kdWxlcy9jYW52YXMvbGliL3BhcnNlLWZvbnQuanMiLCIuLi9rb3RoaWMtanMvbm9kZV9tb2R1bGVzL21hcGNzcy9saWIvZ3JhbW1hci5qcyIsIi4uL2tvdGhpYy1qcy9ub2RlX21vZHVsZXMvbWFwY3NzL2xpYi9tYXBjc3MtcGFyc2VyLmpzIiwiLi4va290aGljLWpzL25vZGVfbW9kdWxlcy9uZWFybGV5L2xpYi9uZWFybGV5LmpzIiwiLi4va290aGljLWpzL25vZGVfbW9kdWxlcy9xdWlja3NlbGVjdC9pbmRleC5qcyIsIi4uL2tvdGhpYy1qcy9ub2RlX21vZHVsZXMvcmJ1c2gvaW5kZXguanMiLCIuLi9rb3RoaWMtanMvc3JjL2tvdGhpYy5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvcmVuZGVyZXIvY3VydmVkdGV4dC5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvcmVuZGVyZXIvaWNvbi5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvcmVuZGVyZXIvbGluZS5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvcmVuZGVyZXIvcGF0aC5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvcmVuZGVyZXIvcG9seWdvbi5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvcmVuZGVyZXIvcmVuZGVyZXIuanMiLCIuLi9rb3RoaWMtanMvc3JjL3JlbmRlcmVyL3NoaWVsZC5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvcmVuZGVyZXIvdGV4dC5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvc3R5bGUvZXZhbC5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvc3R5bGUvZ2FsbGVyeS5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvc3R5bGUvbWFwY3NzLmpzIiwiLi4va290aGljLWpzL3NyYy9zdHlsZS9tYXRjaGVycy5qcyIsIi4uL2tvdGhpYy1qcy9zcmMvc3R5bGUvcnVsZXMuanMiLCIuLi9rb3RoaWMtanMvc3JjL3N0eWxlL3N0eWxlLW1hbmFnZXIuanMiLCIuLi9rb3RoaWMtanMvc3JjL3N0eWxlL3N1cHBvcnRzLmpzIiwiLi4va290aGljLWpzL3NyYy91dGlscy9jb2xsaXNpb25zLmpzIiwiLi4va290aGljLWpzL3NyYy91dGlscy9jb2xvcnMuanMiLCIuLi9rb3RoaWMtanMvc3JjL3V0aWxzL2Zsb3cuanMiLCIuLi9rb3RoaWMtanMvc3JjL3V0aWxzL2dlb20uanMiLCIuLi9rb3RoaWMtanMvc3JjL3V0aWxzL3N0eWxlLmpzIiwibm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJzcmMva290aGljLWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDampCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIGdsb2JhbHMgZG9jdW1lbnQsIEltYWdlRGF0YSAqL1xuXG5jb25zdCBwYXJzZUZvbnQgPSByZXF1aXJlKCcuL2xpYi9wYXJzZS1mb250JylcblxuZXhwb3J0cy5wYXJzZUZvbnQgPSBwYXJzZUZvbnRcblxuZXhwb3J0cy5jcmVhdGVDYW52YXMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSwgeyB3aWR0aCwgaGVpZ2h0IH0pXG59XG5cbmV4cG9ydHMuY3JlYXRlSW1hZ2VEYXRhID0gZnVuY3Rpb24gKGFycmF5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gIC8vIEJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgSW1hZ2VEYXRhIGxvb2tzIGF0IHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHBhc3NlZFxuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBuZXcgSW1hZ2VEYXRhKClcbiAgICBjYXNlIDE6IHJldHVybiBuZXcgSW1hZ2VEYXRhKGFycmF5KVxuICAgIGNhc2UgMjogcmV0dXJuIG5ldyBJbWFnZURhdGEoYXJyYXksIHdpZHRoKVxuICAgIGRlZmF1bHQ6IHJldHVybiBuZXcgSW1hZ2VEYXRhKGFycmF5LCB3aWR0aCwgaGVpZ2h0KVxuICB9XG59XG5cbmV4cG9ydHMubG9hZEltYWdlID0gZnVuY3Rpb24gKHNyYykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgaW1hZ2Uub25sb2FkID0gbnVsbFxuICAgICAgaW1hZ2Uub25lcnJvciA9IG51bGxcbiAgICB9XG5cbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7IGNsZWFudXAoKTsgcmVzb2x2ZShpbWFnZSkgfVxuICAgIGltYWdlLm9uZXJyb3IgPSAoKSA9PiB7IGNsZWFudXAoKTsgcmVqZWN0KG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgdGhlIGltYWdlIFwiJHtzcmN9XCJgKSkgfVxuXG4gICAgaW1hZ2Uuc3JjID0gc3JjXG4gIH0pXG59XG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBGb250IFJlZ0V4cCBoZWxwZXJzLlxuICovXG5cbmNvbnN0IHdlaWdodHMgPSAnYm9sZHxib2xkZXJ8bGlnaHRlcnxbMS05XTAwJ1xuICAsIHN0eWxlcyA9ICdpdGFsaWN8b2JsaXF1ZSdcbiAgLCB2YXJpYW50cyA9ICdzbWFsbC1jYXBzJ1xuICAsIHN0cmV0Y2hlcyA9ICd1bHRyYS1jb25kZW5zZWR8ZXh0cmEtY29uZGVuc2VkfGNvbmRlbnNlZHxzZW1pLWNvbmRlbnNlZHxzZW1pLWV4cGFuZGVkfGV4cGFuZGVkfGV4dHJhLWV4cGFuZGVkfHVsdHJhLWV4cGFuZGVkJ1xuICAsIHVuaXRzID0gJ3B4fHB0fHBjfGlufGNtfG1tfCV8ZW18ZXh8Y2h8cmVtfHEnXG4gICwgc3RyaW5nID0gJ1xcJyhbXlxcJ10rKVxcJ3xcIihbXlwiXSspXCJ8W1xcXFx3XFxcXHMtXSsnXG5cbi8vIFsgWyA84oCYZm9udC1zdHlsZeKAmT4gfHwgPGZvbnQtdmFyaWFudC1jc3MyMT4gfHwgPOKAmGZvbnQtd2VpZ2h04oCZPiB8fCA84oCYZm9udC1zdHJldGNo4oCZPiBdP1xuLy8gICAgPOKAmGZvbnQtc2l6ZeKAmT4gWyAvIDzigJhsaW5lLWhlaWdodOKAmT4gXT8gPOKAmGZvbnQtZmFtaWx54oCZPiBdXG4vLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLWZvbnRzLTMvI2ZvbnQtcHJvcFxuY29uc3Qgd2VpZ2h0UmUgPSBuZXcgUmVnRXhwKGAoJHt3ZWlnaHRzfSkgK2AsICdpJylcbmNvbnN0IHN0eWxlUmUgPSBuZXcgUmVnRXhwKGAoJHtzdHlsZXN9KSArYCwgJ2knKVxuY29uc3QgdmFyaWFudFJlID0gbmV3IFJlZ0V4cChgKCR7dmFyaWFudHN9KSArYCwgJ2knKVxuY29uc3Qgc3RyZXRjaFJlID0gbmV3IFJlZ0V4cChgKCR7c3RyZXRjaGVzfSkgK2AsICdpJylcbmNvbnN0IHNpemVGYW1pbHlSZSA9IG5ldyBSZWdFeHAoXG4gICcoW1xcXFxkXFxcXC5dKykoJyArIHVuaXRzICsgJykgKidcbiAgKyAnKCg/OicgKyBzdHJpbmcgKyAnKSggKiwgKig/OicgKyBzdHJpbmcgKyAnKSkqKScpXG5cbi8qKlxuICogQ2FjaGUgZm9udCBwYXJzaW5nLlxuICovXG5cbmNvbnN0IGNhY2hlID0ge31cblxuY29uc3QgZGVmYXVsdEhlaWdodCA9IDE2IC8vIHB0LCBjb21tb24gYnJvd3NlciBkZWZhdWx0XG5cbi8qKlxuICogUGFyc2UgZm9udCBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBhcnNlZCBmb250LiBgc2l6ZWAgaXMgaW4gZGV2aWNlIHVuaXRzLiBgdW5pdGAgaXMgdGhlIHVuaXRcbiAqICAgYXBwZWFyaW5nIGluIHRoZSBpbnB1dCBzdHJpbmcuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgLy8gQ2FjaGVkXG4gIGlmIChjYWNoZVtzdHJdKSByZXR1cm4gY2FjaGVbc3RyXVxuXG4gIC8vIFRyeSBmb3IgcmVxdWlyZWQgcHJvcGVydGllcyBmaXJzdC5cbiAgY29uc3Qgc2l6ZUZhbWlseSA9IHNpemVGYW1pbHlSZS5leGVjKHN0cilcbiAgaWYgKCFzaXplRmFtaWx5KSByZXR1cm4gLy8gaW52YWxpZFxuXG4gIC8vIERlZmF1bHQgdmFsdWVzIGFuZCByZXF1aXJlZCBwcm9wZXJ0aWVzXG4gIGNvbnN0IGZvbnQgPSB7XG4gICAgd2VpZ2h0OiAnbm9ybWFsJyxcbiAgICBzdHlsZTogJ25vcm1hbCcsXG4gICAgc3RyZXRjaDogJ25vcm1hbCcsXG4gICAgdmFyaWFudDogJ25vcm1hbCcsXG4gICAgc2l6ZTogcGFyc2VGbG9hdChzaXplRmFtaWx5WzFdKSxcbiAgICB1bml0OiBzaXplRmFtaWx5WzJdLFxuICAgIGZhbWlseTogc2l6ZUZhbWlseVszXS5yZXBsYWNlKC9bXCInXS9nLCAnJykucmVwbGFjZSgvICosICovZywgJywnKVxuICB9XG5cbiAgLy8gT3B0aW9uYWwsIHVub3JkZXJlZCBwcm9wZXJ0aWVzLlxuICBsZXQgd2VpZ2h0LCBzdHlsZSwgdmFyaWFudCwgc3RyZXRjaFxuICAvLyBTdG9wIHNlYXJjaCBhdCBgc2l6ZUZhbWlseS5pbmRleGBcbiAgbGV0IHN1YnN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgc2l6ZUZhbWlseS5pbmRleClcbiAgaWYgKCh3ZWlnaHQgPSB3ZWlnaHRSZS5leGVjKHN1YnN0cikpKSBmb250LndlaWdodCA9IHdlaWdodFsxXVxuICBpZiAoKHN0eWxlID0gc3R5bGVSZS5leGVjKHN1YnN0cikpKSBmb250LnN0eWxlID0gc3R5bGVbMV1cbiAgaWYgKCh2YXJpYW50ID0gdmFyaWFudFJlLmV4ZWMoc3Vic3RyKSkpIGZvbnQudmFyaWFudCA9IHZhcmlhbnRbMV1cbiAgaWYgKChzdHJldGNoID0gc3RyZXRjaFJlLmV4ZWMoc3Vic3RyKSkpIGZvbnQuc3RyZXRjaCA9IHN0cmV0Y2hbMV1cblxuICAvLyBDb252ZXJ0IHRvIGRldmljZSB1bml0cy4gKGBmb250LnVuaXRgIGlzIHRoZSBvcmlnaW5hbCB1bml0KVxuICAvLyBUT0RPOiBjaCwgZXhcbiAgc3dpdGNoIChmb250LnVuaXQpIHtcbiAgICBjYXNlICdwdCc6XG4gICAgICBmb250LnNpemUgLz0gMC43NVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwYyc6XG4gICAgICBmb250LnNpemUgKj0gMTZcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnaW4nOlxuICAgICAgZm9udC5zaXplICo9IDk2XG4gICAgICBicmVha1xuICAgIGNhc2UgJ2NtJzpcbiAgICAgIGZvbnQuc2l6ZSAqPSA5Ni4wIC8gMi41NFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdtbSc6XG4gICAgICBmb250LnNpemUgKj0gOTYuMCAvIDI1LjRcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnJSc6XG4gICAgICAvLyBUT0RPIGRpc2FibGVkIGJlY2F1c2UgZXhpc3RpbmcgdW5pdCB0ZXN0cyBhc3N1bWUgMTAwXG4gICAgICAvLyBmb250LnNpemUgKj0gZGVmYXVsdEhlaWdodCAvIDEwMCAvIDAuNzVcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnZW0nOlxuICAgIGNhc2UgJ3JlbSc6XG4gICAgICBmb250LnNpemUgKj0gZGVmYXVsdEhlaWdodCAvIDAuNzVcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncSc6XG4gICAgICBmb250LnNpemUgKj0gOTYgLyAyNS40IC8gNFxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiAoY2FjaGVbc3RyXSA9IGZvbnQpXG59XG4iLCIvLyBHZW5lcmF0ZWQgYXV0b21hdGljYWxseSBieSBuZWFybGV5LCB2ZXJzaW9uIHVua25vd25cbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7IHJldHVybiB4WzBdOyB9XG5cbi8vIEJ5cGFzc2VzIFRTNjEzMy4gQWxsb3cgZGVjbGFyZWQgYnV0IHVudXNlZCBmdW5jdGlvbnMuXG4vLyBAdHMtaWdub3JlXG5mdW5jdGlvbiBudGgobikge1xuICAgIHJldHVybiBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkW25dO1xuICAgIH07XG59XG5cblxuLy8gQnlwYXNzZXMgVFM2MTMzLiBBbGxvdyBkZWNsYXJlZCBidXQgdW51c2VkIGZ1bmN0aW9ucy5cbi8vIEB0cy1pZ25vcmVcbmZ1bmN0aW9uICQobykge1xuICAgIHJldHVybiBmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMobykuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICAgICAgICByZXRba10gPSBkW29ba11dO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xufVxudmFyIGdyYW1tYXIgPSB7XG4gICAgTGV4ZXI6IHVuZGVmaW5lZCxcbiAgICBQYXJzZXJSdWxlczogW1xuICAgIHtcIm5hbWVcIjogXCJfJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJfJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiXyRlYm5mJDFcIiwgXCJ3c2NoYXJcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIl9cIiwgXCJzeW1ib2xzXCI6IFtcIl8kZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiX18kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ3c2NoYXJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJfXyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIl9fJGVibmYkMVwiLCBcIndzY2hhclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiX19cIiwgXCJzeW1ib2xzXCI6IFtcIl9fJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIndzY2hhclwiLCBcInN5bWJvbHNcIjogWy9bIFxcdFxcblxcdlxcZl0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInVuc2lnbmVkX2ludCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFsvWzAtOV0vXX0sXG4gICAge1wibmFtZVwiOiBcInVuc2lnbmVkX2ludCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInVuc2lnbmVkX2ludCRlYm5mJDFcIiwgL1swLTldL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcInVuc2lnbmVkX2ludFwiLCBcInN5bWJvbHNcIjogW1widW5zaWduZWRfaW50JGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRbMF0uam9pbihcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiaW50JGVibmYkMSRzdWJleHByZXNzaW9uJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCItXCJ9XX0sXG4gICAge1wibmFtZVwiOiBcImludCRlYm5mJDEkc3ViZXhwcmVzc2lvbiQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiK1wifV19LFxuICAgIHtcIm5hbWVcIjogXCJpbnQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJpbnQkZWJuZiQxJHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImludCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiaW50JGVibmYkMlwiLCBcInN5bWJvbHNcIjogWy9bMC05XS9dfSxcbiAgICB7XCJuYW1lXCI6IFwiaW50JGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiaW50JGVibmYkMlwiLCAvWzAtOV0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiaW50XCIsIFwic3ltYm9sc1wiOiBbXCJpbnQkZWJuZiQxXCIsIFwiaW50JGVibmYkMlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgaWYgKGRbMF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoZFswXVswXStkWzFdLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoZFsxXS5qb2luKFwiXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMVwiLCBcInN5bWJvbHNcIjogWy9bMC05XS9dfSxcbiAgICB7XCJuYW1lXCI6IFwidW5zaWduZWRfZGVjaW1hbCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInVuc2lnbmVkX2RlY2ltYWwkZWJuZiQxXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMiRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbL1swLTldL119LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMiRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMiRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMiRzdWJleHByZXNzaW9uJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIuXCJ9LCBcInVuc2lnbmVkX2RlY2ltYWwkZWJuZiQyJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1widW5zaWduZWRfZGVjaW1hbCRlYm5mJDIkc3ViZXhwcmVzc2lvbiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwidW5zaWduZWRfZGVjaW1hbCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwidW5zaWduZWRfZGVjaW1hbFwiLCBcInN5bWJvbHNcIjogW1widW5zaWduZWRfZGVjaW1hbCRlYm5mJDFcIiwgXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoXG4gICAgICAgICAgICAgICAgZFswXS5qb2luKFwiXCIpICtcbiAgICAgICAgICAgICAgICAoZFsxXSA/IFwiLlwiK2RbMV1bMV0uam9pbihcIlwiKSA6IFwiXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImRlY2ltYWwkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiLVwifV0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMlwiLCBcInN5bWJvbHNcIjogWy9bMC05XS9dfSxcbiAgICB7XCJuYW1lXCI6IFwiZGVjaW1hbCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcImRlY2ltYWwkZWJuZiQyXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMyRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbL1swLTldL119LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMyRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJkZWNpbWFsJGVibmYkMyRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMyRzdWJleHByZXNzaW9uJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIuXCJ9LCBcImRlY2ltYWwkZWJuZiQzJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIl19LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkM1wiLCBcInN5bWJvbHNcIjogW1wiZGVjaW1hbCRlYm5mJDMkc3ViZXhwcmVzc2lvbiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiZGVjaW1hbCRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiZGVjaW1hbFwiLCBcInN5bWJvbHNcIjogW1wiZGVjaW1hbCRlYm5mJDFcIiwgXCJkZWNpbWFsJGVibmYkMlwiLCBcImRlY2ltYWwkZWJuZiQzXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChcbiAgICAgICAgICAgICAgICAoZFswXSB8fCBcIlwiKSArXG4gICAgICAgICAgICAgICAgZFsxXS5qb2luKFwiXCIpICtcbiAgICAgICAgICAgICAgICAoZFsyXSA/IFwiLlwiK2RbMl1bMV0uam9pbihcIlwiKSA6IFwiXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInBlcmNlbnRhZ2VcIiwgXCJzeW1ib2xzXCI6IFtcImRlY2ltYWxcIiwge1wibGl0ZXJhbFwiOlwiJVwifV0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkWzBdLzEwMDtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiLVwifV0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFsvWzAtOV0vXX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcImpzb25mbG9hdCRlYm5mJDJcIiwgL1swLTldL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDMkc3ViZXhwcmVzc2lvbiQxJGVibmYkMVwiLCBcInN5bWJvbHNcIjogWy9bMC05XS9dfSxcbiAgICB7XCJuYW1lXCI6IFwianNvbmZsb2F0JGVibmYkMyRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJqc29uZmxvYXQkZWJuZiQzJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIiwgL1swLTldL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDMkc3ViZXhwcmVzc2lvbiQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiLlwifSwgXCJqc29uZmxvYXQkZWJuZiQzJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIl19LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQzXCIsIFwic3ltYm9sc1wiOiBbXCJqc29uZmxvYXQkZWJuZiQzJHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwianNvbmZsb2F0JGVibmYkNCRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbL1srLV0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDQkc3ViZXhwcmVzc2lvbiQxJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFsvWzAtOV0vXX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDQkc3ViZXhwcmVzc2lvbiQxJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wianNvbmZsb2F0JGVibmYkNCRzdWJleHByZXNzaW9uJDEkZWJuZiQyXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMVwiLCBcInN5bWJvbHNcIjogWy9bZUVdLywgXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIiwgXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMSRlYm5mJDJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQ0XCIsIFwic3ltYm9sc1wiOiBbXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDRcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwianNvbmZsb2F0XCIsIFwic3ltYm9sc1wiOiBbXCJqc29uZmxvYXQkZWJuZiQxXCIsIFwianNvbmZsb2F0JGVibmYkMlwiLCBcImpzb25mbG9hdCRlYm5mJDNcIiwgXCJqc29uZmxvYXQkZWJuZiQ0XCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChcbiAgICAgICAgICAgICAgICAoZFswXSB8fCBcIlwiKSArXG4gICAgICAgICAgICAgICAgZFsxXS5qb2luKFwiXCIpICtcbiAgICAgICAgICAgICAgICAoZFsyXSA/IFwiLlwiK2RbMl1bMV0uam9pbihcIlwiKSA6IFwiXCIpICtcbiAgICAgICAgICAgICAgICAoZFszXSA/IFwiZVwiICsgKGRbM11bMV0gfHwgXCIrXCIpICsgZFszXVsyXS5qb2luKFwiXCIpIDogXCJcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiZHFzdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcImRxc3RyaW5nJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiZHFzdHJpbmckZWJuZiQxXCIsIFwiZHN0cmNoYXJcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImRxc3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiXFxcIlwifSwgXCJkcXN0cmluZyRlYm5mJDFcIiwge1wibGl0ZXJhbFwiOlwiXFxcIlwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBkWzFdLmpvaW4oXCJcIik7IH19LFxuICAgIHtcIm5hbWVcIjogXCJzcXN0cmluZyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwic3FzdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJzcXN0cmluZyRlYm5mJDFcIiwgXCJzc3RyY2hhclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3FzdHJpbmdcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCInXCJ9LCBcInNxc3RyaW5nJGVibmYkMVwiLCB7XCJsaXRlcmFsXCI6XCInXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIGRbMV0uam9pbihcIlwiKTsgfX0sXG4gICAge1wibmFtZVwiOiBcImJ0c3RyaW5nJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJidHN0cmluZyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcImJ0c3RyaW5nJGVibmYkMVwiLCAvW15gXS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJidHN0cmluZ1wiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcImBcIn0sIFwiYnRzdHJpbmckZWJuZiQxXCIsIHtcImxpdGVyYWxcIjpcImBcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gZFsxXS5qb2luKFwiXCIpOyB9fSxcbiAgICB7XCJuYW1lXCI6IFwiZHN0cmNoYXJcIiwgXCJzeW1ib2xzXCI6IFsvW15cXFxcXCJcXG5dL10sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJkc3RyY2hhclwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIlxcXFxcIn0sIFwic3RyZXNjYXBlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShcIlxcXCJcIitkLmpvaW4oXCJcIikrXCJcXFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInNzdHJjaGFyXCIsIFwic3ltYm9sc1wiOiBbL1teXFxcXCdcXG5dL10sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJzc3RyY2hhclwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIlxcXFxcIn0sIFwic3RyZXNjYXBlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIEpTT04ucGFyc2UoXCJcXFwiXCIrZC5qb2luKFwiXCIpK1wiXFxcIlwiKTsgfX0sXG4gICAge1wibmFtZVwiOiBcInNzdHJjaGFyJHN0cmluZyQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiXFxcXFwifSwge1wibGl0ZXJhbFwiOlwiJ1wifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3N0cmNoYXJcIiwgXCJzeW1ib2xzXCI6IFtcInNzdHJjaGFyJHN0cmluZyQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gXCInXCI7IH19LFxuICAgIHtcIm5hbWVcIjogXCJzdHJlc2NhcGVcIiwgXCJzeW1ib2xzXCI6IFsvW1wiXFxcXFxcL2JmbnJ0XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwic3RyZXNjYXBlXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwidVwifSwgL1thLWZBLUYwLTldLywgL1thLWZBLUYwLTldLywgL1thLWZBLUYwLTldLywgL1thLWZBLUYwLTldL10sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmpvaW4oXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiY3NzY29sb3JcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIjXCJ9LCBcImhleGRpZ2l0XCIsIFwiaGV4ZGlnaXRcIiwgXCJoZXhkaWdpdFwiLCBcImhleGRpZ2l0XCIsIFwiaGV4ZGlnaXRcIiwgXCJoZXhkaWdpdFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBcInJcIjogcGFyc2VJbnQoZFsxXStkWzJdLCAxNiksXG4gICAgICAgICAgICAgICAgXCJnXCI6IHBhcnNlSW50KGRbM10rZFs0XSwgMTYpLFxuICAgICAgICAgICAgICAgIFwiYlwiOiBwYXJzZUludChkWzVdK2RbNl0sIDE2KSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJjc3Njb2xvclwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIiNcIn0sIFwiaGV4ZGlnaXRcIiwgXCJoZXhkaWdpdFwiLCBcImhleGRpZ2l0XCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFwiclwiOiBwYXJzZUludChkWzFdK2RbMV0sIDE2KSxcbiAgICAgICAgICAgICAgICBcImdcIjogcGFyc2VJbnQoZFsyXStkWzJdLCAxNiksXG4gICAgICAgICAgICAgICAgXCJiXCI6IHBhcnNlSW50KGRbM10rZFszXSwgMTYpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImNzc2NvbG9yJHN0cmluZyQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiclwifSwge1wibGl0ZXJhbFwiOlwiZ1wifSwge1wibGl0ZXJhbFwiOlwiYlwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiY3NzY29sb3JcIiwgXCJzeW1ib2xzXCI6IFtcImNzc2NvbG9yJHN0cmluZyQxXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCIoXCJ9LCBcIl9cIiwgXCJjb2xudW1cIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIixcIn0sIFwiX1wiLCBcImNvbG51bVwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiLFwifSwgXCJfXCIsIFwiY29sbnVtXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCIpXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiAkKHtcInJcIjogNCwgXCJnXCI6IDgsIFwiYlwiOiAxMn0pfSxcbiAgICB7XCJuYW1lXCI6IFwiY3NzY29sb3Ikc3RyaW5nJDJcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJoXCJ9LCB7XCJsaXRlcmFsXCI6XCJzXCJ9LCB7XCJsaXRlcmFsXCI6XCJsXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJjc3Njb2xvclwiLCBcInN5bWJvbHNcIjogW1wiY3NzY29sb3Ikc3RyaW5nJDJcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIihcIn0sIFwiX1wiLCBcImNvbG51bVwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiLFwifSwgXCJfXCIsIFwiY29sbnVtXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCIsXCJ9LCBcIl9cIiwgXCJjb2xudW1cIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIilcIn1dLCBcInBvc3Rwcm9jZXNzXCI6ICQoe1wiaFwiOiA0LCBcInNcIjogOCwgXCJsXCI6IDEyfSl9LFxuICAgIHtcIm5hbWVcIjogXCJjc3Njb2xvciRzdHJpbmckM1wiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcInJcIn0sIHtcImxpdGVyYWxcIjpcImdcIn0sIHtcImxpdGVyYWxcIjpcImJcIn0sIHtcImxpdGVyYWxcIjpcImFcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcImNzc2NvbG9yXCIsIFwic3ltYm9sc1wiOiBbXCJjc3Njb2xvciRzdHJpbmckM1wiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiKFwifSwgXCJfXCIsIFwiY29sbnVtXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCIsXCJ9LCBcIl9cIiwgXCJjb2xudW1cIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIixcIn0sIFwiX1wiLCBcImNvbG51bVwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiLFwifSwgXCJfXCIsIFwiZGVjaW1hbFwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiKVwifV0sIFwicG9zdHByb2Nlc3NcIjogJCh7XCJyXCI6IDQsIFwiZ1wiOiA4LCBcImJcIjogMTIsIFwiYVwiOiAxNn0pfSxcbiAgICB7XCJuYW1lXCI6IFwiY3NzY29sb3Ikc3RyaW5nJDRcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJoXCJ9LCB7XCJsaXRlcmFsXCI6XCJzXCJ9LCB7XCJsaXRlcmFsXCI6XCJsXCJ9LCB7XCJsaXRlcmFsXCI6XCJhXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJjc3Njb2xvclwiLCBcInN5bWJvbHNcIjogW1wiY3NzY29sb3Ikc3RyaW5nJDRcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIihcIn0sIFwiX1wiLCBcImNvbG51bVwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiLFwifSwgXCJfXCIsIFwiY29sbnVtXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCIsXCJ9LCBcIl9cIiwgXCJjb2xudW1cIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIixcIn0sIFwiX1wiLCBcImRlY2ltYWxcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIilcIn1dLCBcInBvc3Rwcm9jZXNzXCI6ICQoe1wiaFwiOiA0LCBcInNcIjogOCwgXCJsXCI6IDEyLCBcImFcIjogMTZ9KX0sXG4gICAge1wibmFtZVwiOiBcImhleGRpZ2l0XCIsIFwic3ltYm9sc1wiOiBbL1thLWZBLUYwLTldL119LFxuICAgIHtcIm5hbWVcIjogXCJjb2xudW1cIiwgXCJzeW1ib2xzXCI6IFtcInVuc2lnbmVkX2ludFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImNvbG51bVwiLCBcInN5bWJvbHNcIjogW1wicGVyY2VudGFnZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24oZCkge3JldHVybiBNYXRoLmZsb29yKGRbMF0qMjU1KTsgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJldmFsJHN0cmluZyQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiZVwifSwge1wibGl0ZXJhbFwiOlwidlwifSwge1wibGl0ZXJhbFwiOlwiYVwifSwge1wibGl0ZXJhbFwiOlwibFwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiZXZhbCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkFTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiZXZhbCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiZXZhbFwiLCBcInN5bWJvbHNcIjogW1wiZXZhbCRzdHJpbmckMVwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiKFwifSwgXCJfXCIsIFwiZXZhbCRlYm5mJDFcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIilcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IG50aCg0KX0sXG4gICAge1wibmFtZVwiOiBcIkFTXCIsIFwic3ltYm9sc1wiOiBbXCJBU1wiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiK1wifSwgXCJfXCIsIFwiTURcIl0sIFwicG9zdHByb2Nlc3NcIjogKFthLCBfMSwgXzIsIF8zLCBiXSkgPT4gKHt0eXBlOiAnYmluYXJ5X29wJywgb3A6IFwiK1wiLCBsZWZ0OiBhLCByaWdodDogYn0pfSxcbiAgICB7XCJuYW1lXCI6IFwiQVNcIiwgXCJzeW1ib2xzXCI6IFtcIkFTXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCItXCJ9LCBcIl9cIiwgXCJNRFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW2EsIF8xLCBfMiwgXzMsIGJdKSA9PiAoe3R5cGU6ICdiaW5hcnlfb3AnLCBvcDogXCItXCIsIGxlZnQ6IGEsIHJpZ2h0OiBifSl9LFxuICAgIHtcIm5hbWVcIjogXCJBU1wiLCBcInN5bWJvbHNcIjogW1wiTURcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJNRFwiLCBcInN5bWJvbHNcIjogW1wiTURcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIipcIn0sIFwiX1wiLCBcIlBcIl0sIFwicG9zdHByb2Nlc3NcIjogKFthLCBfMSwgXzIsIF8zLCBiXSkgPT4gKHt0eXBlOiAnYmluYXJ5X29wJywgb3A6IFwiKlwiLCBsZWZ0OiBhLCByaWdodDogYn0pfSxcbiAgICB7XCJuYW1lXCI6IFwiTURcIiwgXCJzeW1ib2xzXCI6IFtcIk1EXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCIvXCJ9LCBcIl9cIiwgXCJQXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbYSwgXzEsIF8yLCBfMywgYl0pID0+ICh7dHlwZTogJ2JpbmFyeV9vcCcsIG9wOiBcIi9cIiwgbGVmdDogYSwgcmlnaHQ6IGJ9KX0sXG4gICAge1wibmFtZVwiOiBcIk1EXCIsIFwic3ltYm9sc1wiOiBbXCJNRFwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiJVwifSwgXCJfXCIsIFwiUFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW2EsIF8xLCBfMiwgXzMsIGJdKSA9PiAoe3R5cGU6ICdiaW5hcnlfb3AnLCBvcDogXCIlXCIsIGxlZnQ6IGEsIHJpZ2h0OiBifSl9LFxuICAgIHtcIm5hbWVcIjogXCJNRFwiLCBcInN5bWJvbHNcIjogW1wiUFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlBcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIoXCJ9LCBcIl9cIiwgXCJBU1wiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiKVwifV0sIFwicG9zdHByb2Nlc3NcIjogbnRoKDIpfSxcbiAgICB7XCJuYW1lXCI6IFwiUFwiLCBcInN5bWJvbHNcIjogW1wiTlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIk5cIiwgXCJzeW1ib2xzXCI6IFtcImZsb2F0XCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbeF0pID0+ICh7dHlwZTogJ251bWJlcicsIHZhbHVlOiB4fSl9LFxuICAgIHtcIm5hbWVcIjogXCJOXCIsIFwic3ltYm9sc1wiOiBbXCJmdW5jXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiTlwiLCBcInN5bWJvbHNcIjogW1wiZHFzdHJpbmdcIl0sIFwicG9zdHByb2Nlc3NcIjogKFt4XSkgPT4gKHt0eXBlOiAnc3RyaW5nJywgdmFsdWU6IHh9KX0sXG4gICAge1wibmFtZVwiOiBcImZsb2F0XCIsIFwic3ltYm9sc1wiOiBbXCJpbnRcIiwge1wibGl0ZXJhbFwiOlwiLlwifSwgXCJpbnRcIl0sIFwicG9zdHByb2Nlc3NcIjogKGQpID0+IHBhcnNlRmxvYXQoZFswXSArIGRbMV0gKyBkWzJdKX0sXG4gICAge1wibmFtZVwiOiBcImZsb2F0XCIsIFwic3ltYm9sc1wiOiBbXCJpbnRcIl0sIFwicG9zdHByb2Nlc3NcIjogKGQpID0+IHBhcnNlSW50KGRbMF0pfSxcbiAgICB7XCJuYW1lXCI6IFwiZnVuYyRlYm5mJDEkc3ViZXhwcmVzc2lvbiQxXCIsIFwic3ltYm9sc1wiOiBbXCJfXCIsIFwiZnVuY3Rpb25fYXJnXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiZnVuYyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcImZ1bmMkZWJuZiQxJHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImZ1bmMkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcImZ1bmNcIiwgXCJzeW1ib2xzXCI6IFtcInRlcm1cIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIihcIn0sIFwiZnVuYyRlYm5mJDFcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIilcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IChbZnVuYywgXzEsIF8yLCBhcmdzXSkgPT4gKHt0eXBlOiAnZnVuY3Rpb24nLCBmdW5jOiBmdW5jLCBhcmdzOiBhcmdzID8gYXJnc1sxXSA6IFtdfSl9LFxuICAgIHtcIm5hbWVcIjogXCJmdW5jdGlvbl9hcmdcIiwgXCJzeW1ib2xzXCI6IFtcIkFTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbYXJnXSkgPT4gW2FyZ119LFxuICAgIHtcIm5hbWVcIjogXCJmdW5jdGlvbl9hcmdcIiwgXCJzeW1ib2xzXCI6IFtcImZ1bmN0aW9uX2FyZ1wiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiLFwifSwgXCJfXCIsIFwiQVNcIl0sIFwicG9zdHByb2Nlc3NcIjogKFthcmdzLCBfMSwgXzIsIF8zLCBhcmddKSA9PiBhcmdzLmNvbmNhdChhcmcpfSxcbiAgICB7XCJuYW1lXCI6IFwiY3NzJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJjc3MkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJjc3MkZWJuZiQxXCIsIFwicnVsZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiY3NzXCIsIFwic3ltYm9sc1wiOiBbXCJfXCIsIFwiY3NzJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW18xLCBydWxlc10pID0+IHJ1bGVzfSxcbiAgICB7XCJuYW1lXCI6IFwicnVsZSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcImFjdGlvblwiXX0sXG4gICAge1wibmFtZVwiOiBcInJ1bGUkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJydWxlJGVibmYkMVwiLCBcImFjdGlvblwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwicnVsZVwiLCBcInN5bWJvbHNcIjogW1wic2VsZWN0b3JzXCIsIFwicnVsZSRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogKFtzLCBhXSkgPT4gKHtzZWxlY3RvcnM6IHMsIGFjdGlvbnM6IGEgPyBhLnJlZHVjZSgoeCx5KSA9PiB4LmNvbmNhdCh5KSwgW10pIDogW119KX0sXG4gICAge1wibmFtZVwiOiBcInJ1bGVcIiwgXCJzeW1ib2xzXCI6IFtcImltcG9ydFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW2ltcF0pID0+ICh7J2ltcG9ydCcgOiBpbXB9KX0sXG4gICAge1wibmFtZVwiOiBcInNlbGVjdG9yc1wiLCBcInN5bWJvbHNcIjogW1wic2VsZWN0b3JcIl19LFxuICAgIHtcIm5hbWVcIjogXCJzZWxlY3RvcnNcIiwgXCJzeW1ib2xzXCI6IFtcInNlbGVjdG9yc1wiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiLFwifSwgXCJfXCIsIFwic2VsZWN0b3JcIl0sIFwicG9zdHByb2Nlc3NcIjogKFtsaXN0LCBfMSwgXzIsIF8zLCBpdGVtXSkgPT4gbGlzdC5jb25jYXQoaXRlbSl9LFxuICAgIHtcIm5hbWVcIjogXCJzZWxlY3RvcnNcIiwgXCJzeW1ib2xzXCI6IFtcIm5lc3RlZF9zZWxlY3RvclwiXX0sXG4gICAge1wibmFtZVwiOiBcInNlbGVjdG9yJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJzZWxlY3RvciRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInNlbGVjdG9yJGVibmYkMVwiLCBcImNsYXNzXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJzZWxlY3RvciRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcInpvb21cIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJzZWxlY3RvciRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwic2VsZWN0b3IkZWJuZiQzXCIsIFwic3ltYm9sc1wiOiBbXCJhdHRyaWJ1dGVzXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwic2VsZWN0b3IkZWJuZiQzXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcInNlbGVjdG9yJGVibmYkNFwiLCBcInN5bWJvbHNcIjogW1wicHNldWRvY2xhc3Nlc1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInNlbGVjdG9yJGVibmYkNFwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJzZWxlY3RvciRlYm5mJDVcIiwgXCJzeW1ib2xzXCI6IFtcImxheWVyXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwic2VsZWN0b3IkZWJuZiQ1XCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcInNlbGVjdG9yXCIsIFwic3ltYm9sc1wiOiBbXCJ0eXBlXCIsIFwic2VsZWN0b3IkZWJuZiQxXCIsIFwic2VsZWN0b3IkZWJuZiQyXCIsIFwic2VsZWN0b3IkZWJuZiQzXCIsIFwic2VsZWN0b3IkZWJuZiQ0XCIsIFwic2VsZWN0b3IkZWJuZiQ1XCIsIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgKFt0eXBlLCBjbGFzc2VzLCB6b29tLCBhdHRyaWJ1dGVzLCBwc2V1ZG9jbGFzc2VzLCBsYXllcl0pID0+ICh7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgem9vbTogem9vbSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBwc2V1ZG9jbGFzc2VzOiBwc2V1ZG9jbGFzc2VzLFxuICAgICAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgICAgIGxheWVyOiBsYXllclxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJuZXN0ZWRfc2VsZWN0b3JcIiwgXCJzeW1ib2xzXCI6IFtcInNlbGVjdG9yXCIsIFwiX19cIiwgXCJzZWxlY3RvclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW3BhcmVudCwgXywgY2hpbGRdKSA9PiB7Y2hpbGQucGFyZW50ID0gcGFyZW50OyByZXR1cm4gY2hpbGQ7fX0sXG4gICAge1wibmFtZVwiOiBcIm5lc3RlZF9zZWxlY3RvclwiLCBcInN5bWJvbHNcIjogW1wibmVzdGVkX3NlbGVjdG9yXCIsIFwiX19cIiwgXCJzZWxlY3RvclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW3BhcmVudCwgXywgY2hpbGRdKSA9PiB7Y2hpbGQucGFyZW50ID0gcGFyZW50OyByZXR1cm4gY2hpbGQ7fX0sXG4gICAge1wibmFtZVwiOiBcInBzZXVkb2NsYXNzZXMkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJwc2V1ZG9jbGFzc1wiXX0sXG4gICAge1wibmFtZVwiOiBcInBzZXVkb2NsYXNzZXMkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJwc2V1ZG9jbGFzc2VzJGVibmYkMVwiLCBcInBzZXVkb2NsYXNzXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJwc2V1ZG9jbGFzc2VzXCIsIFwic3ltYm9sc1wiOiBbXCJwc2V1ZG9jbGFzc2VzJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInBzZXVkb2NsYXNzXCIsIFwic3ltYm9sc1wiOiBbXCJfXCIsIHtcImxpdGVyYWxcIjpcIjpcIn0sIFwidGVybVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW18xLCBfMiwgcHNldWRvY2xhc3NdKSA9PiBwc2V1ZG9jbGFzc30sXG4gICAge1wibmFtZVwiOiBcImxheWVyJHN0cmluZyQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiOlwifSwge1wibGl0ZXJhbFwiOlwiOlwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwibGF5ZXJcIiwgXCJzeW1ib2xzXCI6IFtcIl9cIiwgXCJsYXllciRzdHJpbmckMVwiLCBcInRlcm1cIl0sIFwicG9zdHByb2Nlc3NcIjogKFtfMSwgXzIsIHZhbHVlXSkgPT4gdmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJhdHRyaWJ1dGVzJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiYXR0cmlidXRlXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiYXR0cmlidXRlcyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcImF0dHJpYnV0ZXMkZWJuZiQxXCIsIFwiYXR0cmlidXRlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJhdHRyaWJ1dGVzXCIsIFwic3ltYm9sc1wiOiBbXCJhdHRyaWJ1dGVzJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImF0dHJpYnV0ZVwiLCBcInN5bWJvbHNcIjogW1wiX1wiLCB7XCJsaXRlcmFsXCI6XCJbXCJ9LCBcInByZWRpY2F0ZVwiLCB7XCJsaXRlcmFsXCI6XCJdXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiAoW18wLCBfMSwgcHJlZGljYXRlcywgXzJdKSA9PiBwcmVkaWNhdGVzfSxcbiAgICB7XCJuYW1lXCI6IFwicHJlZGljYXRlXCIsIFwic3ltYm9sc1wiOiBbXCJ0YWdcIl0sIFwicG9zdHByb2Nlc3NcIjogKFt0YWddKSA9PiAoe3R5cGU6IFwicHJlc2VuY2VcIiwga2V5OiB0YWd9KX0sXG4gICAge1wibmFtZVwiOiBcInByZWRpY2F0ZVwiLCBcInN5bWJvbHNcIjogW1widGFnXCIsIFwiX1wiLCBcIm9wZXJhdG9yXCIsIFwiX1wiLCBcInZhbHVlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbdGFnLCBfMSwgb3AsIF8yLCB2YWx1ZV0pID0+ICh7dHlwZTogXCJjbXBcIiwga2V5OiB0YWcsIHZhbHVlOiB2YWx1ZSwgb3A6IG9wfSl9LFxuICAgIHtcIm5hbWVcIjogXCJwcmVkaWNhdGVcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIhXCJ9LCBcInRhZ1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW18sIHRhZ10pID0+ICh7dHlwZTogXCJhYnNlbmNlXCIsIGtleTogdGFnfSl9LFxuICAgIHtcIm5hbWVcIjogXCJwcmVkaWNhdGUkc3RyaW5nJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJ+XCJ9LCB7XCJsaXRlcmFsXCI6XCI9XCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJwcmVkaWNhdGVcIiwgXCJzeW1ib2xzXCI6IFtcInRhZ1wiLCBcInByZWRpY2F0ZSRzdHJpbmckMVwiLCBcInJlZ2V4cFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW3RhZywgb3AsIHZhbHVlXSkgPT4gKHt0eXBlOiBcInJlZ2V4cFwiLCBrZXk6IHRhZywgdmFsdWU6IHZhbHVlLCBvcDogb3B9KX0sXG4gICAge1wibmFtZVwiOiBcInRhZ1wiLCBcInN5bWJvbHNcIjogW1wic3RyaW5nXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVcIiwgXCJzeW1ib2xzXCI6IFtcInN0cmluZ1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInN0cmluZ1wiLCBcInN5bWJvbHNcIjogW1wiZHFzdHJpbmdcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJzdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbL1thLXpBLVowLTk6X1xcLV0vXX0sXG4gICAge1wibmFtZVwiOiBcInN0cmluZyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInN0cmluZyRlYm5mJDFcIiwgL1thLXpBLVowLTk6X1xcLV0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbXCJzdHJpbmckZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbY2hhcnNdKSA9PiBjaGFycy5qb2luKFwiXCIpfSxcbiAgICB7XCJuYW1lXCI6IFwidGVybSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFsvW2EtekEtWjAtOV9dL119LFxuICAgIHtcIm5hbWVcIjogXCJ0ZXJtJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1widGVybSRlYm5mJDFcIiwgL1thLXpBLVowLTlfXS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJ0ZXJtXCIsIFwic3ltYm9sc1wiOiBbXCJ0ZXJtJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW2NoYXJzXSkgPT4gY2hhcnMuam9pbihcIlwiKX0sXG4gICAge1wibmFtZVwiOiBcIm9wZXJhdG9yXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiPVwifV0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJvcGVyYXRvciRzdHJpbmckMVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIiFcIn0sIHtcImxpdGVyYWxcIjpcIj1cIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcIm9wZXJhdG9yXCIsIFwic3ltYm9sc1wiOiBbXCJvcGVyYXRvciRzdHJpbmckMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIm9wZXJhdG9yXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiPFwifV0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJvcGVyYXRvciRzdHJpbmckMlwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIjxcIn0sIHtcImxpdGVyYWxcIjpcIj1cIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcIm9wZXJhdG9yXCIsIFwic3ltYm9sc1wiOiBbXCJvcGVyYXRvciRzdHJpbmckMlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIm9wZXJhdG9yXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiPlwifV0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJvcGVyYXRvciRzdHJpbmckM1wiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIj5cIn0sIHtcImxpdGVyYWxcIjpcIj1cIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcIm9wZXJhdG9yXCIsIFwic3ltYm9sc1wiOiBbXCJvcGVyYXRvciRzdHJpbmckM1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInpvb21cIiwgXCJzeW1ib2xzXCI6IFtcIl9cIiwge1wibGl0ZXJhbFwiOlwifFwifSwgL1t6c10vLCBcInpvb21faW50ZXJ2YWxcIl0sIFwicG9zdHByb2Nlc3NcIjogIChbXywgcGlwZSwgdHlwZSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnR5cGUgPSB0eXBlO1xuICAgICAgICBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInpvb21faW50ZXJ2YWxcIiwgXCJzeW1ib2xzXCI6IFtcInVuc2lnbmVkX2ludFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW3ZhbHVlXSkgPT4gKHtiZWdpbjogdmFsdWUsIGVuZDogdmFsdWV9KX0sXG4gICAge1wibmFtZVwiOiBcInpvb21faW50ZXJ2YWwkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ1bnNpZ25lZF9pbnRcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJ6b29tX2ludGVydmFsJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJ6b29tX2ludGVydmFsJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1widW5zaWduZWRfaW50XCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiem9vbV9pbnRlcnZhbCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiem9vbV9pbnRlcnZhbFwiLCBcInN5bWJvbHNcIjogW1wiem9vbV9pbnRlcnZhbCRlYm5mJDFcIiwge1wibGl0ZXJhbFwiOlwiLVwifSwgXCJ6b29tX2ludGVydmFsJGVibmYkMlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW2JlZ2luLCBpbnRlcnZhbCwgZW5kXSkgPT4gKHtiZWdpbjogYmVnaW4sIGVuZDogZW5kfSl9LFxuICAgIHtcIm5hbWVcIjogXCJyZWdleHAkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcInJlZ2V4cCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInJlZ2V4cCRlYm5mJDFcIiwgXCJyZWdleHBfY2hhclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwicmVnZXhwJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJyZWdleHAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJyZWdleHAkZWJuZiQyXCIsIFwicmVnZXhwX2ZsYWdcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcInJlZ2V4cFwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIi9cIn0sIFwicmVnZXhwJGVibmYkMVwiLCB7XCJsaXRlcmFsXCI6XCIvXCJ9LCBcInJlZ2V4cCRlYm5mJDJcIl0sIFwicG9zdHByb2Nlc3NcIjogKFtfMSwgYXJyLCBfMiwgZmxhZ3NdKSA9PiAoe3JlZ2V4cDogYXJyLmpvaW4oXCJcIiksIGZsYWdzOiBmbGFncy5qb2luKFwiXCIpfSl9LFxuICAgIHtcIm5hbWVcIjogXCJyZWdleHBfY2hhclwiLCBcInN5bWJvbHNcIjogWy9bXlxcL10vXX0sXG4gICAge1wibmFtZVwiOiBcInJlZ2V4cF9jaGFyXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiL1wifV19LFxuICAgIHtcIm5hbWVcIjogXCJyZWdleHBfZmxhZ1wiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcImlcIn1dfSxcbiAgICB7XCJuYW1lXCI6IFwicmVnZXhwX2ZsYWdcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJnXCJ9XX0sXG4gICAge1wibmFtZVwiOiBcInJlZ2V4cF9mbGFnXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwibVwifV19LFxuICAgIHtcIm5hbWVcIjogXCJhY3Rpb24kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJzdGF0ZW1lbnRcIl19LFxuICAgIHtcIm5hbWVcIjogXCJhY3Rpb24kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJhY3Rpb24kZWJuZiQxXCIsIFwic3RhdGVtZW50XCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJhY3Rpb25cIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJ7XCJ9LCBcIl9cIiwgXCJhY3Rpb24kZWJuZiQxXCIsIHtcImxpdGVyYWxcIjpcIn1cIn0sIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW18xLCBfMiwgc3RhdGVtZW50cywgXzMsIF80XSkgPT4gKHN0YXRlbWVudHMpfSxcbiAgICB7XCJuYW1lXCI6IFwiYWN0aW9uXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwie1wifSwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIn1cIn0sIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoKSA9PiBbXX0sXG4gICAge1wibmFtZVwiOiBcInN0YXRlbWVudFwiLCBcInN5bWJvbHNcIjogW1wic3RyaW5nXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCI6XCJ9LCBcIl9cIiwgXCJzdGF0ZW1lbnRfdmFsdWVcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIjtcIn0sIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW2tleSwgXzEsIF8yLCBfMywgdmFsdWUsIF80XSkgPT4gKHthY3Rpb246IFwia3ZcIiwgazoga2V5LCB2OiB2YWx1ZX0pfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50JHN0cmluZyQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiZVwifSwge1wibGl0ZXJhbFwiOlwieFwifSwge1wibGl0ZXJhbFwiOlwiaVwifSwge1wibGl0ZXJhbFwiOlwidFwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50XCIsIFwic3ltYm9sc1wiOiBbXCJzdGF0ZW1lbnQkc3RyaW5nJDFcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIjtcIn0sIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoKSA9PiAoe2FjdGlvbjogXCJleGl0XCJ9KX0sXG4gICAge1wibmFtZVwiOiBcInN0YXRlbWVudCRzdHJpbmckMlwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcInNcIn0sIHtcImxpdGVyYWxcIjpcImVcIn0sIHtcImxpdGVyYWxcIjpcInRcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcInN0YXRlbWVudFwiLCBcInN5bWJvbHNcIjogW1wic3RhdGVtZW50JHN0cmluZyQyXCIsIFwiY2xhc3NcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIjtcIn0sIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW18xLCBjbHNdKSA9PiAoe2FjdGlvbjogJ3NldF9jbGFzcycsIHY6IGNsc30pfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50JHN0cmluZyQzXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwic1wifSwge1wibGl0ZXJhbFwiOlwiZVwifSwge1wibGl0ZXJhbFwiOlwidFwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50XCIsIFwic3ltYm9sc1wiOiBbXCJzdGF0ZW1lbnQkc3RyaW5nJDNcIiwgXCJfXCIsIFwidGFnXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCI7XCJ9LCBcIl9cIl0sIFwicG9zdHByb2Nlc3NcIjogKFtfMSwgXzIsIHRhZ10pID0+ICh7YWN0aW9uOiAnc2V0X3RhZycsIGs6IHRhZ30pfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50JHN0cmluZyQ0XCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwic1wifSwge1wibGl0ZXJhbFwiOlwiZVwifSwge1wibGl0ZXJhbFwiOlwidFwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50XCIsIFwic3ltYm9sc1wiOiBbXCJzdGF0ZW1lbnQkc3RyaW5nJDRcIiwgXCJfXCIsIFwidGFnXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCI9XCJ9LCBcIl9cIiwgXCJzdGF0ZW1lbnRfdmFsdWVcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIjtcIn0sIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW18xLCBfMiwgdGFnLCBfMywgXzQsIF81LCB2YWx1ZV0pID0+ICh7YWN0aW9uOiAnc2V0X3RhZycsIGs6IHRhZywgdjogdmFsdWV9KX0sXG4gICAge1wibmFtZVwiOiBcImNsYXNzJGVibmYkMSRzdWJleHByZXNzaW9uJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIhXCJ9LCBcIl9cIl19LFxuICAgIHtcIm5hbWVcIjogXCJjbGFzcyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcImNsYXNzJGVibmYkMSRzdWJleHByZXNzaW9uJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJjbGFzcyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiY2xhc3NcIiwgXCJzeW1ib2xzXCI6IFtcIl9cIiwgXCJjbGFzcyRlYm5mJDFcIiwge1wibGl0ZXJhbFwiOlwiLlwifSwgXCJ0ZXJtXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbXzEsIG5vdCwgXzIsIGNsc10pID0+ICh7J2NsYXNzJzogY2xzLCBub3Q6IG5vdCA/ICEhbm90IDogZmFsc2V9KX0sXG4gICAge1wibmFtZVwiOiBcInR5cGUkc3RyaW5nJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJ3XCJ9LCB7XCJsaXRlcmFsXCI6XCJhXCJ9LCB7XCJsaXRlcmFsXCI6XCJ5XCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJ0eXBlXCIsIFwic3ltYm9sc1wiOiBbXCJ0eXBlJHN0cmluZyQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwidHlwZSRzdHJpbmckMlwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIm5cIn0sIHtcImxpdGVyYWxcIjpcIm9cIn0sIHtcImxpdGVyYWxcIjpcImRcIn0sIHtcImxpdGVyYWxcIjpcImVcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcInR5cGVcIiwgXCJzeW1ib2xzXCI6IFtcInR5cGUkc3RyaW5nJDJcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJ0eXBlJHN0cmluZyQzXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiclwifSwge1wibGl0ZXJhbFwiOlwiZVwifSwge1wibGl0ZXJhbFwiOlwibFwifSwge1wibGl0ZXJhbFwiOlwiYVwifSwge1wibGl0ZXJhbFwiOlwidFwifSwge1wibGl0ZXJhbFwiOlwiaVwifSwge1wibGl0ZXJhbFwiOlwib1wifSwge1wibGl0ZXJhbFwiOlwiblwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwidHlwZVwiLCBcInN5bWJvbHNcIjogW1widHlwZSRzdHJpbmckM1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInR5cGUkc3RyaW5nJDRcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJhXCJ9LCB7XCJsaXRlcmFsXCI6XCJyXCJ9LCB7XCJsaXRlcmFsXCI6XCJlXCJ9LCB7XCJsaXRlcmFsXCI6XCJhXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJ0eXBlXCIsIFwic3ltYm9sc1wiOiBbXCJ0eXBlJHN0cmluZyQ0XCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwidHlwZSRzdHJpbmckNVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcImxcIn0sIHtcImxpdGVyYWxcIjpcImlcIn0sIHtcImxpdGVyYWxcIjpcIm5cIn0sIHtcImxpdGVyYWxcIjpcImVcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcInR5cGVcIiwgXCJzeW1ib2xzXCI6IFtcInR5cGUkc3RyaW5nJDVcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJ0eXBlJHN0cmluZyQ2XCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiY1wifSwge1wibGl0ZXJhbFwiOlwiYVwifSwge1wibGl0ZXJhbFwiOlwiblwifSwge1wibGl0ZXJhbFwiOlwidlwifSwge1wibGl0ZXJhbFwiOlwiYVwifSwge1wibGl0ZXJhbFwiOlwic1wifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwidHlwZVwiLCBcInN5bWJvbHNcIjogW1widHlwZSRzdHJpbmckNlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInR5cGVcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIqXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInN0YXRlbWVudF92YWx1ZVwiLCBcInN5bWJvbHNcIjogW1wiZHFzdHJpbmdcIl0sIFwicG9zdHByb2Nlc3NcIjogKFt4XSkgPT4gKHt0eXBlOiAnc3RyaW5nJywgdjogeH0pfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50X3ZhbHVlXCIsIFwic3ltYm9sc1wiOiBbXCJjc3Njb2xvclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW3hdKSA9PiAoe3R5cGU6ICdjc3Njb2xvcicsIHY6IHh9KX0sXG4gICAge1wibmFtZVwiOiBcInN0YXRlbWVudF92YWx1ZVwiLCBcInN5bWJvbHNcIjogW1wiZXZhbFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW3hdKSA9PiAoe3R5cGU6ICdldmFsJywgdjogeH0pfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50X3ZhbHVlXCIsIFwic3ltYm9sc1wiOiBbXCJ1cXN0cmluZ1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW3hdKSA9PiAoe3R5cGU6ICdzdHJpbmcnLCB2OiB4fSl9LFxuICAgIHtcIm5hbWVcIjogXCJpbXBvcnQkc3RyaW5nJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJAXCJ9LCB7XCJsaXRlcmFsXCI6XCJpXCJ9LCB7XCJsaXRlcmFsXCI6XCJtXCJ9LCB7XCJsaXRlcmFsXCI6XCJwXCJ9LCB7XCJsaXRlcmFsXCI6XCJvXCJ9LCB7XCJsaXRlcmFsXCI6XCJyXCJ9LCB7XCJsaXRlcmFsXCI6XCJ0XCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJpbXBvcnQkc3RyaW5nJDJcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJ1XCJ9LCB7XCJsaXRlcmFsXCI6XCJyXCJ9LCB7XCJsaXRlcmFsXCI6XCJsXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJpbXBvcnQkZWJuZiQxJHN1YmV4cHJlc3Npb24kMVwiLCBcInN5bWJvbHNcIjogW1wiX1wiLCBcInRlcm1cIl19LFxuICAgIHtcIm5hbWVcIjogXCJpbXBvcnQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJpbXBvcnQkZWJuZiQxJHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImltcG9ydCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiaW1wb3J0XCIsIFwic3ltYm9sc1wiOiBbXCJpbXBvcnQkc3RyaW5nJDFcIiwgXCJfXCIsIFwiaW1wb3J0JHN0cmluZyQyXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCIoXCJ9LCBcIl9cIiwgXCJkcXN0cmluZ1wiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiKVwifSwgXCJpbXBvcnQkZWJuZiQxXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCI7XCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiAoZCkgPT4gKHsgdXJsOiBkWzZdLCBwc2V1ZG9jbGFzczogZFs5XSA/IGRbOV1bMV0gOiBudWxsfSl9LFxuICAgIHtcIm5hbWVcIjogXCJ1cXN0cmluZyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInNwY2hhclwiXX0sXG4gICAge1wibmFtZVwiOiBcInVxc3RyaW5nJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1widXFzdHJpbmckZWJuZiQxXCIsIFwic3BjaGFyXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJ1cXN0cmluZ1wiLCBcInN5bWJvbHNcIjogW1widXFzdHJpbmckZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbY2hhcnNdKSA9PiBjaGFycy5qb2luKFwiXCIpfSxcbiAgICB7XCJuYW1lXCI6IFwic3BjaGFyXCIsIFwic3ltYm9sc1wiOiBbL1thLXpBLVowLTlcXC1fOi4sXFxcXFxcL10vXX0sXG4gICAge1wibmFtZVwiOiBcIm1jb21tZW50JHN0cmluZyQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiL1wifSwge1wibGl0ZXJhbFwiOlwiKlwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwibWNvbW1lbnQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIm1jb21tZW50JGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wibWNvbW1lbnQkZWJuZiQxXCIsIC9bXipdL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIm1jb21tZW50JGVibmYkMlwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJtY29tbWVudCRlYm5mJDIkc3ViZXhwcmVzc2lvbiQxJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIipcIn1dfSxcbiAgICB7XCJuYW1lXCI6IFwibWNvbW1lbnQkZWJuZiQyJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIm1jb21tZW50JGVibmYkMiRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIHtcImxpdGVyYWxcIjpcIipcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJtY29tbWVudCRlYm5mJDIkc3ViZXhwcmVzc2lvbiQxJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJtY29tbWVudCRlYm5mJDIkc3ViZXhwcmVzc2lvbiQxJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wibWNvbW1lbnQkZWJuZiQyJHN1YmV4cHJlc3Npb24kMSRlYm5mJDJcIiwgL1teKl0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwibWNvbW1lbnQkZWJuZiQyJHN1YmV4cHJlc3Npb24kMVwiLCBcInN5bWJvbHNcIjogW1wibWNvbW1lbnQkZWJuZiQyJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIiwgL1teXFwvKl0vLCBcIm1jb21tZW50JGVibmYkMiRzdWJleHByZXNzaW9uJDEkZWJuZiQyXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwibWNvbW1lbnQkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJtY29tbWVudCRlYm5mJDJcIiwgXCJtY29tbWVudCRlYm5mJDIkc3ViZXhwcmVzc2lvbiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJtY29tbWVudCRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwibWNvbW1lbnQkZWJuZiQzXCIsIFwic3ltYm9sc1wiOiBbXCJtY29tbWVudCRlYm5mJDNcIiwge1wibGl0ZXJhbFwiOlwiKlwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIm1jb21tZW50JHN0cmluZyQyXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiKlwifSwge1wibGl0ZXJhbFwiOlwiL1wifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwibWNvbW1lbnRcIiwgXCJzeW1ib2xzXCI6IFtcIm1jb21tZW50JHN0cmluZyQxXCIsIFwibWNvbW1lbnQkZWJuZiQxXCIsIFwibWNvbW1lbnQkZWJuZiQyXCIsIFwibWNvbW1lbnQkZWJuZiQzXCIsIFwibWNvbW1lbnQkc3RyaW5nJDJcIl0sIFwicG9zdHByb2Nlc3NcIjogKCkgPT4gbnVsbH0sXG4gICAge1wibmFtZVwiOiBcIm1jb21tZW50JHN0cmluZyQzXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiL1wifSwge1wibGl0ZXJhbFwiOlwiL1wifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwibWNvbW1lbnQkZWJuZiQ0XCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIm1jb21tZW50JGVibmYkNFwiLCBcInN5bWJvbHNcIjogW1wibWNvbW1lbnQkZWJuZiQ0XCIsIC9bXlxcbl0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwibWNvbW1lbnRcIiwgXCJzeW1ib2xzXCI6IFtcIm1jb21tZW50JHN0cmluZyQzXCIsIFwibWNvbW1lbnQkZWJuZiQ0XCIsIHtcImxpdGVyYWxcIjpcIlxcblwifV0sIFwicG9zdHByb2Nlc3NcIjogKCkgPT4gbnVsbH0sXG4gICAge1wibmFtZVwiOiBcIndzY2hhclwiLCBcInN5bWJvbHNcIjogW1wibWNvbW1lbnRcIl0sIFwicG9zdHByb2Nlc3NcIjogKCkgPT4gbnVsbH1cbl1cbiAgLCBQYXJzZXJTdGFydDogXCJjc3NcIlxufVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgbW9kdWxlLmV4cG9ydHMgPSBncmFtbWFyO1xufSBlbHNlIHtcbiAgIHdpbmRvdy5ncmFtbWFyID0gZ3JhbW1hcjtcbn1cbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5lYXJsZXkgPSByZXF1aXJlKFwibmVhcmxleVwiKTtcblxuY29uc3QgZ3JhbW1hciA9IHJlcXVpcmUoXCIuL2dyYW1tYXIuanNcIik7XG5cbmZ1bmN0aW9uIHBhcnNlKHRleHQpIHtcbiAgY29uc3QgcGFyc2VyID0gbmV3IG5lYXJsZXkuUGFyc2VyKG5lYXJsZXkuR3JhbW1hci5mcm9tQ29tcGlsZWQoZ3JhbW1hcikpO1xuXG4gIHBhcnNlci5mZWVkKHRleHQudHJpbSgpKTtcblxuICBpZiAoIXBhcnNlci5yZXN1bHRzKSB7XG4gICAgdGhyb3cgXCJVbmV4cGVjdGVkIGVuZCBvZiBmaWxlXCJcbiAgfVxuXG4gIGlmIChwYXJzZXIucmVzdWx0cy5sZW5ndGggIT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkFtYmlndW91cyBncmFtbWFyIGRldGVjdGVkLiBUaGlzIGVycm9yIG1vc3QgbGlrZWx5IGluZGljYXRlcyBhbiBlcnJvciBpbiBNYXBDU1MgZ3JhbW1hci4gUGxlYXNlIHJlcG9ydCBhbiBpc3N1ZSB0byB0aGUgbGlicmFyeSBkZXZlbG9wZXJzLlwiKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZXIucmVzdWx0c1swXTtcbn1cblxuY29uc3QgcGFyc2VyID0ge1xuICBwYXJzZTogcGFyc2Vcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHBhcnNlcjtcbn0gZWxzZSB7XG4gIHdpbmRvdy5NYXBDU1NQYXJzZXIgPSBwYXJzZXI7XG59XG4iLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290Lm5lYXJsZXkgPSBmYWN0b3J5KCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbigpIHtcblxuICAgIGZ1bmN0aW9uIFJ1bGUobmFtZSwgc3ltYm9scywgcG9zdHByb2Nlc3MpIHtcbiAgICAgICAgdGhpcy5pZCA9ICsrUnVsZS5oaWdoZXN0SWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc3ltYm9scyA9IHN5bWJvbHM7ICAgICAgICAvLyBhIGxpc3Qgb2YgbGl0ZXJhbCB8IHJlZ2V4IGNsYXNzIHwgbm9udGVybWluYWxcbiAgICAgICAgdGhpcy5wb3N0cHJvY2VzcyA9IHBvc3Rwcm9jZXNzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgUnVsZS5oaWdoZXN0SWQgPSAwO1xuXG4gICAgUnVsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbih3aXRoQ3Vyc29yQXQpIHtcbiAgICAgICAgZnVuY3Rpb24gc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UgKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmxpdGVyYWwgPyBKU09OLnN0cmluZ2lmeShlLmxpdGVyYWwpIDpcbiAgICAgICAgICAgICAgICAgICBlLnR5cGUgPyAnJScgKyBlLnR5cGUgOiBlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN5bWJvbFNlcXVlbmNlID0gKHR5cGVvZiB3aXRoQ3Vyc29yQXQgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zeW1ib2xzLm1hcChzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSkuam9pbignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKCAgIHRoaXMuc3ltYm9scy5zbGljZSgwLCB3aXRoQ3Vyc29yQXQpLm1hcChzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSkuam9pbignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIOKXjyBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnN5bWJvbHMuc2xpY2Uod2l0aEN1cnNvckF0KS5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKSAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiIOKGkiBcIiArIHN5bWJvbFNlcXVlbmNlO1xuICAgIH1cblxuXG4gICAgLy8gYSBTdGF0ZSBpcyBhIHJ1bGUgYXQgYSBwb3NpdGlvbiBmcm9tIGEgZ2l2ZW4gc3RhcnRpbmcgcG9pbnQgaW4gdGhlIGlucHV0IHN0cmVhbSAocmVmZXJlbmNlKVxuICAgIGZ1bmN0aW9uIFN0YXRlKHJ1bGUsIGRvdCwgcmVmZXJlbmNlLCB3YW50ZWRCeSkge1xuICAgICAgICB0aGlzLnJ1bGUgPSBydWxlO1xuICAgICAgICB0aGlzLmRvdCA9IGRvdDtcbiAgICAgICAgdGhpcy5yZWZlcmVuY2UgPSByZWZlcmVuY2U7XG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLndhbnRlZEJ5ID0gd2FudGVkQnk7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IHRoaXMuZG90ID09PSBydWxlLnN5bWJvbHMubGVuZ3RoO1xuICAgIH1cblxuICAgIFN0YXRlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJ7XCIgKyB0aGlzLnJ1bGUudG9TdHJpbmcodGhpcy5kb3QpICsgXCJ9LCBmcm9tOiBcIiArICh0aGlzLnJlZmVyZW5jZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgU3RhdGUucHJvdG90eXBlLm5leHRTdGF0ZSA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZSh0aGlzLnJ1bGUsIHRoaXMuZG90ICsgMSwgdGhpcy5yZWZlcmVuY2UsIHRoaXMud2FudGVkQnkpO1xuICAgICAgICBzdGF0ZS5sZWZ0ID0gdGhpcztcbiAgICAgICAgc3RhdGUucmlnaHQgPSBjaGlsZDtcbiAgICAgICAgaWYgKHN0YXRlLmlzQ29tcGxldGUpIHtcbiAgICAgICAgICAgIHN0YXRlLmRhdGEgPSBzdGF0ZS5idWlsZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuXG4gICAgU3RhdGUucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXM7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2gobm9kZS5yaWdodC5kYXRhKTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnQ7XG4gICAgICAgIH0gd2hpbGUgKG5vZGUubGVmdCk7XG4gICAgICAgIGNoaWxkcmVuLnJldmVyc2UoKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH07XG5cbiAgICBTdGF0ZS5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnJ1bGUucG9zdHByb2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMucnVsZS5wb3N0cHJvY2Vzcyh0aGlzLmRhdGEsIHRoaXMucmVmZXJlbmNlLCBQYXJzZXIuZmFpbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBmdW5jdGlvbiBDb2x1bW4oZ3JhbW1hciwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnN0YXRlcyA9IFtdO1xuICAgICAgICB0aGlzLndhbnRzID0ge307IC8vIHN0YXRlcyBpbmRleGVkIGJ5IHRoZSBub24tdGVybWluYWwgdGhleSBleHBlY3RcbiAgICAgICAgdGhpcy5zY2FubmFibGUgPSBbXTsgLy8gbGlzdCBvZiBzdGF0ZXMgdGhhdCBleHBlY3QgYSB0b2tlblxuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHt9OyAvLyBzdGF0ZXMgdGhhdCBhcmUgbnVsbGFibGVcbiAgICB9XG5cblxuICAgIENvbHVtbi5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKG5leHRDb2x1bW4pIHtcbiAgICAgICAgdmFyIHN0YXRlcyA9IHRoaXMuc3RhdGVzO1xuICAgICAgICB2YXIgd2FudHMgPSB0aGlzLndhbnRzO1xuICAgICAgICB2YXIgY29tcGxldGVkID0gdGhpcy5jb21wbGV0ZWQ7XG5cbiAgICAgICAgZm9yICh2YXIgdyA9IDA7IHcgPCBzdGF0ZXMubGVuZ3RoOyB3KyspIHsgLy8gbmIuIHdlIHB1c2goKSBkdXJpbmcgaXRlcmF0aW9uXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBzdGF0ZXNbd107XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5pc0NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmRhdGEgIT09IFBhcnNlci5mYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIHZhciB3YW50ZWRCeSA9IHN0YXRlLndhbnRlZEJ5O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gd2FudGVkQnkubGVuZ3RoOyBpLS07ICkgeyAvLyB0aGlzIGxpbmUgaXMgaG90XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IHdhbnRlZEJ5W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZShsZWZ0LCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBzcGVjaWFsLWNhc2UgbnVsbGFibGVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZWZlcmVuY2UgPT09IHRoaXMuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBmdXR1cmUgcHJlZGljdG9ycyBvZiB0aGlzIHJ1bGUgZ2V0IGNvbXBsZXRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBzdGF0ZS5ydWxlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5jb21wbGV0ZWRbZXhwXSA9IHRoaXMuY29tcGxldGVkW2V4cF0gfHwgW10pLnB1c2goc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHF1ZXVlIHNjYW5uYWJsZSBzdGF0ZXNcbiAgICAgICAgICAgICAgICB2YXIgZXhwID0gc3RhdGUucnVsZS5zeW1ib2xzW3N0YXRlLmRvdF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBleHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nhbm5hYmxlLnB1c2goc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBwcmVkaWN0XG4gICAgICAgICAgICAgICAgaWYgKHdhbnRzW2V4cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgd2FudHNbZXhwXS5wdXNoKHN0YXRlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmhhc093blByb3BlcnR5KGV4cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudWxscyA9IGNvbXBsZXRlZFtleHBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByaWdodCA9IG51bGxzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUoc3RhdGUsIHJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdhbnRzW2V4cF0gPSBbc3RhdGVdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWRpY3QoZXhwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBDb2x1bW4ucHJvdG90eXBlLnByZWRpY3QgPSBmdW5jdGlvbihleHApIHtcbiAgICAgICAgdmFyIHJ1bGVzID0gdGhpcy5ncmFtbWFyLmJ5TmFtZVtleHBdIHx8IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByID0gcnVsZXNbaV07XG4gICAgICAgICAgICB2YXIgd2FudGVkQnkgPSB0aGlzLndhbnRzW2V4cF07XG4gICAgICAgICAgICB2YXIgcyA9IG5ldyBTdGF0ZShyLCAwLCB0aGlzLmluZGV4LCB3YW50ZWRCeSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5wdXNoKHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQ29sdW1uLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHZhciBjb3B5ID0gbGVmdC5uZXh0U3RhdGUocmlnaHQpO1xuICAgICAgICB0aGlzLnN0YXRlcy5wdXNoKGNvcHkpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gR3JhbW1hcihydWxlcywgc3RhcnQpIHtcbiAgICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQgfHwgdGhpcy5ydWxlc1swXS5uYW1lO1xuICAgICAgICB2YXIgYnlOYW1lID0gdGhpcy5ieU5hbWUgPSB7fTtcbiAgICAgICAgdGhpcy5ydWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGUpIHtcbiAgICAgICAgICAgIGlmICghYnlOYW1lLmhhc093blByb3BlcnR5KHJ1bGUubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBieU5hbWVbcnVsZS5uYW1lXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnlOYW1lW3J1bGUubmFtZV0ucHVzaChydWxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU28gd2UgY2FuIGFsbG93IHBhc3NpbmcgKHJ1bGVzLCBzdGFydCkgZGlyZWN0bHkgdG8gUGFyc2VyIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIEdyYW1tYXIuZnJvbUNvbXBpbGVkID0gZnVuY3Rpb24ocnVsZXMsIHN0YXJ0KSB7XG4gICAgICAgIHZhciBsZXhlciA9IHJ1bGVzLkxleGVyO1xuICAgICAgICBpZiAocnVsZXMuUGFyc2VyU3RhcnQpIHtcbiAgICAgICAgICBzdGFydCA9IHJ1bGVzLlBhcnNlclN0YXJ0O1xuICAgICAgICAgIHJ1bGVzID0gcnVsZXMuUGFyc2VyUnVsZXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJ1bGVzID0gcnVsZXMubWFwKGZ1bmN0aW9uIChyKSB7IHJldHVybiAobmV3IFJ1bGUoci5uYW1lLCByLnN5bWJvbHMsIHIucG9zdHByb2Nlc3MpKTsgfSk7XG4gICAgICAgIHZhciBnID0gbmV3IEdyYW1tYXIocnVsZXMsIHN0YXJ0KTtcbiAgICAgICAgZy5sZXhlciA9IGxleGVyOyAvLyBuYi4gc3RvcmluZyBsZXhlciBvbiBHcmFtbWFyIGlzIGlmZnksIGJ1dCB1bmF2b2lkYWJsZVxuICAgICAgICByZXR1cm4gZztcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIFN0cmVhbUxleGVyKCkge1xuICAgICAgdGhpcy5yZXNldChcIlwiKTtcbiAgICB9XG5cbiAgICBTdHJlYW1MZXhlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbihkYXRhLCBzdGF0ZSkge1xuICAgICAgICB0aGlzLmJ1ZmZlciA9IGRhdGE7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICB0aGlzLmxpbmUgPSBzdGF0ZSA/IHN0YXRlLmxpbmUgOiAxO1xuICAgICAgICB0aGlzLmxhc3RMaW5lQnJlYWsgPSBzdGF0ZSA/IC1zdGF0ZS5jb2wgOiAwO1xuICAgIH1cblxuICAgIFN0cmVhbUxleGVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy5idWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB0aGlzLmJ1ZmZlclt0aGlzLmluZGV4KytdO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnXFxuJykge1xuICAgICAgICAgICAgICB0aGlzLmxpbmUgKz0gMTtcbiAgICAgICAgICAgICAgdGhpcy5sYXN0TGluZUJyZWFrID0gdGhpcy5pbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7dmFsdWU6IGNofTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFN0cmVhbUxleGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5lOiB0aGlzLmxpbmUsXG4gICAgICAgIGNvbDogdGhpcy5pbmRleCAtIHRoaXMubGFzdExpbmVCcmVhayxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBTdHJlYW1MZXhlci5wcm90b3R5cGUuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbih0b2tlbiwgbWVzc2FnZSkge1xuICAgICAgICAvLyBuYi4gdGhpcyBnZXRzIGNhbGxlZCBhZnRlciBjb25zdW1pbmcgdGhlIG9mZmVuZGluZyB0b2tlbixcbiAgICAgICAgLy8gc28gdGhlIGN1bHByaXQgaXMgaW5kZXgtMVxuICAgICAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgICAgIGlmICh0eXBlb2YgYnVmZmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIG5leHRMaW5lQnJlYWsgPSBidWZmZXIuaW5kZXhPZignXFxuJywgdGhpcy5pbmRleCk7XG4gICAgICAgICAgICBpZiAobmV4dExpbmVCcmVhayA9PT0gLTEpIG5leHRMaW5lQnJlYWsgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBidWZmZXIuc3Vic3RyaW5nKHRoaXMubGFzdExpbmVCcmVhaywgbmV4dExpbmVCcmVhaylcbiAgICAgICAgICAgIHZhciBjb2wgPSB0aGlzLmluZGV4IC0gdGhpcy5sYXN0TGluZUJyZWFrO1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIiBhdCBsaW5lIFwiICsgdGhpcy5saW5lICsgXCIgY29sIFwiICsgY29sICsgXCI6XFxuXFxuXCI7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiICBcIiArIGxpbmUgKyBcIlxcblwiXG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiICBcIiArIEFycmF5KGNvbCkuam9pbihcIiBcIikgKyBcIl5cIlxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZSArIFwiIGF0IGluZGV4IFwiICsgKHRoaXMuaW5kZXggLSAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gUGFyc2VyKHJ1bGVzLCBzdGFydCwgb3B0aW9ucykge1xuICAgICAgICBpZiAocnVsZXMgaW5zdGFuY2VvZiBHcmFtbWFyKSB7XG4gICAgICAgICAgICB2YXIgZ3JhbW1hciA9IHJ1bGVzO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBzdGFydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBncmFtbWFyID0gR3JhbW1hci5mcm9tQ29tcGlsZWQocnVsZXMsIHN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyYW1tYXIgPSBncmFtbWFyO1xuXG4gICAgICAgIC8vIFJlYWQgb3B0aW9uc1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBrZWVwSGlzdG9yeTogZmFsc2UsXG4gICAgICAgICAgICBsZXhlcjogZ3JhbW1hci5sZXhlciB8fCBuZXcgU3RyZWFtTGV4ZXIsXG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGtleSBpbiAob3B0aW9ucyB8fCB7fSkpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0dXAgbGV4ZXJcbiAgICAgICAgdGhpcy5sZXhlciA9IHRoaXMub3B0aW9ucy5sZXhlcjtcbiAgICAgICAgdGhpcy5sZXhlclN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIFNldHVwIGEgdGFibGVcbiAgICAgICAgdmFyIGNvbHVtbiA9IG5ldyBDb2x1bW4oZ3JhbW1hciwgMCk7XG4gICAgICAgIHZhciB0YWJsZSA9IHRoaXMudGFibGUgPSBbY29sdW1uXTtcblxuICAgICAgICAvLyBJIGNvdWxkIGJlIGV4cGVjdGluZyBhbnl0aGluZy5cbiAgICAgICAgY29sdW1uLndhbnRzW2dyYW1tYXIuc3RhcnRdID0gW107XG4gICAgICAgIGNvbHVtbi5wcmVkaWN0KGdyYW1tYXIuc3RhcnQpO1xuICAgICAgICAvLyBUT0RPIHdoYXQgaWYgc3RhcnQgcnVsZSBpcyBudWxsYWJsZT9cbiAgICAgICAgY29sdW1uLnByb2Nlc3MoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gMDsgLy8gdG9rZW4gaW5kZXhcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSByZXNlcnZlZCB0b2tlbiBmb3IgaW5kaWNhdGluZyBhIHBhcnNlIGZhaWxcbiAgICBQYXJzZXIuZmFpbCA9IHt9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5mZWVkID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgICAgICAgdmFyIGxleGVyID0gdGhpcy5sZXhlcjtcbiAgICAgICAgbGV4ZXIucmVzZXQoY2h1bmssIHRoaXMubGV4ZXJTdGF0ZSk7XG5cbiAgICAgICAgdmFyIHRva2VuO1xuICAgICAgICB3aGlsZSAodG9rZW4gPSBsZXhlci5uZXh0KCkpIHtcbiAgICAgICAgICAgIC8vIFdlIGFkZCBuZXcgc3RhdGVzIHRvIHRhYmxlW2N1cnJlbnQrMV1cbiAgICAgICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudF07XG5cbiAgICAgICAgICAgIC8vIEdDIHVudXNlZCBzdGF0ZXNcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmtlZXBIaXN0b3J5KSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMudGFibGVbdGhpcy5jdXJyZW50IC0gMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuID0gdGhpcy5jdXJyZW50ICsgMTtcbiAgICAgICAgICAgIHZhciBuZXh0Q29sdW1uID0gbmV3IENvbHVtbih0aGlzLmdyYW1tYXIsIG4pO1xuICAgICAgICAgICAgdGhpcy50YWJsZS5wdXNoKG5leHRDb2x1bW4pO1xuXG4gICAgICAgICAgICAvLyBBZHZhbmNlIGFsbCB0b2tlbnMgdGhhdCBleHBlY3QgdGhlIHN5bWJvbFxuICAgICAgICAgICAgdmFyIGxpdGVyYWwgPSB0b2tlbi50ZXh0ICE9PSB1bmRlZmluZWQgPyB0b2tlbi50ZXh0IDogdG9rZW4udmFsdWU7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBsZXhlci5jb25zdHJ1Y3RvciA9PT0gU3RyZWFtTGV4ZXIgPyB0b2tlbi52YWx1ZSA6IHRva2VuO1xuICAgICAgICAgICAgdmFyIHNjYW5uYWJsZSA9IGNvbHVtbi5zY2FubmFibGU7XG4gICAgICAgICAgICBmb3IgKHZhciB3ID0gc2Nhbm5hYmxlLmxlbmd0aDsgdy0tOyApIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBzY2FubmFibGVbd107XG4gICAgICAgICAgICAgICAgdmFyIGV4cGVjdCA9IHN0YXRlLnJ1bGUuc3ltYm9sc1tzdGF0ZS5kb3RdO1xuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBjb25zdW1lIHRoZSB0b2tlblxuICAgICAgICAgICAgICAgIC8vIGVpdGhlciByZWdleCBvciBsaXRlcmFsXG4gICAgICAgICAgICAgICAgaWYgKGV4cGVjdC50ZXN0ID8gZXhwZWN0LnRlc3QodmFsdWUpIDpcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0LnR5cGUgPyBleHBlY3QudHlwZSA9PT0gdG9rZW4udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGV4cGVjdC5saXRlcmFsID09PSBsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBpdFxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHN0YXRlLm5leHRTdGF0ZSh7ZGF0YTogdmFsdWUsIHRva2VuOiB0b2tlbiwgaXNUb2tlbjogdHJ1ZSwgcmVmZXJlbmNlOiBuIC0gMX0pO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q29sdW1uLnN0YXRlcy5wdXNoKG5leHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTmV4dCwgZm9yIGVhY2ggb2YgdGhlIHJ1bGVzLCB3ZSBlaXRoZXJcbiAgICAgICAgICAgIC8vIChhKSBjb21wbGV0ZSBpdCwgYW5kIHRyeSB0byBzZWUgaWYgdGhlIHJlZmVyZW5jZSByb3cgZXhwZWN0ZWQgdGhhdFxuICAgICAgICAgICAgLy8gICAgIHJ1bGVcbiAgICAgICAgICAgIC8vIChiKSBwcmVkaWN0IHRoZSBuZXh0IG5vbnRlcm1pbmFsIGl0IGV4cGVjdHMgYnkgYWRkaW5nIHRoYXRcbiAgICAgICAgICAgIC8vICAgICBub250ZXJtaW5hbCdzIHN0YXJ0IHN0YXRlXG4gICAgICAgICAgICAvLyBUbyBwcmV2ZW50IGR1cGxpY2F0aW9uLCB3ZSBhbHNvIGtlZXAgdHJhY2sgb2YgcnVsZXMgd2UgaGF2ZSBhbHJlYWR5XG4gICAgICAgICAgICAvLyBhZGRlZFxuXG4gICAgICAgICAgICBuZXh0Q29sdW1uLnByb2Nlc3MoKTtcblxuICAgICAgICAgICAgLy8gSWYgbmVlZGVkLCB0aHJvdyBhbiBlcnJvcjpcbiAgICAgICAgICAgIGlmIChuZXh0Q29sdW1uLnN0YXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBObyBzdGF0ZXMgYXQgYWxsISBUaGlzIGlzIG5vdCBnb29kLlxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5sZXhlci5mb3JtYXRFcnJvcih0b2tlbiwgXCJpbnZhbGlkIHN5bnRheFwiKSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBcIlVuZXhwZWN0ZWQgXCIgKyAodG9rZW4udHlwZSA/IHRva2VuLnR5cGUgKyBcIiB0b2tlbjogXCIgOiBcIlwiKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IEpTT04uc3RyaW5naWZ5KHRva2VuLnZhbHVlICE9PSB1bmRlZmluZWQgPyB0b2tlbi52YWx1ZSA6IHRva2VuKSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBlcnIub2Zmc2V0ID0gdGhpcy5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGVyci50b2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWF5YmUgc2F2ZSBsZXhlciBzdGF0ZVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgICAgICBjb2x1bW4ubGV4ZXJTdGF0ZSA9IGxleGVyLnNhdmUoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgdGhpcy5sZXhlclN0YXRlID0gbGV4ZXIuc2F2ZSgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbmNyZW1lbnRhbGx5IGtlZXAgdHJhY2sgb2YgcmVzdWx0c1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmZpbmlzaCgpO1xuXG4gICAgICAgIC8vIEFsbG93IGNoYWluaW5nLCBmb3Igd2hhdGV2ZXIgaXQncyB3b3J0aFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudF07XG4gICAgICAgIGNvbHVtbi5sZXhlclN0YXRlID0gdGhpcy5sZXhlclN0YXRlO1xuICAgICAgICByZXR1cm4gY29sdW1uO1xuICAgIH07XG5cbiAgICBQYXJzZXIucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbihjb2x1bW4pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gY29sdW1uLmluZGV4O1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleDtcbiAgICAgICAgdGhpcy50YWJsZVtpbmRleF0gPSBjb2x1bW47XG4gICAgICAgIHRoaXMudGFibGUuc3BsaWNlKGluZGV4ICsgMSk7XG4gICAgICAgIHRoaXMubGV4ZXJTdGF0ZSA9IGNvbHVtbi5sZXhlclN0YXRlO1xuXG4gICAgICAgIC8vIEluY3JlbWVudGFsbHkga2VlcCB0cmFjayBvZiByZXN1bHRzXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHRoaXMuZmluaXNoKCk7XG4gICAgfTtcblxuICAgIC8vIG5iLiBkZXByZWNhdGVkOiB1c2Ugc2F2ZS9yZXN0b3JlIGluc3RlYWQhXG4gICAgUGFyc2VyLnByb3RvdHlwZS5yZXdpbmQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXQgb3B0aW9uIGBrZWVwSGlzdG9yeWAgdG8gZW5hYmxlIHJld2luZGluZycpXG4gICAgICAgIH1cbiAgICAgICAgLy8gbmIuIHJlY2FsbCBjb2x1bW4gKHRhYmxlKSBpbmRpY2llcyBmYWxsIGJldHdlZW4gdG9rZW4gaW5kaWNpZXMuXG4gICAgICAgIC8vICAgICAgICBjb2wgMCAgIC0tICAgdG9rZW4gMCAgIC0tICAgY29sIDFcbiAgICAgICAgdGhpcy5yZXN0b3JlKHRoaXMudGFibGVbaW5kZXhdKTtcbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBwb3NzaWJsZSBwYXJzaW5nc1xuICAgICAgICB2YXIgY29uc2lkZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5ncmFtbWFyLnN0YXJ0O1xuICAgICAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLnRhYmxlLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbHVtbi5zdGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQucnVsZS5uYW1lID09PSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAmJiB0LmRvdCA9PT0gdC5ydWxlLnN5bWJvbHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICYmIHQucmVmZXJlbmNlID09PSAwXG4gICAgICAgICAgICAgICAgICAgICYmIHQuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgICAgICBjb25zaWRlcmF0aW9ucy5wdXNoKHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbnNpZGVyYXRpb25zLm1hcChmdW5jdGlvbihjKSB7cmV0dXJuIGMuZGF0YTsgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIFBhcnNlcjogUGFyc2VyLFxuICAgICAgICBHcmFtbWFyOiBHcmFtbWFyLFxuICAgICAgICBSdWxlOiBSdWxlLFxuICAgIH07XG5cbn0pKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJ0aWFsU29ydDtcblxuLy8gRmxveWQtUml2ZXN0IHNlbGVjdGlvbiBhbGdvcml0aG06XG4vLyBSZWFycmFuZ2UgaXRlbXMgc28gdGhhdCBhbGwgaXRlbXMgaW4gdGhlIFtsZWZ0LCBrXSByYW5nZSBhcmUgc21hbGxlciB0aGFuIGFsbCBpdGVtcyBpbiAoaywgcmlnaHRdO1xuLy8gVGhlIGstdGggZWxlbWVudCB3aWxsIGhhdmUgdGhlIChrIC0gbGVmdCArIDEpdGggc21hbGxlc3QgdmFsdWUgaW4gW2xlZnQsIHJpZ2h0XVxuXG5mdW5jdGlvbiBwYXJ0aWFsU29ydChhcnIsIGssIGxlZnQsIHJpZ2h0LCBjb21wYXJlKSB7XG4gICAgbGVmdCA9IGxlZnQgfHwgMDtcbiAgICByaWdodCA9IHJpZ2h0IHx8IChhcnIubGVuZ3RoIC0gMSk7XG4gICAgY29tcGFyZSA9IGNvbXBhcmUgfHwgZGVmYXVsdENvbXBhcmU7XG5cbiAgICB3aGlsZSAocmlnaHQgPiBsZWZ0KSB7XG4gICAgICAgIGlmIChyaWdodCAtIGxlZnQgPiA2MDApIHtcbiAgICAgICAgICAgIHZhciBuID0gcmlnaHQgLSBsZWZ0ICsgMTtcbiAgICAgICAgICAgIHZhciBtID0gayAtIGxlZnQgKyAxO1xuICAgICAgICAgICAgdmFyIHogPSBNYXRoLmxvZyhuKTtcbiAgICAgICAgICAgIHZhciBzID0gMC41ICogTWF0aC5leHAoMiAqIHogLyAzKTtcbiAgICAgICAgICAgIHZhciBzZCA9IDAuNSAqIE1hdGguc3FydCh6ICogcyAqIChuIC0gcykgLyBuKSAqIChtIC0gbiAvIDIgPCAwID8gLTEgOiAxKTtcbiAgICAgICAgICAgIHZhciBuZXdMZWZ0ID0gTWF0aC5tYXgobGVmdCwgTWF0aC5mbG9vcihrIC0gbSAqIHMgLyBuICsgc2QpKTtcbiAgICAgICAgICAgIHZhciBuZXdSaWdodCA9IE1hdGgubWluKHJpZ2h0LCBNYXRoLmZsb29yKGsgKyAobiAtIG0pICogcyAvIG4gKyBzZCkpO1xuICAgICAgICAgICAgcGFydGlhbFNvcnQoYXJyLCBrLCBuZXdMZWZ0LCBuZXdSaWdodCwgY29tcGFyZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdCA9IGFycltrXTtcbiAgICAgICAgdmFyIGkgPSBsZWZ0O1xuICAgICAgICB2YXIgaiA9IHJpZ2h0O1xuXG4gICAgICAgIHN3YXAoYXJyLCBsZWZ0LCBrKTtcbiAgICAgICAgaWYgKGNvbXBhcmUoYXJyW3JpZ2h0XSwgdCkgPiAwKSBzd2FwKGFyciwgbGVmdCwgcmlnaHQpO1xuXG4gICAgICAgIHdoaWxlIChpIDwgaikge1xuICAgICAgICAgICAgc3dhcChhcnIsIGksIGopO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgd2hpbGUgKGNvbXBhcmUoYXJyW2ldLCB0KSA8IDApIGkrKztcbiAgICAgICAgICAgIHdoaWxlIChjb21wYXJlKGFycltqXSwgdCkgPiAwKSBqLS07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcGFyZShhcnJbbGVmdF0sIHQpID09PSAwKSBzd2FwKGFyciwgbGVmdCwgaik7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgc3dhcChhcnIsIGosIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChqIDw9IGspIGxlZnQgPSBqICsgMTtcbiAgICAgICAgaWYgKGsgPD0gaikgcmlnaHQgPSBqIC0gMTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN3YXAoYXJyLCBpLCBqKSB7XG4gICAgdmFyIHRtcCA9IGFycltpXTtcbiAgICBhcnJbaV0gPSBhcnJbal07XG4gICAgYXJyW2pdID0gdG1wO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJidXNoO1xuXG52YXIgcXVpY2tzZWxlY3QgPSByZXF1aXJlKCdxdWlja3NlbGVjdCcpO1xuXG5mdW5jdGlvbiByYnVzaChtYXhFbnRyaWVzLCBmb3JtYXQpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgcmJ1c2gpKSByZXR1cm4gbmV3IHJidXNoKG1heEVudHJpZXMsIGZvcm1hdCk7XG5cbiAgICAvLyBtYXggZW50cmllcyBpbiBhIG5vZGUgaXMgOSBieSBkZWZhdWx0OyBtaW4gbm9kZSBmaWxsIGlzIDQwJSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoaXMuX21heEVudHJpZXMgPSBNYXRoLm1heCg0LCBtYXhFbnRyaWVzIHx8IDkpO1xuICAgIHRoaXMuX21pbkVudHJpZXMgPSBNYXRoLm1heCgyLCBNYXRoLmNlaWwodGhpcy5fbWF4RW50cmllcyAqIDAuNCkpO1xuXG4gICAgaWYgKGZvcm1hdCkge1xuICAgICAgICB0aGlzLl9pbml0Rm9ybWF0KGZvcm1hdCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhcigpO1xufVxuXG5yYnVzaC5wcm90b3R5cGUgPSB7XG5cbiAgICBhbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FsbCh0aGlzLmRhdGEsIFtdKTtcbiAgICB9LFxuXG4gICAgc2VhcmNoOiBmdW5jdGlvbiAoYmJveCkge1xuXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5kYXRhLFxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICB0b0JCb3ggPSB0aGlzLnRvQkJveDtcblxuICAgICAgICBpZiAoIWludGVyc2VjdHMoYmJveCwgbm9kZSkpIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgdmFyIG5vZGVzVG9TZWFyY2ggPSBbXSxcbiAgICAgICAgICAgIGksIGxlbiwgY2hpbGQsIGNoaWxkQkJveDtcblxuICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXG4gICAgICAgICAgICAgICAgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkQkJveCA9IG5vZGUubGVhZiA/IHRvQkJveChjaGlsZCkgOiBjaGlsZDtcblxuICAgICAgICAgICAgICAgIGlmIChpbnRlcnNlY3RzKGJib3gsIGNoaWxkQkJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubGVhZikgcmVzdWx0LnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb250YWlucyhiYm94LCBjaGlsZEJCb3gpKSB0aGlzLl9hbGwoY2hpbGQsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugbm9kZXNUb1NlYXJjaC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gbm9kZXNUb1NlYXJjaC5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNvbGxpZGVzOiBmdW5jdGlvbiAoYmJveCkge1xuXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5kYXRhLFxuICAgICAgICAgICAgdG9CQm94ID0gdGhpcy50b0JCb3g7XG5cbiAgICAgICAgaWYgKCFpbnRlcnNlY3RzKGJib3gsIG5vZGUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIG5vZGVzVG9TZWFyY2ggPSBbXSxcbiAgICAgICAgICAgIGksIGxlbiwgY2hpbGQsIGNoaWxkQkJveDtcblxuICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXG4gICAgICAgICAgICAgICAgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkQkJveCA9IG5vZGUubGVhZiA/IHRvQkJveChjaGlsZCkgOiBjaGlsZDtcblxuICAgICAgICAgICAgICAgIGlmIChpbnRlcnNlY3RzKGJib3gsIGNoaWxkQkJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubGVhZiB8fCBjb250YWlucyhiYm94LCBjaGlsZEJCb3gpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNUb1NlYXJjaC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gbm9kZXNUb1NlYXJjaC5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgbG9hZDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKCEoZGF0YSAmJiBkYXRhLmxlbmd0aCkpIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IHRoaXMuX21pbkVudHJpZXMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBkYXRhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoZGF0YVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGJ1aWxkIHRoZSB0cmVlIHdpdGggdGhlIGdpdmVuIGRhdGEgZnJvbSBzdHJhdGNoIHVzaW5nIE9NVCBhbGdvcml0aG1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9idWlsZChkYXRhLnNsaWNlKCksIDAsIGRhdGEubGVuZ3RoIC0gMSwgMCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBzYXZlIGFzIGlzIGlmIHRyZWUgaXMgZW1wdHlcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5vZGU7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuaGVpZ2h0ID09PSBub2RlLmhlaWdodCkge1xuICAgICAgICAgICAgLy8gc3BsaXQgcm9vdCBpZiB0cmVlcyBoYXZlIHRoZSBzYW1lIGhlaWdodFxuICAgICAgICAgICAgdGhpcy5fc3BsaXRSb290KHRoaXMuZGF0YSwgbm9kZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaGVpZ2h0IDwgbm9kZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAvLyBzd2FwIHRyZWVzIGlmIGluc2VydGVkIG9uZSBpcyBiaWdnZXJcbiAgICAgICAgICAgICAgICB2YXIgdG1wTm9kZSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBub2RlO1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0bXBOb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbnNlcnQgdGhlIHNtYWxsIHRyZWUgaW50byB0aGUgbGFyZ2UgdHJlZSBhdCBhcHByb3ByaWF0ZSBsZXZlbFxuICAgICAgICAgICAgdGhpcy5faW5zZXJ0KG5vZGUsIHRoaXMuZGF0YS5oZWlnaHQgLSBub2RlLmhlaWdodCAtIDEsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGluc2VydDogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0pIHRoaXMuX2luc2VydChpdGVtLCB0aGlzLmRhdGEuaGVpZ2h0IC0gMSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjcmVhdGVOb2RlKFtdKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0ZuKSB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmRhdGEsXG4gICAgICAgICAgICBiYm94ID0gdGhpcy50b0JCb3goaXRlbSksXG4gICAgICAgICAgICBwYXRoID0gW10sXG4gICAgICAgICAgICBpbmRleGVzID0gW10sXG4gICAgICAgICAgICBpLCBwYXJlbnQsIGluZGV4LCBnb2luZ1VwO1xuXG4gICAgICAgIC8vIGRlcHRoLWZpcnN0IGl0ZXJhdGl2ZSB0cmVlIHRyYXZlcnNhbFxuICAgICAgICB3aGlsZSAobm9kZSB8fCBwYXRoLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHsgLy8gZ28gdXBcbiAgICAgICAgICAgICAgICBub2RlID0gcGF0aC5wb3AoKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaSA9IGluZGV4ZXMucG9wKCk7XG4gICAgICAgICAgICAgICAgZ29pbmdVcCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlLmxlYWYpIHsgLy8gY2hlY2sgY3VycmVudCBub2RlXG4gICAgICAgICAgICAgICAgaW5kZXggPSBmaW5kSXRlbShpdGVtLCBub2RlLmNoaWxkcmVuLCBlcXVhbHNGbik7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0gZm91bmQsIHJlbW92ZSB0aGUgaXRlbSBhbmQgY29uZGVuc2UgdHJlZSB1cHdhcmRzXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25kZW5zZShwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdvaW5nVXAgJiYgIW5vZGUubGVhZiAmJiBjb250YWlucyhub2RlLCBiYm94KSkgeyAvLyBnbyBkb3duXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmVudCkgeyAvLyBnbyByaWdodFxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBub2RlID0gcGFyZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGdvaW5nVXAgPSBmYWxzZTtcblxuICAgICAgICAgICAgfSBlbHNlIG5vZGUgPSBudWxsOyAvLyBub3RoaW5nIGZvdW5kXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgdG9CQm94OiBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbTsgfSxcblxuICAgIGNvbXBhcmVNaW5YOiBjb21wYXJlTm9kZU1pblgsXG4gICAgY29tcGFyZU1pblk6IGNvbXBhcmVOb2RlTWluWSxcblxuICAgIHRvSlNPTjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhOyB9LFxuXG4gICAgZnJvbUpTT046IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfYWxsOiBmdW5jdGlvbiAobm9kZSwgcmVzdWx0KSB7XG4gICAgICAgIHZhciBub2Rlc1RvU2VhcmNoID0gW107XG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5sZWFmKSByZXN1bHQucHVzaC5hcHBseShyZXN1bHQsIG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgZWxzZSBub2Rlc1RvU2VhcmNoLnB1c2guYXBwbHkobm9kZXNUb1NlYXJjaCwgbm9kZS5jaGlsZHJlbik7XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1RvU2VhcmNoLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIF9idWlsZDogZnVuY3Rpb24gKGl0ZW1zLCBsZWZ0LCByaWdodCwgaGVpZ2h0KSB7XG5cbiAgICAgICAgdmFyIE4gPSByaWdodCAtIGxlZnQgKyAxLFxuICAgICAgICAgICAgTSA9IHRoaXMuX21heEVudHJpZXMsXG4gICAgICAgICAgICBub2RlO1xuXG4gICAgICAgIGlmIChOIDw9IE0pIHtcbiAgICAgICAgICAgIC8vIHJlYWNoZWQgbGVhZiBsZXZlbDsgcmV0dXJuIGxlYWZcbiAgICAgICAgICAgIG5vZGUgPSBjcmVhdGVOb2RlKGl0ZW1zLnNsaWNlKGxlZnQsIHJpZ2h0ICsgMSkpO1xuICAgICAgICAgICAgY2FsY0JCb3gobm9kZSwgdGhpcy50b0JCb3gpO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhlaWdodCkge1xuICAgICAgICAgICAgLy8gdGFyZ2V0IGhlaWdodCBvZiB0aGUgYnVsay1sb2FkZWQgdHJlZVxuICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5jZWlsKE1hdGgubG9nKE4pIC8gTWF0aC5sb2coTSkpO1xuXG4gICAgICAgICAgICAvLyB0YXJnZXQgbnVtYmVyIG9mIHJvb3QgZW50cmllcyB0byBtYXhpbWl6ZSBzdG9yYWdlIHV0aWxpemF0aW9uXG4gICAgICAgICAgICBNID0gTWF0aC5jZWlsKE4gLyBNYXRoLnBvdyhNLCBoZWlnaHQgLSAxKSk7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlID0gY3JlYXRlTm9kZShbXSk7XG4gICAgICAgIG5vZGUubGVhZiA9IGZhbHNlO1xuICAgICAgICBub2RlLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICAvLyBzcGxpdCB0aGUgaXRlbXMgaW50byBNIG1vc3RseSBzcXVhcmUgdGlsZXNcblxuICAgICAgICB2YXIgTjIgPSBNYXRoLmNlaWwoTiAvIE0pLFxuICAgICAgICAgICAgTjEgPSBOMiAqIE1hdGguY2VpbChNYXRoLnNxcnQoTSkpLFxuICAgICAgICAgICAgaSwgaiwgcmlnaHQyLCByaWdodDM7XG5cbiAgICAgICAgbXVsdGlTZWxlY3QoaXRlbXMsIGxlZnQsIHJpZ2h0LCBOMSwgdGhpcy5jb21wYXJlTWluWCk7XG5cbiAgICAgICAgZm9yIChpID0gbGVmdDsgaSA8PSByaWdodDsgaSArPSBOMSkge1xuXG4gICAgICAgICAgICByaWdodDIgPSBNYXRoLm1pbihpICsgTjEgLSAxLCByaWdodCk7XG5cbiAgICAgICAgICAgIG11bHRpU2VsZWN0KGl0ZW1zLCBpLCByaWdodDIsIE4yLCB0aGlzLmNvbXBhcmVNaW5ZKTtcblxuICAgICAgICAgICAgZm9yIChqID0gaTsgaiA8PSByaWdodDI7IGogKz0gTjIpIHtcblxuICAgICAgICAgICAgICAgIHJpZ2h0MyA9IE1hdGgubWluKGogKyBOMiAtIDEsIHJpZ2h0Mik7XG5cbiAgICAgICAgICAgICAgICAvLyBwYWNrIGVhY2ggZW50cnkgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2godGhpcy5fYnVpbGQoaXRlbXMsIGosIHJpZ2h0MywgaGVpZ2h0IC0gMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsY0JCb3gobm9kZSwgdGhpcy50b0JCb3gpO1xuXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICBfY2hvb3NlU3VidHJlZTogZnVuY3Rpb24gKGJib3gsIG5vZGUsIGxldmVsLCBwYXRoKSB7XG5cbiAgICAgICAgdmFyIGksIGxlbiwgY2hpbGQsIHRhcmdldE5vZGUsIGFyZWEsIGVubGFyZ2VtZW50LCBtaW5BcmVhLCBtaW5FbmxhcmdlbWVudDtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgcGF0aC5wdXNoKG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobm9kZS5sZWFmIHx8IHBhdGgubGVuZ3RoIC0gMSA9PT0gbGV2ZWwpIGJyZWFrO1xuXG4gICAgICAgICAgICBtaW5BcmVhID0gbWluRW5sYXJnZW1lbnQgPSBJbmZpbml0eTtcblxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGNoaWxkID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBhcmVhID0gYmJveEFyZWEoY2hpbGQpO1xuICAgICAgICAgICAgICAgIGVubGFyZ2VtZW50ID0gZW5sYXJnZWRBcmVhKGJib3gsIGNoaWxkKSAtIGFyZWE7XG5cbiAgICAgICAgICAgICAgICAvLyBjaG9vc2UgZW50cnkgd2l0aCB0aGUgbGVhc3QgYXJlYSBlbmxhcmdlbWVudFxuICAgICAgICAgICAgICAgIGlmIChlbmxhcmdlbWVudCA8IG1pbkVubGFyZ2VtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbkVubGFyZ2VtZW50ID0gZW5sYXJnZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIG1pbkFyZWEgPSBhcmVhIDwgbWluQXJlYSA/IGFyZWEgOiBtaW5BcmVhO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlID0gY2hpbGQ7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVubGFyZ2VtZW50ID09PSBtaW5FbmxhcmdlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UgY2hvb3NlIG9uZSB3aXRoIHRoZSBzbWFsbGVzdCBhcmVhXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVhIDwgbWluQXJlYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluQXJlYSA9IGFyZWE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlID0gY2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSB0YXJnZXROb2RlIHx8IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgX2luc2VydDogZnVuY3Rpb24gKGl0ZW0sIGxldmVsLCBpc05vZGUpIHtcblxuICAgICAgICB2YXIgdG9CQm94ID0gdGhpcy50b0JCb3gsXG4gICAgICAgICAgICBiYm94ID0gaXNOb2RlID8gaXRlbSA6IHRvQkJveChpdGVtKSxcbiAgICAgICAgICAgIGluc2VydFBhdGggPSBbXTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBiZXN0IG5vZGUgZm9yIGFjY29tbW9kYXRpbmcgdGhlIGl0ZW0sIHNhdmluZyBhbGwgbm9kZXMgYWxvbmcgdGhlIHBhdGggdG9vXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5fY2hvb3NlU3VidHJlZShiYm94LCB0aGlzLmRhdGEsIGxldmVsLCBpbnNlcnRQYXRoKTtcblxuICAgICAgICAvLyBwdXQgdGhlIGl0ZW0gaW50byB0aGUgbm9kZVxuICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goaXRlbSk7XG4gICAgICAgIGV4dGVuZChub2RlLCBiYm94KTtcblxuICAgICAgICAvLyBzcGxpdCBvbiBub2RlIG92ZXJmbG93OyBwcm9wYWdhdGUgdXB3YXJkcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgd2hpbGUgKGxldmVsID49IDApIHtcbiAgICAgICAgICAgIGlmIChpbnNlcnRQYXRoW2xldmVsXS5jaGlsZHJlbi5sZW5ndGggPiB0aGlzLl9tYXhFbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BsaXQoaW5zZXJ0UGF0aCwgbGV2ZWwpO1xuICAgICAgICAgICAgICAgIGxldmVsLS07XG4gICAgICAgICAgICB9IGVsc2UgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGp1c3QgYmJveGVzIGFsb25nIHRoZSBpbnNlcnRpb24gcGF0aFxuICAgICAgICB0aGlzLl9hZGp1c3RQYXJlbnRCQm94ZXMoYmJveCwgaW5zZXJ0UGF0aCwgbGV2ZWwpO1xuICAgIH0sXG5cbiAgICAvLyBzcGxpdCBvdmVyZmxvd2VkIG5vZGUgaW50byB0d29cbiAgICBfc3BsaXQ6IGZ1bmN0aW9uIChpbnNlcnRQYXRoLCBsZXZlbCkge1xuXG4gICAgICAgIHZhciBub2RlID0gaW5zZXJ0UGF0aFtsZXZlbF0sXG4gICAgICAgICAgICBNID0gbm9kZS5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgICBtID0gdGhpcy5fbWluRW50cmllcztcblxuICAgICAgICB0aGlzLl9jaG9vc2VTcGxpdEF4aXMobm9kZSwgbSwgTSk7XG5cbiAgICAgICAgdmFyIHNwbGl0SW5kZXggPSB0aGlzLl9jaG9vc2VTcGxpdEluZGV4KG5vZGUsIG0sIE0pO1xuXG4gICAgICAgIHZhciBuZXdOb2RlID0gY3JlYXRlTm9kZShub2RlLmNoaWxkcmVuLnNwbGljZShzcGxpdEluZGV4LCBub2RlLmNoaWxkcmVuLmxlbmd0aCAtIHNwbGl0SW5kZXgpKTtcbiAgICAgICAgbmV3Tm9kZS5oZWlnaHQgPSBub2RlLmhlaWdodDtcbiAgICAgICAgbmV3Tm9kZS5sZWFmID0gbm9kZS5sZWFmO1xuXG4gICAgICAgIGNhbGNCQm94KG5vZGUsIHRoaXMudG9CQm94KTtcbiAgICAgICAgY2FsY0JCb3gobmV3Tm9kZSwgdGhpcy50b0JCb3gpO1xuXG4gICAgICAgIGlmIChsZXZlbCkgaW5zZXJ0UGF0aFtsZXZlbCAtIDFdLmNoaWxkcmVuLnB1c2gobmV3Tm9kZSk7XG4gICAgICAgIGVsc2UgdGhpcy5fc3BsaXRSb290KG5vZGUsIG5ld05vZGUpO1xuICAgIH0sXG5cbiAgICBfc3BsaXRSb290OiBmdW5jdGlvbiAobm9kZSwgbmV3Tm9kZSkge1xuICAgICAgICAvLyBzcGxpdCByb290IG5vZGVcbiAgICAgICAgdGhpcy5kYXRhID0gY3JlYXRlTm9kZShbbm9kZSwgbmV3Tm9kZV0pO1xuICAgICAgICB0aGlzLmRhdGEuaGVpZ2h0ID0gbm9kZS5oZWlnaHQgKyAxO1xuICAgICAgICB0aGlzLmRhdGEubGVhZiA9IGZhbHNlO1xuICAgICAgICBjYWxjQkJveCh0aGlzLmRhdGEsIHRoaXMudG9CQm94KTtcbiAgICB9LFxuXG4gICAgX2Nob29zZVNwbGl0SW5kZXg6IGZ1bmN0aW9uIChub2RlLCBtLCBNKSB7XG5cbiAgICAgICAgdmFyIGksIGJib3gxLCBiYm94Miwgb3ZlcmxhcCwgYXJlYSwgbWluT3ZlcmxhcCwgbWluQXJlYSwgaW5kZXg7XG5cbiAgICAgICAgbWluT3ZlcmxhcCA9IG1pbkFyZWEgPSBJbmZpbml0eTtcblxuICAgICAgICBmb3IgKGkgPSBtOyBpIDw9IE0gLSBtOyBpKyspIHtcbiAgICAgICAgICAgIGJib3gxID0gZGlzdEJCb3gobm9kZSwgMCwgaSwgdGhpcy50b0JCb3gpO1xuICAgICAgICAgICAgYmJveDIgPSBkaXN0QkJveChub2RlLCBpLCBNLCB0aGlzLnRvQkJveCk7XG5cbiAgICAgICAgICAgIG92ZXJsYXAgPSBpbnRlcnNlY3Rpb25BcmVhKGJib3gxLCBiYm94Mik7XG4gICAgICAgICAgICBhcmVhID0gYmJveEFyZWEoYmJveDEpICsgYmJveEFyZWEoYmJveDIpO1xuXG4gICAgICAgICAgICAvLyBjaG9vc2UgZGlzdHJpYnV0aW9uIHdpdGggbWluaW11bSBvdmVybGFwXG4gICAgICAgICAgICBpZiAob3ZlcmxhcCA8IG1pbk92ZXJsYXApIHtcbiAgICAgICAgICAgICAgICBtaW5PdmVybGFwID0gb3ZlcmxhcDtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG5cbiAgICAgICAgICAgICAgICBtaW5BcmVhID0gYXJlYSA8IG1pbkFyZWEgPyBhcmVhIDogbWluQXJlYTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvdmVybGFwID09PSBtaW5PdmVybGFwKSB7XG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGNob29zZSBkaXN0cmlidXRpb24gd2l0aCBtaW5pbXVtIGFyZWFcbiAgICAgICAgICAgICAgICBpZiAoYXJlYSA8IG1pbkFyZWEpIHtcbiAgICAgICAgICAgICAgICAgICAgbWluQXJlYSA9IGFyZWE7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfSxcblxuICAgIC8vIHNvcnRzIG5vZGUgY2hpbGRyZW4gYnkgdGhlIGJlc3QgYXhpcyBmb3Igc3BsaXRcbiAgICBfY2hvb3NlU3BsaXRBeGlzOiBmdW5jdGlvbiAobm9kZSwgbSwgTSkge1xuXG4gICAgICAgIHZhciBjb21wYXJlTWluWCA9IG5vZGUubGVhZiA/IHRoaXMuY29tcGFyZU1pblggOiBjb21wYXJlTm9kZU1pblgsXG4gICAgICAgICAgICBjb21wYXJlTWluWSA9IG5vZGUubGVhZiA/IHRoaXMuY29tcGFyZU1pblkgOiBjb21wYXJlTm9kZU1pblksXG4gICAgICAgICAgICB4TWFyZ2luID0gdGhpcy5fYWxsRGlzdE1hcmdpbihub2RlLCBtLCBNLCBjb21wYXJlTWluWCksXG4gICAgICAgICAgICB5TWFyZ2luID0gdGhpcy5fYWxsRGlzdE1hcmdpbihub2RlLCBtLCBNLCBjb21wYXJlTWluWSk7XG5cbiAgICAgICAgLy8gaWYgdG90YWwgZGlzdHJpYnV0aW9ucyBtYXJnaW4gdmFsdWUgaXMgbWluaW1hbCBmb3IgeCwgc29ydCBieSBtaW5YLFxuICAgICAgICAvLyBvdGhlcndpc2UgaXQncyBhbHJlYWR5IHNvcnRlZCBieSBtaW5ZXG4gICAgICAgIGlmICh4TWFyZ2luIDwgeU1hcmdpbikgbm9kZS5jaGlsZHJlbi5zb3J0KGNvbXBhcmVNaW5YKTtcbiAgICB9LFxuXG4gICAgLy8gdG90YWwgbWFyZ2luIG9mIGFsbCBwb3NzaWJsZSBzcGxpdCBkaXN0cmlidXRpb25zIHdoZXJlIGVhY2ggbm9kZSBpcyBhdCBsZWFzdCBtIGZ1bGxcbiAgICBfYWxsRGlzdE1hcmdpbjogZnVuY3Rpb24gKG5vZGUsIG0sIE0sIGNvbXBhcmUpIHtcblxuICAgICAgICBub2RlLmNoaWxkcmVuLnNvcnQoY29tcGFyZSk7XG5cbiAgICAgICAgdmFyIHRvQkJveCA9IHRoaXMudG9CQm94LFxuICAgICAgICAgICAgbGVmdEJCb3ggPSBkaXN0QkJveChub2RlLCAwLCBtLCB0b0JCb3gpLFxuICAgICAgICAgICAgcmlnaHRCQm94ID0gZGlzdEJCb3gobm9kZSwgTSAtIG0sIE0sIHRvQkJveCksXG4gICAgICAgICAgICBtYXJnaW4gPSBiYm94TWFyZ2luKGxlZnRCQm94KSArIGJib3hNYXJnaW4ocmlnaHRCQm94KSxcbiAgICAgICAgICAgIGksIGNoaWxkO1xuXG4gICAgICAgIGZvciAoaSA9IG07IGkgPCBNIC0gbTsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZCA9IG5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBleHRlbmQobGVmdEJCb3gsIG5vZGUubGVhZiA/IHRvQkJveChjaGlsZCkgOiBjaGlsZCk7XG4gICAgICAgICAgICBtYXJnaW4gKz0gYmJveE1hcmdpbihsZWZ0QkJveCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSBNIC0gbSAtIDE7IGkgPj0gbTsgaS0tKSB7XG4gICAgICAgICAgICBjaGlsZCA9IG5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBleHRlbmQocmlnaHRCQm94LCBub2RlLmxlYWYgPyB0b0JCb3goY2hpbGQpIDogY2hpbGQpO1xuICAgICAgICAgICAgbWFyZ2luICs9IGJib3hNYXJnaW4ocmlnaHRCQm94KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXJnaW47XG4gICAgfSxcblxuICAgIF9hZGp1c3RQYXJlbnRCQm94ZXM6IGZ1bmN0aW9uIChiYm94LCBwYXRoLCBsZXZlbCkge1xuICAgICAgICAvLyBhZGp1c3QgYmJveGVzIGFsb25nIHRoZSBnaXZlbiB0cmVlIHBhdGhcbiAgICAgICAgZm9yICh2YXIgaSA9IGxldmVsOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgZXh0ZW5kKHBhdGhbaV0sIGJib3gpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jb25kZW5zZTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgcGF0aCwgcmVtb3ZpbmcgZW1wdHkgbm9kZXMgYW5kIHVwZGF0aW5nIGJib3hlc1xuICAgICAgICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxLCBzaWJsaW5nczsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmIChwYXRoW2ldLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzaWJsaW5ncyA9IHBhdGhbaSAtIDFdLmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgICAgICBzaWJsaW5ncy5zcGxpY2Uoc2libGluZ3MuaW5kZXhPZihwYXRoW2ldKSwgMSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgdGhpcy5jbGVhcigpO1xuXG4gICAgICAgICAgICB9IGVsc2UgY2FsY0JCb3gocGF0aFtpXSwgdGhpcy50b0JCb3gpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbml0Rm9ybWF0OiBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIC8vIGRhdGEgZm9ybWF0IChtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZIGFjY2Vzc29ycylcblxuICAgICAgICAvLyB1c2VzIGV2YWwtdHlwZSBmdW5jdGlvbiBjb21waWxhdGlvbiBpbnN0ZWFkIG9mIGp1c3QgYWNjZXB0aW5nIGEgdG9CQm94IGZ1bmN0aW9uXG4gICAgICAgIC8vIGJlY2F1c2UgdGhlIGFsZ29yaXRobXMgYXJlIHZlcnkgc2Vuc2l0aXZlIHRvIHNvcnRpbmcgZnVuY3Rpb25zIHBlcmZvcm1hbmNlLFxuICAgICAgICAvLyBzbyB0aGV5IHNob3VsZCBiZSBkZWFkIHNpbXBsZSBhbmQgd2l0aG91dCBpbm5lciBjYWxsc1xuXG4gICAgICAgIHZhciBjb21wYXJlQXJyID0gWydyZXR1cm4gYScsICcgLSBiJywgJzsnXTtcblxuICAgICAgICB0aGlzLmNvbXBhcmVNaW5YID0gbmV3IEZ1bmN0aW9uKCdhJywgJ2InLCBjb21wYXJlQXJyLmpvaW4oZm9ybWF0WzBdKSk7XG4gICAgICAgIHRoaXMuY29tcGFyZU1pblkgPSBuZXcgRnVuY3Rpb24oJ2EnLCAnYicsIGNvbXBhcmVBcnIuam9pbihmb3JtYXRbMV0pKTtcblxuICAgICAgICB0aGlzLnRvQkJveCA9IG5ldyBGdW5jdGlvbignYScsXG4gICAgICAgICAgICAncmV0dXJuIHttaW5YOiBhJyArIGZvcm1hdFswXSArXG4gICAgICAgICAgICAnLCBtaW5ZOiBhJyArIGZvcm1hdFsxXSArXG4gICAgICAgICAgICAnLCBtYXhYOiBhJyArIGZvcm1hdFsyXSArXG4gICAgICAgICAgICAnLCBtYXhZOiBhJyArIGZvcm1hdFszXSArICd9OycpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGZpbmRJdGVtKGl0ZW0sIGl0ZW1zLCBlcXVhbHNGbikge1xuICAgIGlmICghZXF1YWxzRm4pIHJldHVybiBpdGVtcy5pbmRleE9mKGl0ZW0pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzRm4oaXRlbSwgaXRlbXNbaV0pKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuXG4vLyBjYWxjdWxhdGUgbm9kZSdzIGJib3ggZnJvbSBiYm94ZXMgb2YgaXRzIGNoaWxkcmVuXG5mdW5jdGlvbiBjYWxjQkJveChub2RlLCB0b0JCb3gpIHtcbiAgICBkaXN0QkJveChub2RlLCAwLCBub2RlLmNoaWxkcmVuLmxlbmd0aCwgdG9CQm94LCBub2RlKTtcbn1cblxuLy8gbWluIGJvdW5kaW5nIHJlY3RhbmdsZSBvZiBub2RlIGNoaWxkcmVuIGZyb20gayB0byBwLTFcbmZ1bmN0aW9uIGRpc3RCQm94KG5vZGUsIGssIHAsIHRvQkJveCwgZGVzdE5vZGUpIHtcbiAgICBpZiAoIWRlc3ROb2RlKSBkZXN0Tm9kZSA9IGNyZWF0ZU5vZGUobnVsbCk7XG4gICAgZGVzdE5vZGUubWluWCA9IEluZmluaXR5O1xuICAgIGRlc3ROb2RlLm1pblkgPSBJbmZpbml0eTtcbiAgICBkZXN0Tm9kZS5tYXhYID0gLUluZmluaXR5O1xuICAgIGRlc3ROb2RlLm1heFkgPSAtSW5maW5pdHk7XG5cbiAgICBmb3IgKHZhciBpID0gaywgY2hpbGQ7IGkgPCBwOyBpKyspIHtcbiAgICAgICAgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICBleHRlbmQoZGVzdE5vZGUsIG5vZGUubGVhZiA/IHRvQkJveChjaGlsZCkgOiBjaGlsZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3ROb2RlO1xufVxuXG5mdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICAgIGEubWluWCA9IE1hdGgubWluKGEubWluWCwgYi5taW5YKTtcbiAgICBhLm1pblkgPSBNYXRoLm1pbihhLm1pblksIGIubWluWSk7XG4gICAgYS5tYXhYID0gTWF0aC5tYXgoYS5tYXhYLCBiLm1heFgpO1xuICAgIGEubWF4WSA9IE1hdGgubWF4KGEubWF4WSwgYi5tYXhZKTtcbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZU5vZGVNaW5YKGEsIGIpIHsgcmV0dXJuIGEubWluWCAtIGIubWluWDsgfVxuZnVuY3Rpb24gY29tcGFyZU5vZGVNaW5ZKGEsIGIpIHsgcmV0dXJuIGEubWluWSAtIGIubWluWTsgfVxuXG5mdW5jdGlvbiBiYm94QXJlYShhKSAgIHsgcmV0dXJuIChhLm1heFggLSBhLm1pblgpICogKGEubWF4WSAtIGEubWluWSk7IH1cbmZ1bmN0aW9uIGJib3hNYXJnaW4oYSkgeyByZXR1cm4gKGEubWF4WCAtIGEubWluWCkgKyAoYS5tYXhZIC0gYS5taW5ZKTsgfVxuXG5mdW5jdGlvbiBlbmxhcmdlZEFyZWEoYSwgYikge1xuICAgIHJldHVybiAoTWF0aC5tYXgoYi5tYXhYLCBhLm1heFgpIC0gTWF0aC5taW4oYi5taW5YLCBhLm1pblgpKSAqXG4gICAgICAgICAgIChNYXRoLm1heChiLm1heFksIGEubWF4WSkgLSBNYXRoLm1pbihiLm1pblksIGEubWluWSkpO1xufVxuXG5mdW5jdGlvbiBpbnRlcnNlY3Rpb25BcmVhKGEsIGIpIHtcbiAgICB2YXIgbWluWCA9IE1hdGgubWF4KGEubWluWCwgYi5taW5YKSxcbiAgICAgICAgbWluWSA9IE1hdGgubWF4KGEubWluWSwgYi5taW5ZKSxcbiAgICAgICAgbWF4WCA9IE1hdGgubWluKGEubWF4WCwgYi5tYXhYKSxcbiAgICAgICAgbWF4WSA9IE1hdGgubWluKGEubWF4WSwgYi5tYXhZKTtcblxuICAgIHJldHVybiBNYXRoLm1heCgwLCBtYXhYIC0gbWluWCkgKlxuICAgICAgICAgICBNYXRoLm1heCgwLCBtYXhZIC0gbWluWSk7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zKGEsIGIpIHtcbiAgICByZXR1cm4gYS5taW5YIDw9IGIubWluWCAmJlxuICAgICAgICAgICBhLm1pblkgPD0gYi5taW5ZICYmXG4gICAgICAgICAgIGIubWF4WCA8PSBhLm1heFggJiZcbiAgICAgICAgICAgYi5tYXhZIDw9IGEubWF4WTtcbn1cblxuZnVuY3Rpb24gaW50ZXJzZWN0cyhhLCBiKSB7XG4gICAgcmV0dXJuIGIubWluWCA8PSBhLm1heFggJiZcbiAgICAgICAgICAgYi5taW5ZIDw9IGEubWF4WSAmJlxuICAgICAgICAgICBiLm1heFggPj0gYS5taW5YICYmXG4gICAgICAgICAgIGIubWF4WSA+PSBhLm1pblk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGUoY2hpbGRyZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgbGVhZjogdHJ1ZSxcbiAgICAgICAgbWluWDogSW5maW5pdHksXG4gICAgICAgIG1pblk6IEluZmluaXR5LFxuICAgICAgICBtYXhYOiAtSW5maW5pdHksXG4gICAgICAgIG1heFk6IC1JbmZpbml0eVxuICAgIH07XG59XG5cbi8vIHNvcnQgYW4gYXJyYXkgc28gdGhhdCBpdGVtcyBjb21lIGluIGdyb3VwcyBvZiBuIHVuc29ydGVkIGl0ZW1zLCB3aXRoIGdyb3VwcyBzb3J0ZWQgYmV0d2VlbiBlYWNoIG90aGVyO1xuLy8gY29tYmluZXMgc2VsZWN0aW9uIGFsZ29yaXRobSB3aXRoIGJpbmFyeSBkaXZpZGUgJiBjb25xdWVyIGFwcHJvYWNoXG5cbmZ1bmN0aW9uIG11bHRpU2VsZWN0KGFyciwgbGVmdCwgcmlnaHQsIG4sIGNvbXBhcmUpIHtcbiAgICB2YXIgc3RhY2sgPSBbbGVmdCwgcmlnaHRdLFxuICAgICAgICBtaWQ7XG5cbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgIHJpZ2h0ID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGxlZnQgPSBzdGFjay5wb3AoKTtcblxuICAgICAgICBpZiAocmlnaHQgLSBsZWZ0IDw9IG4pIGNvbnRpbnVlO1xuXG4gICAgICAgIG1pZCA9IGxlZnQgKyBNYXRoLmNlaWwoKHJpZ2h0IC0gbGVmdCkgLyBuIC8gMikgKiBuO1xuICAgICAgICBxdWlja3NlbGVjdChhcnIsIG1pZCwgbGVmdCwgcmlnaHQsIGNvbXBhcmUpO1xuXG4gICAgICAgIHN0YWNrLnB1c2gobGVmdCwgbWlkLCBtaWQsIHJpZ2h0KTtcbiAgICB9XG59XG4iLCIvKlxuIChjKSAyMDEzLCBEYXJhZmVpIFByYWxpYXNrb3Vza2ksIFZsYWRpbWlyIEFnYWZvbmtpbiwgTWFrc2ltIEd1cnRvdmVua29cbiBLb3RoaWMgSlMgaXMgYSBmdWxsLWZlYXR1cmVkIEphdmFTY3JpcHQgbWFwIHJlbmRlcmluZyBlbmdpbmUgdXNpbmcgSFRNTDUgQ2FudmFzLlxuIGh0dHA6Ly9naXRodWIuY29tL2tvdGhpYy9rb3RoaWMtanNcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgTWFwQ1NTID0gcmVxdWlyZShcIi4vc3R5bGUvbWFwY3NzXCIpO1xuY29uc3QgU3R5bGVNYW5hZ2VyID0gcmVxdWlyZShcIi4vc3R5bGUvc3R5bGUtbWFuYWdlclwiKTtcbmNvbnN0IEdhbGxlcnkgPSByZXF1aXJlKFwiLi9zdHlsZS9nYWxsZXJ5XCIpXG5jb25zdCBSZW5kZXJlciA9IHJlcXVpcmUoXCIuL3JlbmRlcmVyL3JlbmRlcmVyXCIpO1xuXG4vKipcbiAqKiBBdmFpbGFibGUgb3B0aW9uczpcbiAqKiBnZXRGcmFtZTpGdW5jdGlvbiDigJQgRnVuY3Rpb24sIHdpbGwgYmUgY2FsbGVkIHByaW9yIHRoZSBoZWF2eSBvcGVyYXRpb25zXG4gKiogZGVidWcge2Jvb2xlYW59IOKAlCByZW5kZXIgZGVidWcgaW5mb3JtYXRpb25cbiAqKiBicm93c2VyT3B0aW1pemF0aW9ucyB7Ym9vbGVhbn0g4oCUIGVuYWJsZSBzZXQgb2Ygb3B0aW1pemF0aW9ucyBmb3IgSFRNTDUgQ2FudmFzIGltcGxlbWVudGF0aW9uXG4gKiovXG5mdW5jdGlvbiBLb3RoaWMoY3NzLCBvcHRpb25zPXt9KSB7XG4gIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblxuICBjb25zdCBtYXBjc3MgPSBuZXcgTWFwQ1NTKGNzcywgb3B0aW9ucy5tYXBjc3MpO1xuXG4gIHRoaXMuc3R5bGVNYW5hZ2VyID0gbmV3IFN0eWxlTWFuYWdlcihtYXBjc3MsIHtncm91cEZlYXR1cmVzQnlBY3Rpb25zOiB0aGlzLmJyb3dzZXJPcHRpbWl6YXRpb25zfSk7XG5cbiAgY29uc3QgaW1hZ2VzID0gbWFwY3NzLmxpc3RJbWFnZVJlZmVyZW5jZXMoKTtcbiAgY29uc3QgZ2FsbGVyeSA9IG5ldyBHYWxsZXJ5KG9wdGlvbnMuZ2FsbGVyeSB8fCB7fSk7XG5cbiAgdGhpcy5yZW5kZXJlclByb21pc2UgPSBnYWxsZXJ5LnByZWxvYWRJbWFnZXMoaW1hZ2VzKS50aGVuKCgpID0+IHtcbiAgICAgcmV0dXJuIG5ldyBSZW5kZXJlcihnYWxsZXJ5LCB7XG4gICAgICBncm91cEZlYXR1cmVzQnlBY3Rpb25zOiB0aGlzLmJyb3dzZXJPcHRpbWl6YXRpb25zLFxuICAgICAgZGVidWc6IHRoaXMuZGVidWcsXG4gICAgICBnZXRGcmFtZTogdGhpcy5nZXRGcmFtZVxuICAgIH0pO1xuICB9LCAoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xufVxuXG5Lb3RoaWMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmRlYnVnICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuZGVidWcgPSAhIW9wdGlvbnMuZGVidWc7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kZWJ1ZyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuZ2V0RnJhbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmdldEZyYW1lID0gb3B0aW9ucy5nZXRGcmFtZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5nZXRGcmFtZSA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB2YXIgcmVxRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbiAgICAgICAgcmVxRnJhbWUuY2FsbCh3aW5kb3csIGZuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRGcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmJyb3dzZXJPcHRpbWl6YXRpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuYnJvd3Nlck9wdGltaXphdGlvbnMgPSAhIW9wdGlvbnMuYnJvd3Nlck9wdGltaXphdGlvbnM7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5icm93c2VyT3B0aW1pemF0aW9ucyA9IGZhbHNlO1xuICB9XG59O1xuXG5Lb3RoaWMucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChjYW52YXMsIGdlb2pzb24sIHpvb20sIGNhbGxiYWNrKSB7XG5cbiAgY29uc3Qgd2lkdGggPSBjYW52YXMud2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIC8vVE9ETzogbW92ZSB0byBvcHRpb25zIG5vZGUtY2FudmFzIHNwZWNpZmljIHNldHRpbmdcbiAgLy9jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2NvcHknXG5cbiAgY29uc3QgYmJveCA9IGdlb2pzb24uYmJveDtcbiAgY29uc3QgaHNjYWxlID0gd2lkdGggLyAoYmJveFsyXSAtIGJib3hbMF0pO1xuICBjb25zdCB2c2NhbGUgPSBoZWlnaHQgLyAoYmJveFszXSAtIGJib3hbMV0pO1xuICBmdW5jdGlvbiBwcm9qZWN0KHBvaW50KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIChwb2ludFswXSAtIGJib3hbMF0pICogaHNjYWxlLFxuICAgICAgaGVpZ2h0IC0gKChwb2ludFsxXSAtIGJib3hbMV0pICogdnNjYWxlKVxuICAgIF07XG4gIH1cblxuICBjb25zb2xlLnRpbWUoJ3N0eWxlcycpO1xuXG4gIC8vIHNldHVwIGxheWVyIHN0eWxlc1xuICAvLyBMYXllciBpcyBhbiBhcnJheSBvZiBvYmplY3RzLCBhbHJlYWR5IHNvcnRlZFxuICBjb25zdCBsYXllcnMgPSB0aGlzLnN0eWxlTWFuYWdlci5jcmVhdGVMYXllcnMoZ2VvanNvbi5mZWF0dXJlcywgem9vbSk7XG5cbiAgY29uc29sZS50aW1lRW5kKCdzdHlsZXMnKTtcblxuICB0aGlzLnJlbmRlcmVyUHJvbWlzZS50aGVuKChyZW5kZXJlcikgPT4ge1xuICAgIHJlbmRlcmVyLnJlbmRlcihsYXllcnMsIGN0eCwgd2lkdGgsIGhlaWdodCwgcHJvamVjdCwgY2FsbGJhY2spO1xuICB9KS5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtvdGhpYztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29sb3JzID0gcmVxdWlyZSgnLi4vdXRpbHMvY29sb3JzLmpzJyk7XG5cbmZ1bmN0aW9uIGRlZyhyYWQpIHtcblx0cmV0dXJuIHJhZCAqIDE4MCAvIE1hdGguUEk7XG59XG5cbmZ1bmN0aW9uIHJhZChkZWcpIHtcblx0cmV0dXJuIGRlZyAqIE1hdGguUEkgLyAxODA7XG59XG5cbmZ1bmN0aW9uIHF1YWRyYW50KGFuZ2xlKSB7XG4gIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyICYmIGFuZ2xlID4gLU1hdGguUEkgLyAyKSAge1xuICAgIHJldHVybiAnMSwzJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzIsNCc7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU2VnbWVudHMocG9pbnRzKSB7XG4gIGNvbnN0IHNlZ21lbnRzID0gW107XG4gIC8vVE9ETzogTWFrZSB0aGlzIGFuZ2xlIGNvbmZpZ3VyYWJsZVxuICBjb25zdCBtYXhTZWdtZW50QW5nbGUgPSByYWQoNDUpO1xuXG4gIC8vIE9mZnNldCBvZiBlYWNoIHNlZ21lbnQgZnJvbSB0aGUgYmVnaW5uaW5nIG9nIHRoZSBsaW5lXG4gIHZhciBvZmZzZXQgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBjb25zdCBzdGFydCA9IHBvaW50c1tpXTtcbiAgICBjb25zdCBlbmQgPSBwb2ludHNbaSArIDFdO1xuXG4gICAgY29uc3QgZHggPSBlbmRbMF0gLSBzdGFydFswXTtcbiAgICBjb25zdCBkeSA9IGVuZFsxXSAtIHN0YXJ0WzFdO1xuXG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5zcXJ0KGR4ICoqIDIgKyBkeSAqKiAyKTtcblxuICAgIC8vIFRyeSB0byBhdHRhY2ggY3VycmVudCBwb2ludCB0byBhIHByZXZpb3VzIHNlZ21lbnRcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcHJldlNlZ21lbnQgPSBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IHByZXZBbmdsZSA9IHByZXZTZWdtZW50LmFuZ2xlc1twcmV2U2VnbWVudC5hbmdsZXMubGVuZ3RoIC0gMV07XG5cbiAgICAgIC8vIEFuZ2xlcyBtb3JlIHRoYW4gMTgwIGRlZ3JlZXMgYXJlIHJldmVyc2VkIHRvIGRpZmZlcmVudCBkaXJlY3Rpb25cbiAgICAgIHZhciBhbmdsZURpZmYgPSBNYXRoLmFicyhwcmV2QW5nbGUgLSBhbmdsZSk7XG4gICAgICBpZiAoYW5nbGVEaWZmID4gTWF0aC5QSSkge1xuICAgICAgICBhbmdsZURpZmYgPSAoMiAqIE1hdGguUEkpIC0gYW5nbGVEaWZmO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgc2VnbWVudCBjYW4gYmUgY29udGludWVkLCBpZlxuICAgICAgLy8gMS4gQW5nbGUgYmV0d2VlbiB0d28gcGFydHMgaXMgbGVzc2VyIHRoZW4gbWF4U2VnbWVudEFuZ2xlIHRvIGF2b2lkIHNoYXJwIGNvcm5lcnNcbiAgICAgIC8vIDIuIFBhcnQgaXMgZGlyZWNyZWQgdG8gdGhlIHNhbWUgaGVtaWNpcmNsZSBhcyB0aGUgcHJldmlvdXMgc2VnbWVudFxuICAgICAgLy9cbiAgICAgIC8vIE90aGVyd2lzZSwgdGhlIG5ldyBzZWdtZW50IHdpbGwgYmUgY3JlYXRlZFxuICAgICAgaWYgKGFuZ2xlRGlmZiA8IG1heFNlZ21lbnRBbmdsZSAmJiBxdWFkcmFudChhbmdsZSkgPT0gcHJldlNlZ21lbnQucXVhZHJhbnQpIHtcbiAgICAgICAgcHJldlNlZ21lbnQucG9pbnRzLnB1c2goZW5kKTtcbiAgICAgICAgcHJldlNlZ21lbnQuYW5nbGVzLnB1c2goYW5nbGUpO1xuICAgICAgICBwcmV2U2VnbWVudC5wYXJ0c0xlbmd0aC5wdXNoKGxlbmd0aCk7XG4gICAgICAgIHByZXZTZWdtZW50Lmxlbmd0aCArPSBsZW5ndGg7XG4gICAgICAgIG9mZnNldCArPSBsZW5ndGg7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlZ21lbnRzLnB1c2goe1xuICAgICAgYW5nbGVzOiBbYW5nbGVdLFxuICAgICAgcGFydHNMZW5ndGg6IFtsZW5ndGhdLFxuICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICBsZW5ndGg6IGxlbmd0aCxcbiAgICAgIHBvaW50czogW3N0YXJ0LCBlbmRdLFxuICAgICAgcXVhZHJhbnQ6IHF1YWRyYW50KGFuZ2xlKVxuICAgIH0pO1xuXG4gICAgb2Zmc2V0ICs9IGxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBzZWdtZW50cztcbn1cblxuLyoqIEZpbmQgaW5kZXggb2Ygc2VnZW1udCBwYXJ0IGFuZCBvZmZzZXQgZnJvbSBiZWdpbm5pbmcgb2YgdGhlIHBhcnQgYnkgb2Zmc2V0LlxuICoqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gcHV0IGxhYmVsIHRvIHRoZSBjZW50ZXIgb2YgYSBzZWdtZW50XG4gKiogQHBhcmFtIHBhcnRzIHthcnJheX0gYXJyYXkgb2Ygc2VnbWVudCBwYXJ0cyBsZW5ndGhcbiAqKiBAcGFyYW0gb2Zmc2V0IHtmbG9hdH0gZXhwZWN0ZWQgb2Zmc2V0XG4gKiovXG5mdW5jdGlvbiBjYWxjdWxhdGVPZmZzZXQocGFydHMsIG9mZnNldCkge1xuICB2YXIgdG90YWxPZmZzZXQgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICBpZiAodG90YWxPZmZzZXQgKyBwYXJ0ID4gb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gW2ksIG9mZnNldCAtIHRvdGFsT2Zmc2V0XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG90YWxPZmZzZXQgKz0gcGFydDtcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXCJTYW5pdHkgY2hlY2s6IHBhdGggaXMgc2hvcnRlciB0aGFuIGFuIG9mZnNldFwiKTtcbn1cblxuZnVuY3Rpb24gZHJhd0dseXBoKGN0eCwgZ2x5cGgsIGhhc0hhbG89ZmFsc2UpIHtcbiAgY3R4LnRyYW5zbGF0ZShnbHlwaC5wb3NpdGlvblswXSwgZ2x5cGgucG9zaXRpb25bMV0pO1xuICBjdHgucm90YXRlKGdseXBoLmFuZ2xlKTtcblx0aWYgKGhhc0hhbG8pIHtcbiAgXHRjdHguc3Ryb2tlVGV4dChnbHlwaC5nbHlwaCwgZ2x5cGgub2Zmc2V0WzBdLCBnbHlwaC5vZmZzZXRbMV0pO1xuXHR9IGVsc2Uge1xuXHRcdGN0eC5maWxsVGV4dChnbHlwaC5nbHlwaCwgZ2x5cGgub2Zmc2V0WzBdLCBnbHlwaC5vZmZzZXRbMV0pO1xuXHR9XG5cbiAgY3R4LnJvdGF0ZSgtZ2x5cGguYW5nbGUpO1xuICBjdHgudHJhbnNsYXRlKC1nbHlwaC5wb3NpdGlvblswXSwgLWdseXBoLnBvc2l0aW9uWzFdKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyU2VnbWVudHMoY3R4LCBzZWdtZW50cykge1xuICBjdHguc2F2ZSgpO1xuICBzZWdtZW50cy5mb3JFYWNoKChzZWcpID0+IHtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcnMubmV4dENvbG9yKCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhzZWcucG9pbnRzWzBdWzBdLCBzZWcucG9pbnRzWzBdWzFdKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZy5wb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN0eC5saW5lVG8oc2VnLnBvaW50c1tpXVswXSwgc2VnLnBvaW50c1tpXVsxXSk7XG4gICAgfVxuICAgIGN0eC5zdHJva2UoKTtcbiAgfSk7XG4gIGN0eC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUdseXBoc1Bvc2l0aW9ucyhzZWdtZW50LCBnbHlwaHMpIHtcbiAgY29uc3QgdGV4dFdpZHRoID0gZ2x5cGhzLnJlZHVjZSgoYWNjLCBnbHlwaCkgPT4gYWNjICsgZ2x5cGgud2lkdGgsIDApO1xuXG4gIC8vUmV2ZXJzZSBzZWdtZW50IHRvIGF2b2lkIHRleHQsIGZsaXBwZWQgdXBzaWRlIGRvd25cbiAgaWYgKHNlZ21lbnQucXVhZHJhbnQgPT0gJzIsNCcpIHtcbiAgICBzZWdtZW50LmFuZ2xlcyA9IHNlZ21lbnQuYW5nbGVzLm1hcCgoYW5nbGUpID0+IGFuZ2xlIC0gTWF0aC5QSSk7XG4gICAgc2VnbWVudC5wYXJ0c0xlbmd0aC5yZXZlcnNlKCk7XG4gICAgc2VnbWVudC5wb2ludHMucmV2ZXJzZSgpO1xuXHRcdHNlZ21lbnQucXVhZHJhbnQgPSAnMSwzJ1xuICB9XG5cblx0Ly9BbGlnbiB0ZXh0IHRvIHRoZSBtaWRkbGUgb2YgY3VycmVudCBzZWdtZW50XG4gIGNvbnN0IHN0YXJ0T2Zmc2V0ID0gKHNlZ21lbnQubGVuZ3RoIC0gdGV4dFdpZHRoKSAvIDI7XG5cblx0Ly8gR2V0IHBvaW50IGluZGV4IGFuZCBvZmZzZXQgZnJvbSB0aGF0IHBvaW50IG9mIHRoZSBzdGFydGluZyBwb3NpdGlvblxuXHQvLyAnaW5kZXgnIGlzIGFuIGluZGV4IG9mIGN1cnJlbnQgc2VnbWVudCBwYXJ0c0xlbmd0aFxuXHQvLyAnb2Zmc2V0JyBpcyBhbiBvZmZzZXQgZnJvbSB0aGUgYmVnZ2luaW5nIG9mIHRoZSBwYXJ0XG4gIHZhciBbaW5kZXgsIG9mZnNldF0gPSBjYWxjdWxhdGVPZmZzZXQoc2VnbWVudC5wYXJ0c0xlbmd0aCwgc3RhcnRPZmZzZXQpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGdseXBocy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGdseXBoID0gZ2x5cGhzW2ldO1xuXG5cdFx0Y29uc3Qgc3RhcnRQb2ludEluZGV4ID0gaW5kZXg7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IG9mZnNldDtcblxuXHRcdC8vSXRlcmF0ZSBieSBwb2ludHMgdW50aWwgc3BhY2UgZm9yIGN1cnJlbnQgZ2x5cGggd2FzIHJlc2VydmVkXG5cdFx0dmFyIHJlc2VydmVkID0gMDtcbiAgICB3aGlsZSAocmVzZXJ2ZWQgPCBnbHlwaC53aWR0aCkge1xuICAgICAgY29uc3QgcmVxdWlyZWRTcGFjZSA9IGdseXBoLndpZHRoIC0gcmVzZXJ2ZWQ7XG5cdFx0XHQvL0N1cnJlbnQgcGFydCBpcyBsb25nZXIgdGhhbiByZXF1aXJlZCBzcGFjZVxuICAgICAgaWYgKHNlZ21lbnQucGFydHNMZW5ndGhbaW5kZXhdID4gb2Zmc2V0ICsgcmVxdWlyZWRTcGFjZSkge1xuICAgICAgICBvZmZzZXQgKz0gcmVxdWlyZWRTcGFjZTtcbiAgICAgICAgcmVzZXJ2ZWQgKz0gcmVxdWlyZWRTcGFjZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cblx0XHRcdC8vQ3VycmVudCBwYXJ0IGlzIHNob3J0ZXIgdGhhbiByZXF1aXJlZCBzcGFjZS4gUmVzZXJ2ZSB0aGUgd2hvbGUgcGFydFxuXHRcdFx0Ly9hbmQgaW5jcmVtZW50IGluZGV4XG4gICAgICByZXNlcnZlZCArPSBzZWdtZW50LnBhcnRzTGVuZ3RoW2luZGV4XSAtIG9mZnNldDtcbiAgICAgIGluZGV4ICs9IDE7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuXHRcdC8vIFRleHQgZ2x5cGggbWF5IGNvdmVyIG11bHRpcGxlIHNlZ21lbnQgcGFydHMsIHNvIGEgZ2x5cGggYW5nbGUgc2hvdWxkXG5cdFx0Ly8gYmUgYXZlcmFnZWQgYmV0d2VlbiBzdGFydCBhbnMgZW5kIHBvc2l0aW9uXG5cdFx0Y29uc3QgYW5nbGUgPSBhZGp1c3RBbmdsZShzZWdtZW50LnBvaW50c1tzdGFydFBvaW50SW5kZXhdLCBzZWdtZW50LmFuZ2xlc1tzdGFydFBvaW50SW5kZXhdLCBzZWdtZW50LnBvaW50c1tpbmRleF0sIHNlZ21lbnQuYW5nbGVzW2luZGV4XSwgb2Zmc2V0LCAwKTtcblxuXHRcdGdseXBoLnBvc2l0aW9uID0gc2VnbWVudC5wb2ludHNbc3RhcnRQb2ludEluZGV4XTtcblx0XHRnbHlwaC5hbmdsZSA9IGFuZ2xlO1xuXHRcdGdseXBoLm9mZnNldCA9IFtvZmZzZXRYLCAwXTtcbiAgfVxuXG5cdHJldHVybiBnbHlwaHM7XG59XG5cbmZ1bmN0aW9uIGFkanVzdEFuZ2xlKHBvaW50U3RhcnQsIGFuZ2xlU3RhcnQsIHBvaW50TmV4dCwgYW5nbGVOZXh0LCBvZmZzZXRYLCBvZmZzZXRZKSB7XG5cdC8vSWYgZ2x5cGggY2FuIGJlIGZpdHRlZCB0byBhIHNpbmdsZSBzZWdtZW50IHBhcnQsIG5vIGFkanVzdG1lbnQgaXMgbmVlZGVkXG5cdGlmIChwb2ludFN0YXJ0ID09PSBwb2ludE5leHQpIHtcblx0XHRyZXR1cm4gYW5nbGVTdGFydDtcblx0fVxuXG5cdC8vRHJhdyBhIGxpbmUgZnJvbSBzdGFydCBwb2ludCB0byBlbmQgcG9pbnQgb2YgYSBnbHlwaFxuXHRjb25zdCB4ID0gcG9pbnROZXh0WzBdICsgb2Zmc2V0WCAqIE1hdGguc2luKGFuZ2xlTmV4dCkgKyBvZmZzZXRZICogTWF0aC5zaW4oYW5nbGVOZXh0KTtcblx0Y29uc3QgeSA9IHBvaW50TmV4dFsxXSArIG9mZnNldFggKiBNYXRoLmNvcyhhbmdsZU5leHQpICsgb2Zmc2V0WSAqIE1hdGguY29zKGFuZ2xlTmV4dCk7XG5cblx0Ly9yZXR1cm4gYW5nbGUgb2YgdGhpcyBsaW5lXG5cdHJldHVybiBNYXRoLmF0YW4yKHkgLSBwb2ludFN0YXJ0WzFdLCB4IC0gcG9pbnRTdGFydFswXSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQ29sbGlzaW9ucyhzZWdtZW50LCBjb2xsaXNpb25zKSB7XG5cdGNvbnN0IGJveCA9IHNlZ21lbnQucG9pbnRzLnJlZHVjZSgoYWNjLCBwb2ludCkgPT4gKHtcblx0XHRcdG1pblg6IE1hdGgubWluKGFjYy5taW5YLCBwb2ludFswXSksXG5cdFx0XHRtaW5ZOiBNYXRoLm1pbihhY2MubWluWSwgcG9pbnRbMV0pLFxuXHRcdFx0bWF4WDogTWF0aC5tYXgoYWNjLm1heFgsIHBvaW50WzBdKSxcblx0XHRcdG1heFk6IE1hdGgubWF4KGFjYy5tYXhYLCBwb2ludFsxXSlcblx0XHR9KSwge21pblg6IEluZmluaXR5LCBtaW5ZOiBJbmZpbml0eSwgbWF4WDogLUluZmluaXR5LCBtYXhZOiAtSW5maW5pdHl9KTtcblxuXHRcdHJldHVybiBjb2xsaXNpb25zLmNoZWNrKGJveCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihjdHgsIHBvaW50cywgdGV4dCwgaGFzSGFsbywgY29sbGlzaW9ucywgZGVidWc9ZmFsc2UpIHtcbiAgY29uc3QgZ2x5cGhzID0gdGV4dC5zcGxpdChcIlwiKVxuICAgICAgLm1hcCgobCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRyaWNzID0gY3R4Lm1lYXN1cmVUZXh0KGwpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGdseXBoOiBsLFxuICAgICAgICAgIHdpZHRoOiBtZXRyaWNzLndpZHRoLFxuICAgICAgICAgIGFzY2VudDogbWV0cmljcy5lbUhlaWdodEFzY2VudCxcbiAgICAgICAgICBkZXNjZW50OiBtZXRyaWNzLmVtSGVpZ2h0RGVzY2VudCxcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgY29uc3QgdGV4dFdpZHRoID0gZ2x5cGhzLnJlZHVjZSgoYWNjLCBnbHlwaCkgPT4gYWNjICsgZ2x5cGgud2lkdGgsIDApO1xuXG4gIHZhciBzZWdtZW50cyA9IGNyZWF0ZVNlZ21lbnRzKHBvaW50cyk7XG5cbiAgaWYgKGRlYnVnKSB7XG4gICAgcmVuZGVyU2VnbWVudHMoY3R4LCBzZWdtZW50cyk7XG4gIH1cblxuICAvL1RPRE86IE1lcmdlIGZpcnN0IGFuZCBsYXN0IHNlZ21lbnRzIGlmIHBvc3NpYmxlXG5cbiAgc2VnbWVudHMgPSBzZWdtZW50cy5maWx0ZXIoKHNlZykgPT4gc2VnLmxlbmd0aCA+IHRleHRXaWR0aCk7XG5cblx0c2VnbWVudHMgPSBzZWdtZW50cy5maWx0ZXIoKHNlZykgPT4gY2hlY2tDb2xsaXNpb25zKHNlZywgY29sbGlzaW9ucykpXG5cblxuICAvL1RPRE8gQ2hvb3NlIGJlc3Qgc2VnbWVudHNcblxuICAvL1JlbmRlciB0ZXh0XG4gIHNlZ21lbnRzLmZvckVhY2goKHNlZykgPT4ge1xuXHRcdGNvbnN0IHBvc2l0aW9ucyA9IGNhbGN1bGF0ZUdseXBoc1Bvc2l0aW9ucyhzZWcsIGdseXBocyk7XG5cblx0XHRpZiAoaGFzSGFsbykge1xuXHRcdFx0cG9zaXRpb25zLmZvckVhY2goKGdseXBoKSA9PiB7XG5cdFx0XHRcdGRyYXdHbHlwaChjdHgsIGdseXBoLCB0cnVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRwb3NpdGlvbnMuZm9yRWFjaCgoZ2x5cGgpID0+IHtcblx0XHRcdGRyYXdHbHlwaChjdHgsIGdseXBoLCBmYWxzZSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIgPSByZW5kZXI7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBnZW9tID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2VvbScpO1xuXG5mdW5jdGlvbiByZW5kZXJJY29uKGN0eCwgZmVhdHVyZSwgbmV4dEZlYXR1cmUsIHtwcm9qZWN0UG9pbnRGdW5jdGlvbiwgY29sbGlzaW9uQnVmZmVyLCBnYWxsZXJ5fSkge1xuICAvL1RPRE86IFJlZmFjdG9yLCBjYWxjdWxhdGUgcmVwcmVzZW50YXRpdmUgcG9pbnQgb25seSBvbmNlXG4gIGNvbnN0IHBvaW50ID0gZ2VvbS5nZXRSZXByUG9pbnQoZmVhdHVyZS5nZW9tZXRyeSwgcHJvamVjdFBvaW50RnVuY3Rpb24pO1xuICBpZiAoIXBvaW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYWN0aW9ucyA9IGZlYXR1cmUuYWN0aW9ucztcblxuICBjb25zdCBpbWFnZSA9IGdhbGxlcnkuZ2V0SW1hZ2UoYWN0aW9uc1snaWNvbi1pbWFnZSddKTtcbiAgaWYgKCFpbWFnZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB3ID0gaW1hZ2Uud2lkdGgsIGggPSBpbWFnZS5oZWlnaHQ7XG5cbiAgLy9ab29tIGltYWdlIGFjY29yZGluZyB0byB2YWx1ZXMsIHNwZWNpZmllZCBpbiBNYXBDU1NcbiAgaWYgKGFjdGlvbnNbJ2ljb24td2lkdGgnXSB8fCBhY3Rpb25zWydpY29uLWhlaWdodCddKSB7XG4gICAgaWYgKGFjdGlvbnNbJ2ljb24td2lkdGgnXSkge1xuICAgICAgdyA9IGFjdGlvbnNbJ2ljb24td2lkdGgnXTtcbiAgICAgIGggPSBpbWFnZS5oZWlnaHQgKiB3IC8gaW1hZ2Uud2lkdGg7XG4gICAgfVxuICAgIGlmIChhY3Rpb25zWydpY29uLWhlaWdodCddKSB7XG4gICAgICBoID0gYWN0aW9uc1snaWNvbi1oZWlnaHQnXTtcbiAgICAgIGlmICghYWN0aW9uc1snaWNvbi13aWR0aCddKSB7XG4gICAgICAgIHcgPSBpbWFnZS53aWR0aCAqIGggLyBpbWFnZS5oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFhY3Rpb25zWydhbGxvdy1vdmVybGFwJ10pIHtcbiAgICBpZiAoY29sbGlzaW9uQnVmZmVyLmNoZWNrUG9pbnRXSChwb2ludCwgdywgaCwgZmVhdHVyZS5rb3RoaWNJZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuXG4gIGNvbnN0IHggPSBNYXRoLmZsb29yKHBvaW50WzBdIC0gdyAvIDIpO1xuICBjb25zdCB5ID0gTWF0aC5mbG9vcihwb2ludFsxXSAtIGggLyAyKTtcblxuICBjdHguc2F2ZSgpO1xuICBjdHguYmVnaW5QYXRoKCk7XG4gIC8vY3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJ1xuICAvL2N0eC5saW5lV2lkdGggPSAxXG4gIGN0eC5lbGxpcHNlKHBvaW50WzBdLCBwb2ludFsxXSwgdyAvIDIsIGggLyAyLCAwLCAwLCAyKk1hdGguUEkpO1xuICAvL2N0eC5yZWN0KHgsIHksIHcsIGgpO1xuICBjdHguY2xpcChcImV2ZW5vZGRcIik7XG4gIC8vY3R4LnN0cm9rZSgpXG4gIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHgsIHksIHcsIGgpO1xuICBjdHgucmVzdG9yZSgpO1xuXG4gIGNvbnN0IHBhZGRpbmcgPSBwYXJzZUZsb2F0KGFjdGlvbnNbJy14LWtvdGhpYy1wYWRkaW5nJ10pO1xuICBjb2xsaXNpb25CdWZmZXIuYWRkUG9pbnRXSChwb2ludCwgdywgaCwgcGFkZGluZywgZmVhdHVyZS5rb3RoaWNJZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLnJlbmRlciA9IHJlbmRlckljb247XG4iLCIvLyd1c2Ugc3RyaWN0JztcbmNvbnN0IHBhdGggPSByZXF1aXJlKCcuL3BhdGgnKTtcbmNvbnN0IGNvbnRleHRVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3N0eWxlJyk7XG5cbi8vVE9ETzogUmVmYWN0b3IgdG8gY2xhc3Ncbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXRoT3BlbmVkOiBmYWxzZSxcbiAgcmVuZGVyQ2FzaW5nOiBmdW5jdGlvbiAoY3R4LCBmZWF0dXJlLCBuZXh0RmVhdHVyZSwge3Byb2plY3RQb2ludEZ1bmN0aW9uLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsIGdyb3VwRmVhdHVyZXNCeUFjdGlvbnN9KSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IGZlYXR1cmUuYWN0aW9ucztcbiAgICBjb25zdCBuZXh0QWN0aW9ucyA9IG5leHRGZWF0dXJlICYmIG5leHRGZWF0dXJlLmFjdGlvbnM7XG5cbiAgIGlmICghdGhpcy5wYXRoT3BlbmVkKSB7XG4gICAgIHRoaXMucGF0aE9wZW5lZCA9IHRydWU7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICB9XG5cbiAgICAvL1RPRE86IElzIE1hcENTUyBzcGVjIHJlYWxseSBhbGxvd3MgYSBmYWxsYmFjayBmcm9tIFwiY2FzaW5nLWRhc2hlc1wiIHRvIFwiZGFzaGVzXCI/XG4gICAgY29uc3QgZGFzaGVzID0gYWN0aW9uc1snY2FzaW5nLWRhc2hlcyddIHx8IGFjdGlvbnNbJ2Rhc2hlcyddO1xuICAgIHBhdGgoY3R4LCBmZWF0dXJlLmdlb21ldHJ5LCBkYXNoZXMsIGZhbHNlLCBwcm9qZWN0UG9pbnRGdW5jdGlvbiwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcblxuICAgIGlmIChncm91cEZlYXR1cmVzQnlBY3Rpb25zICYmXG4gICAgICAgIG5leHRGZWF0dXJlICYmXG4gICAgICAgIG5leHRGZWF0dXJlLmtleSA9PT0gZmVhdHVyZS5rZXkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICdsaW5lV2lkdGgnOiAyICogYWN0aW9uc1tcImNhc2luZy13aWR0aFwiXSArIGFjdGlvbnNbJ3dpZHRoJ10sXG4gICAgICAnc3Ryb2tlU3R5bGUnOiBhY3Rpb25zW1wiY2FzaW5nLWNvbG9yXCJdLFxuICAgICAgJ2xpbmVDYXAnOiBhY3Rpb25zW1wiY2FzaW5nLWxpbmVjYXBcIl0gfHwgYWN0aW9uc1snbGluZWNhcCddLFxuICAgICAgJ2xpbmVKb2luJzogYWN0aW9uc1tcImNhc2luZy1saW5lam9pblwiXSB8fCBhY3Rpb25zWydsaW5lam9pbiddLFxuICAgICAgJ2dsb2JhbEFscGhhJzogYWN0aW9uc1tcImNhc2luZy1vcGFjaXR5XCJdXG4gICAgfVxuXG4gICAgY29udGV4dFV0aWxzLmFwcGx5U3R5bGUoY3R4LCBzdHlsZSk7XG5cbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgdGhpcy5wYXRoT3BlbmVkID0gZmFsc2U7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoY3R4LCBmZWF0dXJlLCBuZXh0RmVhdHVyZSwge3Byb2plY3RQb2ludEZ1bmN0aW9uLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsIGdyb3VwRmVhdHVyZXNCeUFjdGlvbnMsIGdhbGxlcnl9KSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IGZlYXR1cmUuYWN0aW9ucztcbiAgICBjb25zdCBuZXh0QWN0aW9ucyA9IG5leHRGZWF0dXJlICYmIG5leHRGZWF0dXJlLmFjdGlvbnM7XG4gICAgaWYgKCF0aGlzLnBhdGhPcGVuZWQpIHtcbiAgICAgIHRoaXMucGF0aE9wZW5lZCA9IHRydWU7XG4gICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIH1cblxuICAgIHBhdGgoY3R4LCBmZWF0dXJlLmdlb21ldHJ5LCBhY3Rpb25zWydkYXNoZXMnXSwgZmFsc2UsIHByb2plY3RQb2ludEZ1bmN0aW9uLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuXG4gICAgaWYgKGdyb3VwRmVhdHVyZXNCeUFjdGlvbnMgJiZcbiAgICAgICAgbmV4dEZlYXR1cmUgJiZcbiAgICAgICAgbmV4dEZlYXR1cmUua2V5ID09PSBmZWF0dXJlLmtleSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRMaW5lam9pbiA9IGFjdGlvbnNbJ3dpZHRoJ10gPD0gMiA/IFwibWl0ZXJcIiA6IFwicm91bmRcIjtcbiAgICBjb25zdCBkZWZhdWx0TGluZWNhcCA9IGFjdGlvbnNbJ3dpZHRoJ10gPD0gMiA/IFwiYnV0dFwiIDogXCJyb3VuZFwiO1xuXG4gICAgdmFyIHN0cm9rZVN0eWxlO1xuICAgIGlmICgnaW1hZ2UnIGluIGFjdGlvbnMpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gZ2FsbGVyeS5nZXRJbWFnZShhY3Rpb25zWydpbWFnZSddKTtcbiAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICBzdHJva2VTdHlsZSA9IGN0eC5jcmVhdGVQYXR0ZXJuKGltYWdlLCAncmVwZWF0Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0cm9rZVN0eWxlID0gc3Ryb2tlU3R5bGUgfHwgYWN0aW9uc1snY29sb3InXTtcblxuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgJ3N0cm9rZVN0eWxlJzogc3Ryb2tlU3R5bGUsXG4gICAgICAnbGluZVdpZHRoJzogYWN0aW9uc1snd2lkdGgnXSxcbiAgICAgICdsaW5lQ2FwJzogYWN0aW9uc1snbGluZWNhcCddIHx8IGRlZmF1bHRMaW5lam9pbixcbiAgICAgICdsaW5lSm9pbic6IGFjdGlvbnNbJ2xpbmVqb2luJ10gfHwgZGVmYXVsdExpbmVjYXAsXG4gICAgICAnZ2xvYmFsQWxwaGEnOiBhY3Rpb25zWydvcGFjaXR5J10sXG4gICAgICAnbWl0ZXJMaW1pdCc6IDRcbiAgICB9XG5cbiAgICBjb250ZXh0VXRpbHMuYXBwbHlTdHlsZShjdHgsIHN0eWxlKTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICB0aGlzLnBhdGhPcGVuZWQgPSBmYWxzZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZ2VvbSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dlb20nKTtcblxuLyoqXG4gKiogUmVuZGVyIGZlYXR1cmVzIG9uIENhbnZhc1xuICoqL1xuXG5mdW5jdGlvbiBkcmF3UmluZyhwb2ludHMsIGN0eCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCBkcmF3T25UaWxlRWRnZXMpIHtcbiAgaWYgKHBvaW50cy5sZW5ndGggPD0gMSkge1xuICAgIC8vR2VvbWV0cnkgaXMgdG9vIHNob3J0XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3R4Lm1vdmVUbyhwb2ludHNbMF1bMF0sIHBvaW50c1swXVsxXSk7XG5cbiAgLy9UT0RPOiBUaG9zZSBjb25zdGFudHMgTVVTVCBiZSBjb25maWd1cmVkIHVuIHVwcGVyIGRlc2lnbiBsZXZlbFxuICBjb25zdCBwYWRkaW5nID0gNTA7IC8vIGhvdyBtYW55IHBpeGVscyB0byBkcmF3IG91dCBvZiB0aGUgdGlsZSB0byBhdm9pZCBwYXRoIGVkZ2VzIHdoZW4gbGluZXMgY3Jvc3NlcyB0aWxlIGJvcmRlcnNcbiAgY29uc3Qgc2tpcCA9IDE7IC8vIGRvIG5vdCBkcmF3IGxpbmUgc2VnbWVudHMgc2hvcnRlciB0aGFuIHRoaXNcblxuICBmb3IgKGxldCBqID0gMSwgcG9pbnRzTGVuID0gcG9pbnRzLmxlbmd0aDsgaiA8IHBvaW50c0xlbjsgaisrKSB7XG4gICAgY29uc3QgcG9pbnQgPSBwb2ludHNbal07XG4gICAgLy9jb25zdCBwcmV2UG9pbnQgPSBwb2ludHNbaiAtIDFdXG5cbiAgICAvL1RPRE86IE1ha2UgcGFkZGluZyBhbiBvcHRpb24gdG8gbGV0IHVzZXIgcHJlcGFyZSBkYXRhIHdpdGggcGFkZGluZ1xuICAgIC8vIGNvbnRpbnVlIHBhdGggb2ZmIHRoZSB0aWxlIGJ5IHNvbWUgYW1vdW50IHRvIGZpeCBwYXRoIGVkZ2VzIGJldHdlZW4gdGlsZXNcbiAgICBpZiAoKGogPT09IDAgfHwgaiA9PT0gcG9pbnRzTGVuIC0gMSkgJiYgZ2VvbS5pc09uVGlsZUJvdW5kYXJ5KHBvaW50LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpKSB7XG4gICAgICBsZXQgayA9IGo7XG4gICAgICBsZXQgZGlzdCwgZHgsIGR5O1xuICAgICAgZG8ge1xuICAgICAgICBrID0gaiA/IGsgLSAxIDogayArIDE7XG4gICAgICAgIGlmIChrIDwgMCB8fCBrID49IHBvaW50c0xlbikge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJldlBvaW50ID0gcG9pbnRzW2tdO1xuXG4gICAgICAgIGR4ID0gcG9pbnRbMF0gLSBwcmV2UG9pbnRbMF07XG4gICAgICAgIGR5ID0gcG9pbnRbMV0gLSBwcmV2UG9pbnRbMV07XG4gICAgICAgIGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgfSB3aGlsZSAoZGlzdCA8PSBza2lwKTtcblxuICAgICAgLy8gYWxsIHBvaW50cyBhcmUgc28gY2xvc2UgdG8gZWFjaCBvdGhlciB0aGF0IGl0IGRvZXNuJ3QgbWFrZSBzZW5zZSB0b1xuICAgICAgLy8gZHJhdyB0aGUgbGluZSBiZXlvbmQgdGhlIHRpbGUgYm9yZGVyLCBzaW1wbHkgc2tpcCB0aGUgZW50aXJlIGxpbmUgZnJvbVxuICAgICAgLy8gaGVyZVxuICAgICAgaWYgKGsgPCAwIHx8IGsgPj0gcG9pbnRzTGVuKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBwb2ludFswXSA9IHBvaW50WzBdICsgcGFkZGluZyAqIGR4IC8gZGlzdDtcbiAgICAgIHBvaW50WzFdID0gcG9pbnRbMV0gKyBwYWRkaW5nICogZHkgLyBkaXN0O1xuICAgIH1cblxuICAgIGlmICghZHJhd09uVGlsZUVkZ2VzICYmIGdlb20uY2hlY2tTYW1lQm91bmRhcnkocG9pbnQsIHBvaW50c1tqIC0gMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCkpIHtcbiAgICAgIC8vIERvbid0IGRyYXcgbGluZXMgb24gdGlsZSBib3VuZGFyaWVzXG4gICAgICBjdHgubW92ZVRvKHBvaW50WzBdLCBwb2ludFsxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERyYXcgYSBsaW5lIG9yIGZpbGxpbmcgY29udG91clxuICAgICAgY3R4LmxpbmVUbyhwb2ludFswXSwgcG9pbnRbMV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGN0eCwgZ2VvbWV0cnksIGRhc2hlcywgZHJhd09uVGlsZUVkZ2VzLCBwcm9qZWN0UG9pbnRGdW5jdGlvbiwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KSB7XG4gIHZhciB0eXBlID0gZ2VvbWV0cnkudHlwZSxcbiAgICBjb29yZHMgPSBnZW9tZXRyeS5jb29yZGluYXRlcztcblxuICAvL0NvbnZlcnQgc2luZ2xlIGZlYXR1cmUgdG8gYSBtdWx0LXR5cGUgdG8gbWFrZSByZW5kZXJpbmcgZWFzaWVyXG4gIGlmICh0eXBlID09PSBcIlBvbHlnb25cIikge1xuICAgIGNvb3JkcyA9IFtjb29yZHNdO1xuICAgIHR5cGUgPSBcIk11bHRpUG9seWdvblwiO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiTGluZVN0cmluZ1wiKSB7XG4gICAgY29vcmRzID0gW2Nvb3Jkc107XG4gICAgdHlwZSA9IFwiTXVsdGlMaW5lU3RyaW5nXCI7XG4gIH1cblxuICBpZiAoZGFzaGVzKSB7XG4gICAgY3R4LnNldExpbmVEYXNoKGRhc2hlcyk7XG4gIH0gZWxzZSB7XG4gICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgfVxuXG4gIGlmICh0eXBlID09PSBcIk11bHRpUG9seWdvblwiKSB7XG4gICAgLy9JdGVyYXRlIGJ5IFBvbHlnb25zIGluIE11bHRpUG9seWdvblxuICAgIGZvciAobGV0IGkgPSAwLCBwb2x5Z29uc0xlbmd0aCA9IGNvb3Jkcy5sZW5ndGg7IGkgPCBwb2x5Z29uc0xlbmd0aDsgaSsrKSB7XG4gICAgICAvL0l0ZXJhdGUgYnkgUmluZ3Mgb2YgdGhlIFBvbHlnb25cbiAgICAgIGZvciAobGV0IGogPSAwLCByaW5nc0xlbmd0aCA9IGNvb3Jkc1tpXS5sZW5ndGg7IGogPCByaW5nc0xlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGNvb3Jkc1tpXVtqXS5tYXAocHJvamVjdFBvaW50RnVuY3Rpb24pO1xuXG4gICAgICAgIGRyYXdSaW5nKHBvaW50cywgY3R4LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsIGRyYXdPblRpbGVFZGdlcyk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiTXVsdGlMaW5lU3RyaW5nXCIpIHtcbiAgICAvL0l0ZXJhdGUgYnkgTGluZXMgaW4gTXVsdGlMaW5lU3RyaW5nXG4gICAgZm9yIChsZXQgaSA9IDAsIGxpbmVzTGVuZ3RoID0gY29vcmRzLmxlbmd0aDsgaSA8IGxpbmVzTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBvaW50cyA9IGNvb3Jkc1tpXS5tYXAocHJvamVjdFBvaW50RnVuY3Rpb24pO1xuXG4gICAgICBkcmF3UmluZyhwb2ludHMsIGN0eCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCBmYWxzZSlcbiAgICB9XG4gIH1cbn07XG4iLCIvLyd1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJy4vcGF0aCcpO1xuY29uc3QgY29udGV4dFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvc3R5bGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBhdGhPcGVuZWQ6IGZhbHNlLFxuICByZW5kZXI6IGZ1bmN0aW9uIChjdHgsIGZlYXR1cmUsIG5leHRGZWF0dXJlLCB7cHJvamVjdFBvaW50RnVuY3Rpb24sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCwgZ3JvdXBGZWF0dXJlc0J5QWN0aW9ucywgZ2FsbGVyeX0pIHtcbiAgICBjb25zdCBhY3Rpb25zID0gZmVhdHVyZS5hY3Rpb25zO1xuICAgIGNvbnN0IG5leHRBY3Rpb25zID0gbmV4dEZlYXR1cmUgJiYgbmV4dEZlYXR1cmUuYWN0aW9ucztcbiAgICBpZiAoIXRoaXMucGF0aE9wZW5lZCkge1xuICAgICAgdGhpcy5wYXRoT3BlbmVkID0gdHJ1ZTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICB9XG5cbiAgICBwYXRoKGN0eCwgZmVhdHVyZS5nZW9tZXRyeSwgZmFsc2UsIHRydWUsIHByb2plY3RQb2ludEZ1bmN0aW9uLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuXG4gICAgaWYgKGdyb3VwRmVhdHVyZXNCeUFjdGlvbnMgJiZcbiAgICAgICAgbmV4dEZlYXR1cmUgJiZcbiAgICAgICAgbmV4dEZlYXR1cmUua2V5ID09PSBmZWF0dXJlLmtleSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICgnZmlsbC1jb2xvcicgaW4gYWN0aW9ucykge1xuICAgICAgLy8gZmlyc3QgcGFzcyBmaWxscyB3aXRoIHNvbGlkIGNvbG9yXG4gICAgICBsZXQgc3R5bGUgPSB7XG4gICAgICAgIGZpbGxTdHlsZTogYWN0aW9uc1tcImZpbGwtY29sb3JcIl0sXG4gICAgICAgIGdsb2JhbEFscGhhOiBhY3Rpb25zW1wiZmlsbC1vcGFjaXR5XCJdIHx8IGFjdGlvbnNbJ29wYWNpdHknXVxuICAgICAgfTtcblxuICAgICAgY29udGV4dFV0aWxzLmFwcGx5U3R5bGUoY3R4LCBzdHlsZSk7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIGlmICgnZmlsbC1pbWFnZScgaW4gYWN0aW9ucykge1xuICAgICAgLy8gc2Vjb25kIHBhc3MgZmlsbHMgd2l0aCB0ZXh0dXJlXG4gICAgICBjb25zdCBpbWFnZSA9IGdhbGxlcnkuZ2V0SW1hZ2UoYWN0aW9uc1snZmlsbC1pbWFnZSddKTtcbiAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICBsZXQgc3R5bGUgPSB7XG4gICAgICAgICAgZmlsbFN0eWxlOiBjdHguY3JlYXRlUGF0dGVybihpbWFnZSwgJ3JlcGVhdCcpLFxuICAgICAgICAgIGdsb2JhbEFscGhhOiBhY3Rpb25zW1wiZmlsbC1vcGFjaXR5XCJdIHx8IGFjdGlvbnNbJ29wYWNpdHknXVxuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0VXRpbHMuYXBwbHlTdHlsZShjdHgsIHN0eWxlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnBhdGhPcGVuZWQgPSBmYWxzZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ29sbGlzaW9uQnVmZmVyID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbGxpc2lvbnNcIik7XG5jb25zdCBjYW52YXNDb250ZXh0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3N0eWxlXCIpO1xuY29uc3QgZmxvdyA9IHJlcXVpcmUoXCIuLi91dGlscy9mbG93XCIpO1xuXG5jb25zdCBsaW5lID0gcmVxdWlyZShcIi4vbGluZVwiKTtcbmNvbnN0IHBvbHlnb24gPSByZXF1aXJlKFwiLi9wb2x5Z29uXCIpO1xuY29uc3QgdGV4dCA9IHJlcXVpcmUoXCIuL3RleHRcIik7XG5jb25zdCBzaGllbGQgPSByZXF1aXJlKFwiLi9zaGllbGRcIik7XG5jb25zdCBpY29uID0gcmVxdWlyZShcIi4vaWNvblwiKTtcblxuY29uc3QgcmVuZGVycyA9IHtcbiAgY2FzaW5nOiBsaW5lLnJlbmRlckNhc2luZyxcbiAgbGluZTogbGluZS5yZW5kZXIsXG4gIHBvbHlnb246IHBvbHlnb24ucmVuZGVyLFxuICB0ZXh0OiB0ZXh0LnJlbmRlcixcbiAgaWNvbjogaWNvbi5yZW5kZXIsXG4gIHNoaWVsZDogc2hpZWxkLnJlbmRlclxufVxuXG5mdW5jdGlvbiBSZW5kZXJlcihnYWxsZXJ5LCBvcHRpb25zKSB7XG4gIHRoaXMuZ3JvdXBGZWF0dXJlc0J5QWN0aW9ucyA9IG9wdGlvbnMuZ3JvdXBGZWF0dXJlc0J5QWN0aW9ucyB8fCBmYWxzZTtcbiAgdGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWcgfHwgZmFsc2U7XG4gIHRoaXMucHJvamVjdFBvaW50RnVuY3Rpb24gPSBvcHRpb25zLnByb2plY3RQb2ludEZ1bmN0aW9uO1xuICB0aGlzLmdldEZyYW1lID0gb3B0aW9ucy5nZXRGcmFtZTtcbiAgdGhpcy5nYWxsZXJ5ID0gZ2FsbGVyeTtcbn1cblxuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmQgPSBmdW5jdGlvbihsYXllcnMsIGN0eCwgd2lkdGgsIGhlaWdodCwgem9vbSkge1xuICBjdHguZmlsbFN0eWxlID0gJyNkZGQnO1xuICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgLy9UT0RPOiBTdHlsZU1hbmFnZXIgc2hvdWxkIGNyZWF0ZSBiYWNrZ3JvdW5kIGFzIGEgbGF5ZXIgaW5zdGVhZCBvZiBtZXNzaW5nIHdpdGggc3R5bGVzIG1hbnVhbGx5XG4gIC8vIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVNYW5hZ2VyLnJlc3R5bGUoc3R5bGVzLCB7fSwge30sIHpvb20sICdjYW52YXMnLCAnY2FudmFzJyk7XG4gIC8vXG4gIC8vIHZhciBmaWxsUmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIGN0eC5maWxsUmVjdCgtMSwgLTEsIHdpZHRoICsgMSwgaGVpZ2h0ICsgMSk7XG4gIC8vIH07XG4gIC8vXG4gIC8vIGZvciAodmFyIGkgaW4gc3R5bGUpIHtcbiAgLy8gICAgIHBvbHlnb24uZmlsbChjdHgsIHN0eWxlW2ldLCBmaWxsUmVjdCk7XG4gIC8vIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29sbGlzaW9ucyhjdHgsIG5vZGUpIHtcbiAgY3R4LnN0cm9rZVN0eWxlID0gJ3JlZCc7XG4gIGN0eC5saW5lV2lkdGggPSAxO1xuICBpZiAobm9kZS5sZWFmKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChib3gpID0+IGN0eC5zdHJva2VSZWN0KGJveC5taW5YLCBib3gubWluWSwgYm94Lm1heFggLSBib3gubWluWCwgYm94Lm1heFkgLSBib3gubWluWSkpO1xuICB9IGVsc2Uge1xuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHJlbmRlckNvbGxpc2lvbnMoY3R4LCBjaGlsZCkpO1xuICB9XG59XG5cblJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihsYXllcnMsIGN0eCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCBwcm9qZWN0UG9pbnRGdW5jdGlvbiwgY2FsbGJhY2spIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGNvbGxpc2lvbkJ1ZmZlciA9IG5ldyBDb2xsaXNpb25CdWZmZXIodGlsZUhlaWdodCwgdGlsZVdpZHRoKTtcbiAgLy8gcmVuZGVyIHRoZSBtYXBcbiAgY2FudmFzQ29udGV4dC5hcHBseURlZmF1bHRzKGN0eCk7XG5cbiAgY29uc3QgY29udGV4dCA9IHtcbiAgICBjb2xsaXNpb25CdWZmZXI6IGNvbGxpc2lvbkJ1ZmZlcixcbiAgICBnYWxsZXJ5OiB0aGlzLmdhbGxlcnksXG4gICAgdGlsZVdpZHRoOiB0aWxlV2lkdGgsXG4gICAgdGlsZUhlaWdodDogdGlsZUhlaWdodCxcbiAgICBwcm9qZWN0UG9pbnRGdW5jdGlvbjogcHJvamVjdFBvaW50RnVuY3Rpb24sXG4gICAgZ3JvdXBGZWF0dXJlc0J5QWN0aW9uczogc2VsZi5ncm91cEZlYXR1cmVzQnlBY3Rpb25zXG4gIH1cblxuICBjb25zdCBmdW5jcyA9IGxheWVycy5tYXAoKGxheWVyKSA9PiAoKG5leHQpID0+IHtcbiAgICBjb25zdCBmZWF0dXJlcyA9IGxheWVyLmZlYXR1cmVzO1xuXG4gICAgLy9UT0RPOiBFbWl0IGV2ZW50XG4gICAgY29uc29sZS50aW1lKGxheWVyLnJlbmRlcik7XG5cbiAgICBjb25zdCByZW5kZXJGbiA9IHJlbmRlcnNbbGF5ZXIucmVuZGVyXTtcbiAgICBmb3IgKHZhciBqID0gMCwgbGVuID0gZmVhdHVyZXMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgIHJlbmRlckZuKGN0eCwgZmVhdHVyZXNbal0sIGZlYXR1cmVzW2ogKyAxXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBFbWl0IGV2ZW50XG4gICAgY29uc29sZS50aW1lRW5kKGxheWVyLnJlbmRlcik7XG5cbiAgICBuZXh0KCk7XG4gIH0pKTtcblxuICBmbG93LnNlcmllcyhmdW5jcywgc2VsZi5nZXRGcmFtZSwgKCkgPT4ge1xuICAgIGlmIChzZWxmLmRlYnVnKSB7XG4gICAgICByZW5kZXJDb2xsaXNpb25zKGN0eCwgY29sbGlzaW9uQnVmZmVyLmJ1ZmZlci5kYXRhKTtcbiAgICB9XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCcuL3BhdGgnKTtcbmNvbnN0IGNvbnRleHRVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3N0eWxlJyk7XG5jb25zdCBnZW9tID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2VvbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVuZGVyOiBmdW5jdGlvbiAoY3R4LCBmZWF0dXJlLCBuZXh0RmVhdHVyZSwge3Byb2plY3RQb2ludEZ1bmN0aW9uLCBjb2xsaXNpb25CdWZmZXIsIGdhbGxlcnl9KSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IGZlYXR1cmUuYWN0aW9ucztcblxuICAgIGNvbnN0IHBvaW50ID0gZ2VvbS5nZXRSZXByUG9pbnQoZmVhdHVyZS5nZW9tZXRyeSwgcHJvamVjdFBvaW50RnVuY3Rpb24pO1xuICAgIGlmICghcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaW1nLCBsZW4gPSAwLCBmb3VuZCA9IGZhbHNlLCBpLCBzZ247XG5cbiAgICBpZiAoYWN0aW9uc1tcInNoaWVsZC1pbWFnZVwiXSkge1xuICAgICAgaW1nID0gZ2FsbGVyeS5nZXRJbWFnZShhY3Rpb25zW1wic2hpZWxkLWltYWdlXCJdKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGZvbnQ6IGNvbnRleHRVdGlscy5jb21wb3NlRm9udERlY2xhcmF0aW9uKGFjdGlvbnNbXCJzaGllbGQtZm9udC1mYW1pbHlcIl0gfHwgYWN0aW9uc1tcImZvbnQtZmFtaWx5XCJdLCBhY3Rpb25zW1wic2hpZWxkLWZvbnQtc2l6ZVwiXSB8fCBhY3Rpb25zW1wiZm9udC1zaXplXCJdLCBhY3Rpb25zKSxcbiAgICAgIGZpbGxTdHlsZTogYWN0aW9uc1tcInNoaWVsZC10ZXh0LWNvbG9yXCJdLFxuICAgICAgZ2xvYmFsQWxwaGE6IGFjdGlvbnNbXCJzaGllbGQtdGV4dC1vcGFjaXR5XCJdIHx8IGFjdGlvbnNbJ29wYWNpdHknXSxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICB0ZXh0QmFzZWxpbmU6ICdtaWRkbGUnXG4gICAgfTtcblxuICAgIGNvbnRleHRVdGlscy5hcHBseVN0eWxlKGN0eCwgc3R5bGUpO1xuXG4gICAgdmFyIHRleHQgPSBTdHJpbmcoc3R5bGVbJ3NoaWVsZC10ZXh0J10pLFxuICAgICAgdGV4dFdpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoLFxuICAgICAgbGV0dGVyV2lkdGggPSB0ZXh0V2lkdGggLyB0ZXh0Lmxlbmd0aCxcbiAgICAgIGNvbGxpc2lvbldpZHRoID0gdGV4dFdpZHRoICsgMixcbiAgICAgIGNvbGxpc2lvbkhlaWdodCA9IGxldHRlcldpZHRoICogMS44O1xuXG4gICAgaWYgKGZlYXR1cmUudHlwZSA9PT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgICBsZW4gPSBnZW9tLmdldFBvbHlMZW5ndGgoZmVhdHVyZS5jb29yZGluYXRlcyk7XG5cbiAgICAgIGlmIChNYXRoLm1heChjb2xsaXNpb25IZWlnaHQgLyBocywgY29sbGlzaW9uV2lkdGggLyB3cykgPiBsZW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwLCBzZ24gPSAxOyBpIDwgbGVuIC8gMjsgaSArPSBNYXRoLm1heChsZW4gLyAzMCwgY29sbGlzaW9uSGVpZ2h0IC8gd3MpLCBzZ24gKj0gLTEpIHtcbiAgICAgICAgdmFyIHJlcHJQb2ludCA9IGdlb20uZ2V0QW5nbGVBbmRDb29yZHNBdExlbmd0aChmZWF0dXJlLmNvb3JkaW5hdGVzLCBsZW4gLyAyICsgc2duICogaSwgMCk7XG4gICAgICAgIGlmICghcmVwclBvaW50KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXByUG9pbnQgPSBbcmVwclBvaW50WzFdLCByZXByUG9pbnRbMl1dO1xuXG4gICAgICAgIHBvaW50ID0gZ2VvbS50cmFuc2Zvcm1Qb2ludChyZXByUG9pbnQsIHdzLCBocyk7XG4gICAgICAgIGlmIChpbWcgJiYgIWFjdGlvbnNbXCJhbGxvdy1vdmVybGFwXCJdICYmIGNvbGxpc2lvbkJ1ZmZlci5jaGVja1BvaW50V0gocG9pbnQsIGltZy53aWR0aCwgaW1nLmhlaWdodCwgZmVhdHVyZS5rb3RoaWNJZCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKCFhY3Rpb25zW1wiYWxsb3ctb3ZlcmxhcFwiXSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbkJ1ZmZlci5jaGVja1BvaW50V0gocG9pbnQsIGNvbGxpc2lvbldpZHRoLCBjb2xsaXNpb25IZWlnaHQsIGZlYXR1cmUua290aGljSWQpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHN0eWxlW1wic2hpZWxkLWNhc2luZy13aWR0aFwiXSkge1xuICAgICAgY29udGV4dFV0aWxzLmFwcGx5U3R5bGUoY3R4LCB7XG4gICAgICAgIGZpbGxTdHlsZTogc3R5bGVbXCJzaGllbGQtY2FzaW5nLWNvbG9yXCJdIHx8IFwiIzAwMDAwMFwiLFxuICAgICAgICBnbG9iYWxBbHBoYTogc3R5bGVbXCJzaGllbGQtY2FzaW5nLW9wYWNpdHlcIl0gfHwgc3R5bGVbJ29wYWNpdHknXSB8fCAxXG4gICAgICB9KTtcbiAgICAgIHZhciBwID0gc3R5bGVbXCJzaGllbGQtY2FzaW5nLXdpZHRoXCJdICsgKHN0eWxlW1wic2hpZWxkLWZyYW1lLXdpZHRoXCJdIHx8IDApO1xuICAgICAgY3R4LmZpbGxSZWN0KHBvaW50WzBdIC0gY29sbGlzaW9uV2lkdGggLyAyIC0gcCxcbiAgICAgICAgcG9pbnRbMV0gLSBjb2xsaXNpb25IZWlnaHQgLyAyIC0gcCxcbiAgICAgICAgY29sbGlzaW9uV2lkdGggKyAyICogcCxcbiAgICAgICAgY29sbGlzaW9uSGVpZ2h0ICsgMiAqIHApO1xuICAgIH1cblxuICAgIGlmIChzdHlsZVtcInNoaWVsZC1mcmFtZS13aWR0aFwiXSkge1xuICAgICAgY29udGV4dFV0aWxzLmFwcGx5U3R5bGUoY3R4LCB7XG4gICAgICAgIGZpbGxTdHlsZTogc3R5bGVbXCJzaGllbGQtZnJhbWUtY29sb3JcIl0gfHwgXCIjMDAwMDAwXCIsXG4gICAgICAgIGdsb2JhbEFscGhhOiBzdHlsZVtcInNoaWVsZC1mcmFtZS1vcGFjaXR5XCJdIHx8IHN0eWxlWydvcGFjaXR5J10gfHwgMVxuICAgICAgfSk7XG4gICAgICBjdHguZmlsbFJlY3QocG9pbnRbMF0gLSBjb2xsaXNpb25XaWR0aCAvIDIgLSBzdHlsZVtcInNoaWVsZC1mcmFtZS13aWR0aFwiXSxcbiAgICAgICAgcG9pbnRbMV0gLSBjb2xsaXNpb25IZWlnaHQgLyAyIC0gc3R5bGVbXCJzaGllbGQtZnJhbWUtd2lkdGhcIl0sXG4gICAgICAgIGNvbGxpc2lvbldpZHRoICsgMiAqIHN0eWxlW1wic2hpZWxkLWZyYW1lLXdpZHRoXCJdLFxuICAgICAgICBjb2xsaXNpb25IZWlnaHQgKyAyICogc3R5bGVbXCJzaGllbGQtZnJhbWUtd2lkdGhcIl0pO1xuICAgIH1cblxuICAgIGlmIChzdHlsZVtcInNoaWVsZC1jb2xvclwiXSkge1xuICAgICAgY29udGV4dFV0aWxzLmFwcGx5U3R5bGUoY3R4LCB7XG4gICAgICAgIGZpbGxTdHlsZTogc3R5bGVbXCJzaGllbGQtY29sb3JcIl0gfHwgXCIjMDAwMDAwXCIsXG4gICAgICAgIGdsb2JhbEFscGhhOiBzdHlsZVtcInNoaWVsZC1vcGFjaXR5XCJdIHx8IHN0eWxlWydvcGFjaXR5J10gfHwgMVxuICAgICAgfSk7XG4gICAgICBjdHguZmlsbFJlY3QocG9pbnRbMF0gLSBjb2xsaXNpb25XaWR0aCAvIDIsXG4gICAgICAgIHBvaW50WzFdIC0gY29sbGlzaW9uSGVpZ2h0IC8gMixcbiAgICAgICAgY29sbGlzaW9uV2lkdGgsXG4gICAgICAgIGNvbGxpc2lvbkhlaWdodCk7XG4gICAgfVxuXG4gICAgaWYgKGltZykge1xuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsXG4gICAgICAgIE1hdGguZmxvb3IocG9pbnRbMF0gLSBpbWcud2lkdGggLyAyKSxcbiAgICAgICAgTWF0aC5mbG9vcihwb2ludFsxXSAtIGltZy5oZWlnaHQgLyAyKSk7XG4gICAgfVxuICAgIGNvbnRleHRVdGlscy5hcHBseVN0eWxlKGN0eCwge1xuICAgICAgZmlsbFN0eWxlOiBzdHlsZVtcInNoaWVsZC10ZXh0LWNvbG9yXCJdIHx8IFwiIzAwMDAwMFwiLFxuICAgICAgZ2xvYmFsQWxwaGE6IHN0eWxlW1wic2hpZWxkLXRleHQtb3BhY2l0eVwiXSB8fCBzdHlsZVsnb3BhY2l0eSddIHx8IDFcbiAgICB9KTtcblxuICAgIGN0eC5maWxsVGV4dCh0ZXh0LCBwb2ludFswXSwgTWF0aC5jZWlsKHBvaW50WzFdKSk7XG4gICAgaWYgKGltZykge1xuICAgICAgY29sbGlzaW9uQnVmZmVyLmFkZFBvaW50V0gocG9pbnQsIGltZy53aWR0aCwgaW1nLmhlaWdodCwgMCwgZmVhdHVyZS5rb3RoaWNJZCk7XG4gICAgfVxuXG4gICAgY29sbGlzaW9uQnVmZmVyLmFkZFBvaW50V0gocG9pbnQsIGNvbGxpc2lvbkhlaWdodCwgY29sbGlzaW9uV2lkdGgsXG4gICAgICAocGFyc2VGbG9hdChzdHlsZVtcInNoaWVsZC1jYXNpbmctd2lkdGhcIl0pIHx8IDApICsgKHBhcnNlRmxvYXQoc3R5bGVbXCJzaGllbGQtZnJhbWUtd2lkdGhcIl0pIHx8IDApICsgKHBhcnNlRmxvYXQoc3R5bGVbXCIteC1tYXBuaWstbWluLWRpc3RhbmNlXCJdKSB8fCAzMCksIGZlYXR1cmUua290aGljSWQpO1xuXG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGdlb20gPSByZXF1aXJlKCcuLi91dGlscy9nZW9tJyk7XG5jb25zdCBjb250ZXh0VXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9zdHlsZScpO1xuLy92YXIgdGV4dE9uUGF0aCA9IHJlcXVpcmUoXCIuL3RleHRvbnBhdGhcIikudGV4dE9uUGF0aDtcbmNvbnN0IHRleHRPblBhdGggPSByZXF1aXJlKFwiLi9jdXJ2ZWR0ZXh0XCIpLnJlbmRlclxuXG5mdW5jdGlvbiByZW5kZXJUZXh0KGN0eCwgZmVhdHVyZSwgbmV4dEZlYXR1cmUsIHtwcm9qZWN0UG9pbnRGdW5jdGlvbiwgY29sbGlzaW9uQnVmZmVyfSkge1xuICBjb25zdCBhY3Rpb25zID0gZmVhdHVyZS5hY3Rpb25zO1xuXG4gIGNvbnN0IGhhc0hhbG8gPSAndGV4dC1oYWxvLXJhZGl1cycgaW4gYWN0aW9ucyAmJiBwYXJzZUludChhY3Rpb25zWyd0ZXh0LWhhbG8tcmFkaXVzJ10pID4gMDtcblxuICBjb25zdCBzdHlsZSA9IHtcbiAgICBsaW5lV2lkdGg6IGFjdGlvbnNbJ3RleHQtaGFsby1yYWRpdXMnXSxcbiAgICBmb250OiBjb250ZXh0VXRpbHMuY29tcG9zZUZvbnREZWNsYXJhdGlvbihhY3Rpb25zWydmb250LWZhbWlseSddLCBhY3Rpb25zWydmb250LXNpemUnXSwgYWN0aW9ucyksXG4gICAgZmlsbFN0eWxlOiBhY3Rpb25zWyd0ZXh0LWNvbG9yJ10sXG4gICAgc3Ryb2tlU3R5bGU6IGFjdGlvbnNbJ3RleHQtaGFsby1jb2xvciddLFxuICAgIGdsb2JhbEFscGhhOiBhY3Rpb25zWyd0ZXh0LW9wYWNpdHknXSB8fCBhY3Rpb25zWydvcGFjaXR5J10sXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICB0ZXh0QmFzZWxpbmU6ICdtaWRkbGUnXG4gIH07XG5cbiAgY29udGV4dFV0aWxzLmFwcGx5U3R5bGUoY3R4LCBzdHlsZSk7XG5cbiAgdmFyIHRleHQgPSBTdHJpbmcoYWN0aW9ucy50ZXh0KS50cmltKCk7XG4gIGlmIChhY3Rpb25zWyd0ZXh0LXRyYW5zZm9ybSddID09PSAndXBwZXJjYXNlJykge1xuICAgIHRleHQgPSB0ZXh0LnRvVXBwZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAoYWN0aW9uc1sndGV4dC10cmFuc2Zvcm0nXSA9PT0gJ2xvd2VyY2FzZScpIHtcbiAgICB0ZXh0ID0gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKGFjdGlvbnNbJ3RleHQtdHJhbnNmb3JtJ10gPT09ICdjYXBpdGFsaXplJykge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhefFxccylcXFMvZywgZnVuY3Rpb24oY2gpIHsgcmV0dXJuIGNoLnRvVXBwZXJDYXNlKCk7IH0pO1xuICB9XG5cbiAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nIHx8IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgIC8vVE9ETzogUmVmYWN0b3IsIGNhbGN1bGF0ZSByZXByZXNlbnRhdGl2ZSBwb2ludCBvbmx5IG9uY2VcbiAgICBjb25zdCBwb2ludCA9IGdlb20uZ2V0UmVwclBvaW50KGZlYXR1cmUuZ2VvbWV0cnksIHByb2plY3RQb2ludEZ1bmN0aW9uKTtcbiAgICBpZiAoIXBvaW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dFdpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xuICAgIGNvbnN0IGxldHRlcldpZHRoID0gdGV4dFdpZHRoIC8gdGV4dC5sZW5ndGg7XG4gICAgY29uc3Qgd2lkdGggPSB0ZXh0V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gbGV0dGVyV2lkdGggKiAyLjU7XG4gICAgY29uc3Qgb2Zmc2V0WSA9IGFjdGlvbnNbJ3RleHQtb2Zmc2V0J107XG5cbiAgICBjb25zdCBjZW50ZXIgPSBbcG9pbnRbMF0sIHBvaW50WzFdICsgb2Zmc2V0WV07XG4gICAgaWYgKCFhY3Rpb25zWyd0ZXh0LWFsbG93LW92ZXJsYXAnXSkge1xuICAgICAgaWYgKGNvbGxpc2lvbkJ1ZmZlci5jaGVja1BvaW50V0goY2VudGVyLCB3aWR0aCwgaGVpZ2h0LCBmZWF0dXJlLmtvdGhpY0lkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc0hhbG8pIHtcbiAgICAgIGN0eC5zdHJva2VUZXh0KHRleHQsIGNlbnRlclswXSwgY2VudGVyWzFdKTtcbiAgICB9XG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIGNlbnRlclswXSwgY2VudGVyWzFdKTtcblxuICAgIGNvbnN0IHBhZGRpbmcgPSBwYXJzZUZsb2F0KGFjdGlvbnNbJy14LWtvdGhpYy1wYWRkaW5nJ10pO1xuICAgIGNvbGxpc2lvbkJ1ZmZlci5hZGRQb2ludFdIKHBvaW50LCB3aWR0aCwgaGVpZ2h0LCBwYWRkaW5nLCBmZWF0dXJlLmtvdGhpY0lkKTtcbiAgfSBlbHNlIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdMaW5lU3RyaW5nJykge1xuICAgIGNvbnN0IHBvaW50cyA9IGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMubWFwKHByb2plY3RQb2ludEZ1bmN0aW9uKTtcbiAgICB0ZXh0T25QYXRoKGN0eCwgcG9pbnRzLCB0ZXh0LCBoYXNIYWxvLCBjb2xsaXNpb25CdWZmZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzLnJlbmRlciA9IHJlbmRlclRleHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVWQUxfRlVOQ1RJT05TID0ge1xuICBtaW46IGZ1bmN0aW9uICgvKi4uLiovKSB7XG4gICAgcmV0dXJuIE1hdGgubWluLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIH0sXG5cbiAgbWF4OiBmdW5jdGlvbiAoLyouLi4qLykge1xuICAgIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICB9LFxuXG4gIGFueTogZnVuY3Rpb24gKC8qLi4uKi8pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHR5cGVvZihhcmd1bWVudHNbaV0pICE9PSAndW5kZWZpbmVkJyAmJiBhcmd1bWVudHNbaV0gIT09ICcnKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9LFxuXG4gIG51bTogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IG4gPSBwYXJzZUZsb2F0KGFyZyk7XG4gICAgcmV0dXJuIGlzTmFOKG4pID8gMCA6IG47XG4gIH0sXG5cbiAgc3RyOiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuICcnICsgYXJnO1xuICB9LFxuXG4gIGludDogZnVuY3Rpb24gKGFyZykge1xuICAgIGNvbnN0IG4gPSBwYXJzZUludChhcmcsIDEwKTtcbiAgICByZXR1cm4gaXNOYU4obikgPyAwIDogbjtcbiAgfSxcblxuICBzcXJ0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChhcmcpO1xuICB9LFxuXG4gIGNvbmQ6IGZ1bmN0aW9uIChhcmcsIHRydWVFeHByLCBmYWxzZUV4cHIpIHtcbiAgICB0cnVlRXhwciA9IHRydWVFeHByIHx8IHRydWU7XG4gICAgZmFsc2VFeHByID0gZmFsc2VFeHByIHx8IGZhbHNlO1xuXG4gICAgcmV0dXJuIGFyZyA/IHRydWVFeHByIDogZmFsc2VFeHByO1xuICB9LFxuXG4gIG1ldHJpYzogZnVuY3Rpb24gKGFyZykge1xuICAgIGlmICgvXFxkXFxzKm1tJC8udGVzdChhcmcpKSB7XG4gICAgICByZXR1cm4gMC4wMDEgKiBwYXJzZUZsb2F0KGFyZyk7XG4gICAgfSBlbHNlIGlmICgvXFxkXFxzKmNtJC8udGVzdChhcmcpKSB7XG4gICAgICByZXR1cm4gMC4wMSAqIHBhcnNlRmxvYXQoYXJnKTtcbiAgICB9IGVsc2UgaWYgKC9cXGRcXHMqZG0kLy50ZXN0KGFyZykpIHtcbiAgICAgIHJldHVybiAwLjEgKiBwYXJzZUZsb2F0KGFyZyk7XG4gICAgfSBlbHNlIGlmICgvXFxkXFxzKmttJC8udGVzdChhcmcpKSB7XG4gICAgICByZXR1cm4gMTAwMCAqIHBhcnNlRmxvYXQoYXJnKTtcbiAgICB9IGVsc2UgaWYgKC9cXGRcXHMqKGlufFwiKSQvLnRlc3QoYXJnKSkge1xuICAgICAgcmV0dXJuIDAuMDI1NCAqIHBhcnNlRmxvYXQoYXJnKTtcbiAgICB9IGVsc2UgaWYgKC9cXGRcXHMqKGZ0fCcpJC8udGVzdChhcmcpKSB7XG4gICAgICByZXR1cm4gMC4zMDQ4ICogcGFyc2VGbG9hdChhcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChhcmcpO1xuICAgIH1cbiAgfSxcblxuICBqb2luOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50c1sxXSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHNbMV0uam9pbihhcmd1bWVudHNbMF0pO1xuICAgIH1cbiAgICB2YXIgdGFnU3RyaW5nID0gXCJcIjtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YWdTdHJpbmcgPSB0YWdTdHJpbmcuY29uY2F0KGFyZ3VtZW50c1swXSkuY29uY2F0KGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhZ1N0cmluZy5zdWJzdHIoYXJndW1lbnRzWzBdLmxlbmd0aCk7XG4gIH0sXG5cbiAgc3BsaXQ6IGZ1bmN0aW9uIChzZXAsIHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5zcGxpdChzZXApO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24oYXJyLCBpbmRleCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgaWYgKCEvXlswLTldKyQvLnRlc3QoaW5kZXgpIHx8IGluZGV4ID49IGFyci5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJbaW5kZXhdO1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24oYXJyLCBpbmRleCwgdGV4dCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBpZiAoIS9eWzAtOV0rJC8udGVzdChpbmRleCkpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgYXJyW2luZGV4XSA9IHRleHQ7XG5cbiAgICByZXR1cm4gYXJyO1xuICB9LFxuXG4gIGNvdW50OiBmdW5jdGlvbihhcnIpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIubGVuZ3RoO1xuICB9LFxuXG4gIGxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIH0sXG5cbiAgYXBwZW5kOiBmdW5jdGlvbihsc3QsIHYpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGxzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBsc3QucHVzaCh2KTtcblxuICAgIHJldHVybiBsc3Q7XG4gIH0sXG5cbiAgY29udGFpbnM6IGZ1bmN0aW9uKGxzdCwgdikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobHN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAobHN0LmluZGV4T2YodikgPj0gMCk7XG4gIH0sXG5cbiAgc29ydDogZnVuY3Rpb24obHN0KSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChsc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbHN0LnNvcnQoKTtcblxuICAgIHJldHVybiBsc3Q7XG4gIH0sXG5cbiAgcmV2ZXJzZTogZnVuY3Rpb24obHN0KSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChsc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGxzdC5yZXZlcnNlKCk7XG4gIH0sXG59O1xuXG5mdW5jdGlvbiBldmFsQmluYXJ5T3AobGVmdCwgb3AsIHJpZ2h0KSB7XG4gIHN3aXRjaCAob3ApIHtcbiAgY2FzZSAnKyc6XG4gICAgcmV0dXJuIGxlZnQgKyByaWdodDtcbiAgY2FzZSAnLSc6XG4gICAgcmV0dXJuIGxlZnQgLSByaWdodDtcbiAgY2FzZSAnKic6XG4gICAgcmV0dXJuIGxlZnQgKiByaWdodDtcbiAgY2FzZSAnLyc6XG4gICAgcmV0dXJuIGxlZnQgLyByaWdodDtcbiAgY2FzZSAnJSc6XG4gICAgcmV0dXJuIGxlZnQgJSByaWdodDtcbiAgZGVmYXVsdDpcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5leHBlY3RlZCBiaW5hcnkgb3BlcnRhdG9yIGluIGV2YWwgXCIgKyBKU09OLnN0cmluZ2lmeShvcCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2YWxGdW5jKGZ1bmMsIGFyZ3MsIHRhZ3MsIGFjdGlvbnMsIGxvY2FsZXMpIHtcbiAgc3dpdGNoIChmdW5jKSB7XG4gIGNhc2UgJ3RhZyc6XG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRhZygpIGZ1bmN0aW9uIGFsbG93cyBvbmx5IG9uZSBhcmd1bWVudFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3NbMF0gaW4gdGFncyA/IHRhZ3NbYXJnc1swXV0gOiAnJztcbiAgY2FzZSAncHJvcCc6XG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInByb3AoKSBmdW5jdGlvbiBhbGxvd3Mgb25seSBvbmUgYXJndW1lbnRcIik7XG4gICAgfVxuICAgIHJldHVybiBhcmdzWzBdIGluIGFjdGlvbnMgPyBhY3Rpb25zW2FyZ3NbMF1dIDogJyc7XG4gIGNhc2UgJ2xvY2FsaXplJzpcbiAgICBpZiAoYXJncy5sZW5ndGggIT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibG9jYWxpemUoKSBmdW5jdGlvbiBhbGxvd3Mgb25seSBvbmUgYXJndW1lbnRcIik7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdGFnID0gYXJnc1swXSArICc6JyArIGxvY2FsZXNbaV07XG4gICAgICBpZiAodGFnIGluIHRhZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRhZ3NbdGFnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJnc1swXSBpbiB0YWdzID8gdGFnc1thcmdzWzBdXSA6ICcnO1xuICBkZWZhdWx0OlxuICAgIGlmICghKGZ1bmMgaW4gRVZBTF9GVU5DVElPTlMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGZ1bmN0aW9uIGluIGV2YWwgXCIgKyBKU09OLnN0cmluZ2lmeShmdW5jKSk7XG4gICAgfVxuICAgIHJldHVybiBFVkFMX0ZVTkNUSU9OU1tmdW5jXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmFsRXhwcihleHByLCB0YWdzPXt9LCBhY3Rpb25zPXt9LCBsb2NhbGVzPVtdKSB7XG4gIGlmICghZXhwcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAoZXhwci50eXBlKSB7XG4gIGNhc2UgXCJiaW5hcnlfb3BcIjpcbiAgICByZXR1cm4gZXZhbEJpbmFyeU9wKGV2YWxFeHByKGV4cHIubGVmdCwgdGFncywgYWN0aW9ucywgbG9jYWxlcyksIGV4cHIub3AsIGV2YWxFeHByKGV4cHIucmlnaHQsIHRhZ3MsIGFjdGlvbnMsIGxvY2FsZXMpKTtcbiAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgcmV0dXJuIGV2YWxGdW5jKGV4cHIuZnVuYywgZXhwci5hcmdzLm1hcCgoeCkgPT4gZXZhbEV4cHIoeCwgdGFncywgYWN0aW9ucykpLCB0YWdzLCBhY3Rpb25zLCBsb2NhbGVzKTtcbiAgY2FzZSBcInN0cmluZ1wiOlxuICBjYXNlIFwibnVtYmVyXCI6XG4gICAgcmV0dXJuIGV4cHIudmFsdWU7XG4gIGRlZmF1bHQ6XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgZXhwcmVzc2lvbiB0eXBlIFwiICsgSlNPTi5zdHJpbmdpZnkoZXhwcikpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEtub3duVGFncyh0YWdzLCBleHByLCBsb2NhbGVzKSB7XG5cbiAgc3dpdGNoIChleHByLnR5cGUpIHtcbiAgY2FzZSBcImJpbmFyeV9vcFwiOlxuICAgIGFwcGVuZEtub3duVGFncyh0YWdzLCBleHByLmxlZnQpO1xuICAgIGFwcGVuZEtub3duVGFncyh0YWdzLCBleHByLnJpZ2h0KTtcbiAgICBicmVhaztcbiAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgaWYgKGV4cHIuZnVuYyA9PT0gXCJ0YWdcIikge1xuICAgICAgaWYgKGV4cHIuYXJncyAmJiBleHByLmFyZ3MubGVuZ3RoID09IDEpIHtcbiAgICAgICAgY29uc3QgdGFnID0gZXZhbEV4cHIoZXhwci5hcmdzWzBdLCB7fSwge30pO1xuICAgICAgICB0YWdzW3RhZ10gPSAna3YnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZXhwci5mdW5jID09PSBcImxvY2FsaXplXCIpIHtcbiAgICAgIGlmIChleHByLmFyZ3MgJiYgZXhwci5hcmdzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGNvbnN0IHRhZyA9IGV2YWxFeHByKGV4cHIuYXJnc1swXSwge30sIHt9KTtcbiAgICAgICAgdGFnc1t0YWddID0gJ2t2JztcbiAgICAgICAgbG9jYWxlcy5tYXAoKGxvY2FsZSkgPT4gdGFnICsgXCI6XCIgKyBsb2NhbGUpXG4gICAgICAgICAgLmZvckVhY2goKGspID0+IHRhZ3Nba10gPSAna3YnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXhwci5hcmdzLmZvckVhY2goKGFyZykgPT4gYXBwZW5kS25vd25UYWdzKHRhZ3MsIGFyZywgbG9jYWxlcykpO1xuICAgIH1cbiAgICBicmVhaztcbiAgY2FzZSBcInN0cmluZ1wiOlxuICBjYXNlIFwibnVtYmVyXCI6XG4gICAgYnJlYWs7XG4gIGRlZmF1bHQ6XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgZXZhbCB0eXBlIFwiICsgSlNPTi5zdHJpbmdpZnkoZXhwcikpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBldmFsRXhwcjogZXZhbEV4cHIsXG4gIGFwcGVuZEtub3duVGFnczogYXBwZW5kS25vd25UYWdzXG59O1xuIiwiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHsgbG9hZEltYWdlIH0gPSByZXF1aXJlKCdjYW52YXMnKVxuXG5mdW5jdGlvbiBHYWxsZXJ5KG9wdGlvbnMpIHtcbiAgdGhpcy5sb2NhbEltYWdlc0RpcmVjdG9yeSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5sb2NhbEltYWdlc0RpcmVjdG9yeTtcbiAgdGhpcy5pbWFnZXMgPSB7fTtcbn1cblxuR2FsbGVyeS5wcm90b3R5cGUucHJlbG9hZEltYWdlcyA9IGZ1bmN0aW9uKGltYWdlcykge1xuICBjb25zdCBzZWxmID0gdGhpcztcbiAgY29uc3QgdXJpUmVnZXhwID0gL2h0dHBzPzpcXC9cXC8vO1xuXG4gIC8vRXh0ZXJuYWwgaW1hZ2VzXG4gIHZhciBwcm9taXNlcyA9IGltYWdlcy5maWx0ZXIoKGltYWdlKSA9PiBpbWFnZS5tYXRjaCh1cmlSZWdleHApKVxuICAgICAgLm1hcCgoaW1hZ2UpID0+IGxvYWRJbWFnZShpbWFnZSkudGhlbigoZGF0YSkgPT4gc2VsZi5pbWFnZXNbaW1hZ2VdID0gZGF0YSkpO1xuXG4gIGlmICh0aGlzLmxvY2FsSW1hZ2VzRGlyZWN0b3J5KSB7XG4gICAgY29uc3QgbG9jYWxQcm9taXNlcyA9IGltYWdlcy5maWx0ZXIoKGltYWdlKSA9PiAhaW1hZ2UubWF0Y2godXJpUmVnZXhwKSlcbiAgICAgIC5tYXAoKGltYWdlKSA9PiBsb2FkSW1hZ2UocGF0aC5qb2luKHNlbGYubG9jYWxJbWFnZXNEaXJlY3RvcnksIGltYWdlKSkudGhlbigoZGF0YSkgPT4gc2VsZi5pbWFnZXNbaW1hZ2VdID0gZGF0YSkpO1xuICAgIHByb21pc2VzID0gcHJvbWlzZXMuY29uY2F0KGxvY2FsUHJvbWlzZXMpO1xuICB9XG5cbiAgcHJvbWlzZXMgPSBwcm9taXNlcy5tYXAoKHByb21pc2UpID0+IHByb21pc2UpO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59XG5cbkdhbGxlcnkucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgcmV0dXJuIHRoaXMuaW1hZ2VzW2ltYWdlXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYWxsZXJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBydWxlcyA9IHJlcXVpcmUoXCIuL3J1bGVzXCIpO1xuY29uc3QgbWFwY3NzID0gcmVxdWlyZShcIm1hcGNzc1wiKTtcblxuLyoqXG4gKiogQGNvbnN0cnVjdG9yXG4gKiogQHBhcmFtIHtzdHJpbmd9IGNzcyDigJQgTWFwQ1NTIHN0eWxlIGluIGEgcGxhaW4gdGV4dFxuICoqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIOKAlCBzdHlsZSBvcHRpb25zXG4gKiogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FjaGU6T2JqZWN0IOKAlCBjYWNoZSBpbXBsZW1lbnRhdGlvbi4gSWYgbm90IHNwZWNpZmllZCwgY2FjaGluZyB3aWxsIGJlIGRpc2FibGVkLlxuICoqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmxvY2FsZXM6QXJyYXlbU3RyaW5nXSBsaXN0IG9mIHN1cHBvcnRlZCBsb2NhbGVzIHNvcnRlZCBieSBtb3N0IHByZWZlcmVkIGZpcnN0LiBJZiBub3Qgc3BlY2lmaWVkLCBsb2NhbGl6YXRpb24gd2lsbCBiZSBkaXNhYmxlZFxuICoqL1xuZnVuY3Rpb24gTWFwQ1NTKGNzcywgb3B0aW9ucz17fSkge1xuICBpZiAodHlwZW9mKGNzcykgIT09ICdzdHJpbmcnICkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInY3NzJyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWRcIik7XG4gIH1cblxuICBjb25zdCBhc3QgPSBtYXBjc3MucGFyc2UoY3NzKTtcblxuICB0aGlzLnJ1bGVzID0gYXN0O1xuXG4gIGlmIChvcHRpb25zLmNhY2hlKSB7XG4gICAgdGhpcy5jYWNoZSA9IG9wdGlvbnMuY2FjaGU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jYWNoZSA9IG51bGw7XG4gIH1cblxuICBpZiAob3B0aW9ucy5sb2NhbGVzKSB7XG4gICAgdGhpcy5sb2NhbGVzID0gb3B0aW9ucy5sb2NhbGVzO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubG9jYWxlcyA9IFtdO1xuICB9XG5cbiAgdGhpcy5rbm93blRhZ3MgPSBydWxlcy5saXN0S25vd25UYWdzKGFzdCwgdGhpcy5sb2NhbGVzKTtcbiAgdGhpcy5pbWFnZXMgPSBydWxlcy5saXN0S25vd25JbWFnZXMoYXN0KTtcbn1cblxuTWFwQ1NTLnByb3RvdHlwZS5saXN0SW1hZ2VSZWZlcmVuY2VzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmltYWdlcztcbn1cblxuTWFwQ1NTLnByb3RvdHlwZS5jcmVhdGVDYWNoZUtleSA9IGZ1bmN0aW9uKHRhZ3MsIHpvb20sIGZlYXR1cmVUeXBlKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGsgaW4gdGFncykge1xuICAgIC8vVGVzdCBvbmx5IHRhZ3MsIG1lbnRpb25lZCBpbiBDU1Mgc2VsZWN0b3JzXG4gICAgaWYgKGsgaW4gdGhpcy5rbm93blRhZ3MpIHtcbiAgICAgIGlmICh0aGlzLmtub3duVGFnc1trXSA9PT0gJ2t2Jykge1xuICAgICAgICAvL1RhZyBrZXkgYW5kIHZhbHVlcyBhcmUgY2hlY2tlZCBpbiBNYXBDU1NcbiAgICAgICAga2V5cy5wdXNoKGsgKyBcIj1cIiArIHRhZ3Nba10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9Pbmx5IHRhZyBwcmVzZW5jZSBpcyBjaGVja2VkIGluIE1hcENTUywgd2UgZG9uJ3QgbmVlZCB0byB0YWtlIHZhbHVlIGluIGFjY291bnRcbiAgICAgICAga2V5cy5wdXNoKGspO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbem9vbSwgZmVhdHVyZVR5cGUsIGtleXMuam9pbignOicpXS5qb2luKCc6Jyk7XG59XG5cbi8qKlxuICoqIEFwcGx5IE1hcENTUyB0byBhIGZlYXR1cmUgYW5kIHJldHVybiBzZXQgb2YgbGF5ZXIgc3R5bGVzXG4gKiogQHBhcmFtIHRhZ3Mge09iamVjdH0g4oCUIG1hcHMgb2YgdGhlIGZlYXR1cmUgcHJvcGVydGllc1xuICoqIEBwYXJhbSB6b29tIHtpbnR9IOKAlCBjdXJyZW50IHpvb20gbGV2ZWxcbiAqKiBAcGFyYW0gZmVhdHVyZVR5cGUge1N0cmluZ30gwq3igJQgRmVhdHVyZSBnZW9tZXRyeSB0eXBlIGluIHRlcm1zIG9mIEdlb0pTT05cbiAqKiBAcmV0dXJucyB7T2JqZWN0fSDigJQgeydsYXllcic6IHsncHJvcGVydHknOiAndmFsdWUnfX1cbiAqKi9cbk1hcENTUy5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbih0YWdzLCB6b29tLCBmZWF0dXJlVHlwZSkge1xuICB2YXIga2V5O1xuXG4gIGlmICh0aGlzLmNhY2hlKSB7XG4gICAga2V5ID0gdGhpcy5jcmVhdGVDYWNoZUtleSh0YWdzLCB6b29tLCBmZWF0dXJlVHlwZSk7XG5cbiAgICBpZiAodGhpcy5jYWNoZSAmJiBrZXkgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjbGFzc2VzID0gW107XG4gIGNvbnN0IGxheWVycyA9IHJ1bGVzLmFwcGx5KHRoaXMucnVsZXMsIHRhZ3MsIGNsYXNzZXMsIHpvb20sIGZlYXR1cmVUeXBlLCB0aGlzLmxvY2FsZXMpO1xuXG4gIGlmICh0aGlzLmNhY2hlKSB7XG4gICAgdGhpcy5jYWNoZVtrZXldID0gbGF5ZXJzO1xuICB9XG4gIHJldHVybiBsYXllcnM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwQ1NTO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBtYXRjaFNlbGVjdG9yKHNlbGVjdG9yLCB0YWdzLCBjbGFzc2VzLCB6b29tLCBmZWF0dXJlVHlwZSkge1xuICBpZiAoIW1hdGNoRmVhdHVyZVR5cGUoc2VsZWN0b3IudHlwZSwgZmVhdHVyZVR5cGUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFtYXRjaFpvb20oc2VsZWN0b3Iuem9vbSwgem9vbSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIW1hdGNoQXR0cmlidXRlcyhzZWxlY3Rvci5hdHRyaWJ1dGVzLCB0YWdzKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghbWF0Y2hDbGFzc2VzKHNlbGVjdG9yLmNsYXNzZXMsIGNsYXNzZXMpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuLyoqXG4gKiogSGFzIHNpZGUgZWZmZWN0cyBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAoYXJndW1hbnQgaWYgbW9kaWZpZWQpXG4gKioga25vd25UYWdzOnt0YWc6ICdrJ3wna3YnfVxuICoqIGF0dHJpYnV0ZXM6W3t0eXBlLCBrZXksIHZhbHVlfV1cbiAqKi9cbmZ1bmN0aW9uIGFwcGVuZEtub3duVGFncyhrbm93blRhZ3MsIGF0dHJpYnV0ZXMpIHtcbiAgaWYgKCFhdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYXR0ciA9IGF0dHJpYnV0ZXNbaV07XG4gICAgc3dpdGNoIChhdHRyLnR5cGUpIHtcbiAgICBjYXNlICdwcmVzZW5jZSc6XG4gICAgY2FzZSAnYWJzZW5jZSc6XG4gICAgICBpZiAoa25vd25UYWdzW2F0dHIua2V5XSAhPSAna3YnKSB7XG4gICAgICAgIGtub3duVGFnc1thdHRyLmtleV0gPSAnayc7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjbXAnOlxuICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAvLydrdicgc2hvdWxkIG92ZXJyaWRlICdrJ1xuICAgICAga25vd25UYWdzW2F0dHIua2V5XSA9ICdrdic7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuXG4vKipcbiAqKiByYW5nZTpPYmplY3QgPSB7dHlwZTogJ3onLCBiZWdpbjogaW50LCBlbmQ6IGludH1cbiAqKiB6b29tOmludFxuICoqL1xuZnVuY3Rpb24gbWF0Y2hab29tKHJhbmdlLCB6b29tKSB7XG4gIGlmICghcmFuZ2UpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChyYW5nZS50eXBlICE9PSAneicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJab29tIHNlbGVjdG9yICdcIiArIHJhbmdlLnR5cGUgKyBcIicgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgfVxuXG4gIHJldHVybiB6b29tID49IChyYW5nZS5iZWdpbiB8fCAwKSAmJiB6b29tIDw9IChyYW5nZS5lbmQgfHwgOTAwMCk7XG59XG5cbi8qKlxuICoqIEBwYXJhbSBzZWxlY3RvclR5cGUge3N0cmluZ30g4oCUIFwibm9kZVwiLCBcIndheVwiLCBcInJlbGF0aW9uXCIsIFwibGluZVwiLCBcImFyZWFcIiwgXCJjYW52YXNcIiwgXCIqXCJcbiAqKiBAcGFyYW0gZmVhdHVyZVR5cGUge3N0cmluZ30g4oCUIFwiUG9pbnRcIiwgXCJNdWx0aVBvaW50XCIsIFwiUG9seWdvblwiLCBcIk11bHRpUG9seWdvblwiLCBcIkxpbmVTdHJpbmdcIiwgXCJNdWx0aUxpbmVTdHJpbmdcIlxuICoqL1xuZnVuY3Rpb24gbWF0Y2hGZWF0dXJlVHlwZShzZWxlY3RvclR5cGUsIGZlYXR1cmVUeXBlKSB7XG4gIGlmIChzZWxlY3RvclR5cGUgPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3dpdGNoIChmZWF0dXJlVHlwZSkge1xuICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICByZXR1cm4gc2VsZWN0b3JUeXBlID09PSAnd2F5JyB8fCBzZWxlY3RvclR5cGUgPT09ICdsaW5lJztcbiAgY2FzZSAnUG9seWdvbic6XG4gIGNhc2UgJ011bHRpUG9seWdvbic6XG4gICAgcmV0dXJuIHNlbGVjdG9yVHlwZSA9PT0gJ3dheScgfHwgc2VsZWN0b3JUeXBlID09PSAnYXJlYSc7XG4gIGNhc2UgJ1BvaW50JzpcbiAgY2FzZSAnTXVsdGlQb2ludCc6XG4gICAgcmV0dXJuIHNlbGVjdG9yVHlwZSA9PT0gJ25vZGUnO1xuICBkZWZhdWx0OlxuICAgIC8vTm90ZTogQ2FudmFzIGFuZCBSZWxhdGlvbiBhcmUgdmlydHVhbCBmZWF0dXJlcyBhbmQgY2Fubm90IGJlIHN1cHBvcnRlZCBhdCB0aGlzIGxldmVsXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZlYXR1cmUgdHlwZSBpcyBub3Qgc3VwcG9ydGVkOiBcIiArIGZlYXR1cmVUeXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXRjaEF0dHJpYnV0ZXMoYXR0cmlidXRlcywgdGFncykge1xuICBpZiAoIWF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghbWF0Y2hBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXSwgdGFncykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiogQ2xhc3NlcyBhcmUgY29uY2F0ZW5hdGVkIGJ5IEFORCBzdGF0ZW1lbnRcbiAqKiBzZWxlY3RvckNsYXNzZXM6W3tjbGFzczpTdHJpbmcsIG5vdDpCb29sZWFufV1cbiAqKiBjbGFzc2VzOltTdHJpbmddXG4gKiovXG5mdW5jdGlvbiBtYXRjaENsYXNzZXMoc2VsZWN0b3JDbGFzc2VzLCBjbGFzc2VzKSB7XG4gIGlmICghc2VsZWN0b3JDbGFzc2VzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdG9yQ2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNlbENsYXNzID0gc2VsZWN0b3JDbGFzc2VzW2ldO1xuICAgIGlmICghbWF0Y2hDbGFzcyhzZWxDbGFzcywgY2xhc3NlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hDbGFzcyhzZWxlY3RvckNsYXNzLCBjbGFzc2VzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNscyA9IGNsYXNzZXNbaV07XG4gICAgaWYgKHNlbGVjdG9yQ2xhc3MuY2xhc3MgPT0gY2xzKSB7XG4gICAgICByZXR1cm4gIXNlbGVjdG9yQ2xhc3Mubm90O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICoqIG9wOlN0cmluZyDigJQgb25lIG9mIFwiPVwiLCBcIiE9XCIsIFwiPFwiLCBcIjw9XCIsIFwiPlwiLCBcIj49XCJcbiAqKiBleHBlY3Q6U3RyaW5nIOKAlCBleHBlY3RlZCB2YWx1ZVxuICoqIHZhbHVlOlN0cmluZyDigJQgYWN0dWFsIHZhbHVlXG4gKiovXG5mdW5jdGlvbiBjb21wYXJlKG9wLCBleHBlY3QsIHZhbHVlKSB7XG4gIC8vIHBhcnNlRmxvYXQgcmV0dXJucyBOYU4gaWYgZmFpbGVkLCBhbmQgTmFOIGNvbXBhcmVkIHRvIGFueXRoaW5nIGlzIGZhbHNlLCBzb1xuICAvLyBubyBhZGRpdGlvbmFsIHR5cGUgY2hlY2tzIGFyZSByZXF1aXJlZFxuICBjb25zdCB2YWwgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgY29uc3QgZXhwID0gcGFyc2VGbG9hdChleHBlY3QpO1xuXG4gIHN3aXRjaCAob3ApIHtcbiAgY2FzZSAnPSc6XG4gICAgcmV0dXJuIGlzTmFOKHZhbCkgfHwgaXNOYU4oZXhwKSA/IGV4cGVjdCA9PSB2YWx1ZSA6IHZhbCA9PSBleHA7XG4gIGNhc2UgJyE9JzpcbiAgICByZXR1cm4gaXNOYU4odmFsKSB8fCBpc05hTihleHApID8gZXhwZWN0ICE9IHZhbHVlIDogdmFsICE9IGV4cDtcbiAgY2FzZSAnPCc6XG4gICAgcmV0dXJuIHZhbCA8IGV4cDtcbiAgY2FzZSAnPD0nOlxuICAgIHJldHVybiB2YWwgPD0gZXhwO1xuICBjYXNlICc+JzpcbiAgICByZXR1cm4gdmFsID4gZXhwO1xuICBjYXNlICc+PSc6XG4gICAgcmV0dXJuIHZhbCA+PSBleHA7XG4gIGRlZmF1bHQ6XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cblxuLyoqXG4gKiogcmVnZXhwOlN0cmluZyDigJQgcmVndWxhciBleHByZXNzaW9uXG4gKiogZmxhZ3M6U3RyaW5nIOKAlCByZWd1bGFyIGV4cHJlc3Npb24gZmxhZ3NcbiAqKiB2YWx1ZTpTdHJpbmcg4oCUIGFjdHVhbCB2YWx1ZVxuICoqL1xuZnVuY3Rpb24gcmVnZXhwKHJlZ2V4cCwgZmxhZ3MsIHZhbHVlKSB7XG4gIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChyZWdleHAsIGZsYWdzKTtcbiAgcmV0dXJuIHJlLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqKiBNYXRjaCB0YWdzIGFnYWluc3Qgc2luZ2xlIGF0dHJpYnV0ZSBzZWxlY3RvclxuICoqIGF0dHI6e3R5cGU6U3RyaW5nLCBrZXk6U3RyaW5nLCB2YWx1ZTpTdHJpbmd9XG4gKiogdGFnczp7KjogKn1cbiAqKi9cbmZ1bmN0aW9uIG1hdGNoQXR0cmlidXRlKGF0dHIsIHRhZ3MpIHtcbiAgc3dpdGNoIChhdHRyLnR5cGUpIHtcbiAgY2FzZSAncHJlc2VuY2UnOlxuICAgIHJldHVybiBhdHRyLmtleSBpbiB0YWdzO1xuICBjYXNlICdhYnNlbmNlJzpcbiAgICByZXR1cm4gIShhdHRyLmtleSBpbiB0YWdzKTtcbiAgY2FzZSAnY21wJzpcbiAgICByZXR1cm4gYXR0ci5rZXkgaW4gdGFncyAmJiBjb21wYXJlKGF0dHIub3AsIGF0dHIudmFsdWUsIHRhZ3NbYXR0ci5rZXldKTtcbiAgY2FzZSAncmVnZXhwJzpcbiAgICByZXR1cm4gYXR0ci5rZXkgaW4gdGFncyAmJiByZWdleHAoYXR0ci52YWx1ZS5yZWdleHAsIGF0dHIudmFsdWUuZmxhZ3MsIHRhZ3NbYXR0ci5rZXldKTtcbiAgZGVmYXVsdDpcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdHRyaWJ1dGUgdHlwZSBpcyBub3Qgc3VwcG9ydGVkOiBcIiArIGF0dHIudHlwZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1hdGNoWm9vbTogbWF0Y2hab29tLFxuICBtYXRjaEZlYXR1cmVUeXBlOiBtYXRjaEZlYXR1cmVUeXBlLFxuICBtYXRjaEF0dHJpYnV0ZXM6IG1hdGNoQXR0cmlidXRlcyxcbiAgbWF0Y2hBdHRyaWJ1dGU6IG1hdGNoQXR0cmlidXRlLFxuICBtYXRjaENsYXNzZXM6IG1hdGNoQ2xhc3NlcyxcbiAgbWF0Y2hTZWxlY3RvcjogbWF0Y2hTZWxlY3RvcixcbiAgYXBwZW5kS25vd25UYWdzOiBhcHBlbmRLbm93blRhZ3Ncbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbWF0Y2hlcnMgPSByZXF1aXJlKFwiLi9tYXRjaGVyc1wiKTtcbmNvbnN0IGV2YWxQcm9jZXNzb3IgPSByZXF1aXJlKFwiLi9ldmFsXCIpO1xuXG4vKipcbiAqKiBFeHRyYWN0IGFsbCB0YWdzLCByZWZlcmVuY2VkIGluIE1hcENTUyBydWxlcy5cbiAqKlxuICoqIEBwYXJhbSBydWxlcyB7YXJyYXl9IOKAlCBsaXN0IG9mIE1hcENTUyBydWxlcyBmcm9tIEFTVFxuICoqIEBwYXJhbSBsb2NhbGVzIHthcnJheX0g4oCUIGxpc3Qgb2Ygc3VwcG9ydGVkIGxvY2FsZXNcbiAqKiBAcmV0dXJuIHtPYmplY3R9IMKtdGFncyDigJQgbWFwIG9mIHRhZ3NcbiAqKiAgIGtleSDigJQgdGFnIG5hbWVcbiAqKiAgIHZhbHVlIOKAlCAnaycgaWYgdGFnIHZhbHVlIGlzIG5vdCB1c2VkXG4gKiogICAgICAgICAgICdrdicgaWYgdGFnIHZhbHVlIGlzIHVzZWRcbiAqKi9cbmZ1bmN0aW9uIGxpc3RLbm93blRhZ3MocnVsZXMsIGxvY2FsZXM9W10pIHtcbiAgY29uc3QgdGFncyA9IHt9O1xuICBydWxlcy5mb3JFYWNoKChydWxlKSA9PiB7XG4gICAgcnVsZS5zZWxlY3RvcnMuZm9yRWFjaCgoc2VsZWN0b3IpID0+IHtcbiAgICAgIG1hdGNoZXJzLmFwcGVuZEtub3duVGFncyh0YWdzLCBzZWxlY3Rvci5hdHRyaWJ1dGVzKTtcbiAgICB9KTtcblxuICAgIHJ1bGUuYWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gYWN0aW9uLnY7XG5cbiAgICAgIGlmIChhY3Rpb24uYWN0aW9uID09PSAna3YnICYmIGFjdGlvbi5rID09PSAndGV4dCcpIHtcbiAgICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAvL1N1cHBvcnQgJ3RleHQ6IFwidGFnbmFtZVwiOycgc3ludGF4IHN1Z2FyIHN0YXRlbWVudFxuICAgICAgICAgIHRhZ3NbdmFsdWUudl0gPSAna3YnO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLnR5cGUgPT09IFwiZXZhbFwiKSB7XG4gICAgICAgICAgLy9TdXBwb3J0IHRhZygpIGZ1bmN0aW9uIGluIGV2YWxcbiAgICAgICAgICBldmFsUHJvY2Vzc29yLmFwcGVuZEtub3duVGFncyh0YWdzLCB2YWx1ZS52LCBsb2NhbGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gdGFncztcbn1cblxuLyoqXG4gKiogRXh0cmFjdCBhbGwgaW1hZ2VzLCByZWZlcmVuY2VkIGluIE1hcENTUyBydWxlcy5cbiAqKiBAcGFyYW0gcnVsZXMge2FycmF5fSDigJQgbGlzdCBvZiBNYXBDU1MgcnVsZXMgZnJvbSBBU1RcbiAqKiBAcmV0dXJuIHthcnJheX0g4oCUIHVuaXF1ZSBsaXN0IG9mIGltYWdlc1xuICoqL1xuZnVuY3Rpb24gbGlzdEtub3duSW1hZ2VzKHJ1bGVzKSB7XG4gIGNvbnN0IGltYWdlcyA9IHt9O1xuXG4gIGNvbnN0IGltYWdlQWN0aW9ucyA9IFsnaW1hZ2UnLCAnc2hpZWxkLWltYWdlJywgJ2ljb24taW1hZ2UnLCAnZmlsbC1pbWFnZSddO1xuXG4gIHJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICBydWxlLmFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGFjdGlvbi52O1xuXG4gICAgICBpZiAoYWN0aW9uLmFjdGlvbiA9PT0gJ2t2JyAmJiBpbWFnZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLmspKSB7XG4gICAgICAgIGlmICh2YWx1ZS50eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgaW1hZ2VzW3ZhbHVlLnYudHJpbSgpXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGltYWdlcyk7XG59XG5cbi8qKlxuICoqIEFwcGx5IE1hcENTUyBzdHlsZSB0byBhIHNwZWNpZmllZCBmZWF0dXJlIGluIHNwZWNpZmllZCBjb250ZXh0XG4gKiogQHBhcmFtIHJ1bGVzIHthcnJheX0g4oCUIGxpc3Qgb2YgTWFwQ1NTIHJ1bGVzIGZyb20gQVNUXG4gKiogQHBhcmFtIHRhZ3Mge09iamVjdH0g4oCUIGtleS12YWx1ZSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzXG4gKiogQHBhcmFtIGNsYXNzZXMge2FycmF5fSDigJQgbGlzdCBvZiBmZWF0dXJlIGNsYXNzZXNcbiAqKiBAcGFyYW0gem9vbSB7aW50fSDigJQgem9vbSBsZXZlbCBpbiB0ZXJtcyBvZiB0aWxpbmcgc2NoZW1lXG4gKiogQHBhcmFtIGZlYXR1cmVUeXBlIHtzdHJpbmd9IOKAlCBmZWF0dXJlIHR5cGUgaW4gdGVybXMgb2YgR2VvSlNPTiBmZWF0dXJlc1xuICoqIEBwYXJhbSBsb2NhbGVzIHthcnJheX0g4oCUIGxpc3Qgb2Ygc3VwcG9ydGVkIGxvY2FsZXMgaW4gcHJlZmVyZWQgb3JkZXJcbiAqKiBAcmV0dXJucyB7T2JqZWN0fSDigJQgbWFwIG9mIGxheWVycyBmb3IgcmVuZGVyaW5nXG4gKipcbiAqKiBOQjogdGhpcyBtZXRob2QgaXMgY2FsbGVkIGZvciBlYWNoIHJlbmRlcmVkIGZlYXR1cmUsIHNvIGl0IG11c3QgYmVcbiAqKiBhcyBwZXJmb3JtYW5jZSBvcHRpbWl6ZWQgYXMgcG9zc2libGUuXG4gKiovXG5mdW5jdGlvbiBhcHBseShydWxlcywgdGFncywgY2xhc3Nlcywgem9vbSwgZmVhdHVyZVR5cGUsIGxvY2FsZXMpIHtcbiAgY29uc3QgbGF5ZXJzID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJ1bGUgPSBydWxlc1tpXTtcblxuICAgIGNvbnN0IHJ1bGVMYXllcnMgPSBhcHBseVJ1bGUocnVsZSwgdGFncywgY2xhc3Nlcywgem9vbSwgZmVhdHVyZVR5cGUsIGxvY2FsZXMpO1xuICAgIHZhciBleGl0ID0gZmFsc2U7XG4gICAgZm9yICh2YXIgbGF5ZXIgaW4gcnVsZUxheWVycykge1xuICAgICAgbGF5ZXJzW2xheWVyXSA9IGxheWVyc1tsYXllcl0gfHwge307XG4gICAgICBpZiAoJ2V4aXQnIGluIHJ1bGVMYXllcnNbbGF5ZXJdKSB7XG4gICAgICAgIGV4aXQgPSB0cnVlO1xuICAgICAgICBkZWxldGUgcnVsZUxheWVyc1tsYXllcl1bJ2V4aXQnXTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5hc3NpZ24obGF5ZXJzW2xheWVyXSwgcnVsZUxheWVyc1tsYXllcl0pO1xuICAgIH1cblxuICAgIGlmIChleGl0KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGF5ZXJzO1xufVxuXG4vKipcbiAqKiByZXR1cm4ge2xheWVyLCB7cHJvcCwgdmFsdWV9fTtcbiAqKi9cbmZ1bmN0aW9uIGFwcGx5UnVsZShydWxlLCB0YWdzLCBjbGFzc2VzLCB6b29tLCBmZWF0dXJlVHlwZSwgbG9jYWxlcykge1xuICBjb25zdCBzZWxlY3RvcnMgPSBydWxlLnNlbGVjdG9ycztcbiAgY29uc3QgYWN0aW9ucyA9IHJ1bGUuYWN0aW9ucztcbiAgY29uc3QgcmVzdWx0ID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IHNlbGVjdG9yc1tpXTtcbiAgICBpZiAobWF0Y2hlcnMubWF0Y2hTZWxlY3RvcihzZWxlY3RvciwgdGFncywgY2xhc3Nlcywgem9vbSwgZmVhdHVyZVR5cGUpKSB7XG4gICAgICBjb25zdCBsYXllciA9IHNlbGVjdG9yLmxheWVyIHx8ICdkZWZhdWx0JztcbiAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSByZXN1bHRbbGF5ZXJdIHx8IHt9XG4gICAgICBjb25zdCBwcm9wcyA9IHVud2luZEFjdGlvbnMoYWN0aW9ucywgdGFncywgcHJvcGVydGllcywgbG9jYWxlcywgY2xhc3Nlcyk7XG5cbiAgICAgIHJlc3VsdFtsYXllcl0gPSBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHByb3BzKTtcblxuICAgICAgaWYgKCdleGl0JyBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHVud2luZEFjdGlvbnMoYWN0aW9ucywgdGFncywgcHJvcGVydGllcywgbG9jYWxlcywgY2xhc3Nlcykge1xuICBjb25zdCByZXN1bHQgPSB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25zW2ldO1xuXG4gICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uKSB7XG4gICAgY2FzZSAna3YnOlxuICAgICAgaWYgKGFjdGlvbi5rID09PSAndGV4dCcpIHtcbiAgICAgICAgaWYgKGFjdGlvbi52LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKGFjdGlvbi52LnYgaW4gdGFncykge1xuICAgICAgICAgICAgcmVzdWx0W2FjdGlvbi5rXSA9IHRhZ3NbYWN0aW9uLnYudl07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFthY3Rpb24ua10gPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0W2FjdGlvbi5rXSA9IHVud2luZFZhbHVlKGFjdGlvbi52LCB0YWdzLCBwcm9wZXJ0aWVzLCBsb2NhbGVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB1bndpbmRWYWx1ZShhY3Rpb24udiwgdGFncywgcHJvcGVydGllcywgbG9jYWxlcyk7XG4gICAgICAgIHJlc3VsdFthY3Rpb24ua10gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NldF9jbGFzcyc6XG4gICAgICBpZiAoIWNsYXNzZXMuaW5jbHVkZXMoYWN0aW9uLnYuY2xhc3MpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChhY3Rpb24udi5jbGFzcyk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzZXRfdGFnJzpcbiAgICAgIHRhZ3NbYWN0aW9uLmtdID0gdW53aW5kVmFsdWUoYWN0aW9uLnYsIHRhZ3MsIHByb3BlcnRpZXMsIGxvY2FsZXMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZXhpdCc6XG4gICAgICByZXN1bHRbJ2V4aXQnXSA9IHRydWU7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQWN0aW9uIHR5cGUgaXMgbm90IHN1cHByb3RlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhY3Rpb24pKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gdW53aW5kVmFsdWUodmFsdWUsIHRhZ3MsIHByb3BlcnRpZXMsIGxvY2FsZXMpIHtcbiAgc3dpdGNoICh2YWx1ZS50eXBlKSB7XG4gIGNhc2UgJ3N0cmluZyc6XG4gICAgcmV0dXJuIHZhbHVlLnY7XG4gIGNhc2UgJ2Nzc2NvbG9yJzpcbiAgICByZXR1cm4gZm9ybWF0Q3NzQ29sb3IodmFsdWUudik7XG4gIGNhc2UgJ2V2YWwnOlxuICAgIHJldHVybiBldmFsUHJvY2Vzc29yLmV2YWxFeHByKHZhbHVlLnYsIHRhZ3MsIHByb3BlcnRpZXMsIGxvY2FsZXMpO1xuICBkZWZhdWx0OlxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJWYWx1ZSB0eXBlIGlzIG5vdCBzdXBwcm90ZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRDc3NDb2xvcihjb2xvcikge1xuICBpZiAoJ3InIGluIGNvbG9yICYmICdnJyBpbiBjb2xvciAmJiAnYicgaW4gY29sb3IgJiYgJ2EnIGluIGNvbG9yKSB7XG4gICAgcmV0dXJuIFwicmdiYShcIiArIGNvbG9yLnIgKyBcIiwgXCIgKyBjb2xvci5nICsgXCIsIFwiICsgY29sb3IuYiArIFwiLCBcIiArIGNvbG9yLmEgKyBcIilcIjtcbiAgfSBlbHNlIGlmICgncicgaW4gY29sb3IgJiYgJ2cnIGluIGNvbG9yICYmICdiJyBpbiBjb2xvcikge1xuICAgIHJldHVybiBcInJnYihcIiArIGNvbG9yLnIgKyBcIiwgXCIgKyBjb2xvci5nICsgXCIsIFwiICsgY29sb3IuYiArIFwiKVwiO1xuICB9IGVsc2UgaWYgKCdoJyBpbiBjb2xvciAmJiAncycgaW4gY29sb3IgJiYgJ2wnIGluIGNvbG9yICYmICdhJyBpbiBjb2xvcikge1xuICAgIHJldHVybiBcImhzbGEoXCIgKyBjb2xvci5oICsgXCIsIFwiICsgY29sb3IucyArIFwiLCBcIiArIGNvbG9yLmwgKyBcIiwgXCIgKyBjb2xvci5hICsgXCIpXCI7XG4gIH0gZWxzZSBpZiAoJ2gnIGluIGNvbG9yICYmICdzJyBpbiBjb2xvciAmJiAnbCcgaW4gY29sb3IpIHtcbiAgICByZXR1cm4gXCJoc2woXCIgKyBjb2xvci5oICsgXCIsIFwiICsgY29sb3IucyArIFwiLCBcIiArIGNvbG9yLmwgKyBcIilcIjtcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGNvbG9yIHNwYWNlIFwiICsgSlNPTi5zdHJpbmdpZnkoY29sb3IpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxpc3RLbm93blRhZ3M6IGxpc3RLbm93blRhZ3MsXG4gIGxpc3RLbm93bkltYWdlczogbGlzdEtub3duSW1hZ2VzLFxuICBhcHBseTogYXBwbHksXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN1cHBvcnRzID0gcmVxdWlyZShcIi4vc3VwcG9ydHNcIik7XG5cbi8qKlxuICoqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG4gKiogQHBhcmFtIG9wdGlvbnMuZ3JvdXBGZWF0dXJlc0J5QWN0aW9ucyB7Ym9vbGVhbn0gc29ydCBmZWF0dXJlcyBieSBwZXJmb3JtZWQgYWN0aW9ucy5cbiAqKiAgICAgVGhpcyBvcHRpbWl6YXRpb24gc2lnbmlmaWNhdGVseSBpbXByb3ZlcyBwZXJmb3JtYW5jZSBpbiBDaHJvbWUgY2FudmFzIGltcGxlbWVudGF0aW9uLCBidXQgc2xvd3MgZG93biBub2RlLWNhbnZhc1xuICoqL1xuZnVuY3Rpb24gU3R5bGVNYW5hZ2VyKG1hcGNzcywgb3B0aW9ucykge1xuICB0aGlzLm1hcGNzcyA9IG1hcGNzcztcblxuICB0aGlzLmdyb3VwRmVhdHVyZXNCeUFjdGlvbnMgPSAob3B0aW9ucyAmJiBvcHRpb25zLmdyb3VwRmVhdHVyZXNCeUFjdGlvbnMpIHx8IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjaGVja0FjdGlvbnMoYWN0aW9ucywgcmVxdWlyZWRBY3Rpb25zKSB7XG4gIGZvciAodmFyIGsgaW4gYWN0aW9ucykge1xuICAgIGlmIChyZXF1aXJlZEFjdGlvbnMuaW5jbHVkZXMoaykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy9UT0RPIEV4dHJhY3QgdG8gc3VwcG9ydHMuanNcbmZ1bmN0aW9uIGNyZWF0ZVJlbmRlcnMoZmVhdHVyZVR5cGUsIGFjdGlvbnMpIHtcbiAgY29uc3QgcmVuZGVycyA9IHt9O1xuXG4gIHN1cHBvcnRzLmZvckVhY2goKHJlbmRlclNwZWMpID0+IHtcbiAgICBpZiAoIXJlbmRlclNwZWMuZmVhdHVyZVR5cGVzLmluY2x1ZGVzKGZlYXR1cmVUeXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2hlY2tBY3Rpb25zKGFjdGlvbnMsIHJlbmRlclNwZWMucmVxdWlyZWRBY3Rpb25zKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlckFjdGlvbnMgPSB7XG4gICAgICAnbWFqb3Itei1pbmRleCc6IHJlbmRlclNwZWMucHJpb3JpdHlcbiAgICB9O1xuXG4gICAgcmVuZGVyU3BlYy5hY3Rpb25zLmZvckVhY2goKHNwZWMpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZXh0cmFjdEFjdGlvblZhbHVlKHNwZWMsIGFjdGlvbnMpO1xuICAgICAgaWYgKHR5cGVvZih2YWx1ZSkgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgcmVuZGVyQWN0aW9uc1tzcGVjLmFjdGlvbl0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlbmRlcnNbcmVuZGVyU3BlYy5uYW1lXSA9IHJlbmRlckFjdGlvbnM7XG4gIH0pO1xuXG4gIHJldHVybiByZW5kZXJzO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0QWN0aW9uVmFsdWUoc3BlYywgYWN0aW9ucykge1xuICAvL1RPRE86IE92ZXJyaWRlIHZhbHVlcyBieSBwcmlvcml0eS4gZS5nLiBmaWxsLW9wYWNpdHkgPC0gb3BhY2l0eSA8LSBkZWZhdWx0XG4gIGlmICghKHNwZWMuYWN0aW9uIGluIGFjdGlvbnMpKSB7XG4gICAgcmV0dXJuIHR5cGVvZihzcGVjLmRlZmF1bHQpICE9PSAndW5kZWZpbmVkJyA/IHNwZWMuZGVmYXVsdCA6IG51bGw7XG4gIH1cblxuICB2YXIgdmFsdWUgPSBhY3Rpb25zW3NwZWMuYWN0aW9uXTtcbiAgc3dpdGNoIChzcGVjLnR5cGUpIHtcbiAgY2FzZSAnbnVtYmVyJzpcbiAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgIGJyZWFrO1xuICBjYXNlICdkYXNoZXMnOlxuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIsXCIpLm1hcChwYXJzZUZsb2F0KTtcbiAgICBicmVhaztcbiAgY2FzZSAnYm9vbGVhbic6XG4gICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ3RydWUnID8gdHJ1ZSA6ICEhdmFsdWU7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ3N0cmluZyc6XG4gICAgdmFsdWUgPSB2YWx1ZSA9PT0gJycgPyBudWxsIDogdmFsdWU7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ2NvbG9yJzpcbiAgY2FzZSAndXJpJzpcbiAgZGVmYXVsdDpcbiAgICBicmVhaztcbiAgfVxuICByZXR1cm4gW3ZhbHVlLCBzcGVjLmRlZmF1bHRdLmZpbmQoKHgpID0+IHggIT09IG51bGwgJiYgdHlwZW9mKHgpICE9PSAndW5kZWZpbmVkJyk7XG59XG5cblxuXG5TdHlsZU1hbmFnZXIucHJvdG90eXBlLmNyZWF0ZUZlYXR1cmVSZW5kZXJzID0gZnVuY3Rpb24oZmVhdHVyZSwga290aGljSWQsIHpvb20pIHtcbiAgY29uc3QgZmVhdHVyZUFjdGlvbnMgPSB0aGlzLm1hcGNzcy5hcHBseShmZWF0dXJlLnByb3BlcnRpZXMsIHpvb20sIGZlYXR1cmUuZ2VvbWV0cnkudHlwZSk7XG5cbiAgY29uc3QgbGF5ZXJzID0ge307XG5cbiAgZm9yICh2YXIgbGF5ZXJOYW1lIGluIGZlYXR1cmVBY3Rpb25zKSB7XG4gICAgY29uc3QgcmVuZGVycyA9IGNyZWF0ZVJlbmRlcnMoZmVhdHVyZS5nZW9tZXRyeS50eXBlLCBmZWF0dXJlQWN0aW9uc1tsYXllck5hbWVdKTtcbiAgICBmb3IgKHZhciByZW5kZXIgaW4gcmVuZGVycykge1xuICAgICAgY29uc3QgYWN0aW9ucyA9IHJlbmRlcnNbcmVuZGVyXTtcbiAgICAgIGNvbnN0IHpJbmRleCA9IHBhcnNlSW50KGFjdGlvbnNbJ3otaW5kZXgnXSkgfHwgMDtcbiAgICAgIGNvbnN0IG1ham9yWkluZGV4ID0gcGFyc2VJbnQoYWN0aW9uc1snbWFqb3Itei1pbmRleCddKTtcbiAgICAgIGRlbGV0ZSBhY3Rpb25zWyd6LWluZGV4J107XG4gICAgICBkZWxldGUgYWN0aW9uc1snbWFqb3Itei1pbmRleCddO1xuXG4gICAgICBjb25zdCByZXN0eWxlZEZlYXR1cmUgPSB7XG4gICAgICAgIGtvdGhpY0lkOiBrb3RoaWNJZCxcbiAgICAgICAgZ2VvbWV0cnk6IGZlYXR1cmUuZ2VvbWV0cnksXG4gICAgICAgIGFjdGlvbnM6IGFjdGlvbnMsXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5ncm91cEZlYXR1cmVzQnlBY3Rpb25zKSB7XG4gICAgICAgIHJlc3R5bGVkRmVhdHVyZVsna2V5J10gPSBKU09OLnN0cmluZ2lmeShhY3Rpb25zKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGF5ZXIgPSBbekluZGV4LCBtYWpvclpJbmRleCwgbGF5ZXJOYW1lLCByZW5kZXJdLmpvaW4oJywnKTtcblxuICAgICAgbGF5ZXJzW2xheWVyXSA9IHJlc3R5bGVkRmVhdHVyZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxheWVycztcbn1cbi8qKlxuICoqIEBwYXJhbSBhIHthcnJheX0gW3pJbmRleCwgbWFqb3JaSW5kZXgsIGxheWVyTmFtZSwgcmVuZGVyXVxuICoqIEByZXR1cm4gPDAg4oCUIHByZWZlciBhXG4gKiogQHJldHVybiA+MCDigJQgcHJlZmVyIGJcbiAqKi9cbmZ1bmN0aW9uIGNvbXBhcmVMYXllcnMoYSwgYikge1xuICBjb25zdCBsYXllck5hbWVBID0gYVsyXTtcbiAgY29uc3QgbGF5ZXJOYW1lQiA9IGJbMl07XG5cbiAgY29uc3QgekluZGV4QSA9IHBhcnNlSW50KGFbMF0pO1xuICBjb25zdCB6SW5kZXhCID0gcGFyc2VJbnQoYlswXSk7XG5cbiAgY29uc3QgbWFqb3JaSW5kZXhBID0gcGFyc2VJbnQoYVsxXSk7XG4gIGNvbnN0IG1ham9yWkluZGV4QiA9IHBhcnNlSW50KGJbMV0pO1xuICBpZiAobGF5ZXJOYW1lQSA9PSBsYXllck5hbWVCKSB7XG4gICAgaWYgKG1ham9yWkluZGV4QSAhPSBtYWpvclpJbmRleEIpIHtcbiAgICAgIHJldHVybiBtYWpvclpJbmRleEEgLSBtYWpvclpJbmRleEI7XG4gICAgfVxuXG4gICAgaWYgKHpJbmRleEEgIT0gekluZGV4Qikge1xuICAgICAgcmV0dXJuIHpJbmRleEEgLSB6SW5kZXhCO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBsYXllcnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoYSkgKyBcIiBhbmQgXCIgKyBKU09OLnN0cmluZ2lmeShiKSk7XG4gIH0gZWxzZSBpZiAobGF5ZXJOYW1lQSA9PSAnZGVmYXVsdCcpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAobGF5ZXJOYW1lQiA9PSAnZGVmYXVsdCcpIHtcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoekluZGV4QSAhPSB6SW5kZXhCKSB7XG4gICAgICByZXR1cm4gekluZGV4QSAtIHpJbmRleEI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxheWVyTmFtZUEubG9jYWxlQ29tcGFyZShsYXllck5hbWVCKTtcbiAgfVxufVxuLyoqXG4gKipcbiAqKlxuICoqIEByZXR1cm4ge2FycmF5fSBbe3JlbmRlcjogJ2Nhc2luZycsIHpJbmRleDogMCwgZmVhdHVyZXM6IFtdfSwge3JlbmRlcjogJ2xpbmUnLCBmZWF0dXJlczogW119LCB7cmVuZGVyOiAnbGluZScsIGZlYXR1cmVzOiBbXX1dXG4gKipcbiAqKi9cblN0eWxlTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlTGF5ZXJzID0gZnVuY3Rpb24oZmVhdHVyZXMsIHpvb20pIHtcbiAgY29uc3QgbGF5ZXJzID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJlbmRlcnMgPSB0aGlzLmNyZWF0ZUZlYXR1cmVSZW5kZXJzKGZlYXR1cmVzW2ldLCBpICsgMSwgem9vbSk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcmVuZGVycykge1xuICAgICAgbGF5ZXJzW2tleV0gPSBsYXllcnNba2V5XSB8fCBbXTtcblxuICAgICAgbGF5ZXJzW2tleV0ucHVzaChyZW5kZXJzW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBsYXllcktleXMgPSBPYmplY3Qua2V5cyhsYXllcnMpICAgLy8gW1wiMCxjYXNpbmdzXCIsIFwiMSxsaW5lc1wiXVxuICAgIC5tYXAoKGspID0+IGsuc3BsaXQoXCIsXCIpKSAgICAgICAgICAgICAvLyBbW1wiMFwiLCBcImNhc2luZ3NcIl0sIFtcIjFcIiwgXCJsaW5lc1wiXV1cbiAgICAuc29ydChjb21wYXJlTGF5ZXJzKVxuICAgIC5mb3JFYWNoKChbekluZGV4LCBtYWpvclpJbmRleCwgbGF5ZXJOYW1lLCByZW5kZXJdKSA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlcyA9IGxheWVyc1tbekluZGV4LCBtYWpvclpJbmRleCwgbGF5ZXJOYW1lLCByZW5kZXJdLmpvaW4oJywnKV07XG5cbiAgICAgIGlmICh0aGlzLmdyb3VwRmVhdHVyZXNCeUFjdGlvbnMpIHtcbiAgICAgICAgZmVhdHVyZXMuc29ydCgoYSwgYikgPT4gYS5rZXkubG9jYWxlQ29tcGFyZShiLmtleSkpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICB6SW5kZXg6IHBhcnNlSW50KHpJbmRleCksXG4gICAgICAgIG1ham9yWkluZGV4OiBwYXJzZUludChtYWpvclpJbmRleCksXG4gICAgICAgIG9iamVjdFpJbmRleDogbGF5ZXJOYW1lLFxuICAgICAgICBmZWF0dXJlczogZmVhdHVyZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVNYW5hZ2VyO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBcIm5hbWVcIjogXCJwb2x5Z29uXCIsXG4gICAgXCJmZWF0dXJlVHlwZXNcIjogW1wiUG9seWdvblwiLCBcIk11bHRpUG9seWdvblwiXSxcbiAgICBcInJlcXVpcmVkQWN0aW9uc1wiOiBbXCJmaWxsLWNvbG9yXCIsIFwiZmlsbC1pbWFnZVwiXSxcbiAgICBcImFjdGlvbnNcIjogW1xuICAgICAge1xuICAgICAgICBcImFjdGlvblwiOiBcInotaW5kZXhcIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IDAsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiZmlsbC1jb2xvclwiLFxuICAgICAgICBcImRlZmF1bHRcIjogXCJyZ2IoMCwgMCwgMClcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiY29sb3JcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImZpbGwtaW1hZ2VcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwidXJpXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJmaWxsLW9wYWNpdHlcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiAxXG4gICAgICB9LFxuICAgIF0sXG4gICAgXCJwcmlvcml0eVwiOiAxMFxuICB9LCB7XG4gICAgXCJuYW1lXCI6IFwiY2FzaW5nXCIsXG4gICAgXCJmZWF0dXJlVHlwZXNcIjogW1wiTGluZVN0cmluZ1wiLCBcIk11bHRpTGluZVN0cmluZ1wiLCBcIlBvbHlnb25cIiwgXCJNdWx0aVBvbHlnb25cIl0sXG4gICAgXCJyZXF1aXJlZEFjdGlvbnNcIjogW1wiY2FzaW5nLXdpZHRoXCJdLFxuICAgIFwiYWN0aW9uc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiei1pbmRleFwiLFxuICAgICAgICBcImRlZmF1bHRcIjogMCxcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJjYXNpbmctd2lkdGhcIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IDEsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwid2lkdGhcIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IDAsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiY2FzaW5nLWNvbG9yXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcInJnYigwLCAwLCAwKVwiLFxuICAgICAgICBcInR5cGVcIjogXCJjb2xvclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiY2FzaW5nLWRhc2hlc1wiLFxuICAgICAgICBcInR5cGVcIjogXCJkYXNoZXNcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImNhc2luZy1vcGFjaXR5XCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiAxLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImNhc2luZy1saW5lY2FwXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcImJ1dHRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJjYXNpbmctbGluZWpvaW5cIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IFwicm91bmRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJsaW5lY2FwXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcImJ1dHRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJsaW5lam9pblwiLFxuICAgICAgICBcImRlZmF1bHRcIjogXCJyb3VuZFwiLFxuICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgfSxcblxuICAgIF0sXG4gICAgXCJwcmlvcml0eVwiOiAyMFxuICB9LCB7XG4gICAgXCJuYW1lXCI6IFwibGluZVwiLFxuICAgIFwiZmVhdHVyZVR5cGVzXCI6IFtcIkxpbmVTdHJpbmdcIiwgXCJNdWx0aUxpbmVTdHJpbmdcIiwgXCJQb2x5Z29uXCIsIFwiTXVsdGlQb2x5Z29uXCJdLFxuICAgIFwicmVxdWlyZWRBY3Rpb25zXCI6IFtcIndpZHRoXCIsIFwiaW1hZ2VcIl0sXG4gICAgXCJhY3Rpb25zXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJ6LWluZGV4XCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiAwLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcIndpZHRoXCIsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwidXJpXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJjb2xvclwiLFxuICAgICAgICBcInR5cGVcIjogXCJjb2xvclwiLFxuICAgICAgICBcImRlZmF1bHRcIjogXCJyZ2IoMCwgMCwgMClcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImRhc2hlc1wiLFxuICAgICAgICBcInR5cGVcIjogXCJkYXNoZXNcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcIm9wYWNpdHlcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiAxXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwibGluZWNhcFwiLFxuICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImxpbmVqb2luXCIsXG4gICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICB9LFxuICAgIF0sXG4gICAgXCJwcmlvcml0eVwiOiAzMFxuICB9LCB7XG4gICAgXCJuYW1lXCI6IFwiaWNvblwiLFxuICAgIFwiZmVhdHVyZVR5cGVzXCI6IFtcIlBvaW50XCIsIFwiTXVsdGlQb2ludFwiLCBcIlBvbHlnb25cIiwgXCJNdWx0aVBvbHlnb25cIl0sXG4gICAgXCJyZXF1aXJlZEFjdGlvbnNcIjogW1wiaWNvbi1pbWFnZVwiXSxcbiAgICBcImFjdGlvbnNcIjogW1xuICAgICAge1xuICAgICAgICBcImFjdGlvblwiOiBcInotaW5kZXhcIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IDAsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiaWNvbi1pbWFnZVwiLFxuICAgICAgICBcInR5cGVcIjogXCJ1cmlcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImljb24td2lkdGhcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJpY29uLWhlaWdodFwiLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImFsbG93LW92ZXJsYXBcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiYm9vbGVhblwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiLXgta290aGljLXBhZGRpbmdcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiAyMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJwcmlvcml0eVwiOiA0MFxuICB9LCB7XG4gICAgXCJuYW1lXCI6IFwidGV4dFwiLFxuICAgIFwiZmVhdHVyZVR5cGVzXCI6IFtcIkxpbmVTdHJpbmdcIiwgXCJNdWx0aUxpbmVTdHJpbmdcIiwgXCJQb2ludFwiLCBcIk11bHRpUG9pbnRcIiwgXCJQb2x5Z29uXCIsIFwiTXVsdGlQb2x5Z29uXCJdLFxuICAgIFwicmVxdWlyZWRBY3Rpb25zXCI6IFtcInRleHRcIl0sXG4gICAgXCJhY3Rpb25zXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJ6LWluZGV4XCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiAwLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcInRleHRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJ0ZXh0LWNvbG9yXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImNvbG9yXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcIiMwMDAwMDBcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcInRleHQtb3BhY2l0eVwiLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IDFcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJ0ZXh0LWhhbG8tcmFkaXVzXCIsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwidGV4dC1oYWxvLWNvbG9yXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImNvbG9yXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcIiMwMDAwMDBcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImZvbnQtZmFtaWx5XCIsXG4gICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiZm9udC1zaXplXCIsXG4gICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwidGV4dC10cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJ0ZXh0LW9mZnNldFwiLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcInRleHQtYWxsb3ctb3ZlcmxhcFwiLFxuICAgICAgICBcInR5cGVcIjogXCJib29sZWFuXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCIteC1rb3RoaWMtcGFkZGluZ1wiLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IDIwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInByaW9yaXR5XCI6IDUwXG4gIH0sIHtcbiAgICBcIm5hbWVcIjogXCJzaGllbGRcIixcbiAgICBcImZlYXR1cmVUeXBlc1wiOiBbXCJMaW5lU3RyaW5nXCIsIFwiTXVsdGlMaW5lU3RyaW5nXCJdLFxuICAgIFwicmVxdWlyZWRBY3Rpb25zXCI6IFtcInNoaWVsZC1pbWFnZVwiLCBcInNoaWVsZC10ZXh0XCJdLFxuICAgIFwiYWN0aW9uc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiei1pbmRleFwiLFxuICAgICAgICBcImRlZmF1bHRcIjogMCxcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJzaGllbGQtaW1hZ2VcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwidXJpXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJzaGllbGQtdGV4dFwiLFxuICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcInNoaWVsZC10ZXh0LWNvbG9yXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImNvbG9yXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcIiMwMDAwMDBcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcInNoaWVsZC10ZXh0LW9wYWNpdHlcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwib3BhY2l0eVwiLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJzaGllbGQtZm9udC1mYW1pbHlcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJzaGllbGQtZm9udC1zaXplXCIsXG4gICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiZm9udC1mYW1pbHlcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJmb250LXNpemVcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJzaGllbGQtY2FzaW5nLXdpZHRoXCIsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwic2hpZWxkLWNhc2luZy1jb2xvclwiLFxuICAgICAgICBcImRlZmF1bHRcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImNvbG9yXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJhY3Rpb25cIjogXCJzaGllbGQtY2FzaW5nLW9wYWNpdHlcIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IDEsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwic2hpZWxkLWZyYW1lLXdpZHRoXCIsXG4gICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwic2hpZWxkLWZyYW1lLWNvbG9yXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiY29sb3JcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcInNoaWVsZC1mcmFtZS1vcGFjaXR5XCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiAxLFxuICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgfSwge1xuICAgICAgICBcImFjdGlvblwiOiBcImFsbG93LW92ZXJsYXBcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiYm9vbGVhblwiXG4gICAgICB9LCB7XG4gICAgICAgIFwiYWN0aW9uXCI6IFwiLXgta290aGljLXBhZGRpbmdcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiAyMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJwcmlvcml0eVwiOiA2MFxuICB9LFxuXTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHJidXNoID0gcmVxdWlyZSgncmJ1c2gnKTtcblxuY29uc3QgQ29sbGlzaW9uQnVmZmVyID0gZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcbiAgdGhpcy5idWZmZXIgPSByYnVzaCgyNTYpO1xuICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgdGhpcy53aWR0aCA9IHdpZHRoO1xufTtcblxuZnVuY3Rpb24gZ2V0Qm94RnJvbVBvaW50KHBvaW50LCB3aWR0aCwgaGVpZ2h0LCBwYWRkaW5nLCBpZCkge1xuICBjb25zdCBkeCA9IHdpZHRoIC8gMiArIHBhZGRpbmc7XG4gIGNvbnN0IGR5ID0gaGVpZ2h0IC8gMiArIHBhZGRpbmc7XG5cbiAgcmV0dXJuIHtcbiAgICBtaW5YOiBwb2ludFswXSAtIGR4LFxuICAgIG1pblk6IHBvaW50WzFdIC0gZHksXG4gICAgbWF4WDogcG9pbnRbMF0gKyBkeCxcbiAgICBtYXhZOiBwb2ludFsxXSArIGR5LFxuICAgIGlkOiBpZFxuICB9O1xufVxuXG5Db2xsaXNpb25CdWZmZXIucHJvdG90eXBlLmFkZFBvaW50V0ggPSBmdW5jdGlvbiAocG9pbnQsIHdpZHRoLCBoZWlnaHQsIHBhZGRpbmcsIGlkKSB7XG4gIHRoaXMuYnVmZmVyLmluc2VydChnZXRCb3hGcm9tUG9pbnQocG9pbnQsIHdpZHRoLCBoZWlnaHQsIHBhZGRpbmcsIGlkKSk7XG59XG5cbkNvbGxpc2lvbkJ1ZmZlci5wcm90b3R5cGUuYWRkUG9pbnRzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBwb2ludHMgPSBwYXJhbXMubWFwKChhcmdzKSA9PiBnZXRCb3hGcm9tUG9pbnQuYXBwbHkobnVsbCwgYXJncykpO1xuICB0aGlzLmJ1ZmZlci5sb2FkKHBvaW50cyk7XG59XG5cbkNvbGxpc2lvbkJ1ZmZlci5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihib3gpIHtcbiAgY29uc3QgcmVzdWx0ID0gdGhpcy5idWZmZXIuc2VhcmNoKGJveCk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoID09IDA7XG59XG5cbkNvbGxpc2lvbkJ1ZmZlci5wcm90b3R5cGUuY2hlY2tQb2ludFdIID0gZnVuY3Rpb24gKHBvaW50LCB3aWR0aCwgaGVpZ2h0LCBpZCkge1xuICBjb25zdCBib3ggPSBnZXRCb3hGcm9tUG9pbnQocG9pbnQsIHdpZHRoLCBoZWlnaHQsIDApO1xuXG4gIC8vQWx3YXlzIHNob3cgY29sbGlzaW9uIG91dHNpZGUgdGhlIENvbGxpc2lvbkJ1ZmZlclxuICAvL1RPRE86IFdoeSBkbyB3ZSBuZWVkIHRoaXM/Pz9cbiAgaWYgKGJveC5taW5YIDwgMCB8fCBib3gubWluWSA8IDAgfHwgYm94Lm1heFggPiB0aGlzLndpZHRoIHx8IGJveC5tYXhZID4gdGhpcy5oZWlnaHQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IHRoaXMuYnVmZmVyLnNlYXJjaChib3gpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSByZXN1bHQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAvLyBPYmplY3Qgd2l0aCBzYW1lIElEIGRvZXNuJ3QgaW5kdWNlIGEgY29sbGlzaW9uLCBidXQgZGlmZmVyZW50IGlkcyBkb2VzXG4gICAgaWYgKGlkICE9PSByZXN1bHRbaV0uaWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsaXNpb25CdWZmZXI7XG4iLCJjb25zdCBjb2xvcnMgPSB7XG4gICdhbGljZWJsdWUnOiAnI0YwRjhGRicsXG4gICdhbnRpcXVld2hpdGUnOiAnI0ZBRUJENycsXG4gICdhcXVhJzogJyMwMEZGRkYnLFxuICAnYXF1YW1hcmluZSc6ICcjN0ZGRkQ0JyxcbiAgJ2F6dXJlJzogJyNGMEZGRkYnLFxuICAnYmVpZ2UnOiAnI0Y1RjVEQycsXG4gICdiaXNxdWUnOiAnI0ZGRTRDNCcsXG4gICdibGFjayc6ICcjMDAwMDAwJyxcbiAgJ2JsYW5jaGVkYWxtb25kJzogJyNGRkVCQ0QnLFxuICAnYmx1ZSc6ICcjMDAwMEZGJyxcbiAgJ2JsdWV2aW9sZXQnOiAnIzhBMkJFMicsXG4gICdicm93bic6ICcjQTUyQTJBJyxcbiAgJ2J1cmx5d29vZCc6ICcjREVCODg3JyxcbiAgJ2NhZGV0Ymx1ZSc6ICcjNUY5RUEwJyxcbiAgJ2NoYXJ0cmV1c2UnOiAnIzdGRkYwMCcsXG4gICdjaG9jb2xhdGUnOiAnI0QyNjkxRScsXG4gICdjb3JhbCc6ICcjRkY3RjUwJyxcbiAgJ2Nvcm5mbG93ZXJibHVlJzogJyM2NDk1RUQnLFxuICAnY29ybnNpbGsnOiAnI0ZGRjhEQycsXG4gICdjcmltc29uJzogJyNEQzE0M0MnLFxuICAnY3lhbic6ICcjMDBGRkZGJyxcbiAgJ2RhcmtibHVlJzogJyMwMDAwOEInLFxuICAnZGFya2N5YW4nOiAnIzAwOEI4QicsXG4gICdkYXJrZ29sZGVucm9kJzogJyNCODg2MEInLFxuICAnZGFya2dyYXknOiAnI0E5QTlBOScsXG4gICdkYXJrZ3JlZW4nOiAnIzAwNjQwMCcsXG4gICdkYXJrZ3JleSc6ICcjQTlBOUE5JyxcbiAgJ2RhcmtraGFraSc6ICcjQkRCNzZCJyxcbiAgJ2RhcmttYWdlbnRhJzogJyM4QjAwOEInLFxuICAnZGFya29saXZlZ3JlZW4nOiAnIzU1NkIyRicsXG4gICdkYXJrb3JhbmdlJzogJyNGRjhDMDAnLFxuICAnZGFya29yY2hpZCc6ICcjOTkzMkNDJyxcbiAgJ2RhcmtyZWQnOiAnIzhCMDAwMCcsXG4gICdkYXJrc2FsbW9uJzogJyNFOTk2N0EnLFxuICAnZGFya3NlYWdyZWVuJzogJyM4RkJDOEYnLFxuICAnZGFya3NsYXRlYmx1ZSc6ICcjNDgzRDhCJyxcbiAgJ2RhcmtzbGF0ZWdyYXknOiAnIzJGNEY0RicsXG4gICdkYXJrc2xhdGVncmV5JzogJyMyRjRGNEYnLFxuICAnZGFya3R1cnF1b2lzZSc6ICcjMDBDRUQxJyxcbiAgJ2Rhcmt2aW9sZXQnOiAnIzk0MDBEMycsXG4gICdkZWVwcGluayc6ICcjRkYxNDkzJyxcbiAgJ2RlZXBza3libHVlJzogJyMwMEJGRkYnLFxuICAnZGltZ3JheSc6ICcjNjk2OTY5JyxcbiAgJ2RpbWdyZXknOiAnIzY5Njk2OScsXG4gICdkb2RnZXJibHVlJzogJyMxRTkwRkYnLFxuICAnZmlyZWJyaWNrJzogJyNCMjIyMjInLFxuICAnZmxvcmFsd2hpdGUnOiAnI0ZGRkFGMCcsXG4gICdmb3Jlc3RncmVlbic6ICcjMjI4QjIyJyxcbiAgJ2Z1Y2hzaWEnOiAnI0ZGMDBGRicsXG4gICdnYWluc2Jvcm8nOiAnI0RDRENEQycsXG4gICdnaG9zdHdoaXRlJzogJyNGOEY4RkYnLFxuICAnZ29sZCc6ICcjRkZENzAwJyxcbiAgJ2dvbGRlbnJvZCc6ICcjREFBNTIwJyxcbiAgJ2dyYXknOiAnIzgwODA4MCcsXG4gICdncmVlbic6ICcjMDA4MDAwJyxcbiAgJ2dyZWVueWVsbG93JzogJyNBREZGMkYnLFxuICAnZ3JleSc6ICcjODA4MDgwJyxcbiAgJ2hvbmV5ZGV3JzogJyNGMEZGRjAnLFxuICAnaG90cGluayc6ICcjRkY2OUI0JyxcbiAgJ2luZGlhbnJlZCc6ICcjQ0Q1QzVDJyxcbiAgJ2luZGlnbyc6ICcjNEIwMDgyJyxcbiAgJ2l2b3J5JzogJyNGRkZGRjAnLFxuICAna2hha2knOiAnI0YwRTY4QycsXG4gICdsYXZlbmRlcic6ICcjRTZFNkZBJyxcbiAgJ2xhdmVuZGVyYmx1c2gnOiAnI0ZGRjBGNScsXG4gICdsYXduZ3JlZW4nOiAnIzdDRkMwMCcsXG4gICdsZW1vbmNoaWZmb24nOiAnI0ZGRkFDRCcsXG4gICdsaWdodGJsdWUnOiAnI0FERDhFNicsXG4gICdsaWdodGNvcmFsJzogJyNGMDgwODAnLFxuICAnbGlnaHRjeWFuJzogJyNFMEZGRkYnLFxuICAnbGlnaHRnb2xkZW5yb2R5ZWxsb3cnOiAnI0ZBRkFEMicsXG4gICdsaWdodGdyYXknOiAnI0QzRDNEMycsXG4gICdsaWdodGdyZWVuJzogJyM5MEVFOTAnLFxuICAnbGlnaHRncmV5JzogJyNEM0QzRDMnLFxuICAnbGlnaHRwaW5rJzogJyNGRkI2QzEnLFxuICAnbGlnaHRzYWxtb24nOiAnI0ZGQTA3QScsXG4gICdsaWdodHNlYWdyZWVuJzogJyMyMEIyQUEnLFxuICAnbGlnaHRza3libHVlJzogJyM4N0NFRkEnLFxuICAnbGlnaHRzbGF0ZWdyYXknOiAnIzc3ODg5OScsXG4gICdsaWdodHNsYXRlZ3JleSc6ICcjNzc4ODk5JyxcbiAgJ2xpZ2h0c3RlZWxibHVlJzogJyNCMEM0REUnLFxuICAnbGlnaHR5ZWxsb3cnOiAnI0ZGRkZFMCcsXG4gICdsaW1lJzogJyMwMEZGMDAnLFxuICAnbGltZWdyZWVuJzogJyMzMkNEMzInLFxuICAnbGluZW4nOiAnI0ZBRjBFNicsXG4gICdtYWdlbnRhJzogJyNGRjAwRkYnLFxuICAnbWFyb29uJzogJyM4MDAwMDAnLFxuICAnbWVkaXVtYXF1YW1hcmluZSc6ICcjNjZDREFBJyxcbiAgJ21lZGl1bWJsdWUnOiAnIzAwMDBDRCcsXG4gICdtZWRpdW1vcmNoaWQnOiAnI0JBNTVEMycsXG4gICdtZWRpdW1wdXJwbGUnOiAnIzkzNzBEQicsXG4gICdtZWRpdW1zZWFncmVlbic6ICcjM0NCMzcxJyxcbiAgJ21lZGl1bXNsYXRlYmx1ZSc6ICcjN0I2OEVFJyxcbiAgJ21lZGl1bXNwcmluZ2dyZWVuJzogJyMwMEZBOUEnLFxuICAnbWVkaXVtdHVycXVvaXNlJzogJyM0OEQxQ0MnLFxuICAnbWVkaXVtdmlvbGV0cmVkJzogJyNDNzE1ODUnLFxuICAnbWlkbmlnaHRibHVlJzogJyMxOTE5NzAnLFxuICAnbWludGNyZWFtJzogJyNGNUZGRkEnLFxuICAnbWlzdHlyb3NlJzogJyNGRkU0RTEnLFxuICAnbW9jY2FzaW4nOiAnI0ZGRTRCNScsXG4gICduYXZham93aGl0ZSc6ICcjRkZERUFEJyxcbiAgJ25hdnknOiAnIzAwMDA4MCcsXG4gICdvbGRsYWNlJzogJyNGREY1RTYnLFxuICAnb2xpdmUnOiAnIzgwODAwMCcsXG4gICdvbGl2ZWRyYWInOiAnIzZCOEUyMycsXG4gICdvcmFuZ2UnOiAnI0ZGQTUwMCcsXG4gICdvcmFuZ2VyZWQnOiAnI0ZGNDUwMCcsXG4gICdvcmNoaWQnOiAnI0RBNzBENicsXG4gICdwYWxlZ29sZGVucm9kJzogJyNFRUU4QUEnLFxuICAncGFsZWdyZWVuJzogJyM5OEZCOTgnLFxuICAncGFsZXR1cnF1b2lzZSc6ICcjQUZFRUVFJyxcbiAgJ3BhbGV2aW9sZXRyZWQnOiAnI0RCNzA5MycsXG4gICdwYXBheWF3aGlwJzogJyNGRkVGRDUnLFxuICAncGVhY2hwdWZmJzogJyNGRkRBQjknLFxuICAncGVydSc6ICcjQ0Q4NTNGJyxcbiAgJ3BpbmsnOiAnI0ZGQzBDQicsXG4gICdwbHVtJzogJyNEREEwREQnLFxuICAncG93ZGVyYmx1ZSc6ICcjQjBFMEU2JyxcbiAgJ3B1cnBsZSc6ICcjODAwMDgwJyxcbiAgJ3JlZCc6ICcjRkYwMDAwJyxcbiAgJ3Jvc3licm93bic6ICcjQkM4RjhGJyxcbiAgJ3JveWFsYmx1ZSc6ICcjNDE2OUUxJyxcbiAgJ3NhZGRsZWJyb3duJzogJyM4QjQ1MTMnLFxuICAnc2FsbW9uJzogJyNGQTgwNzInLFxuICAnc2FuZHlicm93bic6ICcjRjRBNDYwJyxcbiAgJ3NlYWdyZWVuJzogJyMyRThCNTcnLFxuICAnc2Vhc2hlbGwnOiAnI0ZGRjVFRScsXG4gICdzaWVubmEnOiAnI0EwNTIyRCcsXG4gICdzaWx2ZXInOiAnI0MwQzBDMCcsXG4gICdza3libHVlJzogJyM4N0NFRUInLFxuICAnc2xhdGVibHVlJzogJyM2QTVBQ0QnLFxuICAnc2xhdGVncmF5JzogJyM3MDgwOTAnLFxuICAnc2xhdGVncmV5JzogJyM3MDgwOTAnLFxuICAnc25vdyc6ICcjRkZGQUZBJyxcbiAgJ3NwcmluZ2dyZWVuJzogJyMwMEZGN0YnLFxuICAnc3RlZWxibHVlJzogJyM0NjgyQjQnLFxuICAndGFuJzogJyNEMkI0OEMnLFxuICAndGVhbCc6ICcjMDA4MDgwJyxcbiAgJ3RoaXN0bGUnOiAnI0Q4QkZEOCcsXG4gICd0b21hdG8nOiAnI0ZGNjM0NycsXG4gICd0dXJxdW9pc2UnOiAnIzQwRTBEMCcsXG4gICd2aW9sZXQnOiAnI0VFODJFRScsXG4gICd3aGVhdCc6ICcjRjVERUIzJyxcbiAgJ3doaXRlJzogJyNGRkZGRkYnLFxuICAnd2hpdGVzbW9rZSc6ICcjRjVGNUY1JyxcbiAgJ3llbGxvdyc6ICcjRkZGRjAwJyxcbiAgJ3llbGxvd2dyZWVuJzogJyM5QUNEMzInXG59XG5cbmNvbnN0IGNvbG9yc192YWx1ZXMgPSBPYmplY3QudmFsdWVzKGNvbG9ycylcbiAgLnNvcnQoKGEsIGIpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xudmFyIGluZGV4ID0gMDtcblxuZnVuY3Rpb24gbmV4dENvbG9yKCkge1xuICBjb25zdCBjb2xvciA9IGNvbG9yc192YWx1ZXNbaW5kZXgrK107XG4gIGlmIChpbmRleCA+IGNvbG9yc192YWx1ZXMubGVuZ3RoKSB7XG4gICAgaW5kZXggPSAwO1xuICB9XG4gIHJldHVybiBjb2xvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMubmV4dENvbG9yID0gbmV4dENvbG9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuZnVuY3Rpb24gc2VyaWVzKGZucywgZ2V0RnJhbWUsIGNhbGxiYWNrKSB7XG4gIGlmIChmbnMubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50ID0gMDtcblxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIGlmIChjdXJyZW50ID49IGZucy5sZW5ndGgpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdldEZyYW1lKCgpID0+IGZuc1tjdXJyZW50KytdKG5leHQpKTtcbiAgICB9XG4gIH1cblxuICBuZXh0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLnNlcmllcyA9IHNlcmllcztcbiIsIi8qKlxuICAqIENvbGxlY3Rpb24gb2YgZ2VvbWV0cnkgdXRpbGxpdGllc1xuICAqL1xuXG4vLyBjaGVjayBpZiB0aGUgcG9pbnQgW2luIFhZIGNvb3JkaW5hdGVzXSBpcyBvbiB0aWxlJ3MgZWRnZVxuLy8gcmV0dXJucyA0LWJpdHMgYml0bWFzayBvZiBhZmZlY3RlZCB0aWxlIGJvdW5kYXJpZXM6XG4vLyAgIGJpdCAwIC0gbGVmdFxuLy8gICBiaXQgMSAtIHJpZ2h0XG4vLyAgIGJpdCAyIC0gdG9wXG4vLyAgIGJpdCAzIC0gYm90dG9tXG5leHBvcnRzLmlzT25UaWxlQm91bmRhcnkgPSBmdW5jdGlvbihwLCB0aWxlX3dpZHRoLCB0aWxlX2hlaWdodCkge1xuICB2YXIgciA9IDA7XG4gIGlmIChwWzBdID09PSAwKSB7XG4gICAgciB8PSAxO1xuICB9IGVsc2UgaWYgKHBbMF0gPT09IHRpbGVfd2lkdGgpIHtcbiAgICByIHw9IDI7XG4gIH1cblxuICBpZiAocFsxXSA9PT0gMCkge1xuICAgIHIgfD0gNDtcbiAgfSBlbHNlIGlmIChwWzFdID09PSB0aWxlX2hlaWdodCkge1xuICAgIHIgfD0gODtcbiAgfVxuICByZXR1cm4gcjtcbn1cblxuLyogY2hlY2sgaWYgMiBwb2ludHMgYXJlIGJvdGggb24gdGhlIHNhbWUgdGlsZSBib3VuZGFyeVxuICpcbiAqIElmIHBvaW50cyBvZiB0aGUgb2JqZWN0IGFyZSBvbiB0aGUgc2FtZSB0aWxlIGJvdW5kYXJ5IGl0IGlzIGFzc3VtZWRcbiAqIHRoYXQgdGhlIG9iamVjdCBpcyBjdXQgaGVyZSBhbmQgd291bGQgb3JpZ2luYWxseSBjb250aW51ZSBiZXlvbmQgdGhlXG4gKiB0aWxlIGJvcmRlcnMuXG4gKlxuICogVGhpcyBjaGVjayBkb2VzIG5vdCBjYXRjaCB0aGUgY2FzZSB3aGVyZSB0aGUgb2JqZWN0IGlzIGxvY2F0ZWQgZXhhY3RseVxuICogb24gdGhlIHRpbGUgYm91bmRhcmllcywgYnV0IHRoaXMgY2FzZSBjYW4ndCBwcm9wZXJseSBiZSBkZXRlY3RlZCBoZXJlLlxuICovXG5leHBvcnRzLmNoZWNrU2FtZUJvdW5kYXJ5ID0gZnVuY3Rpb24ocCwgcSwgdGlsZV93aWR0aCwgdGlsZV9oZWlnaHQpIHtcbiAgdmFyIGJwID0gZXhwb3J0cy5pc09uVGlsZUJvdW5kYXJ5KHAsIHRpbGVfd2lkdGgsIHRpbGVfaGVpZ2h0KTtcblxuICBpZiAoIWJwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIChicCAmIGV4cG9ydHMuaXNPblRpbGVCb3VuZGFyeShxLCB0aWxlX3dpZHRoLCB0aWxlX2hlaWdodCkpO1xufVxuXG4vLyBnZXQgYSBzaW5nbGUgcG9pbnQgcmVwcmVzZW50aW5nIGdlb21ldHJ5IGZlYXR1cmUgKGUuZy4gY2VudHJvaWQpXG5leHBvcnRzLmdldFJlcHJQb2ludCA9IGZ1bmN0aW9uIChnZW9tZXRyeSwgcHJvamVjdFBvaW50RnVuY3Rpb24pIHtcbiAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gIGNhc2UgJ1BvaW50JzpcbiAgICBwb2ludCA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgIGJyZWFrO1xuICBjYXNlICdQb2x5Z29uJzpcbiAgICAvL1RPRE86IERvbid0IGV4cGVjdCB3ZSdyZSBoYXZlIHRoaXMgZmllbGQuIFdlIG1heSBoYXZlIHBsYWluIEpTT04gaGVyZSxcbiAgICAvLyBzbyBpdCdzIGJldHRlciB0byBjaGVjayBhIGZlYXR1cmUgcHJvcGVydHkgYW5kIGNhbGN1bGF0ZSBwb2x5Z29uIGNlbnRyb2lkIGhlcmVcbiAgICAvLyBpZiBzZXJ2ZXIgZG9lc24ndCBwcm92aWRlIHJlcHJlc2VudGF0aXZlIHBvaW50XG4gICAgcG9pbnQgPSBnZW9tZXRyeS5yZXBycG9pbnQ7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgIC8vIFVzZSBjZW50ZXIgb2YgbGluZSBoZXJlXG4gICAgLy8gVE9ETzogVGhpcyBhcHByb2FjaCBpcyBwcmV0dHkgcm91Z2g6IHdlIG5lZWQgdG8gY2hlY2sgbm90IG9ubHkgc2luZ2xlIHBvaW50LFxuICAgIC8vIGZvciBsYWJlbCBwbGFjaW5nLCBidXQgYW55IHBvaW50IG9uIHRoZSBsaW5lXG4gICAgdmFyIGxlbiA9IGV4cG9ydHMuZ2V0UG9seUxlbmd0aChnZW9tZXRyeS5jb29yZGluYXRlcyk7XG4gICAgdmFyIHBvaW50ID0gZXhwb3J0cy5nZXRBbmdsZUFuZENvb3Jkc0F0TGVuZ3RoKGdlb21ldHJ5LmNvb3JkaW5hdGVzLCBsZW4gLyAyLCAwKTtcbiAgICBwb2ludCA9IFtwb2ludFsxXSwgcG9pbnRbMl1dO1xuICAgIGJyZWFrO1xuICBjYXNlICdHZW9tZXRyeUNvbGxlY3Rpb24nOlxuICAgIC8vVE9ETzogRGlzYXNzZW1ibGUgZ2VvbWV0cnkgY29sbGVjdGlvblxuICAgIHJldHVybjtcbiAgY2FzZSAnTXVsdGlQb2ludCc6XG4gICAgLy9UT0RPOiBEaXNhc3NlbWJsZSBtdWx0aSBwb2ludFxuICAgIHJldHVybjtcbiAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICBwb2ludCA9IGdlb21ldHJ5LnJlcHJwb2ludDtcbiAgICBicmVhaztcbiAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAvL1RPRE86IERpc2Fzc2VtYmxlIGdlb21ldHJ5IGNvbGxlY3Rpb25cbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIHByb2plY3RQb2ludEZ1bmN0aW9uKHBvaW50KTtcbn07XG5cbi8vIENhbGN1bGF0ZSBsZW5ndGggb2YgbGluZVxuZXhwb3J0cy5nZXRQb2x5TGVuZ3RoID0gZnVuY3Rpb24gKHBvaW50cykge1xuICB2YXIgbGVuZ3RoID0gMDtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjID0gcG9pbnRzW2ldLFxuICAgICAgcGMgPSBwb2ludHNbaSAtIDFdLFxuICAgICAgZHggPSBwY1swXSAtIGNbMF0sXG4gICAgICBkeSA9IHBjWzFdIC0gY1sxXTtcblxuICAgIGxlbmd0aCArPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICB9XG4gIHJldHVybiBsZW5ndGg7XG59O1xuXG5leHBvcnRzLmdldEFuZ2xlQW5kQ29vcmRzQXRMZW5ndGggPSBmdW5jdGlvbiAocG9pbnRzLCBkaXN0LCB3aWR0aCkge1xuICB2YXIgeCwgeSxcbiAgICBsZW5ndGggPSAwLFxuICAgIGFuZ2xlLCBzYW1lc2VnID0gdHJ1ZSxcbiAgICBnb3R4eSA9IGZhbHNlO1xuXG4gIHdpZHRoID0gd2lkdGggfHwgMDsgLy8gYnkgZGVmYXVsdCB3ZSB0aGluayB0aGF0IGEgbGV0dGVyIGlzIDAgcHggd2lkZVxuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGdvdHh5KSB7XG4gICAgICBzYW1lc2VnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGMgPSBwb2ludHNbaV0sXG4gICAgICBwYyA9IHBvaW50c1tpIC0gMV0sXG4gICAgICBkeCA9IGNbMF0gLSBwY1swXSxcbiAgICAgIGR5ID0gY1sxXSAtIHBjWzFdO1xuXG4gICAgdmFyIHNlZ0xlbiA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICBpZiAoIWdvdHh5ICYmIGxlbmd0aCArIHNlZ0xlbiA+PSBkaXN0KSB7XG4gICAgICB2YXIgcGFydExlbiA9IGRpc3QgLSBsZW5ndGg7XG4gICAgICB4ID0gcGNbMF0gKyBkeCAqIHBhcnRMZW4gLyBzZWdMZW47XG4gICAgICB5ID0gcGNbMV0gKyBkeSAqIHBhcnRMZW4gLyBzZWdMZW47XG5cbiAgICAgIGdvdHh5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZ290eHkgJiYgbGVuZ3RoICsgc2VnTGVuID49IGRpc3QgKyB3aWR0aCkge1xuICAgICAgdmFyIHBhcnRMZW4gPSBkaXN0ICsgd2lkdGggLSBsZW5ndGg7XG5cbiAgICAgIGR4ID0gcGNbMF0gKyBkeCAqIHBhcnRMZW4gLyBzZWdMZW47XG4gICAgICBkeSA9IHBjWzFdICsgZHkgKiBwYXJ0TGVuIC8gc2VnTGVuO1xuICAgICAgYW5nbGUgPSBNYXRoLmF0YW4yKGR5IC0geSwgZHggLSB4KTtcblxuICAgICAgaWYgKHNhbWVzZWcpIHtcbiAgICAgICAgcmV0dXJuIFthbmdsZSwgeCwgeSwgc2VnTGVuIC0gcGFydExlbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW2FuZ2xlLCB4LCB5LCAwXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZW5ndGggKz0gc2VnTGVuO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqKiBVdGlsbGl0eSBjbGFzcyBmb3IgbWFuYWdpbmcgQ2FudmFzIGNvbnRleHQgc3R5bGUgcHJvcGVydGllc1xuICoqL1xuXG5jb25zdCBkZWZhdWx0Q2FudmFzU3R5bGUgPSB7XG4gIHN0cm9rZVN0eWxlOiAncmdiYSgwLDAsMCwwLjUpJyxcbiAgZmlsbFN0eWxlOiAncmdiYSgwLDAsMCwwLjUpJyxcbiAgbGluZVdpZHRoOiAxLFxuICBsaW5lQ2FwOiAncm91bmQnLFxuICBsaW5lSm9pbjogJ3JvdW5kJyxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdGV4dEJhc2VsaW5lOiAnbWlkZGxlJ1xufTtcblxuLyoqXG4gKiogQ29tcG9zZSBmb250IGRlY2xhcmF0aW9uIHN0cmluZyBmb3IgQ2FudmFzIGNvbnRleHRcbiAqKi9cbmV4cG9ydHMuY29tcG9zZUZvbnREZWNsYXJhdGlvbiA9IGZ1bmN0aW9uKG5hbWU9JycsIHNpemU9OSwgc3R5bGUpIHtcbiAgdmFyIGZhbWlseSA9IG5hbWUgPyBuYW1lICsgJywgJyA6ICcnO1xuICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gIHZhciBwYXJ0cyA9IFtdO1xuICBpZiAoc3R5bGVbJ2ZvbnQtc3R5bGUnXSA9PT0gJ2l0YWxpYycgfHwgc3R5bGVbJ2ZvbnQtc3R5bGUnXSA9PT0gJ29ibGlxdWUnKSB7XG4gICAgcGFydHMucHVzaChzdHlsZVsnZm9udC1zdHlsZSddKTtcbiAgfVxuXG4gIGlmIChzdHlsZVsnZm9udC12YXJpYW50J10gPT09ICdzbWFsbC1jYXBzJykge1xuICAgIHBhcnRzLnB1c2goc3R5bGVbJ2ZvbnQtdmFyaWFudCddKTtcbiAgfVxuXG4gIGlmIChzdHlsZVsnZm9udC13ZWlnaHQnXSA9PT0gJ2JvbGQnKSB7XG4gICAgcGFydHMucHVzaChzdHlsZVsnZm9udC13ZWlnaHQnXSk7XG4gIH1cblxuICBwYXJ0cy5wdXNoKHNpemUgKyAncHgnKTtcblxuICBpZiAobmFtZS5pbmRleE9mKCdzZXJpZicpICE9PSAtMSAmJiBuYW1lLmluZGV4T2YoJ3NhbnMtc2VyaWYnKSA9PT0gLTEpIHtcbiAgICBmYW1pbHkgKz0gJ0dlb3JnaWEsIHNlcmlmJztcbiAgfSBlbHNlIHtcbiAgICBmYW1pbHkgKz0gJ1wiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZic7XG4gIH1cbiAgcGFydHMucHVzaChmYW1pbHkpO1xuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcgJyk7XG59XG5cbi8qKlxuICoqIEFwcGx5IHN0eWxlcyB0byBDYW52YXMgY29udGV4dFxuICoqL1xuZXhwb3J0cy5hcHBseVN0eWxlID0gZnVuY3Rpb24oY3R4LCBzdHlsZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3R5bGUpIHtcbiAgICBpZiAoc3R5bGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY3R4W2tleV0gPSBzdHlsZVtrZXldO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqKiBBcHBseSBkZWZhdWx0IHN0eWxlIHRvIENhbnZhcyBjb250ZXh0XG4gKiovXG5leHBvcnRzLmFwcGx5RGVmYXVsdHMgPSBmdW5jdGlvbihjdHgpIHtcbiAgZXhwb3J0cy5hcHBseVN0eWxlKGN0eCwgZGVmYXVsdENhbnZhc1N0eWxlKTtcbn1cbiIsIi8vIC5kaXJuYW1lLCAuYmFzZW5hbWUsIGFuZCAuZXh0bmFtZSBtZXRob2RzIGFyZSBleHRyYWN0ZWQgZnJvbSBOb2RlLmpzIHY4LjExLjEsXG4vLyBiYWNrcG9ydGVkIGFuZCB0cmFuc3BsaXRlZCB3aXRoIEJhYmVsLCB3aXRoIGJhY2t3YXJkcy1jb21wYXQgZml4ZXNcblxuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gJy4nO1xuICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgwKTtcbiAgdmFyIGhhc1Jvb3QgPSBjb2RlID09PSA0NyAvKi8qLztcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAxOyAtLWkpIHtcbiAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvclxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiBoYXNSb290ID8gJy8nIDogJy4nO1xuICBpZiAoaGFzUm9vdCAmJiBlbmQgPT09IDEpIHtcbiAgICAvLyByZXR1cm4gJy8vJztcbiAgICAvLyBCYWNrd2FyZHMtY29tcGF0IGZpeDpcbiAgICByZXR1cm4gJy8nO1xuICB9XG4gIHJldHVybiBwYXRoLnNsaWNlKDAsIGVuZCk7XG59O1xuXG5mdW5jdGlvbiBiYXNlbmFtZShwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHBhdGggPSBwYXRoICsgJyc7XG5cbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgdmFyIGk7XG5cbiAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgIGlmIChwYXRoLmNoYXJDb2RlQXQoaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZW5kID09PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgLy8gcGF0aCBjb21wb25lbnRcbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgZW5kID0gaSArIDE7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiAnJztcbiAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsIGVuZCk7XG59XG5cbi8vIFVzZXMgYSBtaXhlZCBhcHByb2FjaCBmb3IgYmFja3dhcmRzLWNvbXBhdGliaWxpdHksIGFzIGV4dCBiZWhhdmlvciBjaGFuZ2VkXG4vLyBpbiBuZXcgTm9kZS5qcyB2ZXJzaW9ucywgc28gb25seSBiYXNlbmFtZSgpIGFib3ZlIGlzIGJhY2twb3J0ZWQgaGVyZVxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uIChwYXRoLCBleHQpIHtcbiAgdmFyIGYgPSBiYXNlbmFtZShwYXRoKTtcbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gZjtcbn07XG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHBhdGggPSBwYXRoICsgJyc7XG4gIHZhciBzdGFydERvdCA9IC0xO1xuICB2YXIgc3RhcnRQYXJ0ID0gMDtcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgLy8gVHJhY2sgdGhlIHN0YXRlIG9mIGNoYXJhY3RlcnMgKGlmIGFueSkgd2Ugc2VlIGJlZm9yZSBvdXIgZmlyc3QgZG90IGFuZFxuICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxuICB2YXIgcHJlRG90U3RhdGUgPSAwO1xuICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICBzdGFydFBhcnQgPSBpICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICBpZiAoZW5kID09PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgLy8gZXh0ZW5zaW9uXG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgIGVuZCA9IGkgKyAxO1xuICAgIH1cbiAgICBpZiAoY29kZSA9PT0gNDYgLyouKi8pIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgZG90LCBtYXJrIGl0IGFzIHRoZSBzdGFydCBvZiBvdXIgZXh0ZW5zaW9uXG4gICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpXG4gICAgICAgICAgc3RhcnREb3QgPSBpO1xuICAgICAgICBlbHNlIGlmIChwcmVEb3RTdGF0ZSAhPT0gMSlcbiAgICAgICAgICBwcmVEb3RTdGF0ZSA9IDE7XG4gICAgfSBlbHNlIGlmIChzdGFydERvdCAhPT0gLTEpIHtcbiAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgYW5kIG5vbi1wYXRoIHNlcGFyYXRvciBiZWZvcmUgb3VyIGRvdCwgc28gd2Ugc2hvdWxkXG4gICAgICAvLyBoYXZlIGEgZ29vZCBjaGFuY2UgYXQgaGF2aW5nIGEgbm9uLWVtcHR5IGV4dGVuc2lvblxuICAgICAgcHJlRG90U3RhdGUgPSAtMTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhcnREb3QgPT09IC0xIHx8IGVuZCA9PT0gLTEgfHxcbiAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgY2hhcmFjdGVyIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZG90XG4gICAgICBwcmVEb3RTdGF0ZSA9PT0gMCB8fFxuICAgICAgLy8gVGhlIChyaWdodC1tb3N0KSB0cmltbWVkIHBhdGggY29tcG9uZW50IGlzIGV4YWN0bHkgJy4uJ1xuICAgICAgcHJlRG90U3RhdGUgPT09IDEgJiYgc3RhcnREb3QgPT09IGVuZCAtIDEgJiYgc3RhcnREb3QgPT09IHN0YXJ0UGFydCArIDEpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnREb3QsIGVuZCk7XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLy9UT0RPOiBFeHRyYWN0IGtvdGhpYy1sZWFmbGV0IHRvIGFub3RoZXIgcHJvamVjdFxud2luZG93LkwuS290aGljID0gcmVxdWlyZShcImtvdGhpY1wiKTtcblxuLy93aW5kb3cuTWFwQ1NTID0gcmVxdWlyZShcIi4vc3JjL3N0eWxlL21hcGNzc1wiKTtcblxuLy8gaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuZGV2aWNlUGl4ZWxSYXRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbi8vICAgICB0aGlzLmRldmljZVBpeGVsUmF0aW8gPSBvcHRpb25zLmRldmljZVBpeGVsUmF0aW87XG4vLyB9IGVsc2Uge1xuLy8gICAgIHRoaXMuZGV2aWNlUGl4ZWxSYXRpbyA9IDE7XG4vLyB9XG5cbi8vIGlmICh0eXBlb2YgY2FudmFzID09PSAnc3RyaW5nJykge1xuLy8gVE9ETzogQXZvaWQgZG9jdW1lbnRcbi8vICAgICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXMpO1xuLy8gfVxuLy8gVE9ETzogQ29uc2lkZXIgbW92aW5nIHRoaXMgbG9naWMgb3V0c2lkZVxuLy8gdmFyIGRldmljZVBpeGVsUmF0aW8gPSAxOyAvL01hdGgubWF4KHRoaXMuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLCAyKTtcblxuLy8gaWYgKGRldmljZVBpeGVsUmF0aW8gIT09IDEpIHtcbi8vICAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4vLyAgICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4vLyAgICAgY2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoICogZGV2aWNlUGl4ZWxSYXRpbztcbi8vICAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodCAqIGRldmljZVBpeGVsUmF0aW87XG4vLyB9XG4vLyBjdHguc2NhbGUoZGV2aWNlUGl4ZWxSYXRpbywgZGV2aWNlUGl4ZWxSYXRpbyk7XG5cblxud2luZG93LktvdGhpYy5sb2FkSlNPTiA9IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2spIHtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHhoci5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNhbGxiYWNrKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHVybCwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcImZhaWxlZDpcIiwgdXJsLCB4aHIuc3RhdHVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgeGhyLnNlbmQobnVsbCk7XG59XG4iXX0=
