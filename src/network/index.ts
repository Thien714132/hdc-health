/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import { AccessTokenInterceptor, LogInterceptor } from './Interceptors';
import pkg from '../../package.json';

const { version } = pkg;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getInstance = () => {
  console.log('BASE_URL', BASE_URL);
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'web',
      'X-Source': 'web',
      'X-Version': version,
    },
  });

  const createResponseErrorHandler = (axiosInstance: any) => {
    return async (error: any) =>
      LogInterceptor.responseError(error, axiosInstance);
  };

  instance.interceptors.request.use(
    AccessTokenInterceptor.useAddAccessToken,
    AccessTokenInterceptor.onRejected,
  );
  instance.interceptors.request.use(
    LogInterceptor.requestLog,
    LogInterceptor.requestError,
  );
  instance.interceptors.response.use(
    LogInterceptor.responseLog,
    createResponseErrorHandler(instance),
  );
  return instance;
};
const networkInstance = { instance: getInstance() };

const post = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig,
) => {
  return networkInstance.instance.post(urlApi, params, config);
};
const patch = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig,
) => {
  return networkInstance.instance.patch(urlApi, params, config);
};
const postFormData = async (urlApi: string, params: any, config?: any) => {
  return networkInstance.instance.post(urlApi, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  });
};
const deleteMethod = async (urlApi: string, data: any = null) => {
  return networkInstance.instance.delete(urlApi, { data: data });
};

const get = async (
  urlApi: string,
  data: any = null,
  config?: AxiosRequestConfig,
) => {
  return networkInstance.instance.get(urlApi, { params: data, ...config });
};
const put = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig,
) => {
  return await networkInstance.instance.put(urlApi, params, config);
};

export const NetWork = {
  get,
  post,
  postFormData,
  patch,
  deleteMethod,
  put,
};
