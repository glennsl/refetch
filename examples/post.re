[%%raw {|require('isomorphic-fetch')|}];

/* builder functions */
Resync.(Refetch.(
  request(`POST, "https://httpbin.org/post")
    |> Request.header(`ContentType("application/x-www-form-urlencoded; charset=UTF-8"))
    |> Request.payload(`String("title=foobar&body=bar&userId=1"))

  |> fetch
    |> Future.flatMap(
        fun | Response.Ok(_, response)      => Response.text(response)
            | Response.Error({ reason }, _) => Future.from(reason))

    |> Future.whenResolved(Js.log)
));

/* labeled arguments */
Resync.(Refetch.(
  request(`POST, "https://httpbin.org/post",
    ~headers=[`ContentType("application/x-www-form-urlencoded; charset=UTF-8")],
    ~body=`String("title=foobar&body=bar&userId=1"))

  |> fetch
    |> Future.flatMap(
        fun | Response.Ok(_, response)      => Response.text(response)
            | Response.Error({ reason }, _) => Future.from(reason))

    |> Future.whenResolved(Js.log)
));