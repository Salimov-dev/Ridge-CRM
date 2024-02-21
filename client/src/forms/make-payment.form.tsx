import { FieldsContainer, Form } from "../components/common/forms/styled";
import TextFieldStyled from "../components/common/inputs/text-field-styled";

const MakePaymentForm = ({ data, register, errors }) => {
  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <TextFieldStyled
          register={register}
          label="Сумма для пополнения"
          type="number"
          valueAsNumber={true}
          name="amount"
          required={true}
          errors={errors?.amount}
          value={data?.amount}
          onInputQuantities={25}
        />
      </FieldsContainer>
    </Form>
  );
};

export default MakePaymentForm;
