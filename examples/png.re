/*
 * Retrieve a png file and print it to console
 * 
 * Run `npm install console-png stream-to-buffer` to install required dependencies
 */
open Resync;
open Refetch;
[%%raw {|require('isomorphic-fetch')|}];

[@bs.module] external stringifyPng : Node.buffer => ((exn, string) => unit) => unit = "console-png";
[@bs.module] external streamToBuffer : Fetch.readableStream => ((exn, Node.buffer) => unit) => unit = "stream-to-buffer";

get("http://httpbin.org/image/png")
|> Future.map(
    fun | Response.Ok(_, response) => {
          Response.body(response)
        }
        | Response.Error({ reason }, _) => failwith(reason))
|> Future.whenCompleted(
   fun | Ok(stream) =>
         streamToBuffer(stream, (_, buffer) =>
           stringifyPng(buffer, (_, string) => Js.log(string)))

       | Error(e) => Js.log(e)
);