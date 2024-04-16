import React from "react";
import { useSelector } from "react-redux";
// components
import { FieldsContainer, Form } from "@common/forms/styled";
import MultiSelectField from "@common/inputs/multi-select-field";
import ClearFilterButton from "@common/buttons/clear-filter.button";
// utils
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";
import { getActualStatusesList } from "@utils/actual-items/get-actual-statuses-list";
// initial-states
import { objectsDatabaseLayoutInitialState } from "../../../initial-states/layouts/objects-database-layout.initial-state";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";
import { getObjectsStatusList } from "@store/object-params/object-status.store";

const ObjectsDatabaseLayoutFiltersPanel = React.memo(
  ({ data, objects, reset, setValue }) => {
    const usersList = getActualUsersList(objects);
    const objectStatuses = useSelector(getObjectsStatusList());
    const statusesList = getActualStatusesList(objects, objectStatuses);
    const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

    const isInputEmpty =
      JSON.stringify(objectsDatabaseLayoutInitialState) !==
      JSON.stringify(data);

    return (
      <Form>
        <FieldsContainer sx={{ marginTop: "1px" }}>
          {isCurrentUserRoleCurator ? (
            <MultiSelectField
              name="users"
              labelId="users-label"
              label="Выбор по менеджеру"
              itemsList={usersList}
              minWidth="250px"
              selectedItems={data.selectedUsers}
              onChange={(e) => setValue("selectedUsers", e.target.value)}
              disabled={!usersList?.length}
            />
          ) : null}

          <MultiSelectField
            name="selectedStatuses"
            labelId="selectedStatuses-label"
            label="Выбор по статусу"
            itemsList={statusesList}
            selectedItems={data.selectedStatuses}
            onChange={(e) => setValue("selectedStatuses", e.target.value)}
            disabled={!statusesList?.length}
          />
          <ClearFilterButton
            width="270px"
            maxWidth="270px"
            height="54px"
            margin="-2px 0 0 0"
            reset={reset}
            initialState={objectsDatabaseLayoutInitialState}
            disabled={!isInputEmpty}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default ObjectsDatabaseLayoutFiltersPanel;
