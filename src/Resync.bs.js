'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");

function _dispatch(f, value) {
  return Curry._1(f, value);
}

function _complete(promise, value) {
  promise[/* value */0] = /* Some */[value];
  return Rebase.List[/* forEach */8]((function (f) {
                return Curry._1(f, value);
              }), promise[/* callbacks */1]);
}

function make() {
  return /* record */[
          /* value : None */0,
          /* callbacks : [] */0
        ];
}

function from(value) {
  return /* record */[
          /* value : Some */[/* Ok */Block.__(0, [value])],
          /* callbacks : [] */0
        ];
}

function resolve(promise, value) {
  return _complete(promise, /* Ok */Block.__(0, [value]));
}

function reject(promise, exn) {
  return _complete(promise, /* Error */Block.__(1, [exn]));
}

function whenCompleted(f, future) {
  future[/* callbacks */1] = /* :: */[
    f,
    future[/* callbacks */1]
  ];
  return Rebase.Option[/* forEach */8](Curry.__1(f), future[/* value */0]);
}

function whenResolved(f, future) {
  return whenCompleted((function (param) {
                if (param.tag) {
                  return /* () */0;
                } else {
                  return Curry._1(f, param[0]);
                }
              }), future);
}

function map(f, future) {
  var promise = /* record */[
    /* value : None */0,
    /* callbacks : [] */0
  ];
  whenCompleted((function (param) {
          if (param.tag) {
            return _complete(promise, /* Error */Block.__(1, [param[0]]));
          } else {
            var value = Curry._1(f, param[0]);
            return _complete(promise, /* Ok */Block.__(0, [value]));
          }
        }), future);
  return promise;
}

function flatMap(f, future) {
  var promise = /* record */[
    /* value : None */0,
    /* callbacks : [] */0
  ];
  whenCompleted((function (param) {
          if (param.tag) {
            return _complete(promise, /* Error */Block.__(1, [param[0]]));
          } else {
            return whenCompleted((function (param) {
                          if (param.tag) {
                            return _complete(promise, /* Error */Block.__(1, [param[0]]));
                          } else {
                            return _complete(promise, /* Ok */Block.__(0, [param[0]]));
                          }
                        }), Curry._1(f, param[0]));
          }
        }), future);
  return promise;
}

function fromJSPromise(jsPromise) {
  var promise = /* record */[
    /* value : None */0,
    /* callbacks : [] */0
  ];
  jsPromise.then((function (v) {
            return Promise.resolve(_complete(promise, /* Ok */Block.__(0, [v])));
          })).catch((function (e) {
          return Promise.resolve(_complete(promise, /* Error */Block.__(1, [e])));
        }));
  return promise;
}

var Promise$1 = /* module */[
  /* _dispatch */_dispatch,
  /* _complete */_complete,
  /* make */make,
  /* from */from,
  /* resolve */resolve,
  /* reject */reject,
  /* whenCompleted */whenCompleted,
  /* whenResolved */whenResolved,
  /* map */map,
  /* flatMap */flatMap,
  /* fromJSPromise */fromJSPromise
];

var Future = /* module */[
  /* _dispatch */_dispatch,
  /* _complete */_complete,
  /* make */make,
  /* from */from,
  /* resolve */resolve,
  /* reject */reject,
  /* whenCompleted */whenCompleted,
  /* whenResolved */whenResolved,
  /* map */map,
  /* flatMap */flatMap,
  /* fromJSPromise */fromJSPromise
];

exports.Promise = Promise$1;
exports.Future = Future;
/* No side effect */
