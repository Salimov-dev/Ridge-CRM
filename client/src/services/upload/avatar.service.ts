import httpService from "../http.service";
const avatarEndpoint = "/avatar";

const avatarService = {
  get: async (userId) => {
    const { data } = await httpService.get(avatarEndpoint + "/" + userId, {
      responseType: "arraybuffer",
    });

    return data;
  },
  update: async (payload) => {
    const { userId } = payload;
    const { data } = await httpService.post(
      avatarEndpoint + "/update/" + userId,
      payload
    );

    return data;
  },
  remove: async (taskId) => {
    const { data } = await httpService.delete(avatarEndpoint + "/" + taskId);
    return data;
  },
};
export default avatarService;
