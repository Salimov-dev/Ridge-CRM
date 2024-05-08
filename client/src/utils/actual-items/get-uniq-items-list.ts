import { orderBy } from "lodash";

interface GetUniqueItemsListProps {
  position: string;
  itemsArray: Record<string, any>;
  positionsArray: Record<string, any>;
}

interface IPosition {
  _id: string;
  name: string;
}

interface IItem {
  [key: string]: any;
}

export const getUniqueItemsList = ({
  position,
  itemsArray,
  positionsArray
}: GetUniqueItemsListProps) => {
  const itemPositions = itemsArray?.map((item: IItem) => item[position]);
  const uniquePositionIds = [...new Set(itemPositions)];

  const actualStatusesArray = uniquePositionIds?.map((id) => {
    const foundObject = positionsArray?.find(
      (position: IPosition) => position._id === id
    );
    return foundObject
      ? {
          _id: foundObject._id,
          name: foundObject.name
        }
      : { _id: null, name: "Нет значения" };
  });

  const sortedPositions = orderBy(actualStatusesArray, ["name"], ["asc"]);

  return sortedPositions;
};
