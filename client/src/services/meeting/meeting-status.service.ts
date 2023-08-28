import httpService from "../http.service";

const meetingStatusEndpoint = "/meetingStatus";

const meetingStatusService = {
  get: async () => {
    const { data } = await httpService.get(meetingStatusEndpoint);
    return data;
  },
};
export default meetingStatusService;
