'use strict';

var Jest    = require("bs-jest/lib/js/src/jest.js");
var Nock    = require("nock");
var Curry   = require("bs-platform/lib/js/curry.js");
var Resync  = require("../src/Resync.js");
var Refetch = require("../src/Refetch.js");

require('isomorphic-fetch')
;

Nock.disableNetConnect();

describe("get", (function () {
        var scope = Nock("http://example.com");
        afterAll((function () {
                scope.restore();
                return /* () */0;
              }));
        return Jest.testAsync("get", (function (done_) {
                      scope.post("/").reply(200, {
                            foo: 42
                          });
                      return Resync.Future[/* whenResolved */7]((function () {
                                    return Curry._1(done_, Jest.Expect[/* toBe */2](/* true */1, Jest.Expect[/* expect */0](+scope.isDone())));
                                  }), Refetch.post("http://example.com", /* `String */[
                                      -976970511,
                                      "test"
                                    ]));
                    }));
      }));

/*  Not a pure module */
