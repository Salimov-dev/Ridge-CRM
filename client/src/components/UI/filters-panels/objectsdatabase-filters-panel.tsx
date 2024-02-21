import React from "react";
// components
import { FieldsContainer, Form } from "../../common/forms/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
import ClearFilterButton from "../../common/buttons/clear-filter.button";
// utils
import { getActualUsersList } from "../../../utils/actual-items/get-actual-users-list";
import { getActualStatusesList } from "../../../utils/actual-items/get-actual-statuses-list";

const ObjectsDatabaseFiltersPanel = React.memo(
  ({
    data,
    objects,
    statuses,
    register,
    reset,
    setValue,
    initialState,
    isInputEmpty,
    isCurator,
    isLoading
  }) => {
    const usersList = getActualUsersList(objects);
    const statusesList = getActualStatusesList(objects, statuses);

    return (
      <Form>
        <FieldsContainer sx={{ marginTop: "1px" }}>
          {isCurator ? (
            <MultiSelectField
              name="users"
              labelId="users-label"
              label="Выбор по менеджеру"
              itemsList={usersList}
              minWidth="250px"
              selectedItems={data.selectedUsers}
              onChange={(e) => setValue("selectedUsers", e.target.value)}
              disabled={isLoading ? true : false}
            />
          ) : null}
          <MultiSelectField
            name="selectedStatuses"
            labelId="selectedStatuses-label"
            label="Выбор по статусу"
            itemsList={statusesList}
            selectedItems={data.selectedStatuses}
            onChange={(e) => setValue("selectedStatuses", e.target.value)}
            disabled={isLoading ? true : false}
          />
          <ClearFilterButton
            width="270px"
            maxWidth="270px"
            height="54px"
            margin="-2px 0 0 0"
            reset={reset}
            initialState={initialState}
            disabled={!isInputEmpty}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default ObjectsDatabaseFiltersPanel;
