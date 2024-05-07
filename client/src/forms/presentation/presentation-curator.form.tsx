import { useSelector } from "react-redux";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { FC } from "react";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// store
import { getPresentationStatusesList } from "@store/presentation/presentation-status.store";
// types
import { IPresentation } from "@interfaces/presentation/presentation.interfaces";

interface CuratorPresentationFormProps {
  data: IPresentation;
  register: UseFormRegister<IPresentation>;
  errors: FieldErrors<IPresentation>;
  watch: UseFormWatch<IPresentation>;
  setValue: UseFormSetValue<IPresentation>;
}

const CuratorPresentationForm: FC<CuratorPresentationFormProps> = ({
  data,
  register,
  errors,
  setValue,
  watch
}) => {
  const watchStatus: string = watch("status");
  const presentationStatuses: string[] = useSelector(
    getPresentationStatusesList()
  );

  return (
    <Form>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <AutocompleteStyled
          label="Статус презентации *"
          register={register}
          name="status"
          options={presentationStatuses}
          value={watchStatus ?? ""}
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
          value={capitalizeFirstLetter(data?.curatorComment)}
          errors={errors?.curatorComment}
          inputProps={{ maxLength: 500 }}
        />
      </FieldsContainer>
    </Form>
  );
};

export default CuratorPresentationForm;
