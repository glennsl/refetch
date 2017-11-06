open! Rebase;

module Body = Refetch__Body;
module Headers = Refetch__Headers;
module StatusCode = Refetch__StatusCode;

type t = Fetch.Response.t;

let _make = (res) =>
  switch (Fetch.Response.status(res)) {
  | n when n >= 200 && n <= 299 => Js.Result.Ok(res)
  | n when n >= 400 && n <= 599 => Js.Result.Error(res)
  | _ => failwith("TODO: Unknown status")
  };

let text = (response) =>
  response |> Fetch.Response.text
           |> Resync.Future.fromJSPromise;