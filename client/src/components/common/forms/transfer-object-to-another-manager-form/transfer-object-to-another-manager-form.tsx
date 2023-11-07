// styled
import { FieldsContainer, Form } from "../styled/styled";
// components
import SimpleSelectField from "../../inputs/simple-select-field";

const TransferObjectToAnotherManagerForm = ({
  users,
  objects,
  register,
  watch,
}) => {
  const watchManagerId = watch("managerId", "");

  return (
    <Form noValidate>
      <FieldsContainer>
        <SimpleSelectField
          register={register}
          name="managerId"
          labelId="managerId"
          label="Менеджер"
          itemsList={users}
          value={watchManagerId}
          disabled={!objects?.length}
        />
      </FieldsContainer>
    </Form>
  );
};

export default TransferObjectToAnotherManagerForm;
