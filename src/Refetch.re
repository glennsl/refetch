open! Rebase;
module Headers = Refetch__Headers;

module Body = {
  type t = Fetch.BodyInit.t;

  external fromString : string => t = "%identity";
  external fromJson : Js.Json.t => t = "%identity";
  external fromJsObj : Js.t({..}) => t = "%identity";
};

let _encodeMethod =
  Fetch.(
    fun | `GET => Get
        | `HEAD => Head
        | `POST => Post
        | `PUT => Put
        | `DELETE => Delete
        | `CONNECT => Connect
        | `OPTIONS => Options
        | `TRACE => Trace
        | `PATCH => Patch
        | `OtherMethod(string) => Other(string)
  );

let _request = (~method, ~body, ~mode, ~headers) =>
  Fetch.RequestInit.make(
    ~method_=?Option.map(_encodeMethod, method),
    ~body?,
    ~mode?,
    ~headers=?Option.map(Headers._encode, headers),
  ());

let fetch = (~method=?, ~body=?, ~mode=?, ~headers=?, url) =>
  Fetch.fetchWithInit(url, _request(~method, ~body, ~mode, ~headers));

let get = (~headers=?, url) =>
  fetch(~method=`GET, ~headers?, url);

let post = (~headers=?, url, body) =>
  fetch(~method=`POST, ~headers?, ~body, url);