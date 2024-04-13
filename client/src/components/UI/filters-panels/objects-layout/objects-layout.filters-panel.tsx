// components
import React from "react";
import SearchField from "@common/inputs/search-field";
import SearchDatePicker from "@common/inputs/search-date-picker";
import MultiSelectField from "@common/inputs/multi-select-field";
import { FieldsContainer, Form } from "@components/common/forms/styled";
import SearchSelectField from "@common/inputs/search-select-field";
import { useSelector } from "react-redux";
// hooks
import useObjectsFiltersPanel from "@hooks/object/use-objects-filters-panel";
// data
import { objectActivityVariants } from "@data/object/object-activity-variants";
// utils
import { getActualStatusesList } from "@utils/actual-items/get-actual-statuses-list";
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";
// store
import { getIsCurrentUserRoleManager } from "@store/user/users.store";
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import {
  getObjectsList,
  getObjectsLoadingStatus
} from "@store/object/objects.store";

const ObjectsLayoutFiltersPanel = React.memo(({ data, setValue, register }) => {
  const objectsList = useSelector(getObjectsList());
  const usersList = getActualUsersList(objectsList, true);
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  const objectSatuses = useSelector(getObjectsStatusList());
  const statusesList = getActualStatusesList(objectsList, objectSatuses);

  const isLoading = useSelector(getObjectsLoadingStatus());

  const {
    getActualCitiesList,
    getActualDistrictsList,
    getActualMetroList,
    getActualCurrentRentersList,
    getActualEstateTypesList,
    getActualObjectTypesList,
    getActualObjectProperties,
    getActualObjectTradeArea
  } = useObjectsFiltersPanel(objectsList);

  return (
    <Form>
      <FieldsContainer>
        <SearchField
          register={register}
          label="Найти по адресу"
          name="address"
          value={data.address}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по телефону из Контакта"
          name="phone"
          value={data.phone}
          inputProps={{ maxLength: 12 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по имени из Контакта"
          name="name"
          value={data.name}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по описанию из Объекта"
          name="fullDescription"
          value={data.fullDescription}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по названию Компании"
          name="company"
          value={data.company}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>

      <FieldsContainer>
        <MultiSelectField
          name="cities"
          labelId="cities-label"
          label="Выбор по городу"
          itemsList={getActualCitiesList()}
          selectedItems={data.selectedCities}
          onChange={(e) => setValue("selectedCities", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          name="districts"
          labelId="districts-label"
          label="Выбор по району"
          itemsList={getActualDistrictsList()}
          selectedItems={data.selectedDistricts}
          onChange={(e) => setValue("selectedDistricts", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          name="metro"
          labelId="metro-label"
          label="Выбор по метро"
          itemsList={getActualMetroList()}
          selectedItems={data.selectedMetro}
          onChange={(e) => setValue("selectedMetro", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          name="status"
          labelId="status-label"
          label="Выбор по статусу"
          itemsList={statusesList}
          selectedItems={data.selectedStatuses}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <SearchSelectField
          register={register}
          name="objectActivity"
          labelId="objectActivity"
          label="Выбор по активности"
          itemsList={objectActivityVariants}
          value={data.objectActivity}
          disabled={isLoading ? true : false}
          isSelect={Boolean(data?.objectActivity?.length)}
        />
      </FieldsContainer>
      <FieldsContainer>
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

        <MultiSelectField
          itemsList={getActualObjectProperties()}
          selectedItems={data.selectedObjectProperties}
          onChange={(e) => setValue("selectedObjectProperties", e.target.value)}
          name="objectProperties"
          labelId="objectProperties-label"
          label="Расположение объекта"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualObjectTradeArea()}
          selectedItems={data.selectedTradeArea}
          onChange={(e) => setValue("selectedTradeArea", e.target.value)}
          name="objectTradeArea"
          labelId="objectTradeArea-label"
          label="Тип торговой площади"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualCurrentRentersList()}
          selectedItems={data.selectedCurrentRenters}
          onChange={(e) => setValue("selectedCurrentRenters", e.target.value)}
          name="currentRenters"
          labelId="currentRenters-label"
          label="Текущий арендатор"
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>
      <FieldsContainer>
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
        <SearchField
          register={register}
          label="Найти по кадастровому №"
          name="cadastralNumber"
          value={data.cadastralNumber}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        {!isCurrentUserRoleManager ? (
          <MultiSelectField
            name="users"
            labelId="users-label"
            label="Выбор по менеджеру"
            itemsList={usersList}
            selectedItems={data.selectedUsers}
            onChange={(e) => setValue("selectedUsers", e.target.value)}
            disabled={isLoading ? true : false}
          />
        ) : null}
      </FieldsContainer>
    </Form>
  );
});

export default ObjectsLayoutFiltersPanel;
