[%%raw {|require('isomorphic-fetch')|}];
let get = () =>
  Js.Promise.(Refetch.(
    request(`POST)
      |> Request.header(`ContentType("application/x-www-form-urlencoded; charset=UTF-8"))
      |> Request.body(`String("title=foobar&body=bar&userId=1"))
    |> fetch("https://httpbin.org/post")
      |> then_(
         fun | Js.Result.Ok(response) => Response.text(response)
             | _ => "oops!" |> resolve)
      |> then_((text) => Js.log(text) |> resolve)
    |> ignore
  ));

get();