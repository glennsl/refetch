[%%raw {|require('isomorphic-fetch')|}];

Js.Promise.(Refetch.(
  get("http://httpbin.org/get")
  |> then_(
     fun | Js.Result.Ok(response) => Response.text(response)
         | _ => "oops!" |> resolve)
  |> then_((text) => Js.log(text) |> resolve)
  |> ignore
));