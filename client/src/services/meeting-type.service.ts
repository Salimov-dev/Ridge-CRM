import httpService from "./http.service";
const meetingTypeEndpoint = "/meetingType";

const meetingTypeService = {
  get: async () => {
    const { data } = await httpService.get(meetingTypeEndpoint);
    return data;
  },
};
export default meetingTypeService;
