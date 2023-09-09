// components
import TextFieldStyled from "../../inputs/text-field-styled";
import DatePickerStyled from "../../inputs/date-picker";
import FooterButtons from "../footer-buttons/footer-buttons";
// styled
import { FieldsContainer, Form } from "../styled/styled";

const LastContactForm = ({
  data,
  register,
  errors,
  handleSubmit,
  onSubmit,
  onClose,
  onRemoveLastContact,
  removeId,
  setValue,
  isValid,
  isEditMode = false,
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldsContainer
          sx={{ display: "flex", flexDirection: "column", color: "yellow" }}
        >
          <DatePickerStyled
            register={register}
            name="date"
            label="Дата последнего контакта"
            value={data?.date}
            minDate = {null}
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
            onInputQuantities={100}
          />
        </FieldsContainer>

        <FooterButtons
          onClose={onClose}
          onRemove={onRemoveLastContact}
          removeId={removeId}
          isEditMode={isEditMode}
          isValid={isValid}
        />
      </Form>
    </>
  );
};

export default LastContactForm;
