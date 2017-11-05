open! Rebase;

module Body = Refetch__Body;
module Headers = Refetch__Headers;

type t = {
  method: Headers.method,
  queryParams: list((string, string)),
  headers: list(Headers.t),
  body: option(Body.t)
};

let make = (method) => {
  method,
  queryParams: [],
  headers: [],
  body: None
};

/*
let param = (key, value, request) => {
  ...request,
  queryParams: [(key, value), ...request.queryParams]
};
*/

let header = (header, request) => {
  ...request,
  headers: [header, ...request.headers]
};

let body = (body, request) => {
  ...request,
  body: Some(
    switch body {
    | `String content => Body.fromString(content)
    | `JSON content => Body.fromJson(content)
    | `POJO content => Body.fromJsObj(content)
    }
  )
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

let _toRequestInit = (request) =>
  Fetch.RequestInit.make(
    ~method_=_encodeMethod(request.method),
    ~body=?request.body,
    ~headers=Headers._encode(request.headers),
  ());

