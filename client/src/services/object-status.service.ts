import httpService from "./http.service";

const objectStatusEndpoint = "/objectStatus";

const objectStatusService = {
  get: async () => {
    const { data } = await httpService.get(objectStatusEndpoint);
    return data;
  },
};
export default objectStatusService;
