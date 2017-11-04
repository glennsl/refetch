open! Rebase;

module Body = {
  type t = Fetch.BodyInit.t;

  external fromString : string => t = "%identity";
  external fromJson : Js.Json.t => t = "%identity";
  external fromJsObj : Js.t({..}) => t = "%identity";
};

module Headers = {
  type t =
    | ContentType(string)
    | Custom(string, string);

  let _encode = (headers) =>
    headers |> List.map(
              fun | ContentType(value) => ("Content-Type", value)
                  | Custom(name, value) => (name, value))
            |> Js.Dict.fromList
            |> Obj.magic
            |> Fetch.HeadersInit.make;
};

let _encodeMethod =
  Fetch.(
    fun | `GET => Get
        | `HEAD => Head
        | `POST => Post
        | `PUT => Put
        | `DELETE => Delete
        | `CONNECT => Connect
        | `OPTIONS => Options
        | `TRACE => Trace
        | `PATCH => Patch
        | `Other(string) => Other(string)
  );

let _request = (~method, ~body, ~headers) =>
  Fetch.RequestInit.make(
    ~method_=?Option.map(_encodeMethod, method),
    ~body=?body,
    ~headers=?Option.map(Headers._encode, headers),
  ());

let request = (~method=?, ~body=?, ~headers=?, url) =>
  Fetch.fetchWithInit(url, _request(~method, ~body, ~headers));

let get = (~headers=?, url) =>
  request(~method=`GET, ~headers?, url);

let post = (~headers=?, url, body) =>
  request(~method=`POST, ~headers?, ~body, url);