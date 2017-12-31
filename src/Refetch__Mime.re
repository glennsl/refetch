
type t = string;

let form = "application/x-www-form-urlencoded";
let json = "application/json";
let json_utf8 = "application/json; charset=utf-8";

let multipart = boundary => {j|multipart/form-data; boundary=$boundary|j};

external toString : t => string = "%identity"