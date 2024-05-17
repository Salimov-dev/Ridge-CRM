// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import DatePickerStyled from "@components/common/inputs/date-picker";
import FieldsContact from "@components/common/forms/dynamic-fields/fields-contact";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { Dispatch, FC, SetStateAction } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { ITaskCreateInitState } from "@interfaces/task/task.interface";

interface LastContactFormProps {
  data: ITaskCreateInitState;
  register: UseFormRegister<ITaskCreateInitState>;
  errors: FieldErrors<ITaskCreateInitState>;
  watch: UseFormWatch<ITaskCreateInitState>;
  setValue: UseFormSetValue<ITaskCreateInitState>;
  control: Control<ITaskCreateInitState>;
  setState?: Dispatch<SetStateAction<IDialogPagesState>>;
}

const LastContactForm: FC<LastContactFormProps> = ({
  data,
  register,
  errors,
  setValue,
  control,
  watch,
  setState = () => {}
}): JSX.Element => {
  return (
    <Form>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата последнего контакта *"
          value={data?.date || null}
          errors={errors?.date}
          onChange={(value: Date | null) => setValue("date", value)}
        />
        <TextFieldStyled
          register={register}
          label="Результат"
          name="result"
          required={true}
          value={capitalizeFirstLetter(data?.result)}
          errors={errors?.result}
          rows="2"
          multiline={true}
          inputProps={{ maxLength: 200 }}
        />
        <FieldsContact
          data={data}
          register={register}
          errors={errors}
          setValue={setValue}
          control={control}
          watch={watch}
          setState={setState}
        />
      </FieldsContainer>
    </Form>
  );
};

export default LastContactForm;
