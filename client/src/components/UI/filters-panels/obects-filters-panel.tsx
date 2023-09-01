// components
import SearchField from "../../common/inputs/search-field";
import SearchDatePicker from "../../common/inputs/search-date-picker";
import MultiSelectField from "../../common/inputs/multi-select-field";
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
// hooks
import useObjectsFiltersPanel from "../../../hooks/object/use-objects-filters-panel";

const ObjectsFiltersPanel = ({
  setValue,
  objects,
  data,
  register,
  isLoading,
}) => {
  const {
    getActualStatusesList,
    getActualCitiesList,
    getActualDistrictsList,
    getActualMetroList,
    getActualCurrentRentersList,
    getActualEstateTypesList,
    getActualObjectTypesList,
    getActualUsersList,
  } = useObjectsFiltersPanel(objects);

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
          label="Найти по телефону"
          name="phone"
          value={data.phone}
          inputProps={{ maxLength: 12 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по имени"
          name="name"
          value={data.name}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualStatusesList()}
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
      </FieldsContainer>

      <FieldsContainer>
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
      </FieldsContainer>

      <FieldsContainer>
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
      </FieldsContainer>
    </Form>
  );
};

export default ObjectsFiltersPanel;
