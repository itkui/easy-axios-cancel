# easy-axios-cancel

umi-request 取消请求第三方库, 你可以很方便的中断 umi-request 请求

[中文文档](https://github.com/itkui/easy-axios-cancel/blob/master/README.md)|[英文文档](https://github.com/itkui/easy-axios-cancel/blob/master/en.README.md)

[![NPM version](https://img.shields.io/badge/npm-v0.9.1-blue?style=flat)](https://www.npmjs.com/package/easy-axios-cancel)

## 安装

```shell
yarn add easy-axios-cancel
npm install --save easy-axios-cancel
```

## 扩展属性

| 属性                                                                | 描述                                               | 类型             | 可选值                           | 默认值                 |
| ------------------------------------------------------------------- | -------------------------------------------------- | ---------------- | -------------------------------- | ---------------------- |
| cancelKey                                                           | 中断请求唯一 ID, 最高优先级                        | String           |                                  |                        |
| urlUnique                                                           | 使用 URL 进行比较                                  | String \| Regexp | 'host'、'path'、'search'、RegExp |                        |
| [urlBase](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL) | URL 构造函数的第二个参数                           | DOMString        |                                  | window.location.origin |
| urlUniqueList                                                       | 匹配地址集合，可以和`urlUnique`共同使用            | Array            |                                  |                        |
| cancelHandleType                                                    | 设置使用`abortController`或者`cancelToken`中断请求 | String           | 'cancelToken'、'abortController' | 'cancelToken'          |

## 参数详情

### urlUnique

- -- host [string]

  使用请求地址的 host 进行比较，如果两个请求匹配内容相同，则会中断上一个请求

- -- path [string]

  使用请求地址的 host 与 pathname 进行比较，如果两个请求匹配内容相同，则会中断上一个请求

- -- search [string]

  使用请求地址的 host 与 pathname 与 search 进行比较，如果两个请求匹配内容相同，则会中断上一个请求

- -- RegExp [RegExp]

  使用正则表达式对两个请求的 href 进行比较，如果两个请求匹配内容相同，则会中断上一个请求

## 案例

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

## 感谢

[axios](#https://github.com/axios/axios)
