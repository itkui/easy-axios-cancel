import { AxiosRequestConfig } from "axios"

const formatUrl = (url: string, base?: string) => {
  try {
    return new URL(url, base || (window && window.location ? window.location.origin : '/'))
  } catch (error) {
    throw new TypeError('request url is invalid, or you can add prop like: { urlBase: \'http://localhost:8080\' }')
  }
}

const praseUrlUnique = (options: AxiosRequestConfig) => {
  const { urlUnique = '', url, urlBase } = options
  const { host, pathname = '', search = '', href } = formatUrl(url, urlBase)
  if (urlUnique instanceof RegExp) {
    return urlUnique.test(href) ? urlUnique.toString() : void 0;
  }
  switch (urlUnique) {
    case '':
      return href;
    case 'host':
      return host
    case 'path':
      return host + pathname
    case 'search':
      return host + pathname + search
    default:
      throw new RangeError(`urlUnique is invalid: ${urlUnique}`)
  }
}

export const urlUniqueListCancelKey = (options: AxiosRequestConfig) => {
  const { urlUniqueList = [] } = options

  const requestCancelKeyFor = praseUrlUnique(options)

  for (const _url of urlUniqueList) {
    const itemCancelKeyFor = praseUrlUnique({ ...options, url: _url })
    if (requestCancelKeyFor === itemCancelKeyFor) {
      return symbolCancelKey(_url)
    }
  }
}

export const urlUniqueCancelKey = (options: AxiosRequestConfig) => {
  const cancelKeyFor = praseUrlUnique(options)

  if (cancelKeyFor) {
    return symbolCancelKey(cancelKeyFor);
  }
}

export const symbolCancelKey = (cancelKey: string) => {
  return Symbol.for(cancelKey)
}