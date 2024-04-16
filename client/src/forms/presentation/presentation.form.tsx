import { useSelector } from "react-redux";
import { Box } from "@mui/material";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "@components/common/forms/styled";
// store
import { getPresentationStatusesList } from "@store/presentation/presentation-status.store";
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
  const watchStatus = watch("status");
  const presentationStatuses = useSelector(getPresentationStatusesList());
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
          disabled={isObjectPage || isCurator}
        />
        <TextFieldStyled
          register={register}
          label="Ссылка на презентацию в облаке"
          name="cloudLink"
          value={data?.cloudLink}
          errors={errors?.cloudLink}
          inputProps={{ maxLength: 150 }}
          disabled={isCurator || isCurator}
        />
        {isCurrentUserRoleCurator && (
          <Box sx={{ width: "100%", marginTop: "20px" }}>
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
              inputProps={{ maxLength: 500 }}
            />
          </Box>
        )}
      </FieldsContainer>
    </Form>
  );
};

export default PresentationForm;
