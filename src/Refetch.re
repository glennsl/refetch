open! Rebase;

module Body = Refetch__Body;
module Headers = Refetch__Headers;
module Response = Refetch__Response;
module Request = Refetch__Request;

let request = Request.make;

let fetch = (url, request) =>
  Fetch.fetchWithInit(url, Request._toRequestInit(request))
  |> Js.Promise.then_(res => res |> Response._make |> Js.Promise.resolve);

let get = (url) =>
  request(`GET) |> fetch(url);

let post = (url, body) =>
  request(`POST) |> Request.body(body)
                 |> fetch(url);