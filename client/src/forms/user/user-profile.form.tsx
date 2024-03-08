// data
import { gendersArray } from "@data/genders";
// components
import { FieldsContainer, Form } from "@components/common/forms/styled";
import DatePickerStyled from "@components/common/inputs/date-picker";
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import SimpleSelectField from "@components/common/inputs/simple-select-field";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { citiesArray } from "@data/cities";

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
            inputProps={{ maxLength: 150 }}
          />
          <TextFieldStyled
            register={register}
            label="Имя"
            name="firstName"
            required={true}
            errors={errors?.firstName}
            value={capitalizeFirstLetter(data?.firstName)}
            inputProps={{ maxLength: 150 }}
          />
          <TextFieldStyled
            register={register}
            label="Отчество"
            name="surName"
            required={true}
            errors={errors?.surName}
            value={capitalizeFirstLetter(data?.surName)}
            inputProps={{ maxLength: 150 }}
          />
          <DatePickerStyled
            register={register}
            name="birthday"
            label="Дата рождения *"
            required={true}
            value={data?.birthday}
            errors={errors?.birthday}
            onChange={(value) => setValue("birthday", value)}
            minDate={null}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            name="phone"
            required={true}
            errors={errors?.phone}
            value={data?.phone || ""}
            inputProps={{ maxLength: 14 }}
            subtitle={"Только в формате 79098887766, 78129998877, 9302211"}
            isHelperText={true}
          />
          <SimpleSelectField
            register={register}
            itemsList={gendersArray}
            name="gender"
            labelId="gender"
            required={true}
            label="Пол"
            value={data?.gender}
            errors={errors?.gender}
          />
          <SimpleSelectField
            register={register}
            itemsList={citiesArray}
            name="city"
            labelId="city"
            required={true}
            label="Город"
            value={data?.city}
            errors={errors?.city}
          />
        </FieldsContainer>
      </Form>
    </>
  );
};

export default UserProfileForm;
