import { Axios } from "axios";

export type UrlUnique = 'host' | 'path' | 'search' | RegExp

export type CancelHandleType = "cancelToken" | "abortController"

export interface CancelOptions {
  cancelKey?: string;
  urlUnique?: UrlUnique;
  urlBase?: string;
  CancelHandleType?: CancelHandleType;
  urlUniqueList?: string[];
}

export type RegistryCancelOption = (axios: {
  interceptors: Axios["interceptors"],
  [k: string]: any;
}) => void;

declare var registryCancelOption: RegistryCancelOption

export default registryCancelOption;

declare module "axios" {
  interface AxiosRequestConfig extends CancelOptions { }
}