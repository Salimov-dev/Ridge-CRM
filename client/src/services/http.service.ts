import axios, { AxiosRequestHeaders } from "axios";
import { toast } from "react-toastify";
import configFile from "@config/config.json";
import authService from "./user/auth-service";
import localStorageService from "./user/local.storage-service";

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && Date.parse(expiresDate) < Date.now();

    if (isExpired) {
      const data = await authService.refresh();
      localStorageService.setTokens(data);
    }
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error("Somthing was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);

// http.interceptors.request.use(
//   async function (config) {
//     const expiresDate = parseInt(localStorageService.getTokenExpiresDate(), 10);
//     const refreshToken = localStorageService.getRefreshToken();
//     const isExpired = refreshToken && expiresDate < Date.now();

//     if (isExpired) {
//       try {
//         const data = await authService.refresh();
//         localStorageService.setTokens(data);
//       } catch (error) {
//         console.error('Token Refresh Error:', error);
//         handleUnauthorizedError();
//         throw error;
//       }
//     }

//     const accessToken = localStorageService.getAccessToken();
//     if (accessToken) {
//       config.headers = {
//         ...(config.headers as axios.AxiosHeaders),
//         Authorization: `Bearer ${accessToken}`,
//       };
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// http.interceptors.response.use(
//   (res) => {
//     res.data = { content: res.data };
//     return res;
//   },
//   function (error) {
//     const expectedErrors =
//       error.response &&
//       error.response.status >= 400 &&
//       error.response.status < 500;

//     if (!expectedErrors) {
//       console.error(error);
//     }

//     if (error.response && error.response.status === 401) {
//       handleUnauthorizedError();
//     }

//     return Promise.reject(error);
//   }
// );

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;
