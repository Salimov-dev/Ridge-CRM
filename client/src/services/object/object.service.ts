import httpService from "../http.service";

const objectEndpoint = "objects/";

const objectService = {
  get: async () => {
    const { data } = await httpService.get(objectEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(objectEndpoint + "create", payload);
    return data;
  },
  remove: async (objectId) => {
    const { data } = await httpService.delete(objectEndpoint + "/" + objectId);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      objectEndpoint + payload.newData._id + "/edit",
      payload
    );
    return data;
  },
  updateMultiple: async (objectIds, userId) => {
    const data = {
      objectIds,
      userId
    };

    const { data: updatedObjects } = await httpService.patch(
      objectEndpoint + "update-multiple",
      data
    );

    return updatedObjects;
  }
};
export default objectService;
