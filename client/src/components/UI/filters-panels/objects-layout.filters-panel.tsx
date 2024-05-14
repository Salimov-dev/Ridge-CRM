// components
import React, { FC } from "react";
import SearchField from "@common/inputs/search-field";
import SearchDatePicker from "@common/inputs/search-date-picker";
import MultiSelectField from "@common/inputs/multi-select-field";
import { FieldsContainer, Form } from "@styled/styled-form";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useSelector } from "react-redux";
// hooks
import useObjectsFiltersPanel from "@hooks/object/use-objects-filters-panel";
// interfaces
import { IDataProps } from "@interfaces/data/data-props.type";
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

interface ObjectsLayoutFiltersPanel {
  data: IDataProps;
  register: UseFormRegister<IDataProps>;
  setValue: UseFormSetValue<IDataProps>;
}

const ObjectsLayoutFiltersPanel: FC<ObjectsLayoutFiltersPanel> = React.memo(
  ({ data, setValue, register }) => {
    const objectsList = useSelector(getObjectsList());
    const usersList = getActualUsersList(objectsList, true);
    const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

    const objectSatuses = useSelector(getObjectsStatusList());
    const statusesList = getActualStatusesList(objectsList, objectSatuses);

    const isLoading = useSelector(getObjectsLoadingStatus());

    const {
      getCitiesList,
      currentRentersList,
      estateTypesList,
      objectTypesList,
      objectPropertiesList,
      tradeAreaList,
      metroStationsList,
      districtsList
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
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти по телефону из Контакта"
            name="phone"
            value={data.phone}
            inputProps={{ maxLength: 12 }}
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти по имени из Контакта"
            name="name"
            value={data.name}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти по названию Компании"
            name="company"
            value={data.company}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти в описании Объекта"
            name="fullDescription"
            value={data.fullDescription}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
        </FieldsContainer>

        <FieldsContainer>
          <MultiSelectField
            name="cities"
            labelId="cities-label"
            label="Выбор по населенному пункту"
            itemsList={getCitiesList()}
            selectedItems={data.selectedCities}
            onChange={(e) => setValue("selectedCities", e.target.value)}
            isLoading={isLoading}
            disabled={isLoading}
            isItemValueId={false}
          />
          <MultiSelectField
            name="districts"
            labelId="districts-label"
            label="Выбор по району"
            itemsList={districtsList}
            selectedItems={data.selectedDistricts}
            onChange={(e) => setValue("selectedDistricts", e.target.value)}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <MultiSelectField
            name="metro"
            labelId="metro-label"
            label="Выбор по метро"
            itemsList={metroStationsList}
            selectedItems={data.selectedMetro}
            onChange={(e) => setValue("selectedMetro", e.target.value)}
            disabled={isLoading}
          />
          <MultiSelectField
            name="status"
            labelId="status-label"
            label="Выбор по статусу"
            itemsList={statusesList}
            selectedItems={data.selectedStatuses}
            onChange={(e) => setValue("selectedStatuses", e.target.value)}
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти по кадастровому №"
            name="cadastralNumber"
            value={data.cadastralNumber}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
        </FieldsContainer>
        <FieldsContainer>
          <MultiSelectField
            itemsList={estateTypesList}
            selectedItems={data.selectedEstateTypes}
            onChange={(e) => setValue("selectedEstateTypes", e.target.value)}
            name="estateTypes"
            labelId="estateTypes-label"
            label="Тип недвижимости"
            disabled={isLoading}
          />

          <MultiSelectField
            itemsList={objectTypesList}
            selectedItems={data.selectedObjectTypes}
            onChange={(e) => setValue("selectedObjectTypes", e.target.value)}
            name="objectTypes"
            labelId="objectTypes-label"
            label="Тип объекта"
            disabled={isLoading}
          />

          <MultiSelectField
            itemsList={objectPropertiesList}
            selectedItems={data.selectedObjectProperties}
            onChange={(e) =>
              setValue("selectedObjectProperties", e.target.value)
            }
            name="objectProperties"
            labelId="objectProperties-label"
            label="Расположение объекта"
            disabled={isLoading}
          />
          <MultiSelectField
            itemsList={tradeAreaList}
            selectedItems={data.selectedTradeArea}
            onChange={(e) => setValue("selectedTradeArea", e.target.value)}
            name="objectTradeArea"
            labelId="objectTradeArea-label"
            label="Тип торговой площади"
            disabled={isLoading}
          />
          <MultiSelectField
            itemsList={currentRentersList}
            selectedItems={data.selectedCurrentRenters}
            onChange={(e) => setValue("selectedCurrentRenters", e.target.value)}
            name="currentRenters"
            labelId="currentRenters-label"
            label="Текущий арендатор"
            disabled={isLoading}
          />
        </FieldsContainer>
        <FieldsContainer>
          <SearchDatePicker
            register={register}
            name="startDate"
            label="Добавлены от"
            value={data.startDate}
            onChange={(value: string | null) => setValue("startDate", value)}
            disabled={isLoading}
          />
          <SearchDatePicker
            register={register}
            name="endDate"
            label="Добавлены до"
            value={data.endDate}
            onChange={(value: string | null) => setValue("endDate", value)}
            disabled={isLoading}
          />
          {!isCurrentUserRoleManager ? (
            <MultiSelectField
              name="users"
              labelId="users-label"
              label="Выбор по менеджеру"
              itemsList={usersList}
              selectedItems={data.selectedUsers}
              onChange={(e) => setValue("selectedUsers", e.target.value)}
              disabled={isLoading}
            />
          ) : null}
        </FieldsContainer>
      </Form>
    );
  }
);

export default ObjectsLayoutFiltersPanel;
