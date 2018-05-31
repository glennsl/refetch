'use strict';


function multipart(boundary) {
  return "multipart/form-data; boundary=" + (String(boundary) + "");
}

var form = "application/x-www-form-urlencoded";

var json = "application/json";

var json_utf8 = "application/json; charset=utf-8";

exports.form = form;
exports.json = json;
exports.json_utf8 = json_utf8;
exports.multipart = multipart;
/* No side effect */
