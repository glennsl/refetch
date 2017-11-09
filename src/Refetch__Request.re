open! Rebase;

module Body = Refetch__Body;
module Headers = Refetch__Headers;
module Mime = Refetch__Mime;
module Utils = Refetch__Utils;

type payload = [
  /*
  | `Blob
  | `BufferSource
  | `FormData
  | `URLSearchParams
  | `ReadableStream
  */
  | `String(string)
  | `Json(Js.Json.t)
  | `Form(list((string, string)))
];

type t = {
  url: string,
  method: Headers.method,
  queryParams: list((string, string)),
  headers: list(Headers.t),
  body: option(payload)
};

let make = (method, ~queryParams=[], ~headers=[], ~body=?, url) => {
  url,
  method,
  queryParams,
  headers,
  body
};

let param = (key, value, request) => {
  ...request,
  queryParams: [(key, value), ...request.queryParams]
};

let header = (header, request) => {
  ...request,
  headers: [header, ...request.headers]
};

let basicAuthentication = (username, password, request) =>
  header(`Authorization(`Basic(username, password)), request);

let payload = (payload, request) =>
  switch payload {
  /*
  | `Blob
  | `BufferSource
  | `FormData
  | `URLSearchParams
  | `ReadableStream
  */
  | `String _ => {
    ...request, /* fetch will set Content-Type to text/plain for us */
    body: Some(payload)
  }
 
  | `Json _ => {
    ...request |> header(`ContentType(Mime.json)),
    body: Some(payload)
  }

  | `Form _ => {
    ...request |> header(`ContentType(Mime.form)),
    body: Some(payload)

  }
/*
  | `Dict body => 
  */
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

[@bs.val] external encodeURIComponent : string => string = "";

let _buildUrl = (url, params) => {
  let encodeParam = ((key, value)) =>
    encodeURIComponent(key) ++ "=" ++ encodeURIComponent(value);

  let joinParams = (params) =>
    params |> Utils.List.reduceOr("", (acc, param) => {j|$acc&$param|j});

  let params =
      params |> List.map(encodeParam)
             |> joinParams;
  
  {j|$url?$params|j}
};

let _toFetchRequest = (request) =>
  Fetch.Request.makeWithInit(
    _buildUrl(request.url, request.queryParams),
    Fetch.RequestInit.make(
      ~method_ =
        _encodeMethod(request.method),

      ~body =
        ?Option.map(
          fun | `String content =>
                content |> Fetch.BodyInit.make

              | `Json content =>
                content |> Js.Json.stringify
                        |> Fetch.BodyInit.make

              | `Form pairs =>
                pairs |> List.map(((k, v)) => {j|$k=$v|j})
                      |> Utils.List.reduceOr("", (acc, item) => {j|$acc&$item|j})
                      |> Fetch.BodyInit.make

          ,request.body
        ),

      ~headers =
        request.headers |> List.reverse
                        |> Headers._encode,
    ())
  );

