import httpService from "../http.service";

const passwordEndpoint = "/password";

const passwordService = {
  forgot: async (payload) => {
    const { data } = await httpService.post(
      passwordEndpoint + "/" + "forgot" + "/" + payload
    );
    return data;
  },
  confirm: async (payload) => {
    const { data } = await httpService.post(
      passwordEndpoint + "/" + "confirm",
      payload
    );
    return data;
  },
  setupPassword: async (payload) => {
    const { data } = await httpService.post(
      passwordEndpoint + "/" + "setup-password",
      payload
    );
    return data;
  },
  clearConfirmLink: async (payload) => {
    const { data } = await httpService.post(
      passwordEndpoint + "/" + "clearRecoveryPassLink",
      payload
    );
    return data;
  },
  clearSetupPassLink: async (payload) => {
    const { data } = await httpService.post(
      passwordEndpoint + "/" + "clearSetupPassLink",
      payload
    );
    return data;
  }
};
export default passwordService;
