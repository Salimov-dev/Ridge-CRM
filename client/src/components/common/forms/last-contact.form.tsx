// components
import TextFieldStyled from "../inputs/text-field-styled";
import DatePickerStyled from "../inputs/date-picker";
// styled
import { FieldsContainer, Form } from "./styled/styled";
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
