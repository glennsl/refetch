open Rebase;

let btoa: string => string = [%raw {|
  function () {
    if (btoa) return btoa;

    var Buffer = Buffer || require('buffer').Buffer;
    return function (str) {
      return new Buffer(str).toString('base64');
    }
  }()
|}];

module List = {
  let reduceOr : ('b, ('b, 'a) => 'b, list('a)) => 'b = (default, f) =>
    fun | [] => default
        | [first, ...rest] => List.reduce(f, first, rest);
};