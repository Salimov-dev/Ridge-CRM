import React from "react";
import { useSelector } from "react-redux";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@components/common/forms/styled";
import MultiSelectField from "@common/inputs/multi-select-field";
import SearchDatePicker from "@common/inputs/search-date-picker";
import SearchSelectField from "@common/inputs/search-select-field";
// data
import { meetingDoneTypes } from "@data/meetings/meeting-done-status";
// utils
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";
import { getActualStatusesList } from "@utils/actual-items/get-actual-statuses-list";
import { getActualTypesList } from "@utils/actual-items/get-actual-types-list";
// store
import { getIsCurrentUserRoleManager } from "@store/user/users.store";
import { getMeetingStatusesList } from "@store/meeting/meeting-status.store";
import { getMeetingTypesList } from "@store/meeting/meeting-types.store";
import {
  getMeetingLoadingStatus,
  getMeetingsList
} from "@store/meeting/meetings.store";

const MeetingsLayoutFiltersPanel = React.memo(
  ({ data, register, setValue }) => {
    const meetings = useSelector(getMeetingsList());
    const statuses = useSelector(getMeetingStatusesList());
    const types = useSelector(getMeetingTypesList());

    const usersList = getActualUsersList(meetings, true);
    const statusesList = getActualStatusesList(meetings, statuses);
    const typesList = getActualTypesList(meetings, types);

    const isLoading = useSelector(getMeetingLoadingStatus());
    const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

    return (
      <Form>
        <FieldsContainer>
          <SearchField
            register={register}
            label="Найти по результату"
            name="result"
            value={data.result}
            inputProps={{ maxLength: 30 }}
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
          <MultiSelectField
            name="selectedTypes"
            labelId="selectedTypes-label"
            label="Выбор по типу"
            itemsList={typesList}
            selectedItems={data.selectedTypes}
            onChange={(e) => setValue("selectedTypes", e.target.value)}
            disabled={isLoading ? true : false}
          />
        </FieldsContainer>
        <FieldsContainer>
          <SearchDatePicker
            register={register}
            name="startDate"
            label="Назначены от"
            value={data.startDate}
            onChange={(value) => setValue("startDate", value)}
            disabled={isLoading ? true : false}
          />
          <SearchDatePicker
            register={register}
            name="endDate"
            label="Назначены до"
            value={data.endDate}
            onChange={(value) => setValue("endDate", value)}
            disabled={isLoading ? true : false}
          />
          <SearchSelectField
            register={register}
            name="meetingsActivity"
            labelId="meetingsActivity"
            label="Выбор по активности"
            itemsList={meetingDoneTypes}
            value={data.meetingsActivity}
            disabled={isLoading ? true : false}
            isSelect={Boolean(data?.meetingsActivity?.length)}
          />
          {!isCurrentUserRoleManager ? (
            <MultiSelectField
              name="users"
              labelId="users-label"
              label="Выбор по менеджеру"
              itemsList={usersList}
              selectedItems={data.selectedUsers}
              onChange={(e) => setValue("selectedUsers", e.target.value)}
              disabled={isLoading ? true : false}
            />
          ) : null}
        </FieldsContainer>
      </Form>
    );
  }
);

export default MeetingsLayoutFiltersPanel;