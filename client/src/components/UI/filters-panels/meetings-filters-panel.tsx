import { orderBy } from "lodash";
// components
import SearchField from "../../common/inputs/search-field";
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
import SearchDatePicker from "../../common/inputs/search-date-picker";
import SearchSelectField from "../../common/inputs/search-select-field";
// mock
import { meetingDoneTypes } from "../../../mock/meetings/meeting-done-status";
// utils
import { getActualUsersList } from "../../../utils/actual-items/get-actual-users-list";
import { getActualStatusesList } from "../../../utils/actual-items/get-actual-statuses-list";

const MeetingsFiltersPanel = ({
  data,
  meetings,
  statuses,
  types,
  register,
  setValue,
  isCurator,
  isLoading,
}) => {
  const usersList = getActualUsersList(meetings);
  const statusesList = getActualStatusesList(meetings, statuses);

  const getActualTypesList = () => {
    const filteredTypes = meetings?.map((meet) => meet?.meetingType);
    const formatedTypesArray = filteredTypes?.filter((type) => type !== "");
    const uniqueTypes = [...new Set(formatedTypesArray)];

    const actualTypesArray = uniqueTypes?.map((id) => {
      const foundObject = types?.find((type) => type._id === id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: foundObject.name,
          }
        : null;
    });

    const sortedTypes = orderBy(actualTypesArray, ["name"], ["asc"]);

    return sortedTypes;
  };

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
          itemsList={getActualTypesList()}
          selectedItems={data.selectedTypes}
          onChange={(e) => setValue("selectedTypes", e.target.value)}
          disabled={isLoading ? true : false}
        />
        {isCurator ? (
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
      </FieldsContainer>
    </Form>
  );
};

export default MeetingsFiltersPanel;
