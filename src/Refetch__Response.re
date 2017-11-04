module StatusCode = Refetch__StatusCode;
module Headers = Refetch__Headers;

type t = Fetch.Response.t;

/*
let headers = (response) =>
*/

let status = (response) =>
  response |> Fetch.Response.status
           |> StatusCode.fromInt;

let ok =
  Fetch.Response.ok;

let json =
  Fetch.Response.json;

let text =
  Fetch.Response.text;