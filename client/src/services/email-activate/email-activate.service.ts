import httpService from "../http.service";

const emailActivateEndpoint = "/activate";

const emailActivateService = {
  get: async (payload) => {
    console.log("send activate payload", payload);

    const { data } = await httpService.get(
      emailActivateEndpoint + "/" + payload
    );
    return data;
  }
};
export default emailActivateService;
