/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import pkg from "../../package.json";
import { LogInterceptor } from "./Interceptors";

const { version } = pkg;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const getInstance = () => {
  console.log("BASE_URL", BASE_URL);
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      "X-Platform": "web",
      "X-Source": "web",
      "X-Version": version,
    },
  });

  const createResponseErrorHandler = (axiosInstance: any) => {
    return async (error: any) =>
      LogInterceptor.responseError(error, axiosInstance);
  };

  // instance.interceptors.request.use(
  //   AccessTokenInterceptor.useAddAccessToken,
  //   AccessTokenInterceptor.onRejected,
  // );
  instance.interceptors.request.use(
    LogInterceptor.requestLog,
    LogInterceptor.requestError
  );
  instance.interceptors.response.use(
    LogInterceptor.responseLog,
    createResponseErrorHandler(instance)
  );
  return instance;
};
const networkInstance = { instance: getInstance() };

const post = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig
) => {
  return networkInstance.instance.post(urlApi, params, config);
};
const patch = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig
) => {
  return networkInstance.instance.patch(urlApi, params, config);
};
const postFormData = async (urlApi: string, params: any, config?: any) => {
  return networkInstance.instance.post(urlApi, params, {
    headers: {
      "Content-Type": "multipart/form-data",
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
  config?: AxiosRequestConfig
) => {
  return networkInstance.instance.get(urlApi, { params: data, ...config });
};
const put = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig
) => {
  return await networkInstance.instance.put(urlApi, params, config);
};

const downloadFile = async (
  urlApi: string,
  params: any = null,
  config?: AxiosRequestConfig
) => {
  // Create a separate axios instance specifically for file downloads
  const downloadInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000, // Longer timeout for downloads
    responseType: "blob",
    headers: {
      "X-Platform": "web",
      "X-Source": "web",
      "X-Version": version,
    },
  });

  try {
    const response = await downloadInstance.get(urlApi, {
      params,
      ...config,
    });

    // Extract filename from Content-Disposition header or use a default
    const contentDisposition = response.headers["content-disposition"];
    let filename = "downloaded_file";

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(
        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      );
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, "");
      }
    }

    // Create a download link and trigger it
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    return response;
  } catch (error) {
    console.error("File download failed:", error);
    throw error;
  }
};

export const NetWork = {
  get,
  post,
  postFormData,
  patch,
  deleteMethod,
  put,
  downloadFile,
};
