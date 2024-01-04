// components
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
// utils
import { getActualUsersList } from "../../../utils/actual-items/get-actual-users-list";
import ClearFilterButton from "../../common/buttons/clear-filter.button";
import React from "react";

const DealsFiltersPanel = React.memo(
  ({
    data,
    deals,
    register,
    reset,
    setValue,
    initialState,
    isInputEmpty,
    isLoading,
  }) => {
    const usersList = getActualUsersList(deals);

    return (
      <Form>
        <FieldsContainer>
          <MultiSelectField
            name="users"
            labelId="users-label"
            label="Выбор по менеджеру"
            itemsList={usersList}
            selectedItems={data.selectedUsers}
            onChange={(e) => setValue("selectedUsers", e.target.value)}
            disabled={isLoading ? true : false}
          />
          <ClearFilterButton
            width="200px"
            margin="-1px 0 0 0"
            reset={reset}
            initialState={initialState}
            disabled={!isInputEmpty}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default DealsFiltersPanel;
