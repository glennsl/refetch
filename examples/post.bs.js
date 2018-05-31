'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Resync = require("../src/Resync.bs.js");
var Refetch = require("../src/Refetch.bs.js");
var Refetch__Request = require("../src/Refetch__Request.bs.js");
var Refetch__Response = require("../src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

Resync.Future[/* whenResolved */7]((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Resync.Future[/* flatMap */9]((function (param) {
            if (param.tag) {
              return Resync.Future[/* from */3](param[0][/* reason */1]);
            } else {
              return Curry._1(Refetch__Response.text, param[1]);
            }
          }), Refetch.fetch(Refetch__Request.payload(/* `String */[
                  -976970511,
                  "title=foobar&body=bar&userId=1"
                ], Refetch__Request.header(/* `ContentType */[
                      246273139,
                      "application/x-www-form-urlencoded; charset=UTF-8"
                    ], Refetch.request(/* POST */891112544, /* None */0, /* None */0, /* None */0, "https://httpbin.org/post"))))));

Resync.Future[/* whenResolved */7]((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Resync.Future[/* flatMap */9]((function (param) {
            if (param.tag) {
              return Resync.Future[/* from */3](param[0][/* reason */1]);
            } else {
              return Curry._1(Refetch__Response.text, param[1]);
            }
          }), Refetch.fetch(Refetch.request(/* POST */891112544, /* None */0, /* Some */[/* :: */[
                    /* `ContentType */[
                      246273139,
                      "application/x-www-form-urlencoded; charset=UTF-8"
                    ],
                    /* [] */0
                  ]], /* Some */[/* `String */[
                    -976970511,
                    "title=foobar&body=bar&userId=1"
                  ]], "https://httpbin.org/post"))));

/*  Not a pure module */
