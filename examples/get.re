[%%raw {|require('isomorphic-fetch')|}];

Resync.(Refetch.(
  get("http://httpbin.org/get")
  |> Future.flatMap(
     fun | Response.Ok(_, response) => Response.text(response)
         | _ => "oops!" |> Future.from)
  |> Future.whenResolved(Js.log)
));