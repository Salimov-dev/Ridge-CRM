import httpService from "../http.service";

const objectEndpoint = "objects/";

const objectService = {
  get: async () => {
    const { data } = await httpService.get(objectEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(objectEndpoint + "create", payload);
    return data;
  },
  remove: async (objectId) => {
    const { data } = await httpService.delete(objectEndpoint + "/" + objectId);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      objectEndpoint + payload._id + "/edit",
      payload
    );
    return data;
  },
};
export default objectService;
