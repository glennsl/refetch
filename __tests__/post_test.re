[%%raw {|require('isomorphic-fetch')|}];
open Jest;

Nock.disableNetConnect();

describe("get", () => {
  open Expect;

  let scope = Nock.scope("http://example.com");

  afterAll(() => Nock.restore(scope));

  testAsync("get", finish => {
    let _: Nock.scope = scope |> Nock.post("/") |> Nock.reply(200, { "foo": 42 });

    Resync.(Refetch.(
      post("http://example.com", `String("test"))
      |> Future.whenResolved(_r => finish(expect(Nock.isDone(scope)) |> toBe(true)))
    ));
  })
});