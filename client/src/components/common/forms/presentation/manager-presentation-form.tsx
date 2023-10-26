import { useSelector } from "react-redux";
import { Box } from "@mui/material";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import AutocompleteStyled from "../../inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "../styled/styled";
// store
import { getPresentationStatusList } from "../../../../store/presentation/presentation-status.store";

const ManagerPresentationForm = ({
  objects,
  data,
  register,
  errors,
  setValue,
  watch,
  isObjectPage = false,
  isCurator = false,
}) => {
  const watchObjectId = watch("objectId");
  const watchStatus = watch("status");
  const presentationStatuses = useSelector(getPresentationStatusList());

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
        {isCurator && (
          <Box sx={{ marginTop: "20px" }}>
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
              label="Комментарий Куратора"
              name="curatorComment"
              rows="6"
              multiline={true}
              value={data?.curatorComment}
              errors={errors?.curatorComment}
              onInputQuantities={500}
            />
          </Box>
        )}
      </FieldsContainer>
    </Form>
  );
};

export default ManagerPresentationForm;
