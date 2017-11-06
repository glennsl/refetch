open! Rebase;

module Body = Refetch__Body;
module Headers = Refetch__Headers;
module Response = Refetch__Response;
module Request = Refetch__Request;

let request = Request.make;

let fetch = (request) =>
  Fetch.fetchWithRequest(Request._toFetchRequest(request))
  |> Js.Promise.then_(res => res |> Response._make |> Js.Promise.resolve)
  |> Resync.Future.fromJSPromise;

let get = (url) =>
  request(`GET, url) |> fetch;

let post = (url, payload) =>
  request(`POST, url) |> Request.payload(payload)
                      |> fetch;