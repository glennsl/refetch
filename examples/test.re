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
/*request(`POST, "http://httpbin.org/post")*/
request(`POST, "https://requestb.in/183okup1")
/*request(`POST, "http://putsreq.com/FFB540W0YeOnQjBMOKVq")*/
  |> Request.payload(`Multipart("booboo", [
    ([`ContentType("plain/text"), `ContentDisposition(`Other("form-data"), [`Other("name", "field1"), `Filename("myimage.png")])], `String("foo")),
    ([`ContentType("application/json"), `ContentDisposition(`Other("form-data"), [`Other("name", "field1")])], `Json(Js.Json.null))
  ]))
|> fetch
  |> Future.flatMap(
      fun | Response.Ok(_, response) => Response.text(response)
          | Response.Error({ reason }, _) => Future.from(reason))
  |> Future.whenResolved(Js.log);