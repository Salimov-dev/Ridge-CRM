// components
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import MultiSelectField from "../../common/inputs/multi-select-field";
// hooks
import useDealsFiltersPanel from "../../../hooks/deals/use-deals-filters-panel";
import useObjectsDatabaseFiltersPanel from "../../../hooks/objects-database/use-object-database-filters-panel";

const ObjectsDatabaseFiltersPanel = ({
  data,
  objects,
  register,
  setValue,
  isCurator,
  isLoading,
}) => {
  const { getActualUsersList } = useObjectsDatabaseFiltersPanel(objects);

  return (
    <Form>
      <FieldsContainer>
        {isCurator ? (
          <MultiSelectField
            name="users"
            labelId="users-label"
            label="Выбор по менеджеру"
            itemsList={getActualUsersList()}
            selectedItems={data.selectedUsers}
            onChange={(e) => setValue("selectedUsers", e.target.value)}
            disabled={isLoading ? true : false}
          />
        ) : null}
      </FieldsContainer>
    </Form>
  );
};

export default ObjectsDatabaseFiltersPanel;
