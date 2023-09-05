import httpService from "../http.service";

const ridgeObjectStatusEndpoint = "/ridgeObjectStatus";

const ridgeObjectStatusService = {
  get: async () => {
    const { data } = await httpService.get(ridgeObjectStatusEndpoint);
    return data;
  },
};
export default ridgeObjectStatusService;
