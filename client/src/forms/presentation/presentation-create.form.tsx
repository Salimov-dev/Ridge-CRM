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
// interfaces
import { IPresentationCreateInitState } from "@interfaces/presentation/presentation.interface";
import { IObject } from "@interfaces/object/object.interface";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";

interface PresentationCreateFormProps {
  data: IPresentationCreateInitState;
  objects: IObject[];
  register: UseFormRegister<IPresentationCreateInitState>;
  errors: FieldErrors<IPresentationCreateInitState>;
  watch: UseFormWatch<IPresentationCreateInitState>;
  setValue: UseFormSetValue<IPresentationCreateInitState>;
  isObjectPage?: boolean;
}

const PresentationCreateForm: FC<PresentationCreateFormProps> = ({
  objects,
  data,
  register,
  errors,
  setValue,
  watch,
  isObjectPage = false
}): JSX.Element => {
  const watchObjectId: string = watch("objectId");

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
      </FieldsContainer>
    </Form>
  );
};

export default PresentationCreateForm;
