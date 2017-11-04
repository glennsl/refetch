
[%%raw {|require('isomorphic-fetch')|}];

Js.Promise.(
  Refetch.get("http://httpbin.org/get")
  |> then_(Fetch.Response.text)
  |> then_((text) => Js.log(text) |> resolve)
  |> ignore
);
