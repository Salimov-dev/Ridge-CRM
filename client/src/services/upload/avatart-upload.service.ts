import httpService from "../http.service";
const uploadEndpoint = "/upload/avatar";

const avatarUploadService = {
  get: async (userId) => {
    const { data } = await httpService.get(uploadEndpoint + "/" + userId, {responseType: "arraybuffer"});

    return data;
  },
  post: async (payload) => {
    const { data } = await httpService.post(uploadEndpoint, payload);

    return data;
  },

  update: async (payload) => {
    console.log("payload", payload.preview);
    
    const {currentUserId, preview} = payload
    const { data } = await httpService.post(uploadEndpoint + "/update/" + currentUserId, payload);

    return data;
  },
};
export default avatarUploadService;
