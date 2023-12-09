import httpService from "../http.service";
const uploadEndpoint = "/upload/avatar";

const avatarUploadService = {
  get: async (userId) => {
    const { data } = await httpService.get(uploadEndpoint + "/" + userId, {
      responseType: "arraybuffer",
    });

    return data;
  },
  update: async (payload) => {
    const { userId } = payload;
    const { data } = await httpService.post(
      uploadEndpoint + "/update/" + userId,
      payload
    );

    return data;
  },
};
export default avatarUploadService;
