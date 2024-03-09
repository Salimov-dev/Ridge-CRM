import { orderBy } from "lodash";

export const getActualContactPositionList = (items, positions) => {
  const filteredContactPosition = items?.map((item) => item?.position);

  const formatedContactPositionArray = filteredContactPosition?.filter(
    (position) => position !== ""
  );

  const uniqueContactPosition = [...new Set(formatedContactPositionArray)];

  const actualContactPositionArray = uniqueContactPosition?.map((id) => {
    const foundPosition = positions?.find((position) => position._id === id);
    return foundPosition
      ? {
          _id: foundPosition._id,
          name: foundPosition.name
        }
      : null;
  });

  const sortedContactPosition = orderBy(
    actualContactPositionArray,
    ["name"],
    ["asc"]
  );

  return sortedContactPosition;
};
