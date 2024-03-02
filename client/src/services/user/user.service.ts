import httpService from "../http.service";
import localStorageService from "./local.storage-service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId() + "/update-user",
      payload
    );

    return data;
  },
  updateTeammate: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + payload._id + "/update-teammate",
      payload
    );

    return data;
  },
  updatePassword: async (payload) => {
    const { currentPassword, newPassword } = payload;
    const userId = localStorageService.getUserId();

    const requestData = {
      currentPassword,
      newPassword
    };

    const { data } = await httpService.patch(
      `${userEndpoint}${userId}/update-password`,
      requestData
    );

    return data;
  }
};
export default userService;
