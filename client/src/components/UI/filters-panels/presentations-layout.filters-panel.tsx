import React, { FC } from "react";
import { useSelector } from "react-redux";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@styled/styled-form";
import MultiSelectField from "@common/inputs/multi-select-field";
import SearchDatePicker from "@common/inputs/search-date-picker";
// utils
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";
import { getActualStatusesList } from "@utils/actual-items/get-actual-statuses-list";
// types
import { IPresentationsLayoutInitialState } from "src/types/initial-state/presentations-layout-init-state.types";
// store
import { getIsCurrentUserRoleManager } from "@store/user/users.store";
import { getPresentationStatusesList } from "@store/presentation/presentation-status.store";
import {
  getPresentationsList,
  getPresentationsLoadingStatus
} from "@store/presentation/presentations.store";

interface PresentationsLayoutFiltersPanelProps {
  data: IPresentationsLayoutInitialState;
  register: UseFormRegister<IPresentationsLayoutInitialState>;
  setValue: UseFormSetValue<IPresentationsLayoutInitialState>;
}

const PresentationsLayoutFiltersPanel: FC<PresentationsLayoutFiltersPanelProps> =
  React.memo(({ data, register, setValue }): JSX.Element => {
    const presentationsList = useSelector(getPresentationsList());
    const presentationsStatuses = useSelector(getPresentationStatusesList());
    const usersList = getActualUsersList(presentationsList);

    const isLoading = useSelector(getPresentationsLoadingStatus());
    const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

    const statusesList = getActualStatusesList(
      presentationsList,
      presentationsStatuses
    );

    return (
      <Form>
        <FieldsContainer>
          <SearchField
            register={register}
            label="Найти по адресу"
            name="objectAddress"
            value={data.objectAddress}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти по комментарию Куратора"
            name="curatorComment"
            value={data.curatorComment}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
          <MultiSelectField
            name="selectedStatuses"
            labelId="selectedStatuses-label"
            label="Выбор по статусу"
            itemsList={statusesList}
            selectedItems={data.selectedStatuses}
            onChange={(e) => setValue("selectedStatuses", e.target.value)}
            disabled={isLoading}
          />
        </FieldsContainer>
        <FieldsContainer>
          <SearchDatePicker
            register={register}
            name="startDate"
            label="Добавлены от"
            value={data.startDate}
            onChange={(value: string | null) => setValue("startDate", value)}
            disabled={isLoading}
          />
          <SearchDatePicker
            register={register}
            name="endDate"
            label="Добавлены до"
            value={data.endDate}
            onChange={(value: string | null) => setValue("endDate", value)}
            disabled={isLoading}
          />
          {!isCurrentUserRoleManager ? (
            <MultiSelectField
              name="users"
              labelId="users-label"
              label="Выбор по менеджеру"
              itemsList={usersList}
              selectedItems={data.selectedUsers}
              onChange={(e) => setValue("selectedUsers", e.target.value)}
              disabled={isLoading}
            />
          ) : null}
        </FieldsContainer>
      </Form>
    );
  });

export default PresentationsLayoutFiltersPanel;
