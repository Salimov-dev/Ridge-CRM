import httpService from "../http.service";

const presentationsEndpoint = "/presentations";

const presentationsService = {
  get: async () => {
    const { data } = await httpService.get(presentationsEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(
      presentationsEndpoint + "/create",
      payload
    );
    return data;
  },
  remove: async (presentationId) => {
    const { data } = await httpService.delete(
      presentationsEndpoint + "/" + presentationId
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      presentationsEndpoint + "/" + payload._id + "/edit",
      payload
    );
    return data;
  },
};
export default presentationsService;
