(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
    typeof define === 'function' && define.amd ? define(['axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EasyAxiosCancel = factory(global.axios));
})(this, (function (axios) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

    const abortMaps = new Map();
    const setController = (cancelKey) => {
        let controller;
        if (!abortMaps.has(cancelKey)) {
            controller = new AbortController();
            abortMaps.set(cancelKey, controller);
        }
        else {
            controller = abortMaps.get(cancelKey);
            const { abort } = controller;
            abort.call(controller);
            controller = new AbortController();
            abortMaps.set(cancelKey, controller);
        }
        return controller;
    };
    const signalMerge = (options, cancelKey) => {
        // 如果有传递abort key的参数，则默认相同标识的请求同时发生会自动中断上一次请求。
        const { signal } = setController(cancelKey);
        options.signal = signal;
        delete options.cancelKey;
        return () => abortMaps.delete(cancelKey);
    };

    const cancelSourceMaps = new Map();
    const createSource = axios__default["default"].CancelToken.source;
    const setSource = (cancelKey) => {
        let source;
        if (!cancelSourceMaps.has(cancelKey)) {
            source = createSource();
            cancelSourceMaps.set(cancelKey, source);
        }
        else {
            source = cancelSourceMaps.get(cancelKey);
            const { cancel } = source;
            cancel.call(source);
            source = createSource();
            cancelSourceMaps.set(cancelKey, source);
        }
        return source;
    };
    const cancelTokenMerge = (options, cancelKey) => {
        const { token } = setSource(cancelKey);
        options.cancelToken = token;
        return () => cancelSourceMaps.delete(cancelKey);
    };

    const formatUrl = (url, base) => {
        try {
            return new URL(url, base || (window && window.location ? window.location.origin : '/'));
        }
        catch (error) {
            throw new TypeError('request url is invalid, or you can add prop like: { urlBase: \'http://localhost:8080\' }');
        }
    };
    const praseUrlUnique = (options) => {
        const { urlUnique = '', url, urlBase } = options;
        const { host, pathname = '', search = '', href } = formatUrl(url, urlBase);
        if (urlUnique instanceof RegExp) {
            return urlUnique.test(href) ? urlUnique.toString() : void 0;
        }
        switch (urlUnique) {
            case '':
                return href;
            case 'host':
                return host;
            case 'path':
                return host + pathname;
            case 'search':
                return host + pathname + search;
            default:
                throw new RangeError(`urlUnique is invalid: ${urlUnique}`);
        }
    };
    const urlUniqueListCancelKey = (options) => {
        const { urlUniqueList = [] } = options;
        const requestCancelKeyFor = praseUrlUnique(options);
        for (const _url of urlUniqueList) {
            const itemCancelKeyFor = praseUrlUnique({ ...options, url: _url });
            if (requestCancelKeyFor === itemCancelKeyFor) {
                return symbolCancelKey(_url);
            }
        }
    };
    const urlUniqueCancelKey = (options) => {
        const cancelKeyFor = praseUrlUnique(options);
        if (cancelKeyFor) {
            return symbolCancelKey(cancelKeyFor);
        }
    };
    const symbolCancelKey = (cancelKey) => {
        return Symbol.for(cancelKey);
    };

    const errorMerge = (options, handle) => {
        if (!options.transformResponse) {
            options.transformResponse = [];
        }
        if (!Array.isArray(options.transformResponse)) {
            options.transformResponse = [options.transformResponse];
        }
        options.transformResponse.push(handle);
    };
    const cancelKeyCheck = (options) => {
        const { cancelKey, urlUnique, urlUniqueList } = options;
        if (cancelKey) {
            return symbolCancelKey(cancelKey);
        }
        if (urlUniqueList) {
            return urlUniqueListCancelKey(options);
        }
        if (urlUnique) {
            return urlUniqueCancelKey(options);
        }
    };
    const cancelProvide = (options, cancelKey) => {
        switch (options.cancelHandleType) {
            case "abortController":
                return signalMerge(options, cancelKey);
            case "cancelToken":
            default:
                return cancelTokenMerge(options, cancelKey);
        }
    };

    const registryCancelOption = (axios) => {
        axios.interceptors.request.use((req) => {
            const cancelKeySymbol = cancelKeyCheck(req);
            if (cancelKeySymbol) {
                const removeCancel = cancelProvide(req, cancelKeySymbol);
                errorMerge(req, removeCancel);
            }
            return req;
        });
    };

    return registryCancelOption;

}));
