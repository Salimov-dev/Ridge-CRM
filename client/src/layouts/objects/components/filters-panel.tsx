// libraries
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// MUI
import { styled } from "@mui/material";
// components
import SearchField from "../../../components/common/inputs/search-field";
import SearchDatePicker from "../../../components/common/inputs/search-date-picker";
import MultiSelectField from "../../../components/common/inputs/multi-select-field";
// store
import { getUsersList } from "../../../store/user/users.store";
import { getMetroList } from "../../../store/object/metro.store";
import { getDistrictsList } from "../../../store/object/districts.store";
import { getEstateTypesList } from "../../../store/object/estate-types.store";
import { getObjectTypesList } from "../../../store/object/object-types.store";
import { getObjectsStatusList } from "../../../store/object/object-status.store";
import { getCurrentRentersList } from "../../../store/object/current-renter.store";
import SearchSwitch from "../../../components/common/inputs/search-switch";

const Form = styled(`form`)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const FilterPanel = ({ setValue, objects, data, register, isLoading}) => {
  const users = useSelector(getUsersList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const objectTypes = useSelector(getObjectTypesList());
  const districts = useSelector(getDistrictsList());
  const metro = useSelector(getMetroList());
  const currentRenters = useSelector(getCurrentRentersList());
  const estateTypes = useSelector(getEstateTypesList());

  const isOnlyPhoneChecked = data?.onlyWithPhone;

  const handleKeyDown = (e) => {
    const keyValue = e.key;
    const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
    const isDigit = /^\d$/.test(keyValue);
    const isBackspace = e.keyCode === 8;

    if (!isRussianLetter && !isDigit && !isBackspace) {
      e.preventDefault();
    }
  };
  const getActualList = (data, property, source) => {
    const filteredItems = data?.map((item) => item[property]);
    const uniqueItems = [...new Set(filteredItems)];

    const actualItemsArray = uniqueItems?.map((id) => {
      const foundItem = source?.find((item) => item._id === id);
      return foundItem ? { _id: foundItem._id, name: foundItem.name } : null;
    });

    const sortedItems = orderBy(actualItemsArray, ["name"], ["asc"]);

    return sortedItems;
  };
  const getActualCitiesList = () => {
    const filteredCities = objects?.map((dist) => dist.location.city);
    const uniqueCities = [...new Set(filteredCities)];
    const sortedCities = orderBy(uniqueCities, ["name"], ["asc"]);

    return sortedCities;
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

  return (
    <>
      <Form>
        <SearchField
          register={register}
          label="Найти по адресу"
          name="address"
          onKeyDown={handleKeyDown}
          value={data.address}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по телефону"
          name="phone"
          onKeyDown={handleKeyDown}
          value={data.phone}
          inputProps={{ maxLength: 12 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по имени"
          name="name"
          onKeyDown={handleKeyDown}
          value={data.name}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualList(objects, "status", objectStatuses)}
          selectedItems={data.selectedStatuses}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          name="status"
          labelId="status-label"
          label="Выбор по статусу"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualUsersList()}
          selectedItems={data.selectedUsers}
          onChange={(e) => setValue("selectedUsers", e.target.value)}
          name="users"
          labelId="users-label"
          label="Выбор по менеджеру"
          disabled={isLoading ? true : false}
        />
        <SearchSwitch
          data={data}
          isLoading={isLoading}
          isOnlyPhoneChecked={isOnlyPhoneChecked}
          onChange={(e) => {
            setValue("onlyWithPhone", e.target.checked);
          }}
        />
      </Form>

      <Form>
        <MultiSelectField
          itemsList={getActualMetroList()}
          selectedItems={data.selectedMetro}
          onChange={(e) => setValue("selectedMetro", e.target.value)}
          name="metro"
          labelId="metro-label"
          label="Выбор по метро"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualDistrictsList()}
          selectedItems={data.selectedDistricts}
          onChange={(e) => setValue("selectedDistricts", e.target.value)}
          name="districts"
          labelId="districts-label"
          label="Выбор по району"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualCitiesList()}
          selectedItems={data.selectedCities}
          onChange={(e) => setValue("selectedCities", e.target.value)}
          name="cities"
          labelId="cities-label"
          label="Выбор по городу"
          disabled={isLoading ? true : false}
        />
      </Form>

      <Form>
        <MultiSelectField
          itemsList={getActualCurrentRentersList()}
          selectedItems={data.selectedCurrentRenters}
          onChange={(e) => setValue("selectedCurrentRenters", e.target.value)}
          name="currentRenters"
          labelId="currentRenters-label"
          label="Текущий арендатор"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualEstateTypesList()}
          selectedItems={data.selectedEstateTypes}
          onChange={(e) => setValue("selectedEstateTypes", e.target.value)}
          name="estateTypes"
          labelId="estateTypes-label"
          label="Тип недвижимости"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualObjectTypesList()}
          selectedItems={data.selectedObjectTypes}
          onChange={(e) => setValue("selectedObjectTypes", e.target.value)}
          name="objectTypes"
          labelId="objectTypes-label"
          label="Тип объекта"
          disabled={isLoading ? true : false}
        />
        <SearchDatePicker
          register={register}
          name="startDate"
          label="Добавлены от"
          value={data.startDate}
          onChange={(value) => setValue("startDate", value)}
          disabled={isLoading ? true : false}
        />
        <SearchDatePicker
          register={register}
          name="endDate"
          label="Добавлены до"
          value={data.endDate}
          onChange={(value) => setValue("endDate", value)}
          disabled={isLoading ? true : false}
        />
      </Form>
    </>
  );
};

export default FilterPanel;
