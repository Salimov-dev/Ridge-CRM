import httpService from "../http.service";

const metroEndpoint = "/metro";

const metroService = {
  get: async () => {
    const { data } = await httpService.get(metroEndpoint);
    return data;
  },
};
export default metroService;
