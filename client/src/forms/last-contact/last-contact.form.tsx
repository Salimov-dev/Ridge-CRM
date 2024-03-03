// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import DatePickerStyled from "@components/common/inputs/date-picker";
// components
import { FieldsContainer, Form } from "@components/common/forms/styled";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import FieldsContact from "@components/common/forms/dynamic-fields/fields-contact";

const LastContactForm = ({
  data,
  register,
  errors,
  setValue,
  control,
  watch,
  setState = () => {}
}) => {
  return (
    <Form>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата последнего контакта *"
          value={data?.date || null}
          errors={errors?.date}
          onChange={(value) => setValue("date", value)}
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
