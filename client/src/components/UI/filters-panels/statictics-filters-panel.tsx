// components
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
// utils
import { getActualUsersList } from "../../../utils/actual-items/get-actual-users-list";
import SearchSwitch from "../../common/inputs/search-switch";

const StaticticsFiltersPanel = ({
  data,
  objects,
  objectsWithoutCurrentUser,
  withoutCurator,
  register,
  setValue,
  isCurator,
  isLoading,
}) => {
  const usersList = getActualUsersList(withoutCurator ? objectsWithoutCurrentUser : objects);

  return (
    <Form>
      <FieldsContainer>
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
        <SearchSwitch
          title="Без куратора"
          isLoading={isLoading}
          isChecked={data?.withoutCurator}
          whiteSpace="nowrap"
          height="54px"
          margin='-1px'
          checked={data?.withoutCurator}
          onChange={(e) => {
            setValue("withoutCurator", e.target.checked);
          }}
        /> 
      </FieldsContainer>
    </Form>
  );
};

export default StaticticsFiltersPanel;
