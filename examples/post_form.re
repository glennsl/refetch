open Resync;
open Refetch;
[%%raw {|require('isomorphic-fetch')|}];

request(`POST, "http://httpbin.org/post")
  |> Request.payload(`Form([
    ("foo", "boo"),
    ("bar", "far")
  ]))
|> fetch
  |> Future.flatMap(
      fun | Response.Ok(_, response) => Response.text(response)
          | Response.Error({ reason }, _) => Future.from(reason))
  |> Future.whenResolved(Js.log);