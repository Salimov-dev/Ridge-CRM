import httpService from "../http.service";

const contactEndpoint = "/contact";

const contactService = {
  get: async () => {
    const { data } = await httpService.get(contactEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(
      contactEndpoint + "/create",
      payload
    );
    return data;
  },
  remove: async (contactId) => {
    const { data } = await httpService.delete(
      contactEndpoint + "/" + contactId
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      contactEndpoint + "/" + payload._id + "/edit",
      payload
    );
    return data;
  }
};
export default contactService;
