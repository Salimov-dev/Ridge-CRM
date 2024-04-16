import React from "react";
import { useSelector } from "react-redux";
// components
import { FieldsContainer, Form } from "@common/forms/styled";
import MultiSelectField from "@common/inputs/multi-select-field";
import SearchSwitch from "@common/inputs/search-switch";
import ClearFilterButton from "@common/buttons/clear-filter.button";
// data
import { statisticPositionsArray } from "@data/statistics/statistic-positions";
// initial-states
import { statisticsLayoutInitialState } from "../../../initial-states/layouts/statistics-layout.initial-state";
// store
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";

const StaticticsLayoutFiltersPanel = React.memo(
  ({ data, reset, setValue, usersList }) => {
    const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

    const isObjectsLoading = useSelector(getObjectsLoadingStatus());
    const isInputEmpty =
      JSON.stringify(statisticsLayoutInitialState) !== JSON.stringify(data);

    return isCurrentUserRoleCurator ? (
      <Form>
        <FieldsContainer>
          <MultiSelectField
            name="users"
            labelId="users-label"
            label="Выбор по менеджеру"
            itemsList={usersList}
            selectedItems={data.selectedUsers}
            onChange={(e) => setValue("selectedUsers", e.target.value)}
            disabled={isObjectsLoading}
          />
          <MultiSelectField
            name="selectedPositions"
            labelId="selectedPositions-label"
            label="Выбор по позиции"
            itemsList={statisticPositionsArray}
            selectedItems={data.selectedPositions}
            onChange={(e) => setValue("selectedPositions", e.target.value)}
            disabled={isObjectsLoading}
          />
          <SearchSwitch
            title="Без куратора"
            isLoading={isObjectsLoading}
            isChecked={data?.withoutCuratorSwitch}
            whiteSpace="nowrap"
            height="54px"
            margin="-1px"
            checked={data?.withoutCuratorSwitch}
            onChange={(e) => {
              setValue("withoutCuratorSwitch", e.target.checked);
            }}
          />
          <ClearFilterButton
            width="400px"
            margin="-1px 0 0 0"
            reset={reset}
            initialState={statisticsLayoutInitialState}
            disabled={!isInputEmpty}
          />
        </FieldsContainer>
      </Form>
    ) : null;
  }
);

export default StaticticsLayoutFiltersPanel;
