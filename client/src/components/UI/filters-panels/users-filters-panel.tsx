// components
import SearchField from "../../common/inputs/search-field";
import MultiSelectField from "../../common/inputs/multi-select-field";
import SimpleSelectField from "../../common/inputs/simple-select-field";
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
// mock
import { gendersArray } from "../../../mock/genders";

const UsersFiltersPanel = ({
  register,
  data,
  usersList,
  statusesList,
  setValue,
  isLoading,
}) => {
  return (
    <Form>
      <FieldsContainer>
        <SearchField
          register={register}
          label="Найти по фамилии"
          name="lastName"
          value={data.lastName}
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
          label="Найти по email"
          name="email"
          value={data.email}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          name="users"
          labelId="users-label"
          label="Выбор по менеджеру"
          itemsList={usersList}
          selectedItems={data.selectedUsers}
          onChange={(e) => setValue("selectedUsers", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          name="selectedStatuses"
          labelId="selectedStatuses-label"
          label="Выбор по статусу"
          itemsList={statusesList}
          selectedItems={data.selectedStatuses}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <SimpleSelectField
          register={register}
          name="gender"
          labelId="gender"
          label="Пол"
          value={data.gender}
          itemsList={gendersArray}
          selectedItems={data.gender}
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>
    </Form>
  );
};

export default UsersFiltersPanel;
