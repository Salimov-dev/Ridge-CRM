import { useSelector } from "react-redux";
import { FC } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// types
import { IPresentation } from "src/types/presentation/presentation.interface";
import { IObject } from "src/types/object/object.interface";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";
import { getPresentationStatusesList } from "@store/presentation/presentation-status.store";

interface PresentationFormProps {
  objects: IObject[];
  data: IPresentation;
  register: UseFormRegister<IPresentation>;
  errors: FieldErrors<IPresentation>;
  watch: UseFormWatch<IPresentation>;
  setValue: UseFormSetValue<IPresentation>;
  isObjectPage?: boolean;
  isAuthorEntity: boolean;
}

const PresentationForm: FC<PresentationFormProps> = ({
  objects,
  data,
  register,
  errors,
  setValue,
  watch,
  isObjectPage = false,
  isAuthorEntity = false
}): JSX.Element => {
  const watchObjectId: string = watch("objectId");
  const watchStatus: string = watch("status");

  const presentationStatuses: string[] = useSelector(
    getPresentationStatusesList()
  );
  const isCurrentUserRoleCurator: boolean = useSelector(
    getIsCurrentUserRoleCurator()
  );

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
          maxHeightListBox="8rem"
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
