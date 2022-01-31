import { AxiosRequestConfig } from "axios";
import { setController, signalMerge } from './abort'
import { symbolCancelKey, urlUniqueCancelKey, urlUniqueListCancelKey } from "./cancelKey";

export const errorMerge = (options: AxiosRequestConfig, handle: (error) => void) => {
  // const _errorHandler = options.validateStatus;

  // options.validateStatus = (error) => {
  //   handle(error)
  //   if (_errorHandler) {
  //     _errorHandler(error);
  //   } else {
  //     throw error;
  //   }
  // };
}

export const cancelKeyCheck = (options: AxiosRequestConfig) => {
  const { cancelKey, urlUnique, urlUniqueList, url } = options

  if (cancelKey) {
    return symbolCancelKey(cancelKey)
  }

  if (urlUniqueList) {
    return urlUniqueListCancelKey(options)
  }

  if (urlUnique) {
    return urlUniqueCancelKey(options)
  }
}

export const cancelProvide = (options: AxiosRequestConfig, cancelKey: Symbol) => {
  switch (options.CancelHandleType) {
    case "abortController":
      return signalMerge(options, cancelKey)

    case "cancelToken":

    default:
      return
  }
}