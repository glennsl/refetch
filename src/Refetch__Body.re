type t = Fetch.BodyInit.t;

external fromString : string => t = "%identity";
external fromJson : Js.Json.t => t = "%identity";
external fromJsObj : Js.t({..}) => t = "%identity";