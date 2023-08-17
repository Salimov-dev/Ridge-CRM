import httpService from "./http.service";
const objectConditionsEndpoint = "/objectConditions";

const objectConditionsService = {
  get: async () => {
    const { data } = await httpService.get(objectConditionsEndpoint);
    return data;
  },
};
export default objectConditionsService;
