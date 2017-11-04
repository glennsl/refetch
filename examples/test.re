[%%raw {|require('isomorphic-fetch')|}];
[%%raw {|
  const debugHttp = require('debug-http');
  debugHttp();
|}];

Js.Promise.(
  Refetch.fetch("http://httpbin.org/get")
  |> then_(Fetch.Response.text)
  |> then_((text) => Js.log(text) |> resolve)
  |> ignore
);