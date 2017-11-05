[%%raw {|require('isomorphic-fetch')|}];
[%%raw {|
  const debugHttp = require('debug-http');
  debugHttp();
|}];

/* simple get */
Js.Promise.(Refetch.(
  get("http://httpbin.org/get")
  |> then_(
     fun | Js.Result.Ok(response) => Response.text(response)
         | _ => "oops!" |> resolve)
  |> then_((text) => Js.log(text) |> resolve)
  |> ignore
));

/* simple post */
Js.Promise.(Refetch.(
  post("http://httpbin.org/post", `String("datathings"))
  |> then_(
     fun | Js.Result.Ok(response) => Response.text(response)
         | _ => "oops!" |> resolve)
  |> then_((text) => Js.log(text) |> resolve)
  |> ignore
));

/* advanced */
Js.Promise.(Refetch.(
  request(`POST)
    |> Request.header(`ContentType("application/json"))
    |> Request.body(`String("fooyah!"))
  |> fetch("http://httpbin.org/post")
    |> then_(
       fun | Js.Result.Ok(response) => Response.text(response)
           | _ => "oops!" |> resolve)
    |> then_((text) => Js.log(text) |> resolve)
  |> ignore
));