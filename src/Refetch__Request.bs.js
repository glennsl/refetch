'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Fetch = require("bs-fetch/src/Fetch.bs.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var Refetch__Mime = require("./Refetch__Mime.bs.js");
var Refetch__Headers = require("./Refetch__Headers.bs.js");

function make(method_, $staropt$star, $staropt$star$1, body, url) {
  var queryParams = $staropt$star ? $staropt$star[0] : /* [] */0;
  var headers = $staropt$star$1 ? $staropt$star$1[0] : /* [] */0;
  return /* record */[
          /* url */url,
          /* method */method_,
          /* queryParams */queryParams,
          /* headers */headers,
          /* body */body
        ];
}

function param(key, value, request) {
  return /* record */[
          /* url */request[/* url */0],
          /* method */request[/* method */1],
          /* queryParams : :: */[
            /* tuple */[
              key,
              value
            ],
            request[/* queryParams */2]
          ],
          /* headers */request[/* headers */3],
          /* body */request[/* body */4]
        ];
}

function header(header$1, request) {
  return /* record */[
          /* url */request[/* url */0],
          /* method */request[/* method */1],
          /* queryParams */request[/* queryParams */2],
          /* headers : :: */[
            header$1,
            request[/* headers */3]
          ],
          /* body */request[/* body */4]
        ];
}

function basicAuthentication(username, password, request) {
  return header(/* `Authorization */[
              826042841,
              /* `Basic */[
                -1058563442,
                /* tuple */[
                  username,
                  password
                ]
              ]
            ], request);
}

function payload(payload$1, request) {
  var variant = payload$1[0];
  if (variant >= 781815140) {
    if (variant >= 826371656) {
      var init = header(/* `ContentType */[
            246273139,
            Refetch__Mime.json
          ], request);
      return /* record */[
              /* url */init[/* url */0],
              /* method */init[/* method */1],
              /* queryParams */init[/* queryParams */2],
              /* headers */init[/* headers */3],
              /* body : Some */[payload$1]
            ];
    } else {
      var init$1 = header(/* `ContentType */[
            246273139,
            Refetch__Mime.form
          ], request);
      return /* record */[
              /* url */init$1[/* url */0],
              /* method */init$1[/* method */1],
              /* queryParams */init$1[/* queryParams */2],
              /* headers */init$1[/* headers */3],
              /* body : Some */[payload$1]
            ];
    }
  } else if (variant >= -976970511) {
    return /* record */[
            /* url */request[/* url */0],
            /* method */request[/* method */1],
            /* queryParams */request[/* queryParams */2],
            /* headers */request[/* headers */3],
            /* body : Some */[payload$1]
          ];
  } else {
    var init$2 = header(/* `ContentType */[
          246273139,
          Refetch__Mime.multipart(payload$1[1][0])
        ], request);
    return /* record */[
            /* url */init$2[/* url */0],
            /* method */init$2[/* method */1],
            /* queryParams */init$2[/* queryParams */2],
            /* headers */init$2[/* headers */3],
            /* body : Some */[payload$1]
          ];
  }
}

function _encodeMethod(param) {
  if (typeof param === "number") {
    if (param >= 357830602) {
      if (param !== 492530731) {
        if (param >= 891112544) {
          if (param >= 994393768) {
            return Fetch.Method[/* patch */8];
          } else {
            return Fetch.Method[/* post */2];
          }
        } else if (param >= 801894688) {
          return Fetch.Method[/* head */1];
        } else {
          return Fetch.Method[/* connect */5];
        }
      } else {
        return Fetch.Method[/* delete */4];
      }
    } else if (param >= 3997359) {
      if (param >= 336447077) {
        return Fetch.Method[/* trace */7];
      } else {
        return Fetch.Method[/* put */3];
      }
    } else if (param >= 3546230) {
      return Fetch.Method[/* get */0];
    } else {
      return Fetch.Method[/* options */6];
    }
  } else {
    return Fetch.Method[/* other */9](param[1]);
  }
}

function _buildUrl(url, params) {
  var encodeParam = function (param) {
    return encodeURIComponent(param[0]) + ("=" + encodeURIComponent(param[1]));
  };
  var params$1 = Rebase.$$String[/* joinWith */11]("&", Rebase.List[/* map */0](encodeParam, params));
  if (params$1 === "") {
    return url;
  } else {
    return "" + (String(url) + ("?" + (String(params$1) + "")));
  }
}

function _stringifyPayload(param) {
  var variant = param[0];
  if (variant >= 781815140) {
    if (variant >= 826371656) {
      return JSON.stringify(param[1]);
    } else {
      return Rebase.$$String[/* joinWith */11]("&", Rebase.List[/* map */0]((function (param) {
                        return "" + (String(param[0]) + ("=" + (String(param[1]) + "")));
                      }), param[1]));
    }
  } else if (variant >= -976970511) {
    return param[1];
  } else {
    var match = param[1];
    var boundary = match[0];
    return Rebase.List[/* reduce */3]((function (acc, p) {
                  return "\n" + (acc + p);
                }), "--" + (String(boundary) + "\n"), Rebase.List[/* map */0]((function (param) {
                      var headers = Rebase.List[/* reduce */3]((function (acc, h) {
                              return acc + (h + "\n");
                            }), "", Rebase.List[/* map */0](Refetch__Headers._stringifyHeader, param[0]));
                      var payload = _stringifyPayload(param[1]);
                      return "" + (String(headers) + ("\n" + (String(payload) + ("\n--" + (String(boundary) + "\n")))));
                    }), match[1]));
  }
}

function _toFetchRequest(request) {
  return new Request(_buildUrl(request[/* url */0], request[/* queryParams */2]), Fetch.RequestInit[/* make */0](/* Some */[_encodeMethod(request[/* method */1])], /* Some */[Refetch__Headers._encode(Rebase.List[/* reverse */20](request[/* headers */3]))], Rebase.Option[/* map */0](Curry._2(Rebase.Fn[/* >> */6], _stringifyPayload, (function (prim) {
                            return prim;
                          })), request[/* body */4]), /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0));
}

var Body = 0;

var Headers = 0;

var Mime = 0;

var Utils = 0;

exports.Body = Body;
exports.Headers = Headers;
exports.Mime = Mime;
exports.Utils = Utils;
exports.make = make;
exports.param = param;
exports.header = header;
exports.basicAuthentication = basicAuthentication;
exports.payload = payload;
exports._encodeMethod = _encodeMethod;
exports._buildUrl = _buildUrl;
exports._stringifyPayload = _stringifyPayload;
exports._toFetchRequest = _toFetchRequest;
/* Refetch__Headers Not a pure module */
