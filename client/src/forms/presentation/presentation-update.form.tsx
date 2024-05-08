import { FC } from "react";
import { useSelector } from "react-redux";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// store
import { getPresentationStatusesList } from "@store/presentation/presentation-statuses.store";
// types
import { IPresentation } from "@interfaces/presentation/presentation.interface";
import { IObject } from "@interfaces/object/object.interface";

interface PresentationUpdateFormProps {
  data: IPresentation;
  objects: IObject[];
  register: UseFormRegister<IPresentation>;
  errors: FieldErrors<IPresentation>;
  watch: UseFormWatch<IPresentation>;
  setValue: UseFormSetValue<IPresentation>;
}

const PresentationUpdateForm: FC<PresentationUpdateFormProps> = ({
  objects,
  data,
  register,
  errors,
  setValue,
  watch
}) => {
  const watchStatus: string = watch("status");
  const watchObjectId: string = watch("objectId");

  const presentationStatuses = useSelector(getPresentationStatusesList());

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
          disabled={true}
          maxHeightListBox="8rem"
          optionLabel={(option: IObject) =>
            `${option?.city}, ${option?.address}`
          }
        />
        <TextFieldStyled
          register={register}
          label="Ссылка на презентацию в облаке"
          name="cloudLink"
          value={data?.cloudLink}
          errors={errors?.cloudLink}
          inputProps={{ maxLength: 150 }}
        />
        <AutocompleteStyled
          label="Статус презентации *"
          register={register}
          name="status"
          options={presentationStatuses}
          value={watchStatus}
          setValue={setValue}
          watchItemId={watchStatus}
          errors={errors?.status}
          maxHeightListBox="10rem"
        />
        <TextFieldStyled
          register={register}
          label="Комментарий куратора"
          name="curatorComment"
          rows="6"
          multiline={true}
          value={capitalizeFirstLetter(data?.curatorComment) ?? ""}
          errors={errors?.curatorComment}
          inputProps={{ maxLength: 500 }}
        />
      </FieldsContainer>
    </Form>
  );
};

export default PresentationUpdateForm;
