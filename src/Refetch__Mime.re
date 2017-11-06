
type t = string;

let form = "application/x-www-form-urlencoded";
let json = "application/json";
let json_utf8 = "application/json; charset=utf-8";

let multipart = "multipart/form-data";

external toString : t => string = "%identity"