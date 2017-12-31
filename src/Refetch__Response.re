open! Rebase;

module Body = Refetch__Body;
module Headers = Refetch__Headers;
module Status = Refetch__Status;

type t = Fetch.Response.t;

type state =
  | Ok(Status.t, t)
  | Error(Status.t, t);

let _getStatus = response => Status.{
  code:   response |> Fetch.Response.status
                   |> Status.codeFromInt,

  reason: response |> Fetch.Response.statusText
};

let _make = res => {
  let status = _getStatus(res);

  switch (status.code) {
  | #Status.success => Ok(status, res)
  | _               => Error(status, res)
  }
};

let body = response =>
  response |> Fetch.Response.body;

/* Not supported by node-fetch?
let arrayBuffer = (response) =>
  response |> Fetch.Response.arrayBuffer
           |> Resync.Future.fromJSPromise;

let blob = (response) =>
  response |> Fetch.Response.blob
           |> Resync.Future.fromJSPromise;
*/

let text = response =>
  response |> Fetch.Response.text
           |> Resync.Future.fromJSPromise;

let json = response =>
  response |> Fetch.Response.json
           |> Resync.Future.fromJSPromise;
