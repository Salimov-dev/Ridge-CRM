// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import SimpleSelectField from "@components/common/inputs/simple-select-field";

const TransferObjectToAnotherManagerForm = ({
  users,
  objects,
  register,
  errors,
  watch
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
          errors={errors?.managerId}
        />
      </FieldsContainer>
    </Form>
  );
};

export default TransferObjectToAnotherManagerForm;
