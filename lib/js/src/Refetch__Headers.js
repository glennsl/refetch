'use strict';

var Curry          = require("bs-platform/lib/js/curry.js");
var Rebase         = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Js_dict        = require("bs-platform/lib/js/js_dict.js");
var Pervasives     = require("bs-platform/lib/js/pervasives.js");
var Refetch__Utils = require("./Refetch__Utils.js");

function _pairifyHeader(h) {
  var param = h;
  if (typeof param === "number") {
    return Pervasives.failwith("TODO");
  } else {
    var variant = param[0];
    if (variant >= 246273139) {
      if (variant !== 826042841) {
        if (variant !== 1022564063) {
          if (variant >= 246273140) {
            return Pervasives.failwith("TODO");
          } else {
            return /* tuple */[
                    "Content-Type",
                    param[1]
                  ];
          }
        } else {
          return /* tuple */[
                  "Content-Length",
                  Pervasives.string_of_int(param[1])
                ];
        }
      } else {
        var scheme = param[1];
        var value;
        if (scheme[0] >= -881134847) {
          value = "Bearer " + (String(scheme[1]) + "");
        } else {
          var match = scheme[1];
          var encoded = Curry._1(Refetch__Utils.btoa, "" + (String(match[0]) + (":" + (String(match[1]) + ""))));
          value = "Basic " + (String(encoded) + "");
        }
        return /* tuple */[
                "Authorization",
                value
              ];
      }
    } else if (variant !== -378039458) {
      if (variant !== 4099528) {
        return Pervasives.failwith("TODO");
      } else {
        var match$1 = param[1];
        return /* tuple */[
                match$1[0],
                match$1[1]
              ];
      }
    } else {
      var match$2 = param[1];
      var typ = match$2[0];
      var typ$1 = typeof typ === "number" ? (
          typ >= -735835133 ? "attachment" : "inline"
        ) : typ[1];
      var value$1 = Rebase.List[/* reduce */3]((function (acc, p) {
              return "" + (String(acc) + ("; " + (String(p) + "")));
            }), typ$1, Rebase.List[/* map */0]((function (param) {
                  if (param[0] >= -786699545) {
                    return "filename=\"" + (String(param[1]) + "\"");
                  } else {
                    var match = param[1];
                    return "" + (String(match[0]) + ("=\"" + (String(match[1]) + "\"")));
                  }
                }), match$2[1]));
      return /* tuple */[
              "Content-Disposition",
              value$1
            ];
    }
  }
}

function _stringifyPair(param) {
  return "" + (String(param[0]) + (": " + (String(param[1]) + "")));
}

function _stringifyHeader(header) {
  return _stringifyPair(_pairifyHeader(header));
}

function _encode(headers) {
  return Js_dict.fromList(Rebase.List[/* map */0](_pairifyHeader, headers));
}

var Cookie = 0;

var Mime = 0;

var Utils = 0;

exports.Cookie           = Cookie;
exports.Mime             = Mime;
exports.Utils            = Utils;
exports._pairifyHeader   = _pairifyHeader;
exports._stringifyPair   = _stringifyPair;
exports._stringifyHeader = _stringifyHeader;
exports._encode          = _encode;
/* Js_dict Not a pure module */
