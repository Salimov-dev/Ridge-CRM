// components
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
// utils
import { getActualUsersList } from "../../../utils/actual-items/get-actual-users-list";

const DealsFiltersPanel = ({
  data,
  deals,
  register,
  setValue,
  isCurator,
  isLoading,
}) => {
  const usersList = getActualUsersList(deals);

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
      </FieldsContainer>
    </Form>
  );
};

export default DealsFiltersPanel;
