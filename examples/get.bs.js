'use strict';

var Curry             = require("bs-platform/lib/js/curry.js");
var Resync            = require("../src/Resync.bs.js");
var Refetch           = require("../src/Refetch.bs.js");
var Refetch__Response = require("../src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

Resync.Future[/* whenResolved */7]((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Resync.Future[/* flatMap */9]((function (param) {
            if (param.tag) {
              return Resync.Future[/* from */3]("oops!");
            } else {
              return Curry._1(Refetch__Response.text, param[1]);
            }
          }), Refetch.get("http://httpbin.org/get")));

/*  Not a pure module */
