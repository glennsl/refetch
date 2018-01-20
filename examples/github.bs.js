'use strict';

var Curry             = require("bs-platform/lib/js/curry.js");
var Rebase            = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync            = require("../src/Resync.bs.js");
var Refetch           = require("../src/Refetch.bs.js");
var Pervasives        = require("bs-platform/lib/js/pervasives.js");
var Json_decode       = require("bs-json/src/Json_decode.js");
var Refetch__Utils    = require("../src/Refetch__Utils.bs.js");
var Caml_exceptions   = require("bs-platform/lib/js/caml_exceptions.js");
var Refetch__Response = require("../src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

var FetchError = Caml_exceptions.create("Github.FetchError");

function repo(json) {
  return /* record */[
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* description */Json_decode.field("description", (function (param) {
                  return Json_decode.optional(Json_decode.string, param);
                }), json),
          /* stars */Json_decode.field("stargazers_count", Json_decode.$$int, json),
          /* forks */Json_decode.field("forks_count", Json_decode.$$int, json),
          /* openIssues */Json_decode.field("open_issues_count", Json_decode.$$int, json)
        ];
}

function repos(param) {
  return Json_decode.list(repo, param);
}

var Decode = /* module */[
  /* repo */repo,
  /* repos */repos
];

function columnify(rows) {
  var partial_arg = Rebase.$$String[/* length */1];
  var partial_arg$1 = Rebase.List[/* map */0];
  var maxLengths = Refetch__Utils.List[/* reduceOr */0](/* [] */0, (function (maxs, lengths) {
          return Rebase.List[/* map */0](Curry._1(Rebase.Fn[/* uncurry */4], (function (prim, prim$1) {
                            return Math.max(prim, prim$1);
                          })), Rebase.List[/* zip */21](maxs, lengths));
        }), Rebase.List[/* map */0]((function (param) {
              return partial_arg$1(partial_arg, param);
            }), rows));
  var partial_arg$2 = Rebase.List[/* zip */21];
  var partial_arg$3 = Rebase.List[/* map */0];
  var partial_arg$4 = Rebase.List[/* reduce */3];
  return Rebase.List[/* map */0](Curry._2(Rebase.Fn[/* >> */6], Curry._2(Rebase.Fn[/* >> */6], (function (param) {
                        return partial_arg$2(maxLengths, param);
                      }), (function (param) {
                        return partial_arg$3((function (param) {
                                      return Rebase.$$String[/* padEnd */7](param[1], " ", param[0]);
                                    }), param);
                      })), (function (param) {
                    return partial_arg$4((function (s, c) {
                                  return s + (" " + c);
                                }), "", param);
                  })), rows);
}

function getRepos() {
  return Resync.Future[/* map */8](repos, Resync.Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      throw [
                            FetchError,
                            param[0][/* reason */1]
                          ];
                    } else {
                      return Curry._1(Refetch__Response.json, param[1]);
                    }
                  }), Refetch.get("https://api.github.com/users/reasonml-community/repos")));
}

function printRepos(repos) {
  var headers = columnify(Rebase.List[/* map */0]((function (repo) {
              return /* :: */[
                      repo[/* name */0],
                      /* :: */[
                        Rebase.Option[/* getOr */16]("N/A", repo[/* description */1]),
                        /* [] */0
                      ]
                    ];
            }), repos));
  var stats = columnify(Rebase.List[/* map */0]((function (repo) {
              return /* :: */[
                      Pervasives.string_of_int(repo[/* stars */2]),
                      /* :: */[
                        "stars   ",
                        /* :: */[
                          Pervasives.string_of_int(repo[/* forks */3]),
                          /* :: */[
                            "forks   ",
                            /* :: */[
                              Pervasives.string_of_int(repo[/* openIssues */4]),
                              /* :: */[
                                "open issues",
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ];
            }), repos));
  return Rebase.List[/* forEach */8]((function (param) {
                console.log(param[0]);
                console.log(param[1]);
                console.log("");
                return /* () */0;
              }), Rebase.List[/* zip */21](headers, stats));
}

Resync.Future[/* whenCompleted */6]((function (param) {
        if (param.tag) {
          console.log("An error occurred: " + (String(param[0]) + ""));
          return /* () */0;
        } else {
          return printRepos(param[0]);
        }
      }), getRepos(/* () */0));

var Utils = 0;

exports.Utils      = Utils;
exports.FetchError = FetchError;
exports.Decode     = Decode;
exports.columnify  = columnify;
exports.getRepos   = getRepos;
exports.printRepos = printRepos;
/*  Not a pure module */
