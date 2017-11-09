open Resync;
open Refetch;
[%%raw {|require('isomorphic-fetch')|}];
[%%raw {|
  const debugHttp = require('debug-http');
  debugHttp();
|}];

/*
/* simple get */
get("http://httpbin.org/get")
|> Future.flatMap(
    fun | Response.Ok(_, response) => Response.text(response)
        | Response.Error({ reason }, _) => Future.from(reason))
|> Future.whenResolved((text) => Js.log(text));

/* simple post */
post("http://httpbin.org/post", `String("datathings"))
|> Future.flatMap(
    fun | Response.Ok(_, response) => Response.text(response)
        | Response.Error({ reason }, _) => Future.from(reason))
|> Future.whenResolved((text) => Js.log(text));
*/

/* advanced */
request(`POST, "http://httpbin.org/post")
/*equest(`POST, "https://requestb.in/thog7oth")*/
/*request(`POST, "http://putsreq.com/FFB540W0YeOnQjBMOKVq")*/
  |> Request.param("sort", "DESC")
  |> Request.param("filter", "foo=true")
  |> Request.basicAuthentication("boo", "yah")
  |> Request.header(`Authorization(`Bearer("jklcolid")))
  |> Request.payload(`Form([
    ("foo", "boo"),
    ("bar", "far")
  ]))
|> fetch
  |> Future.flatMap(
      fun | Response.Ok(_, response) => Response.text(response)
          | Response.Error({ reason }, _) => Future.from(reason))
  |> Future.whenResolved(Js.log);