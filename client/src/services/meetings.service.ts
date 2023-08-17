import httpService from "./http.service";

const meetingsEndpoint = "/meetings";

const meetingsService = {
  get: async () => {
    const { data } = await httpService.get(meetingsEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(
      meetingsEndpoint + "/create",
      payload
    );
    return data;
  },
  remove: async (meetingId) => {
    const { data } = await httpService.delete(meetingsEndpoint + "/" + meetingId);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      meetingsEndpoint + "/" + payload._id + "/edit",
      payload
    );
    return data;
  },
};
export default meetingsService;
