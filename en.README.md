# easy-axios-cancel

umi-request cancel lib, you can easy cancel your request.

[Chinese documents](https://github.com/itkui/easy-axios-cancel/blob/master/README.md)|[English documents](https://github.com/itkui/easy-axios-cancel/blob/master/en.README.md)

[![NPM version](https://img.shields.io/badge/npm-v1.1.6-blue?style=flat)](https://www.npmjs.com/package/easy-axios-cancel)

## Installation

```shell
yarn add easy-axios-cancel
npm install --save easy-axios-cancel
```

## ExtraOptions

| Parameter                                                           | Description                                              | Type             | Optional Value                   | Default Value          |
| ------------------------------------------------------------------- | -------------------------------------------------------- | ---------------- | -------------------------------- | ---------------------- |
| cancelKey                                                           | cancel request unique ID, top level                      | String           |                                  |                        |
| urlUnique                                                           | cancel request compare with URL                          | String \| Regexp | 'host'、'path'、'search'、RegExp |                        |
| [urlBase](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL) | URL constructor params                                   | DOMString        |                                  | window.location.origin |
| urlUniqueList                                                       | list to match, it can be use with urlUnique to match url | Array            |                                  |                        |
| cancelHandleType                                                    | break by `abortController` or `cancelToken`              | String           | 'cancelToken'、'abortController' | 'cancelToken'          |

## OptionDetail

### urlUnique

- -- host [string]

  compare with host, If it is the same, cancel the previous request.

- -- path [string]

  compare with host and pathname, If it is the same, cancel the previous request.

- -- search [string]

  compare with host and pathname and search, If it is the same, cancel the previous request.

- -- RegExp [RegExp]

  compare href address with `regexp`, If it is test true, cancel the previous request.

## Example

```javascript
import registryCancelMiddleware from "easy-axios-cancel";
import axios from "axios";

const req = axios.create({
  cancelHandleType: "abortController", // 默认使用'cancelToken'，可以选择使用abortController
});

// 注册取消扩展
registryCancelMiddleware(req);

/* cancelKey */
request.get("/api/v1/xxx?id=1", {
  cancelKey: "cancelKey1", // 第一优先级
});
```

## Thanks

[axios](#https://github.com/axios/axios)
