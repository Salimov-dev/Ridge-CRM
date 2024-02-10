import httpService from "../http.service";

const userLicenseEndpoint = "/userLicense";

const userLicenseService = {
  get: async () => {
    const { data } = await httpService.get(userLicenseEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(
      userLicenseEndpoint + "/create",
      payload
    );
    return data;
  },
  remove: async (licenseId) => {
    const { data } = await httpService.delete(
      userLicenseEndpoint + "/" + licenseId
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userLicenseEndpoint + "/" + payload._id + "/edit",
      payload
    );
    return data;
  }
};
export default userLicenseService;
