// components
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
import SearchDatePicker from "../../common/inputs/search-date-picker";
import SearchSelectField from "../../common/inputs/search-select-field";
// hooks
import useMeetingFiltersPanel from "../../../hooks/meeting/use-meeting-filters-panel";
// mock
import { meetingDoneTypes } from "../../../mock/meeting-done-status";

const MeetingsFiltersPanel = ({ data, register, setValue, isLoading }) => {
  const { getActualUsersList, getActualStatusesList, getActuaTypesList } =
    useMeetingFiltersPanel(data);

  return (
    <Form>
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
        <MultiSelectField
          itemsList={getActualUsersList()}
          selectedItems={data.selectedUsers}
          onChange={(e) => setValue("selectedUsers", e.target.value)}
          name="users"
          labelId="users-label"
          label="Выбор по менеджеру"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActualStatusesList()}
          selectedItems={data.selectedStatuses}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          name="selectedStatuses"
          labelId="selectedStatuses-label"
          label="Выбор по статусу"
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          itemsList={getActuaTypesList()}
          selectedItems={data.selectedTypes}
          onChange={(e) => setValue("selectedTypes", e.target.value)}
          name="selectedTypes"
          labelId="selectedTypes-label"
          label="Выбор по типу"
          disabled={isLoading ? true : false}
        />
        <SearchSelectField
          register={register}
          name="selectedDoneMeetTypes"
          labelId="selectedDoneMeetTypes"
          label="Выбор по активности"
          itemsList={meetingDoneTypes}
          value={data.selectedDoneMeetTypes}
          disabled={isLoading ? true : false}
          isSelect={Boolean(data.selectedDoneMeetTypes.length)}
        />
      </FieldsContainer>
    </Form>
  );
};

export default MeetingsFiltersPanel;
