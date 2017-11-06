[%%raw {|require('isomorphic-fetch')|}];
[%%raw {|
  const debugHttp = require('debug-http');
  debugHttp();
|}];

/* simple get */
Resync.(Refetch.(
  get("http://httpbin.org/get")
  |> Future.flatMap(
     fun | Js.Result.Ok(response) => Response.text(response)
         | _ => "oops!" |> Future.from)
  |> Future.whenResolved((text) => Js.log(text))
));

/* simple post */
Resync.(Refetch.(
  post("http://httpbin.org/post", `String("datathings"))
  |> Future.flatMap(
     fun | Js.Result.Ok(response) => Response.text(response)
         | _ => "oops!" |> Future.from)
  |> Future.whenResolved((text) => Js.log(text))
));

/* advanced */
Resync.(Refetch.(
  request(`POST)
    |> Request.header(`ContentType("application/json"))
    |> Request.body(`String("fooyah!"))
  |> fetch("http://httpbin.org/post")
    |> Future.flatMap(
       fun | Js.Result.Ok(response) => Response.text(response)
           | _ => Future.from("oops!"))
    |> Future.whenResolved((text) => Js.log(text))
));