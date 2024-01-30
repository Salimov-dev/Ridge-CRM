// data
import { gendersArray } from "@data/genders";
// components
import { FieldsContainer, Form } from "./styled/styled";
import DatePickerStyled from "../inputs/date-picker";
import TextFieldStyled from "../inputs/text-field-styled";
import SimpleSelectField from "../inputs/simple-select-field";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";

const UserProfileForm = ({ data, register, errors, setValue }) => {
  return (
    <>
      <Form noValidate>
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <TextFieldStyled
            register={register}
            label="Фамилия"
            name="lastName"
            required={true}
            errors={errors?.lastName}
            value={capitalizeFirstLetter(data?.lastName)}
            onInputQuantities={150}
          />
          <TextFieldStyled
            register={register}
            label="Имя"
            name="firstName"
            required={true}
            errors={errors?.firstName}
            value={capitalizeFirstLetter(data?.firstName)}
            onInputQuantities={150}
          />
          <TextFieldStyled
            register={register}
            label="Отчество"
            name="surName"
            required={true}
            errors={errors?.surName}
            value={capitalizeFirstLetter(data?.surName)}
            onInputQuantities={150}
          />
          <DatePickerStyled
            register={register}
            name="birthday"
            label="Дата рождения"
            value={data?.birthday}
            errors={errors?.birthday}
            onChange={(value) => setValue("birthday", value)}
            minDate={null}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="phone"
            errors={errors?.phone}
            value={data?.phone || ""}
            onInputQuantities={12}
            valueAsNumber={true}
            subtitle={"Только в формате 79098887766, 78129998877, 9302211"}
            isHelperText={true}
          />
          <SimpleSelectField
            register={register}
            itemsList={gendersArray}
            name="gender"
            labelId="gender"
            label="Пол"
            value={data?.gender}
            errors={errors?.gender}
          />
        </FieldsContainer>
      </Form>
    </>
  );
};

export default UserProfileForm;
