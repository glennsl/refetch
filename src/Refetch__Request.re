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
  | `Multipart(string, list((list(Headers.entity), payload)))
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

  | `Multipart(boundary, _) => {
    ...request |> header(`ContentType(Mime.multipart(boundary))),
    body: Some(payload)
  }
/*
  | `Dict body =>
  */
  };

let _encodeMethod =
  Fetch.(
    fun | `GET => Method.get
        | `HEAD => Method.head
        | `POST => Method.post
        | `PUT => Method.put
        | `DELETE => Method.delete
        | `CONNECT => Method.connect
        | `OPTIONS => Method.options
        | `TRACE => Method.trace
        | `PATCH => Method.patch
        | `OtherMethod(string) => Method.other(string)
  );

[@bs.val] external encodeURIComponent : string => string = "";

let _buildUrl = (url, params) => {
  let encodeParam = ((key, value)) =>
    encodeURIComponent(key) ++ "=" ++ encodeURIComponent(value);

  let params =
      params |> List.map(encodeParam)
             |> String.joinWith("&");

  switch params {
  | "" => url
  | _ => {j|$url?$params|j}
  };
};

let rec _stringifyPayload: payload => string =
  fun | `String content =>
        content

      | `Json content =>
        content |> Js.Json.stringify

      | `Form pairs =>
        pairs |> List.map(((k, v)) => {j|$k=$v|j})
              |> String.joinWith("&")

      | `Multipart(boundary, parts) =>
        parts |> List.map(((headers, payload)) => {
                 let headers = headers |> List.map(Headers._stringifyHeader)
                                       |> List.reduce((acc, h) => acc ++ h ++ "\n", "");
                 let payload = payload |> _stringifyPayload;
{j|$headers
$payload
--$boundary
|j}
              })
              |> List.reduce((acc, p) => "\n" ++ acc ++ p, {j|--$boundary\n|j})
;

let _toFetchRequest = request =>
  Fetch.Request.makeWithInit(
    _buildUrl(request.url, request.queryParams),
    Fetch.RequestInit.make(
      ~_method =
        _encodeMethod(request.method),

      ~body =
        ?Option.map(Fn.(_stringifyPayload >> Fetch.BodyInit.make), request.body),

      ~headers =
        request.headers |> List.reverse
                        |> Headers._encode,
    ())
  );

