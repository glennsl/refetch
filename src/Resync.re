open! Rebase;

module Promise = {
  type result('a) = Js.Result.t('a, exn);
  type t('a) = {
    mutable value: option(result('a)),
    mutable callbacks: list(result('a) => unit)
  };

  let _dispatch = (f, value) =>
    f(value);

  let _complete = (promise, value) => {
    promise.value = Some(value);
    promise.callbacks |> List.forEach((f) => _dispatch(f, value));
  };

  let make = () => {
    value: None,
    callbacks: []
  };

  let from = (value) => {
    value: Some(Ok(value)),
    callbacks: []
  };

  let resolve = (promise, value) =>
    _complete(promise, Ok(value));

  let reject = (promise, exn) =>
    _complete(promise, Error(exn));


  let whenCompleted = (f, future) => {
    future.callbacks = [f, ...future.callbacks];
    Option.forEach(_dispatch(f), future.value);
  };

  let whenResolved = (f, future) =>
    future |> whenCompleted(
              fun | Ok(value) => f(value)
                  | _ => ());

  let map = (f, future) => {
    let promise = make();

    future |> whenCompleted(fun | Ok(value)  => resolve(promise, f(value))
                                | Error(exn) => reject(promise, exn));

    promise
  };

  let flatMap = (f, future) => {
    let promise = make();

    future |> whenCompleted(fun | Ok(value)  =>
                                  f(value) |> whenCompleted(
                                              fun | Ok(value)  => resolve(promise, value)
                                                  | Error(exn) => reject(promise, exn))
                                | Error(exn) =>
                                  reject(promise, exn));

    promise
  };

  external toExn : Js.Promise.error => exn = "%identity";
  let fromJSPromise = (jsPromise) => {
    let promise = make();

    jsPromise |> Js.Promise.then_((v) => resolve(promise, v) |> Js.Promise.resolve)
              |> Js.Promise.catch((e) => reject(promise, toExn(e)) |> Js.Promise.resolve)
              |> ignore;

    promise
  };
};

module Future = {
  include Promise;
};