import { useSelector } from "react-redux";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import AutocompleteStyled from "../../inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "../styled/styled";
// store
import { getPresentationStatusList } from "../../../../store/presentation/presentation-status.store";

const CuratorPresentationForm = ({
  data,
  register,
  errors,
  setValue,
  watch,
}) => {
  const watchStatus = watch("status");
  const presentationStatuses = useSelector(getPresentationStatusList());

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
          label="Ссылка на презентацию в облаке"
          name="curatorComment"
          rows="6"
          multiline={true}
          value={data?.curatorComment}
          errors={errors?.curatorComment}
          onInputQuantities={500}
        />
      </FieldsContainer>
    </Form>
  );
};

export default CuratorPresentationForm;
