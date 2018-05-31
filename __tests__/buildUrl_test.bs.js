'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Refetch__Request = require("../src/Refetch__Request.bs.js");

describe("_buildUrl", (function () {
        Jest.test("builds a url with query parameters", (function () {
                var urlWithParams = Refetch__Request._buildUrl("www.google.com", /* :: */[
                      /* tuple */[
                        "q",
                        "abc"
                      ],
                      /* [] */0
                    ]);
                return Jest.Expect[/* toBe */2]("www.google.com?q=abc", Jest.Expect[/* expect */0](urlWithParams));
              }));
        return Jest.test("builds a url without query parameters", (function () {
                      var urlWithoutParams = Refetch__Request._buildUrl("www.google.com", /* [] */0);
                      return Jest.Expect[/* toBe */2]("www.google.com", Jest.Expect[/* expect */0](urlWithoutParams));
                    }));
      }));

/*  Not a pure module */
