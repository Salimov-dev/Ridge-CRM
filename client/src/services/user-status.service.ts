import httpService from "./http.service";
const userStatusEndpoint = "/userStatus";

const userStatusService = {
  get: async () => {
    const { data } = await httpService.get(userStatusEndpoint);
    return data;
  },
};
export default userStatusService;
