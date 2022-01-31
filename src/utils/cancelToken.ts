import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";

export const cancelSourceMaps = new Map<Symbol, CancelTokenSource>();

const createSource = axios.CancelToken.source

export const setSource = (cancelKey: Symbol) => {
  let source: CancelTokenSource;
  if (!cancelSourceMaps.has(cancelKey)) {
    source = createSource();
    cancelSourceMaps.set(cancelKey, source);
  } else {
    source = cancelSourceMaps.get(cancelKey)!;
    const { cancel } = source;
    cancel.call(source);
    source = createSource();
    cancelSourceMaps.set(cancelKey, source);
  }

  return source
}

export const cancelTokenMerge = (options: AxiosRequestConfig, cancelKey: Symbol) => {
  const { token } = setSource(cancelKey)

  options.cancelToken = token;

  return cancelKey
}
