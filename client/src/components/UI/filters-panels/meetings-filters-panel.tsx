import MultiSelectField from "../../common/inputs/multi-select-field";
import SearchDatePicker from "../../common/inputs/search-date-picker";
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import useMeetingFiltersPanel from "../../../hooks/meeting/use-meeting-filters-panel";
import { meetingDoneTypes } from "../../../mock/meeting-done-status";
import SimpleSelectField from "../../common/inputs/simple-select-field";

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
        <SimpleSelectField
          register={register}
          itemsList={meetingDoneTypes}
          selectedItems={data.selectedDoneMeetTypes}
          name="selectedDoneMeetTypes"
          labelId="selectedDoneMeetTypes"
          label="Выбрать по выполнению"
          value={data.selectedDoneMeetTypes}
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>
    </Form>
  );
};

export default MeetingsFiltersPanel;
