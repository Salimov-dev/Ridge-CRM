import httpService from "../http.service";
const ridgeObjectEndpoint = "ridge/";

const ridgeObjectService = {
  get: async () => {
    const { data } = await httpService.get(ridgeObjectEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(
      ridgeObjectEndpoint + "create",
      payload
    );

    return data;
  },
  remove: async (objectId) => {
    const { data } = await httpService.delete(
      ridgeObjectEndpoint + "/" + objectId
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      ridgeObjectEndpoint + payload._id + "/edit",
      payload
    );
    return data;
  },
};
export default ridgeObjectService;
