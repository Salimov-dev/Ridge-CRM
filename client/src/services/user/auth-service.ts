import axios from "axios";
import localStorageService from "./local.storage-service";
import config from "@config/config.json";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  params: {},
});

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
