import React from "react";
import { useSelector } from "react-redux";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@styled/styled-form";
import SearchSelectField from "@common/inputs/search-select-field";
// data
import { userGendersArray } from "@data/users/user-genders";
// store
import { getUsersLoadingStatus } from "@store/user/users.store";

const UsersLayoutFiltersPanel = React.memo(({ data, register }) => {
  const isLoading = useSelector(getUsersLoadingStatus());
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
        <SearchSelectField
          register={register}
          name="gender"
          labelId="gender"
          label="Пол"
          value={data.gender}
          itemsList={userGendersArray}
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>
    </Form>
  );
});

export default UsersLayoutFiltersPanel;
