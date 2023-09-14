import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getDistrictsList } from "../../store/object/districts.store";
import { getMetroList } from "../../store/object/metro.store";
import { getRidgeObjectsStatusList } from "../../store/ridge-object/ridge-object-status.store";

const useRidgeObjectsFiltersPanel = (objects) => {
  const districts = useSelector(getDistrictsList());
  const metro = useSelector(getMetroList());
  const objectStatuses = useSelector(getRidgeObjectsStatusList());

  const getActualCitiesList = () => {
    const filteredCities = objects?.map((dist) => dist.location.city);
    const uniqueCities = [...new Set(filteredCities)];
    const sortedCities = orderBy(uniqueCities, ["name"], ["asc"]);

    return sortedCities;
  };

  const getActualStatusesList = () => {
    const filteredStatuses = objects?.map((obj) => obj.status);
    const uniqueStatuses = [...new Set(filteredStatuses)];

    const actualStatusesArray = uniqueStatuses?.map((id) => {
      const foundObject = objectStatuses?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedStatuses = orderBy(actualStatusesArray, ["name"], ["asc"]);

    return sortedStatuses;
  };
  
  const getActualDistrictsList = () => {
    const filteredDistricts = objects?.map((dist) => dist.location.district);
    const uniqueDistricts = [...new Set(filteredDistricts)];

    const actualDistrictsArray = uniqueDistricts?.map((id) => {
      const foundObject = districts?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedDistricts = orderBy(actualDistrictsArray, ["name"], ["asc"]);

    return sortedDistricts;
  };
  const getActualMetroList = () => {
    const filteredMetro = objects?.map((dist) => dist?.location?.metro);
    const formatedMetroArray = filteredMetro?.filter((m) => m !== "");

    const uniqueMetro = [...new Set(formatedMetroArray)];

    const actualMetroArray = uniqueMetro?.map((id) => {
      const foundObject = metro?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedMetros = orderBy(actualMetroArray, ["name"], ["asc"]);

    return sortedMetros;
  };

  return {
    getActualStatusesList,
    getActualCitiesList,
    getActualDistrictsList,
    getActualMetroList,
  };
};

export default useRidgeObjectsFiltersPanel;
