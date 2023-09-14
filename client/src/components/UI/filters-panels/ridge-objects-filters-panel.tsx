// components
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
import SearchDatePicker from "../../common/inputs/search-date-picker";
import SearchField from "../../common/inputs/search-field";
import SearchSelectField from "../../common/inputs/search-select-field";
// hooks
import useRidgeObjectsFiltersPanel from "../../../hooks/ridge/use-ridge-object-filters-panel";
// mock
import { ridgeObjectActivityVariants } from "../../../mock/ridge-object-activity-variants";

const RidgeObjectsFiltersPanel = ({
  objects,
  data,
  register,
  setValue,
  isLoading,
}) => {
  const {
    getActualStatusesList,
    getActualCitiesList,
    getActualDistrictsList,
    getActualMetroList,
  } = useRidgeObjectsFiltersPanel(objects);

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
          label="Найти по контактам"
          name="contacts"
          value={data.contacts}
          inputProps={{ maxLength: 20 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по комментарию"
          name="comment"
          value={data.comment}
          inputProps={{ maxLength: 20 }}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          name="selectedStatuses"
          labelId="selectedStatuses-label"
          label="Выбор по статусу"
          itemsList={getActualStatusesList()}
          selectedItems={data.selectedStatuses}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <SearchSelectField
          register={register}
          name="objectActivity"
          labelId="objectActivity"
          label="Выбор по активности"
          itemsList={ridgeObjectActivityVariants}
          value={data.objectActivity}
          disabled={isLoading ? true : false}
          isSelect={Boolean(data?.objectActivity?.length)}
        />
      </FieldsContainer>
      <FieldsContainer>
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
          name="districts"
          labelId="districts-label"
          label="Выбор по району"
          itemsList={getActualDistrictsList()}
          selectedItems={data.selectedDistricts}
          onChange={(e) => setValue("selectedDistricts", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          name="cities"
          labelId="cities-label"
          label="Выбор по городу"
          itemsList={getActualCitiesList()}
          selectedItems={data.selectedCities}
          onChange={(e) => setValue("selectedCities", e.target.value)}
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

export default RidgeObjectsFiltersPanel;
