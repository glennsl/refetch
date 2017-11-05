[%%raw {|require('isomorphic-fetch')|}];
open Jest;

Nock.disableNetConnect();

describe("get", () => {
  open Expect;

  let scope = Nock.scope("http://example.com");

  afterAll(() => Nock.restore(scope));

  testAsync("get", (done_) => {
    let _: Nock.scope = scope |> Nock.post("/") |> Nock.reply(200, { "foo": 42 });

    Js.Promise.(Refetch.(
      post("http://example.com", `String("test"))
      |> then_((_) => done_(expect(Nock.isDone(scope)) |> toBe(true)) |> resolve)
      |> ignore
    ));
  })
});