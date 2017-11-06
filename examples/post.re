[%%raw {|require('isomorphic-fetch')|}];
let get = () =>
  Resync.(Refetch.(
    request(`POST)
      |> Request.header(`ContentType("application/x-www-form-urlencoded; charset=UTF-8"))
      |> Request.body(`String("title=foobar&body=bar&userId=1"))
    |> fetch("https://httpbin.org/post")
      |> Future.flatMap(
         fun | Js.Result.Ok(response) => Response.text(response)
             | _ => "oops!" |> Future.from)
      |> Future.whenResolved((text) => Js.log(text))
  ));

get();