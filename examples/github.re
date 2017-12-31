open Rebase;
open Resync;
module Utils = Refetch__Utils;

[%%raw {|require('isomorphic-fetch')|}];

exception FetchError(string);

type repo = {
  name: string,
  description: option(string),
  stars: int,
  forks: int,
  openIssues: int
};

module Decode = {
  open Json.Decode;

  let repo = (json) => {
    name: json |> field("name", string),
    description: json |> field("description", optional(string)),
    stars: json |> field("stargazers_count", int),
    forks: json |> field("forks_count", int),
    openIssues: json |> field("open_issues_count", int),
  };

  let repos = (json) =>
    json  |> list(repo);
};

let columnify = (rows) => {
  let maxLengths =
    rows |> List.map((columns) => columns |> List.map(String.length))
         |> Utils.List.reduceOr([], (maxs, lengths) =>
            lengths |> List.zip(maxs) 
                    |> List.map(((a, b)) => Js.Math.max_int(a, b)));

  rows |> List.map((columns) =>
          columns |> List.zip(maxLengths)
                  |> List.map(((s, l)) => String.padEnd(l, " ", s))
                  |> List.reduce((s, c) => s ++ " " ++ c, ""))
};

let getRepos = () =>
  Refetch.(
    get("https://api.github.com/users/reasonml-community/repos")
    |> Future.flatMap(
       fun | Response.Ok(_, response) =>
             Response.json(response)

           | Response.Error({ reason }, _) =>
             raise(FetchError(reason)))

    |> Future.map(Decode.repos)
  );

let printRepos = (repos) => {
  let headers =
    repos |> List.map((repo) => [
               repo.name,
               Option.getOr("N/A", repo.description)
             ])
          |> columnify;
  
  let stats = 
    repos |> List.map((repo) => [
               string_of_int(repo.stars), "stars   ",
               string_of_int(repo.forks), "forks   ",
               string_of_int(repo.openIssues), "open issues"
             ])
          |> columnify;

  List.zip(headers, stats)
    |> List.forEach(
       ((header, stats)) => {
         Js.log(header);
         Js.log(stats);
         Js.log("");
       });
};

let () =
  getRepos() |> Future.whenCompleted(
                fun | Ok(repos) =>
                      printRepos(repos)

                    | Error(exn) =>
                      Js.log({j|An error occurred: $exn|j}))