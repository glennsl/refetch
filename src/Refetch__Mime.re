
type t = string;

let application_json = "application/json";
let application_json_utf8 = "application/json; charset=utf-8";

external toString : t => string = "%identity"