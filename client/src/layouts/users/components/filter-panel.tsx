import { Box, styled } from "@mui/material";
// components
import SearchField from "../../../components/common/inputs/search-field";
import MultiSelectField from "../../../components/common/inputs/multi-select-field";
import SimpleSelectField from "../../../components/common/inputs/simple-select-field";
// mock
import { gendersArray } from "../../../mock/genders";

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

const FiltersPanel = ({
  data,
  usersList,
  statusesList,
  register,
  setValue,
  handleKeyDown,
  isLoading,
}) => {
  return (
    <Form>
      <FieldsContainer>
        <SearchField
          register={register}
          label="Найти по фамилии"
          name="lastName"
          onKeyDown={handleKeyDown}
          value={data.lastName}
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
          label="Найти по email"
          name="email"
          value={data.email}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
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
        <SimpleSelectField
          register={register}
          itemsList={gendersArray}
          selectedItems={data.gender}
          name="gender"
          labelId="gender"
          label="Пол"
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>
    </Form>
  );
};

export default FiltersPanel;
