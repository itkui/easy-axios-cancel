import { AxiosRequestConfig } from "axios";

export const abortMaps = new Map<Symbol, AbortController>();

export const setController = (cancelKey: Symbol) => {
  let controller: AbortController;
  if (!abortMaps.has(cancelKey)) {
    controller = new AbortController();
    abortMaps.set(cancelKey, controller);
  } else {
    controller = abortMaps.get(cancelKey)!;
    const { abort } = controller;
    abort.call(controller);
    controller = new AbortController();
    abortMaps.set(cancelKey, controller);
  }

  return controller
}

export const signalMerge = (options: AxiosRequestConfig, cancelKey: Symbol) => {
  // 如果有传递abort key的参数，则默认相同标识的请求同时发生会自动中断上一次请求。

  const { signal } = setController(cancelKey)

  options.signal = signal;
  delete options.cancelKey;

  return cancelKey
}