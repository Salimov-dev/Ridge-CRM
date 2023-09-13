import httpService from "../http.service";

const dealsEndpoint = "/deals";

const dealsService = {
  get: async () => {
    const { data } = await httpService.get(dealsEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(dealsEndpoint + "/create", payload);
    return data;
  },
  remove: async (dealId) => {
    const { data } = await httpService.delete(dealsEndpoint + "/" + dealId);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      dealsEndpoint + "/" + payload._id + "/edit",
      payload
    );
    return data;
  },
};
export default dealsService;
