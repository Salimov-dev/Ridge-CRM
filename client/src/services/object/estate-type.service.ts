import httpService from "../http.service";

const estateTypeEndpoint = "/estateType";

const estateTypeService = {
  get: async () => {
    const { data } = await httpService.get(estateTypeEndpoint);
    return data;
  },
};
export default estateTypeService;
