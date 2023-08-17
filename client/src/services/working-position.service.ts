import httpService from "./http.service";

const workingPositionEndpoint = "workingPosition/";

const workingPositionService = {
  get: async () => {
    const { data } = await httpService.get(workingPositionEndpoint);
    return data;
  },
};
export default workingPositionService;
