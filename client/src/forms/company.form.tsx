import { FieldsContainer, Form } from "../components/common/forms/styled";
import TextFieldStyled from "../components/common/inputs/text-field-styled";
import SelectFieldStyled from "../components/common/inputs/select-field-styled";
import { companyProfilesArray } from "@data/company-profiles";

const CompanyForm = ({ data, register, errors }) => {
  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <TextFieldStyled
          register={register}
          label="Название компании"
          type="text"
          name="name"
          required={true}
          errors={errors?.name}
          value={data?.name}
          onInputQuantities={125}
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
      </FieldsContainer>
    </Form>
  );
};

export default CompanyForm;
