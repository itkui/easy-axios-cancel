import { AxiosRequestConfig } from "axios";
import { signalMerge } from './abort'
import { cancelTokenMerge } from './cancelToken'
import { symbolCancelKey, urlUniqueCancelKey, urlUniqueListCancelKey } from "./cancelKey";

export const errorMerge = (options: AxiosRequestConfig, handle: (data: string) => string) => {
  if (!options.transformResponse) {
    options.transformResponse = []
  }
  if (!Array.isArray(options.transformResponse)) {
    options.transformResponse = [options.transformResponse]
  }
  options.transformResponse.push(handle)
}

export const cancelKeyCheck = (options: AxiosRequestConfig) => {
  const { cancelKey, urlUnique, urlUniqueList } = options

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
  switch (options.cancelHandleType) {
    case "abortController":
      return signalMerge(options, cancelKey)

    case "cancelToken":

    default:
      return cancelTokenMerge(options, cancelKey)
  }
}