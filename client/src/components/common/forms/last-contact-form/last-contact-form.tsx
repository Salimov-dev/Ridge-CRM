// components
import TextFieldStyled from "../../inputs/text-field-styled";
import DatePickerStyled from "../../inputs/date-picker";
// styled
import { FieldsContainer, Form } from "../styled/styled";

const LastContactForm = ({ data, register, errors, setValue }) => {
  return (
    <Form>
      <FieldsContainer
        sx={{ display: "flex", flexDirection: "column", color: "yellow" }}
      >
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата последнего контакта"
          value={data?.date}
          minDate={null}
          onChange={(value) => setValue("date", value)}
        />
        <TextFieldStyled
          register={register}
          label="Результат"
          name="result"
          value={data?.result}
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
