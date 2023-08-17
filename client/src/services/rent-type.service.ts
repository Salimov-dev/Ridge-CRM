import httpService from "./http.service";
const rentTypeEndpoint = "/rentType";

const rentTypeService = {
  get: async () => {
    const { data } = await httpService.get(rentTypeEndpoint);
    return data;
  },
};
export default rentTypeService;
