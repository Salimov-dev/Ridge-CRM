import httpService from "./http.service";
const districtsEndpoint = "/districts";

const districtsService = {
  get: async () => {
    const { data } = await httpService.get(districtsEndpoint);
    return data;
  },
};
export default districtsService;
