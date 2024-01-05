// components
import SearchField from "../../common/inputs/search-field";
import MultiSelectField from "../../common/inputs/multi-select-field";
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import SearchSelectField from "../../common/inputs/search-select-field";
// mock
import { gendersArray } from "../../../data/genders";
import React from "react";

const UsersFiltersPanel = React.memo(
  ({ register, data, users, statuses, setValue, isLoading }) => {
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
            itemsList={users}
            selectedItems={data.selectedUsers}
            onChange={(e) => setValue("selectedUsers", e.target.value)}
            disabled={isLoading ? true : false}
          />
          <MultiSelectField
            name="selectedStatuses"
            labelId="selectedStatuses-label"
            label="Выбор по статусу"
            itemsList={statuses}
            selectedItems={data.selectedStatuses}
            onChange={(e) => setValue("selectedStatuses", e.target.value)}
            disabled={isLoading ? true : false}
          />
          <SearchSelectField
            register={register}
            name="gender"
            labelId="gender"
            label="Пол"
            value={data.gender}
            itemsList={gendersArray}
            disabled={isLoading ? true : false}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default UsersFiltersPanel;
