import httpService from "../http.service";
const uploadEndpoint = "/upload";

const uploadService = {
  post: async (payload) => {
    const { data } = await httpService.post(uploadEndpoint, payload);

    return data;
  },
};
export default uploadService;
