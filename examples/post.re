[%%raw {|require('isomorphic-fetch')|}];

let get = () =>
  Js.Promise.(
  Refetch.(
    post("https://httpbin.org/post",
      ~headers=[Headers.ContentType("application/x-www-form-urlencoded; charset=UTF-8")],
      /*~body=Body.fromJsObj({ "userId": 4, "title": "foo" }))*/
      Body.fromString("title=foobar&body=bar&userId=1"))
    |> then_(Fetch.Response.text)
    |> then_((text) => Js.log(text) |> resolve)
    |> ignore
  ));

get();
