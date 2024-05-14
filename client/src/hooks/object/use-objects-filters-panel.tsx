import { orderBy, uniqueId } from "lodash";
import { useSelector } from "react-redux";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
// utils
import { getUniqueItemsList } from "@utils/actual-items/get-uniq-items-list";
// store
import { getObjectTypesList } from "@store/object-params/object-types.store";
import { getDistrictsList } from "@store/object-params/object-districts.store";
import { getMetroList } from "@store/object-params/object-metro.store";
import { getCurrentRentersList } from "@store/object-params/object-current-renter.store";
import { getEstateTypesList } from "@store/object-params/object-estate-types.store";
import { getObjectPropertiesList } from "@store/object-params/object-properties";
import { getTradeAreaList } from "@store/object-params/object-trade-area";

const useObjectsFiltersPanel = (objects: IObject[]) => {
  const objectTypes = useSelector(getObjectTypesList());
  const objectProperties = useSelector(getObjectPropertiesList());
  const objectTradeArea = useSelector(getTradeAreaList());
  const districts = useSelector(getDistrictsList());
  const metroStations = useSelector(getMetroList());
  const currentRenters = useSelector(getCurrentRentersList());
  const estateTypes = useSelector(getEstateTypesList());

  const getCitiesList = () => {
    const filteredCities = objects?.map((obj: IObject) => obj.city);

    const uniqueCities = [...new Set(filteredCities)];
    const sortedCities = orderBy(uniqueCities, ["name"], ["asc"]);

    const result = sortedCities.map((city) => ({
      _id: uniqueId(),
      name: city
    }));

    return result;
  };

  const districtsList = getUniqueItemsList({
    position: "district",
    itemsArray: objects,
    positionsArray: districts
  });

  const metroStationsList = getUniqueItemsList({
    position: "metro",
    itemsArray: objects,
    positionsArray: metroStations
  });

  const currentRentersList = getUniqueItemsList({
    position: "currentRenters",
    itemsArray: objects,
    positionsArray: currentRenters
  });

  const estateTypesList = getUniqueItemsList({
    position: "estateTypes",
    itemsArray: objects,
    positionsArray: estateTypes
  });

  const objectTypesList = getUniqueItemsList({
    position: "objectTypes",
    itemsArray: objects,
    positionsArray: objectTypes
  });

  const objectPropertiesList = getUniqueItemsList({
    position: "objectProperties",
    itemsArray: objects,
    positionsArray: objectProperties
  });

  const tradeAreaList = getUniqueItemsList({
    position: "tradeArea",
    itemsArray: objects,
    positionsArray: objectTradeArea
  });

  return {
    getCitiesList,
    currentRentersList,
    estateTypesList,
    objectTypesList,
    objectPropertiesList,
    tradeAreaList,
    metroStationsList,
    districtsList
  };
};

export default useObjectsFiltersPanel;
