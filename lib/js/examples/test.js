'use strict';

var Resync            = require("../src/Resync.js");
var Refetch           = require("../src/Refetch.js");
var Refetch__Request  = require("../src/Refetch__Request.js");
var Refetch__Response = require("../src/Refetch__Response.js");

require('isomorphic-fetch')
;


  const debugHttp = require('debug-http');
  debugHttp();

;

Resync.Future[/* whenResolved */7]((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Resync.Future[/* flatMap */9]((function (param) {
            if (param.tag) {
              return Resync.Future[/* from */3](param[0][/* reason */1]);
            } else {
              return Refetch__Response.text(param[1]);
            }
          }), Refetch.fetch(Refetch__Request.payload(/* `Multipart */[
                  -1031569716,
                  /* tuple */[
                    "booboo",
                    /* :: */[
                      /* tuple */[
                        /* :: */[
                          /* `ContentType */[
                            246273139,
                            "plain/text"
                          ],
                          /* :: */[
                            /* `ContentDisposition */[
                              -378039458,
                              /* tuple */[
                                /* `Other */[
                                  -912009552,
                                  "form-data"
                                ],
                                /* :: */[
                                  /* `Other */[
                                    -912009552,
                                    /* tuple */[
                                      "name",
                                      "field1"
                                    ]
                                  ],
                                  /* :: */[
                                    /* `Filename */[
                                      -786699545,
                                      "myimage.png"
                                    ],
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ],
                            /* [] */0
                          ]
                        ],
                        /* `String */[
                          -976970511,
                          "foo"
                        ]
                      ],
                      /* :: */[
                        /* tuple */[
                          /* :: */[
                            /* `ContentType */[
                              246273139,
                              "application/json"
                            ],
                            /* :: */[
                              /* `ContentDisposition */[
                                -378039458,
                                /* tuple */[
                                  /* `Other */[
                                    -912009552,
                                    "form-data"
                                  ],
                                  /* :: */[
                                    /* `Other */[
                                      -912009552,
                                      /* tuple */[
                                        "name",
                                        "field1"
                                      ]
                                    ],
                                    /* [] */0
                                  ]
                                ]
                              ],
                              /* [] */0
                            ]
                          ],
                          /* `Json */[
                            826371656,
                            null
                          ]
                        ],
                        /* [] */0
                      ]
                    ]
                  ]
                ], Refetch.request(/* POST */891112544, /* None */0, /* None */0, /* None */0, "https://requestb.in/183okup1")))));

/*  Not a pure module */
