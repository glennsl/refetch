open! Rebase;

module Body = Refetch__Body;
module Headers = Refetch__Headers;
module Status = Refetch__Status;

type t = Fetch.Response.t;

type state =
  | Ok(Status.t, t)
  | Error(Status.t, t);

let _getStatus = (response) => Status.{
  code:   response |> Fetch.Response.status
                   |> Status.codeFromInt,

  reason: response |> Fetch.Response.statusText
};

let _make = (res) => {
  let status = _getStatus(res);

  switch (Fetch.Response.status(res)) {
  | n when n >= 200 && n <= 299 => Ok(status, res)
  | _ => Error(status, res)
  }
};

let text = (response) =>
  response |> Fetch.Response.text
           |> Resync.Future.fromJSPromise;

let json = (response) =>
  response |> Fetch.Response.json
           |> Resync.Future.fromJSPromise;