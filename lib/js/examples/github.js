'use strict';

var Rebase            = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Resync            = require("../src/Resync.js");
var Refetch           = require("../src/Refetch.js");
var Pervasives        = require("bs-platform/lib/js/pervasives.js");
var Json_decode       = require("bs-json/lib/js/src/Json_decode.js");
var Refetch__Utils    = require("../src/Refetch__Utils.js");
var Caml_exceptions   = require("bs-platform/lib/js/caml_exceptions.js");
var Refetch__Response = require("../src/Refetch__Response.js");

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

function repos(json) {
  return Json_decode.list(repo, json);
}

var Decode = /* module */[
  /* repo */repo,
  /* repos */repos
];

function columnify(rows) {
  var maxLengths = Refetch__Utils.List[/* reduceOr */0](/* [] */0, (function (maxs, lengths) {
          return Rebase.List[/* map */0]((function (param) {
                        return Math.max(param[0], param[1]);
                      }), Rebase.List[/* zip */21](maxs, lengths));
        }), Rebase.List[/* map */0]((function (columns) {
              return Rebase.List[/* map */0](Rebase.$$String[/* length */1], columns);
            }), rows));
  return Rebase.List[/* map */0]((function (columns) {
                return Rebase.List[/* reduce */3]((function (s, c) {
                              return s + (" " + c);
                            }), "", Rebase.List[/* map */0]((function (param) {
                                  return Rebase.$$String[/* padEnd */7](param[1], " ", param[0]);
                                }), Rebase.List[/* zip */21](maxLengths, columns)));
              }), rows);
}

function getRepos() {
  return Resync.Future[/* map */8](repos, Resync.Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      throw [
                            FetchError,
                            param[0][/* reason */1]
                          ];
                    } else {
                      return Refetch__Response.json(param[1]);
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
