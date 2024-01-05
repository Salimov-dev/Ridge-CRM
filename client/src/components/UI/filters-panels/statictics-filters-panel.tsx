// components
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
// utils
import { getActualUsersList } from "../../../utils/actual-items/get-actual-users-list";
import SearchSwitch from "../../common/inputs/search-switch";
import { statisticPositionsArray } from "../../../data/statistics/statistic-positions";
import ClearFilterButton from "../../common/buttons/clear-filter.button";
import React from "react";

const StaticticsFiltersPanel = React.memo(
  ({
    data,
    objects,
    objectsWithoutCurrentUser,
    withoutCurator,
    register,
    reset,
    initialState,
    setValue,
    isInputEmpty,
    isLoading,
  }) => {
    const usersList = getActualUsersList(
      withoutCurator ? objectsWithoutCurrentUser : objects
    );

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
          <MultiSelectField
            name="selectedPositions"
            labelId="selectedPositions-label"
            label="Выбор по позиции"
            itemsList={statisticPositionsArray}
            selectedItems={data.selectedPositions}
            onChange={(e) => setValue("selectedPositions", e.target.value)}
            disabled={isLoading ? true : false}
          />
          <SearchSwitch
            title="Без куратора"
            isLoading={isLoading}
            isChecked={data?.withoutCurator}
            whiteSpace="nowrap"
            height="54px"
            margin="-1px"
            checked={data?.withoutCurator}
            onChange={(e) => {
              setValue("withoutCurator", e.target.checked);
            }}
          />
          <ClearFilterButton
            width="400px"
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

export default StaticticsFiltersPanel;
