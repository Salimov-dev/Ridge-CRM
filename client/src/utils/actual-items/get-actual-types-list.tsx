import { orderBy } from "lodash";

export const getActualTypesList = (meetings, types) => {
    const filteredTypes = meetings?.map((meet) => meet?.meetingType);
    const formatedTypesArray = filteredTypes?.filter((type) => type !== "");
    const uniqueTypes = [...new Set(formatedTypesArray)];

    const actualTypesArray = uniqueTypes?.map((id) => {
      const foundObject = types?.find((type) => type._id === id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: foundObject.name,
          }
        : null;
    });

    const sortedTypes = orderBy(actualTypesArray, ["name"], ["asc"]);

    return sortedTypes;
  };