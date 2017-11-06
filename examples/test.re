[%%raw {|require('isomorphic-fetch')|}];
[%%raw {|
  const debugHttp = require('debug-http');
  debugHttp();
|}];
/*
/* simple get */
Resync.(Refetch.(
  get("http://httpbin.org/get")
  |> Future.flatMap(
     fun | Response.Ok(_, response) => Response.text(response)
         | Response.Error({ reason }, _) => Future.from(reason))
  |> Future.whenResolved((text) => Js.log(text))
));

/* simple post */
Resync.(Refetch.(
  post("http://httpbin.org/post", `String("datathings"))
  |> Future.flatMap(
     fun | Response.Ok(_, response) => Response.text(response)
         | Response.Error({ reason }, _) => Future.from(reason))
  |> Future.whenResolved((text) => Js.log(text))
));
*/
/* advanced */
Resync.(Refetch.(
  request(`POST, "http://httpbin.org/post")
    |> Request.param("sort", "DESC")
    |> Request.param("filter", "foo=true")
    |> Request.header(`ContentType("application/json"))
    |> Request.payload(`Json(Json.Encode.(object_([
         ("foo", int(42)),
         ("bar", string("baz"))
       ]))))
  |> fetch
    |> Future.flatMap(
       fun | Response.Ok(_, response) => Response.text(response)
           | Response.Error({ reason }, _) => Future.from(reason))
    |> Future.whenResolved((text) => Js.log(text))
));