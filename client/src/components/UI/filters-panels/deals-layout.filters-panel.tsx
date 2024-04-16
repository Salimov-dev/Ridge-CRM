import React from "react";
import { useSelector } from "react-redux";
// components
import { FieldsContainer, Form } from "@styled/styled-form";
import MultiSelectField from "@common/inputs/multi-select-field";
// utils
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";
import ClearFilterButton from "@common/buttons/clear-filter.button";
// initial-state
import { dealsLayoutInitialState } from "../../../initial-states/layouts/deals-layout.initial-state";
// store
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import { getIsCurrentUserRoleManager } from "@store/user/users.store";

const DealsLayoutFiltersPanel = React.memo(
  ({ data, deals, reset, setValue }) => {
    const usersList = getActualUsersList(deals, true);
    const isLoading = useSelector(getObjectsLoadingStatus());
    const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
    const isInputEmpty =
      JSON.stringify(dealsLayoutInitialState) !== JSON.stringify(data);

    return !isCurrentUserRoleManager ? (
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
            initialState={dealsLayoutInitialState}
            disabled={!isInputEmpty}
          />
        </FieldsContainer>
      </Form>
    ) : null;
  }
);

export default DealsLayoutFiltersPanel;
