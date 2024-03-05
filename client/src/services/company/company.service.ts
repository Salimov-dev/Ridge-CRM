import httpService from "../http.service";

const companyEndpoint = "/company";

const companyService = {
  get: async () => {
    const { data } = await httpService.get(companyEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(
      companyEndpoint + "/create",
      payload
    );
    return data;
  },
  remove: async (companyId) => {
    const { data } = await httpService.delete(
      companyEndpoint + "/" + companyId
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      companyEndpoint + "/" + payload.newData._id + "/edit",
      payload
    );
    return data;
  }
};
export default companyService;
