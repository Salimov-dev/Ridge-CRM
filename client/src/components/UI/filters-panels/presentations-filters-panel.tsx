// components
import SearchField from "../../common/inputs/search-field";
import { FieldsContainer, Form } from "../../common/forms/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
import SearchDatePicker from "../../common/inputs/search-date-picker";
// utils
import { getActualUsersList } from "../../../utils/actual-items/get-actual-users-list";
import { getActualStatusesList } from "../../../utils/actual-items/get-actual-statuses-list";
import React from "react";

const PresentationsFiltersPanel = React.memo(
  ({
    presentations,
    statuses,
    data,
    register,
    setValue,
    isManager,
    isLoading
  }) => {
    const usersList = getActualUsersList(presentations);
    const statusesList = getActualStatusesList(presentations, statuses);

    return (
      <Form>
        <FieldsContainer>
          <SearchField
            register={register}
            label="Найти по адресу"
            name="objectAddress"
            value={data.objectAddress}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по комментарию Куратора"
            name="curatorComment"
            value={data.curatorComment}
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
        </FieldsContainer>
        <FieldsContainer>
          <SearchDatePicker
            register={register}
            name="startDate"
            label="Добавлены от"
            value={data.startDate}
            onChange={(value) => setValue("startDate", value)}
            disabled={isLoading ? true : false}
          />
          <SearchDatePicker
            register={register}
            name="endDate"
            label="Добавлены до"
            value={data.endDate}
            onChange={(value) => setValue("endDate", value)}
            disabled={isLoading ? true : false}
          />
          {!isManager ? (
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

export default PresentationsFiltersPanel;
