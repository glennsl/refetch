type scope
type interceptor

external scope : string -> scope = "nock" [@@bs.module]
external disableNetConnect : unit -> unit = "" [@@bs.module "nock"]

external get : string -> interceptor = "" [@@bs.send.pipe: scope]
external post : string -> interceptor = "" [@@bs.send.pipe: scope]
external restore : unit = "" [@@bs.send.pipe: scope]
external isDone : bool = "" [@@bs.send.pipe: scope]

external reply : int -> < .. > Js.t -> scope = "" [@@bs.send.pipe: interceptor]