[%%raw {|require('isomorphic-fetch')|}];

Resync.(Refetch.(
  get("http://httpbin.org/get")
  |> Future.flatMap(
     fun | Js.Result.Ok(response) => Response.text(response)
         | _ => "oops!" |> Future.from)
  |> Future.whenResolved((text) => Js.log(text))
));