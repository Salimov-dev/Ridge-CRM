import { useSelector } from "react-redux";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// store
import { getPresentationStatusesList } from "@store/presentation/presentation-status.store";

const CuratorPresentationForm = ({
  data,
  register,
  errors,
  setValue,
  watch
}) => {
  const watchStatus = watch("status");
  const presentationStatuses = useSelector(getPresentationStatusesList());

  return (
    <Form>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <AutocompleteStyled
          label="Статус объекта *"
          register={register}
          name="status"
          options={presentationStatuses}
          value={watchStatus ?? ""}
          setValue={setValue}
          watchItemId={watchStatus}
          errors={errors?.status}
        />
        <TextFieldStyled
          register={register}
          label="Комментарий куратора"
          name="curatorComment"
          rows="6"
          multiline={true}
          value={capitalizeFirstLetter(data?.curatorComment)}
          errors={errors?.curatorComment}
          inputProps={{ maxLength: 500 }}
        />
      </FieldsContainer>
    </Form>
  );
};

export default CuratorPresentationForm;
