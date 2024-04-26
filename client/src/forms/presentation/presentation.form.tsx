import { useSelector } from "react-redux";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";
import { getPresentationStatusesList } from "@store/presentation/presentation-status.store";

const PresentationForm = ({
  objects,
  data,
  register,
  errors,
  setValue,
  watch,
  isObjectPage = false,
  isAuthorEntity = false
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
          disabled={isObjectPage}
        />
        <TextFieldStyled
          register={register}
          label="Ссылка на презентацию в облаке"
          name="cloudLink"
          value={data?.cloudLink}
          errors={errors?.cloudLink}
          inputProps={{ maxLength: 150 }}
        />
        {isAuthorEntity && isCurrentUserRoleCurator ? (
          <>
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
          </>
        ) : null}
      </FieldsContainer>
    </Form>
  );
};

export default PresentationForm;
