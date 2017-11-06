[%%raw {|require('isomorphic-fetch')|}];
/* given an array of repositories object as a JSON string */
/* returns an array of names */
let names = (text) =>
  text |> Js.Json.parseExn
       |> Json.Decode.(array(field("name", string)));

/* fetch all public repositories of user [reasonml-community] */
/* print their names to the console */
let printGithubRepos = () =>
  Resync.(Refetch.(
    get("https://api.github.com/users/reasonml-community/repos")
    |> Future.flatMap(
       fun | Js.Result.Ok(response) => Response.text(response)
           | _ => Future.from("oops!"))
    |> Future.whenResolved((text) =>
       text |> names
            |> Array.iter(Js.log))
  ));

let () =
  printGithubRepos();