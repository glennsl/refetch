'use strict';

var Resync = require("../src/Resync.bs.js");
var Refetch = require("../src/Refetch.bs.js");

require('isomorphic-fetch')
;

function retryGet(n) {
  if (n !== 0) {
    return Resync.Future[/* flatMap */9]((function (param) {
                  if (param.tag) {
                    console.log("Uh, oh, an error occurred. Retrying...");
                    return retryGet(n - 1 | 0);
                  } else {
                    return Resync.Future[/* from */3]("Wat!? It worked?");
                  }
                }), Refetch.get("https://httpbin.org/status/400"));
  } else {
    return Resync.Future[/* from */3]("rety failed");
  }
}

Resync.Future[/* whenResolved */7]((function (prim) {
        console.log(prim);
        return /* () */0;
      }), retryGet(3));

exports.retryGet = retryGet;
/*  Not a pure module */
