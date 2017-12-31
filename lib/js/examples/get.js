'use strict';

var Resync            = require("../src/Resync.js");
var Refetch           = require("../src/Refetch.js");
var Refetch__Response = require("../src/Refetch__Response.js");

require('isomorphic-fetch')
;

Resync.Future[/* whenResolved */7]((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Resync.Future[/* flatMap */9]((function (param) {
            if (param.tag) {
              return Resync.Future[/* from */3]("oops!");
            } else {
              return Refetch__Response.text(param[1]);
            }
          }), Refetch.get("http://httpbin.org/get")));

/*  Not a pure module */
