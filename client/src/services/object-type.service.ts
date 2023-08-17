import httpService from "./http.service";
const objectTypeEndpoint = "/objectType";

const objectTypeService = {
  get: async () => {
    const { data } = await httpService.get(objectTypeEndpoint);
    return data;
  },
};
export default objectTypeService;
