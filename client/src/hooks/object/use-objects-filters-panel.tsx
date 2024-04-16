import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getObjectTypesList } from "../../store/object-params/object-types.store";
import { getDistrictsList } from "../../store/object-params/object-districts.store";
import { getMetroList } from "../../store/object-params/object-metro.store";
import { getCurrentRentersList } from "../../store/object-params/object-current-renter.store";
import { getEstateTypesList } from "../../store/object-params/object-estate-types.store";
import { getObjectPropertiesList } from "../../store/object-params/object-properties";
import { getTradeAreaList } from "../../store/object-params/object-trade-area";

const useObjectsFiltersPanel = (objects) => {
  const objectTypes = useSelector(getObjectTypesList());
  const objectProperties = useSelector(getObjectPropertiesList());
  const objectTradeArea = useSelector(getTradeAreaList());
  const districts = useSelector(getDistrictsList());
  const metro = useSelector(getMetroList());
  const currentRenters = useSelector(getCurrentRentersList());
  const estateTypes = useSelector(getEstateTypesList());

  const getActualCitiesList = () => {
    const filteredCities = objects?.map((dist) => dist.city);
    const uniqueCities = [...new Set(filteredCities)];
    const sortedCities = orderBy(uniqueCities, ["name"], ["asc"]);

    return sortedCities;
  };

  const getActualDistrictsList = () => {
    const filteredDistricts = objects?.map((dist) => dist.district);
    const uniqueDistricts = [...new Set(filteredDistricts)];

    const actualDistrictsArray = uniqueDistricts?.map((id) => {
      const idRegex = /^[0-9a-fA-F]+$/;
      if (!idRegex.test(id)) {
        return { _id: id, name: id };
      } else {
        const foundObject = districts?.find((obj) => obj._id === id);
        return foundObject
          ? { _id: foundObject?._id, name: foundObject?.name }
          : null;
      }
    });

    // Отсортируем полученные районы, учитывая строки и объекты
    actualDistrictsArray.sort((a, b) => {
      if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
      } else if (typeof a === "string") {
        return -1;
      } else if (typeof b === "string") {
        return 1;
      } else {
        return a?.name?.localeCompare(b?.name);
      }
    });

    return actualDistrictsArray;
  };

  const getActualMetroList = () => {
    const filteredMetro = objects?.map((dist) => dist?.metro);
    const formatedMetroArray = filteredMetro?.filter((m) => m !== "");

    const uniqueMetro = [...new Set(formatedMetroArray)];

    const actualMetroArray = uniqueMetro?.map((id) => {
      const foundObject = metro?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : { _id: "undefined", name: "Не указано" };
    });

    const sortedMetros = orderBy(actualMetroArray, ["name"], ["asc"]);

    return sortedMetros;
  };

  const getActualCurrentRentersList = () => {
    const filteredRenters = objects?.map((renter) => renter?.currentRenters);
    const formateRentersArray = filteredRenters?.filter((m) => m !== "");

    const uniqueRenter = [...new Set(formateRentersArray)];

    const actuaRentersArray = uniqueRenter?.map((id) => {
      const foundObject = currentRenters?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : { _id: "undefined", name: "Не указано" };
    });

    const sortedRenter = orderBy(actuaRentersArray, ["name"], ["asc"]);

    return sortedRenter;
  };

  // Тип недвижимости
  const getActualEstateTypesList = () => {
    const filteredType = objects?.map((renter) => renter?.estateTypes);
    const formateTypeArray = filteredType?.filter((m) => m !== "");

    const uniqueType = [...new Set(formateTypeArray)];

    const actuaTypeArray = uniqueType?.map((id) => {
      const foundObject = estateTypes?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : { _id: "undefined", name: "Не указано" };
    });

    const sortedType = orderBy(actuaTypeArray, ["name"], ["asc"]);

    return sortedType;
  };

  // Тип объекта
  const getActualObjectTypesList = () => {
    const filteredType = objects?.map((renter) => renter?.objectTypes);
    const formateTypeArray = filteredType?.filter((m) => m !== "");

    const uniqueType = [...new Set(formateTypeArray)];

    const actuaTypeArray = uniqueType?.map((id) => {
      const foundObject = objectTypes?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : { _id: "undefined", name: "Не указано" };
    });

    const sortedType = orderBy(actuaTypeArray, ["name"], ["asc"]);

    return sortedType;
  };

  // Расположение объекта
  const getActualObjectProperties = () => {
    const filteredProperties = objects?.map(
      (renter) => renter?.objectProperties
    );
    const formateTypeArray = filteredProperties?.filter((m) => m !== "");

    const uniqueType = [...new Set(formateTypeArray)];

    const actuaTypeArray = uniqueType?.map((id) => {
      const foundObject = objectProperties?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : { _id: "undefined", name: "Не указано" };
    });

    const sortedType = orderBy(actuaTypeArray, ["name"], ["asc"]);

    return sortedType;
  };

  // Тип торговой площади
  const getActualObjectTradeArea = () => {
    const filteredProperties = objects?.map((renter) => renter?.tradeArea);
    const formateTypeArray = filteredProperties?.filter((m) => m !== "");

    const uniqueType = [...new Set(formateTypeArray)];

    const actuaTypeArray = uniqueType?.map((id) => {
      const foundObject = objectTradeArea?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name || "Не указано" }
        : { _id: "undefined", name: "Не указано" };
    });

    const sortedType = orderBy(actuaTypeArray, ["name"], ["asc"]);

    return sortedType;
  };

  return {
    getActualCitiesList,
    getActualDistrictsList,
    getActualMetroList,
    getActualCurrentRentersList,
    getActualEstateTypesList,
    getActualObjectTypesList,
    getActualObjectProperties,
    getActualObjectTradeArea
  };
};

export default useObjectsFiltersPanel;
