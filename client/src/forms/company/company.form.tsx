import { FieldsContainer, Form } from "../../components/common/forms/styled";
import TextFieldStyled from "../../components/common/inputs/text-field-styled";
import SelectFieldStyled from "../../components/common/inputs/select-field-styled";
import { companyProfilesArray } from "@data/company-profiles";
import FieldsObject from "../../components/common/forms/dynamic-fields/fields-object";
import FieldsContact from "../../components/common/forms/dynamic-fields/fields-contact";
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";

const CompanyForm = ({
  data,
  register,
  errors,
  setValue,
  control,
  watch,
  setState = () => {}
}) => {
  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <TextFieldStyled
          register={register}
          label="Название компании"
          name="name"
          required={true}
          errors={errors?.name}
          value={capitalizeFirstLetter(data?.name)}
          inputProps={{ maxLength: 150 }}
        />
        <SelectFieldStyled
          label="Профиль деятельности"
          register={register}
          name="profile"
          labelId="profile"
          required={true}
          itemsList={companyProfilesArray}
          value={data.profile ?? ""}
          errors={errors?.profile}
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
        <FieldsObject
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

export default CompanyForm;
