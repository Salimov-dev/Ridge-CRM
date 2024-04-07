import httpService from "../http.service";

const paymentEndpoint = "/payment";

const paymentService = {
  create: async (payload) => {
    const { data } = await httpService.post(
      paymentEndpoint + "/create",
      payload
    );
    return data;
  },
  confirm: async (payload) => {
    const { data } = await httpService.post(
      paymentEndpoint + "/confirm",
      payload
    );
    return data;
  }
};
export default paymentService;
