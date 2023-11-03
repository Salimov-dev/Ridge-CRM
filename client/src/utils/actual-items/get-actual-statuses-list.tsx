import { orderBy } from "lodash";

export const getActualStatusesList = (items, statuses) => {
  const filteredStatuses = items?.map((item) => item?.status);
  const formatedStatusesArray = filteredStatuses?.filter(
    (status) => status !== ""
  );

  const uniqueStatuses = [...new Set(formatedStatusesArray)];

  const actualStatusesArray = uniqueStatuses?.map((id) => {
    const foundObject = statuses?.find((status) => status._id === id);
    return foundObject
      ? {
          _id: foundObject._id,
          name: foundObject.name,
        }
      : null;
  });

  const sortedStatuses = orderBy(actualStatusesArray, ["name"], ["asc"]);

  return sortedStatuses;
};
