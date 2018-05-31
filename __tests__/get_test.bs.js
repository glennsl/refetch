'use strict';

var Jest = require("bs-jest/src/jest.js");
var Nock = require("nock");
var Curry = require("bs-platform/lib/js/curry.js");
var Resync = require("../src/Resync.bs.js");
var Refetch = require("../src/Refetch.bs.js");

require('isomorphic-fetch')
;

Nock.disableNetConnect();

describe("get", (function () {
        var scope = Nock("http://example.com");
        afterAll((function () {
                scope.restore();
                return /* () */0;
              }));
        return Jest.testAsync("get", (function (finish) {
                      scope.get("/").reply(200, {
                            foo: 42
                          });
                      return Resync.Future[/* whenResolved */7]((function () {
                                    return Curry._1(finish, Jest.Expect[/* toBe */2](true, Jest.Expect[/* expect */0](scope.isDone())));
                                  }), Refetch.get("http://example.com"));
                    }));
      }));

/*  Not a pure module */
