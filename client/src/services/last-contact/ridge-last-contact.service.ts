import httpService from "../http.service";

const ridgeLastContactEndpoint = "/ridgeLastContact";

const ridgeLastContactService = {
  get: async () => {
    const { data } = await httpService.get(ridgeLastContactEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(
      ridgeLastContactEndpoint + "/create",
      payload
    );
    return data;
  },
  remove: async (lastContactId) => {
    const { data } = await httpService.delete(
      ridgeLastContactEndpoint + "/" + lastContactId
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      ridgeLastContactEndpoint + "/" + payload._id + "/edit",
      payload
    );
    return data;
  },
};
export default ridgeLastContactService;
