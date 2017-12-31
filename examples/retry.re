open Resync;
open Refetch;

[%%raw {|require('isomorphic-fetch')|}];

let rec retryGet = 
  fun | 0 => Future.from("rety failed")
      | n => get("https://httpbin.org/status/400")
               |> Future.flatMap(
                  fun | Response.Ok(_, _) =>
                        Future.from("Wat!? It worked?")

                      | Response.Error(_, _) => {
                        Js.log("Uh, oh, an error occurred. Retrying...");
                        retryGet(n - 1)
                      });

retryGet(3) |> Future.whenResolved(Js.log);