import axios from "axios";
import localStorageService from "./local.storage-service";
import config from "../../config.json";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  params: {},
});

httpAuth.interceptors.request.use(async (config) => {
  const token = localStorageService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
  isRefreshing = false;
}

function addSubscriber(callback) {
  refreshSubscribers.push(callback);
}

httpAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token and the original request hasn't been retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If token refresh is not already in progress, initiate it
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken(),
          });

          // Update the tokens in local storage
          localStorageService.setTokens(data);

          // Notify all subscribers with the new token
          onRefreshed(data.access_token);

          // Retry the original request with the new token
          return httpAuth(originalRequest);
        } catch (refreshError) {
          // If token refresh fails, clear local storage and redirect to the main page
          console.error('Token Refresh Error:', refreshError);
          localStorageService.removeAuthData();
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      } else {
        // If token refresh is already in progress, add the original request to subscribers
        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(httpAuth(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

const authService = {
  register: async (payload) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
