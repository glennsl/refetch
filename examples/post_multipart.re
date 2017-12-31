open Resync;
open Refetch;

[%%raw {|require('isomorphic-fetch')|}];

request(`POST, "http://httpbin.org/post")
  |> Request.payload(`Multipart("booboo", [
      ([
        `ContentType("plain/text"),
        `ContentDisposition(`Other("form-data"), [`Other("name", "field1"), `Filename("myimage.png")])
      ],
      `String("foo")),
      ([
        `ContentType("application/json"),
        `ContentDisposition(`Other("form-data"), [`Other("name", "field1")])
      ],
      `Json(Js.Json.null))
  ]))

|> fetch
  |> Future.flatMap(
      fun | Response.Ok(_, response)      => Response.text(response)
          | Response.Error({ reason }, _) => Future.from(reason))

  |> Future.whenResolved(Js.log);