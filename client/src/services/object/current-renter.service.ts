import httpService from "../http.service";

const currentRenterEndpoint = "/currentRenter";

const currentRenterService = {
  get: async () => {
    const { data } = await httpService.get(currentRenterEndpoint);
    return data;
  },
};
export default currentRenterService;
