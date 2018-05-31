'use strict';

var Pervasives = require("bs-platform/lib/js/pervasives.js");

function codeToInt(param) {
  if (typeof param === "number") {
    if (param >= -214822874) {
      if (param >= 240875818) {
        if (param >= 611365435) {
          if (param >= 834799099) {
            if (param >= 923446495) {
              if (param >= 1047445569) {
                return 226;
              } else {
                return 502;
              }
            } else if (param >= 876444641) {
              return 506;
            } else {
              return 426;
            }
          } else if (param !== 765829369) {
            if (param >= 792903807) {
              return 410;
            } else {
              return 503;
            }
          } else {
            return 417;
          }
        } else if (param >= 484044636) {
          if (param >= 566851975) {
            if (param >= 571975273) {
              return 415;
            } else {
              return 202;
            }
          } else if (param >= 493432085) {
            return 412;
          } else {
            return 431;
          }
        } else if (param >= 324098644) {
          return 401;
        } else {
          return 423;
        }
      } else if (param >= 17692) {
        if (param >= 61697368) {
          if (param >= 230055709) {
            if (param >= 237675874) {
              return 418;
            } else {
              return 504;
            }
          } else if (param >= 95496968) {
            return 424;
          } else {
            return 507;
          }
        } else if (param >= 43187863) {
          return 429;
        } else {
          return 200;
        }
      } else if (param >= -113889576) {
        if (param >= -57405646) {
          if (param >= -36288910) {
            return 409;
          } else {
            return 408;
          }
        } else if (param >= -68461033) {
          return 416;
        } else {
          return 204;
        }
      } else if (param >= -201667380) {
        return 510;
      } else {
        return 508;
      }
    } else if (param >= -622680555) {
      if (param >= -457736521) {
        if (param >= -438114087) {
          if (param >= -365540310) {
            if (param >= -296251313) {
              return 404;
            } else {
              return 400;
            }
          } else if (param >= -418805899) {
            return 406;
          } else {
            return 403;
          }
        } else if (param >= -449270550) {
          return 203;
        } else {
          return 428;
        }
      } else if (param >= -555940656) {
        if (param >= -503105947) {
          if (param >= -493013592) {
            return 500;
          } else {
            return 402;
          }
        } else if (param >= -526477244) {
          return 414;
        } else {
          return 421;
        }
      } else if (param >= -558113336) {
        return 201;
      } else {
        return 413;
      }
    } else if (param >= -781201777) {
      if (param >= -748150966) {
        if (param >= -720432155) {
          if (param >= -696181141) {
            return 207;
          } else {
            return 407;
          }
        } else if (param >= -731098587) {
          return 511;
        } else {
          return 205;
        }
      } else if (param >= -771826261) {
        return 208;
      } else {
        return 501;
      }
    } else if (param >= -973855501) {
      if (param >= -879960241) {
        if (param >= -856874229) {
          return 505;
        } else {
          return 451;
        }
      } else if (param >= -905327483) {
        return 411;
      } else {
        return 422;
      }
    } else if (param >= -988253514) {
      return 405;
    } else {
      return 206;
    }
  } else {
    return param[1];
  }
}

function codeFromInt(param) {
  if (param >= 227) {
    var switcher = param - 400 | 0;
    if (switcher > 111 || switcher < 0) {
      return Pervasives.failwith("TODO: exception or option?");
    } else {
      switch (switcher) {
        case 0 : 
            return /* BadRequest */-365540310;
        case 1 : 
            return /* Unauthorized */324098644;
        case 2 : 
            return /* PaymentRequired */-503105947;
        case 3 : 
            return /* Forbidden */-438114087;
        case 4 : 
            return /* NotFound */-296251313;
        case 5 : 
            return /* MethodNotAllowed */-988253514;
        case 6 : 
            return /* NotAcceptable */-418805899;
        case 7 : 
            return /* ProxyAuthenticationRequired */-720432155;
        case 8 : 
            return /* RequestTimeout */-57405646;
        case 9 : 
            return /* Conflict */-36288910;
        case 10 : 
            return /* Gone */792903807;
        case 11 : 
            return /* LengthRequired */-905327483;
        case 12 : 
            return /* PreconditionFailed */493432085;
        case 13 : 
            return /* PayloadTooLarge */-622680555;
        case 14 : 
            return /* UriTooLong */-526477244;
        case 15 : 
            return /* UnsupportedMediaType */571975273;
        case 16 : 
            return /* RangeNotSatisfiable */-68461033;
        case 17 : 
            return /* ExpectationFailed */765829369;
        case 18 : 
            return /* ImATeapot */237675874;
        case 21 : 
            return /* MisdirectedRequest */-555940656;
        case 22 : 
            return /* UnprocessableEntity */-973855501;
        case 23 : 
            return /* Locked */240875818;
        case 24 : 
            return /* FailedDependency */95496968;
        case 26 : 
            return /* UpgradeRequired */834799099;
        case 28 : 
            return /* PreconditionRequired */-457736521;
        case 29 : 
            return /* TooManyRequests */43187863;
        case 31 : 
            return /* RequestHeaderFieldsTooLarge */484044636;
        case 51 : 
            return /* UnavailableForLegalReasons */-879960241;
        case 100 : 
            return /* InternalServerError */-493013592;
        case 101 : 
            return /* NotImplemented */-781201777;
        case 102 : 
            return /* BadGateway */923446495;
        case 103 : 
            return /* ServiceUnavailable */611365435;
        case 104 : 
            return /* GatewayTimeout */230055709;
        case 105 : 
            return /* HttpVersionNotSupported */-856874229;
        case 106 : 
            return /* VariantAlsoNegotiates */876444641;
        case 107 : 
            return /* InsufficientStorage */61697368;
        case 108 : 
            return /* LoopDetected */-214822874;
        case 19 : 
        case 20 : 
        case 25 : 
        case 27 : 
        case 30 : 
        case 32 : 
        case 33 : 
        case 34 : 
        case 35 : 
        case 36 : 
        case 37 : 
        case 38 : 
        case 39 : 
        case 40 : 
        case 41 : 
        case 42 : 
        case 43 : 
        case 44 : 
        case 45 : 
        case 46 : 
        case 47 : 
        case 48 : 
        case 49 : 
        case 50 : 
        case 52 : 
        case 53 : 
        case 54 : 
        case 55 : 
        case 56 : 
        case 57 : 
        case 58 : 
        case 59 : 
        case 60 : 
        case 61 : 
        case 62 : 
        case 63 : 
        case 64 : 
        case 65 : 
        case 66 : 
        case 67 : 
        case 68 : 
        case 69 : 
        case 70 : 
        case 71 : 
        case 72 : 
        case 73 : 
        case 74 : 
        case 75 : 
        case 76 : 
        case 77 : 
        case 78 : 
        case 79 : 
        case 80 : 
        case 81 : 
        case 82 : 
        case 83 : 
        case 84 : 
        case 85 : 
        case 86 : 
        case 87 : 
        case 88 : 
        case 89 : 
        case 90 : 
        case 91 : 
        case 92 : 
        case 93 : 
        case 94 : 
        case 95 : 
        case 96 : 
        case 97 : 
        case 98 : 
        case 99 : 
        case 109 : 
            return Pervasives.failwith("TODO: exception or option?");
        case 110 : 
            return /* NotExtended */-201667380;
        case 111 : 
            return /* NetworkAuthenticationRequired */-731098587;
        
      }
    }
  } else if (param >= 200) {
    switch (param - 200 | 0) {
      case 0 : 
          return /* OK */17692;
      case 1 : 
          return /* Created */-558113336;
      case 2 : 
          return /* Accepted */566851975;
      case 3 : 
          return /* NonAuthoritativeInformation */-449270550;
      case 4 : 
          return /* NoContent */-113889576;
      case 5 : 
          return /* ResetContent */-748150966;
      case 6 : 
          return /* PartialContent */-1003105320;
      case 7 : 
          return /* MultiStatus */-696181141;
      case 8 : 
          return /* AlreadyReported */-771826261;
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
      case 15 : 
      case 16 : 
      case 17 : 
      case 18 : 
      case 19 : 
      case 20 : 
      case 21 : 
      case 22 : 
      case 23 : 
      case 24 : 
      case 25 : 
          return Pervasives.failwith("TODO: exception or option?");
      case 26 : 
          return /* IMUsed */1047445569;
      
    }
  } else {
    return Pervasives.failwith("TODO: exception or option?");
  }
}

exports.codeToInt = codeToInt;
exports.codeFromInt = codeFromInt;
/* No side effect */
