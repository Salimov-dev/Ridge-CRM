// components
import TextFieldStyled from "../components/common/inputs/text-field-styled";
import DatePickerStyled from "../components/common/inputs/date-picker";
// styled
import { FieldsContainer, Form } from "../components/common/forms/styled";
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";

const LastContactForm = ({ data, register, errors, setValue }) => {
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
          onInputQuantities={200}
        />
      </FieldsContainer>
    </Form>
  );
};

export default LastContactForm;