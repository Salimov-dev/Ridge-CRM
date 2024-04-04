import httpService from "../http.service";

const emailActivateEndpoint = "/activate";

const emailActivateService = {
  get: async (payload) => {
    const { data } = await httpService.get(
      emailActivateEndpoint + "/" + payload
    );
    return data;
  },
  sendConfirmMail: async (payload) => {
    const { data } = await httpService.post(
      emailActivateEndpoint + "/" + "sendConfirmMail" + "/" + payload
    );
    return data;
  },
  clearActivationLink: async (payload) => {
    const { data } = await httpService.post(
      emailActivateEndpoint + "/" + "clearActivationLink" + "/" + payload
    );
    return data;
  }
};
export default emailActivateService;
