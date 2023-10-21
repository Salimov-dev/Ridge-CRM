// components
import TextFieldStyled from "../../inputs/text-field-styled";
// styled
import { FieldsContainer, Form } from "../styled/styled";
import AutocompleteStyled from "../../inputs/autocomplete-styled";

const AddPresentationForm = ({
  objects,
  data,
  register,
  errors,
  setValue,
  watch,
  isUpdate = false,
  isObjectPage = false,
}) => {
  const watchObjectId = watch("objectId")
  
  return (
    <Form>
      <FieldsContainer sx={{ flexDirection: "column" }}>
      <AutocompleteStyled
        label="Объект"
        register={register}
        name="objectId"
        options={objects}
        value={data.objectId}
        setValue={setValue}
        watchItemId={watchObjectId}
        errors={errors?.objectId}
        disabled={isObjectPage}
      />
        <TextFieldStyled
          register={register}
          label="Ссылка на презентацию в облаке"
          name="cloudLink"
          value={data?.cloudLink}
          errors={errors?.cloudLink}
          onInputQuantities={200}
        />
      </FieldsContainer>
     
    </Form>
  );
};

export default AddPresentationForm;
