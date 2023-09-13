import httpService from "../http.service";

const dealStagesTypeEndpoint = "/dealStages";

const dealStagesService = {
  get: async () => {
    const { data } = await httpService.get(dealStagesTypeEndpoint);
    return data;
  },
};
export default dealStagesService;
