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
          }), Refetch.fetch(Refetch__Request.payload(/* `Form */[
                  781815140,
                  /* :: */[
                    /* tuple */[
                      "foo",
                      "boo"
                    ],
                    /* :: */[
                      /* tuple */[
                        "bar",
                        "far"
                      ],
                      /* [] */0
                    ]
                  ]
                ], Refetch.request(/* POST */891112544, /* None */0, /* None */0, /* None */0, "http://httpbin.org/post")))));

/*  Not a pure module */
