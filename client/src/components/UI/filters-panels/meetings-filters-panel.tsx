// components
import SearchField from "../../common/inputs/search-field";
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
    useMeetingFiltersPanel();

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
          itemsList={getActualStatusesList()}
          selectedItems={data.selectedStatuses}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          disabled={isLoading ? true : false}
        />
        <MultiSelectField
          name="selectedTypes"
          labelId="selectedTypes-label"
          label="Выбор по типу"
          itemsList={getActuaTypesList()}
          selectedItems={data.selectedTypes}
          onChange={(e) => setValue("selectedTypes", e.target.value)}
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>
      <FieldsContainer>
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
          name="users"
          labelId="users-label"
          label="Выбор по менеджеру"
          itemsList={getActualUsersList()}
          selectedItems={data.selectedUsers}
          onChange={(e) => setValue("selectedUsers", e.target.value)}
          disabled={isLoading ? true : false}
        />
      </FieldsContainer>
    </Form>
  );
};

export default MeetingsFiltersPanel;
