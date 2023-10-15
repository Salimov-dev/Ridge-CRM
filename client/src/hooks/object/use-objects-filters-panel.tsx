import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getUsersList } from "../../store/user/users.store";
import { getObjectTypesList } from "../../store/object/object-types.store";
import { getDistrictsList } from "../../store/object/districts.store";
import { getMetroList } from "../../store/object/metro.store";
import { getCurrentRentersList } from "../../store/object/current-renter.store";
import { getEstateTypesList } from "../../store/object/estate-types.store";
import { getObjectsStatusList } from "../../store/object/object-status.store";
import { nanoid } from "@reduxjs/toolkit";

const useObjectsFiltersPanel = (objects) => {
  const users = useSelector(getUsersList());
  const objectTypes = useSelector(getObjectTypesList());
  const districts = useSelector(getDistrictsList());
  const metro = useSelector(getMetroList());
  const currentRenters = useSelector(getCurrentRentersList());
  const estateTypes = useSelector(getEstateTypesList());
  const objectStatuses = useSelector(getObjectsStatusList());

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
    console.log("actualDistrictsArray", actualDistrictsArray);

    return actualDistrictsArray;
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

  const getActualCurrentRentersList = () => {
    const filteredRenters = objects?.map(
      (renter) => renter?.estateOptions?.currentRenters
    );
    const formateRentersArray = filteredRenters?.filter((m) => m !== "");

    const uniqueRenter = [...new Set(formateRentersArray)];

    const actuaRentersArray = uniqueRenter?.map((id) => {
      const foundObject = currentRenters?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedRenter = orderBy(actuaRentersArray, ["name"], ["asc"]);

    return sortedRenter;
  };
  const getActualEstateTypesList = () => {
    const filteredType = objects?.map(
      (renter) => renter?.estateOptions?.estateTypes
    );
    const formateTypeArray = filteredType?.filter((m) => m !== "");

    const uniqueType = [...new Set(formateTypeArray)];

    const actuaTypeArray = uniqueType?.map((id) => {
      const foundObject = estateTypes?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedType = orderBy(actuaTypeArray, ["name"], ["asc"]);

    return sortedType;
  };
  const getActualObjectTypesList = () => {
    const filteredType = objects?.map(
      (renter) => renter?.estateOptions?.objectTypes
    );
    const formateTypeArray = filteredType?.filter((m) => m !== "");

    const uniqueType = [...new Set(formateTypeArray)];

    const actuaTypeArray = uniqueType?.map((id) => {
      const foundObject = objectTypes?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedType = orderBy(actuaTypeArray, ["name"], ["asc"]);

    return sortedType;
  };
  const getActualUsersList = () => {
    const filteredUsers = objects?.map((obj) => obj?.userId);
    const formatedUsersArray = filteredUsers?.filter((m) => m !== "");

    const uniqueUsers = [...new Set(formatedUsersArray)];

    const actualUsersArray = uniqueUsers?.map((id) => {
      const foundObject = users?.find((user) => user._id === id);

      return foundObject
        ? {
            _id: foundObject._id,
            name: `${foundObject.name.lastName} ${foundObject.name.firstName}`,
          }
        : null;
    });

    const sortedUsers = orderBy(actualUsersArray, ["nam.firstName"], ["asc"]);

    return sortedUsers;
  };

  return {
    getActualStatusesList,
    getActualCitiesList,
    getActualDistrictsList,
    getActualMetroList,
    getActualCurrentRentersList,
    getActualEstateTypesList,
    getActualObjectTypesList,
    getActualUsersList,
  };
};

export default useObjectsFiltersPanel;
