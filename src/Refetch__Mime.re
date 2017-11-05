
type t = string;

let json = "application/json";
let json_utf8 = "application/json; charset=utf-8";

external toString : t => string = "%identity"