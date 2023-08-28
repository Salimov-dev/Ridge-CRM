import MultiSelectField from "../../../components/common/inputs/multi-select-field";
import SearchDatePicker from "../../../components/common/inputs/search-date-picker";
import SearchField from "../../../components/common/inputs/search-field";
import SimpleSelectField from "../../../components/common/inputs/simple-select-field";
import { Box, styled } from "@mui/material";

const Form = styled(`form`)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "10px",
  gap: "12px",
});

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const FilterPanel = ({
  data,
  register,
  setValue,
  isLoading,
  usersList,
  statusesList,
  typesList,
}) => {
  return (
    <Form>
      <FieldsContainer>
        <SearchDatePicker
          register={register}
          name="startDate"
          label="Назначены от"
          value={data.startDate}
          onChange={(value) => setValue("startDate", value)}
          isLoading={isLoading}
        />
        <SearchDatePicker
          register={register}
          name="endDate"
          label="Назначены до"
          value={data.endDate}
          onChange={(value) => setValue("endDate", value)}
          isLoading={isLoading}
        />
        <MultiSelectField
          itemsList={usersList}
          selectedItems={data.selectedUsers}
          onChange={(e) => setValue("selectedUsers", e.target.value)}
          name="users"
          labelId="users-label"
          label="Выбор по менеджеру"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={statusesList}
          selectedItems={data.selectedStatuses}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          name="selectedStatuses"
          labelId="selectedStatuses-label"
          label="Выбор по статусу"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={typesList}
          selectedItems={data.selectedTypes}
          onChange={(e) => setValue("selectedTypes", e.target.value)}
          name="selectedTypes"
          labelId="selectedTypes-label"
          label="Выбор по типу"
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>
    </Form>
  );
};

export default FilterPanel;
