'use strict';

var Block           = require("bs-platform/lib/js/block.js");
var Curry           = require("bs-platform/lib/js/curry.js");
var Rebase          = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync          = require("./Resync.bs.js");
var Refetch__Status = require("./Refetch__Status.bs.js");

function _getStatus(response) {
  return /* record */[
          /* code */Refetch__Status.codeFromInt(response.status),
          /* reason */response.statusText
        ];
}

function _make(res) {
  var status = _getStatus(res);
  var match = status[/* code */0];
  if (match >= -558113335) {
    if (match >= 17692) {
      if (match !== 566851975) {
        if (match !== 1047445569) {
          if (match >= 17693) {
            return /* Error */Block.__(1, [
                      status,
                      res
                    ]);
          } else {
            return /* Ok */Block.__(0, [
                      status,
                      res
                    ]);
          }
        } else {
          return /* Ok */Block.__(0, [
                    status,
                    res
                  ]);
        }
      } else {
        return /* Ok */Block.__(0, [
                  status,
                  res
                ]);
      }
    } else if (match !== -449270550) {
      if (match !== -113889576) {
        return /* Error */Block.__(1, [
                  status,
                  res
                ]);
      } else {
        return /* Ok */Block.__(0, [
                  status,
                  res
                ]);
      }
    } else {
      return /* Ok */Block.__(0, [
                status,
                res
              ]);
    }
  } else if (match >= -748150966) {
    if (match !== -696181141) {
      if (match >= -748150965) {
        if (match >= -558113336) {
          return /* Ok */Block.__(0, [
                    status,
                    res
                  ]);
        } else {
          return /* Error */Block.__(1, [
                    status,
                    res
                  ]);
        }
      } else {
        return /* Ok */Block.__(0, [
                  status,
                  res
                ]);
      }
    } else {
      return /* Ok */Block.__(0, [
                status,
                res
              ]);
    }
  } else if (match !== -1003105320) {
    if (match !== -771826261) {
      return /* Error */Block.__(1, [
                status,
                res
              ]);
    } else {
      return /* Ok */Block.__(0, [
                status,
                res
              ]);
    }
  } else {
    return /* Ok */Block.__(0, [
              status,
              res
            ]);
  }
}

function body(prim) {
  return prim.body;
}

var text = Curry._2(Rebase.Fn[/* >> */6], (function (prim) {
        return prim.text();
      }), Resync.Future[/* fromJSPromise */10]);

var json = Curry._2(Rebase.Fn[/* >> */6], (function (prim) {
        return prim.json();
      }), Resync.Future[/* fromJSPromise */10]);

var Body = 0;

var Headers = 0;

var Status = 0;

exports.Body       = Body;
exports.Headers    = Headers;
exports.Status     = Status;
exports._getStatus = _getStatus;
exports._make      = _make;
exports.body       = body;
exports.text       = text;
exports.json       = json;
/* text Not a pure module */
