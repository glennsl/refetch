let btoa: string => string = [%raw {|
  function () {
    if (btoa) return btoa;

    var Buffer = Buffer || require('buffer').Buffer;
    return function (str) {
      return new Buffer(str).toString('base64');
    }
  }()
|}];