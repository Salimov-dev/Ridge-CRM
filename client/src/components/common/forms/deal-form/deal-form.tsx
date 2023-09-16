// components
import SimpleSelectField from "../../inputs/simple-select-field";
// styled
import { FieldsContainer, Form } from "../styled/styled";

const DealForm = ({
  stages = [],
  objects = [],
  isEditMode = false,
  register,
  errors = null,
  watch,
}) => {
  const watchStageId = watch("stageId", "");
  const watchObjectId = watch("objectId", "");

  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <SimpleSelectField
          register={register}
          name="stageId"
          labelId="stageId"
          label="Этап сделки"
          itemsList={stages}
          value={watchStageId}
          errors={errors?.stageId}
        />
        <SimpleSelectField
          register={register}
          name="objectId"
          labelId="objectId"
          label="Объект сделки"
          itemsList={objects}
          value={watchObjectId}
          errors={errors?.objectId}
          disabled={isEditMode}
        />
      </FieldsContainer>
    </Form>
  );
};

export default DealForm;
