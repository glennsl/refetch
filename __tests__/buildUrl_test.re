open Jest;

describe("_buildUrl", () => {
  open Expect;

  test("builds a url with query parameters", () => {
    let params = [("q", "abc")];
    let urlWithParams = Refetch__Request._buildUrl("www.google.com", params);

    expect(urlWithParams) |> toBe("www.google.com?q=abc");
  });

  test("builds a url without query parameters", () => {
    let urlWithoutParams = Refetch__Request._buildUrl("www.google.com", []);

    expect(urlWithoutParams) |> toBe("www.google.com");
  });
});
