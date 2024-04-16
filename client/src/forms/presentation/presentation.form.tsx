import { useSelector } from "react-redux";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";

const PresentationForm = ({
  objects,
  data,
  register,
  errors,
  setValue,
  watch,
  isObjectPage = false
}) => {
  const watchObjectId = watch("objectId");
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

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
          disabled={isObjectPage || isCurrentUserRoleCurator}
        />
        <TextFieldStyled
          register={register}
          label="Ссылка на презентацию в облаке"
          name="cloudLink"
          value={data?.cloudLink}
          errors={errors?.cloudLink}
          inputProps={{ maxLength: 150 }}
        />
      </FieldsContainer>
    </Form>
  );
};

export default PresentationForm;
