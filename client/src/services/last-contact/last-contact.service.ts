import httpService from "../http.service";

const lastContactEndpoint = "/lastContact";

const lastContactService = {
  get: async () => {
    const { data } = await httpService.get(lastContactEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(
      lastContactEndpoint + "/create",
      payload
    );
    return data;
  },
  remove: async (lastContactId) => {
    const { data } = await httpService.delete(
      lastContactEndpoint + "/" + lastContactId
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      lastContactEndpoint + "/" + payload._id + "/edit",
      payload
    );
    return data;
  },
};
export default lastContactService;
