/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import pkg from "../../package.json";
import { RESPONSE_CODE } from "./config";

const { version } = pkg;

export const controller = new AbortController();

export const AccessTokenInterceptor = {
  useAddAccessToken: async (config: any) => {
    config.headers = {
      ...config.headers,
    };
    config.signal = controller.signal;

    return config;
  },
  onRejected: (error: any) => {
    return Promise.reject(error);
  },
};

export const LogInterceptor = {
  responseError: async (error: any, axiosInstance: any) => {
    const { config, response } = error;

    // if (
    //   (response?.status === RESPONSE_CODE.UNAUTHORIZED ||
    //     response?.data?.errorCode === "jwt_token_expired") &&
    //   !config._retry
    // ) {
    //   config._retry = true;

    //   if (!refreshTokenPromise) {
    //     // Start refresh token process if not already in progress
    //     refreshTokenPromise = AuthServices.refreshToken()
    //       .then((responseToken) => {
    //         if (responseToken?.token) {
    //           axios.defaults.headers.common.Authorization = `Bearer ${responseToken.token}`;
    //           return responseToken.token;
    //         } else {
    //           // throw new Error('Refresh token failed');
    //         }
    //       })
    //       .catch(() => {
    //         deleteKey(STORAGE_KEY.ACCESS_TOKEN);
    //         deleteKey(STORAGE_KEY.REFRESH_TOKEN);
    //         toast.error("Session expired. Please log in again.", {
    //           position: "top-right",
    //         });
    //         Router.replace("/");
    //         return null;
    //       })
    //       .finally(() => {
    //         refreshTokenPromise = null; // Reset promise after resolving
    //       });
    //   }

    //   try {
    //     const newToken = await refreshTokenPromise;
    //     if (newToken) {
    //       config.headers.Authorization = `Bearer ${newToken}`;
    //       return axiosInstance(config); // Retry failed request
    //     }
    //   } catch (err) {
    //     return Promise.reject(response);
    //   }
    // }

    // Handle other errors
    if (response?.status === RESPONSE_CODE.FORCE_UPDATE_APP) {
      toast.error("A new version is available. Please update the app.", {
        position: "top-right",
      });
      Router.replace("/");
      controller.abort();
    }

    if (response?.status === RESPONSE_CODE.SERVER_ERROR) {
      toast.error("Server error. Please try again later.", {
        position: "top-right",
      });
      controller.abort();
    }

    if (response) {
      // toast.error(`Request failed: ${response?.status}`, {
      //   position: "top-right",
      // });
      console.log(
        `<<< ${config?.method}: ${config?.url} status:${response?.status}`
      );
      console.log("responseError: ", response?.data);
      // return Promise.reject(response);
      return response;
    } else {
      // toast.error("Network error. Please check your connection.", {
      //   position: "top-right",
      // });
      console.log(`<<< ${config?.method}: ${config?.url} `);
      console.log("network log error", error);
      // return Promise.reject({
      //   status: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      //   error: 'Something went wrong!',
      // });
      return response;
    }
  },
  requestLog: async (config: any) => {
    // Log request details if needed
    return config;
  },
  requestError: async (error: any) => {
    // Handle request errors if needed
    return Promise.reject(error);
  },
  responseLog: async (response: any) => {
    // Log response details if needed
    return response;
  },
};

// Attach interceptors to Axios instance
const axiosInstance = axios.create();
// axiosInstance.interceptors.request.use(
//   AccessTokenInterceptor.useAddAccessToken,
//   AccessTokenInterceptor.onRejected
// );
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => LogInterceptor.responseError(error, axiosInstance)
);

export default axiosInstance;
