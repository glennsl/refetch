'use strict';

var Resync            = require("../src/Resync.bs.js");
var Refetch           = require("../src/Refetch.bs.js");
var Pervasives        = require("bs-platform/lib/js/pervasives.js");
var ConsolePng        = require("console-png");
var StreamToBuffer    = require("stream-to-buffer");
var Refetch__Response = require("../src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

Resync.Future[/* whenCompleted */6]((function (param) {
        if (param.tag) {
          console.log(param[0]);
          return /* () */0;
        } else {
          StreamToBuffer(param[0], (function (_, buffer) {
                  ConsolePng(buffer, (function (_, string) {
                          console.log(string);
                          return /* () */0;
                        }));
                  return /* () */0;
                }));
          return /* () */0;
        }
      }), Resync.Future[/* map */8]((function (param) {
            if (param.tag) {
              return Pervasives.failwith(param[0][/* reason */1]);
            } else {
              return Refetch__Response.body(param[1]);
            }
          }), Refetch.get("http://httpbin.org/image/png")));

/*  Not a pure module */
