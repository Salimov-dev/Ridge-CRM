import { FieldsContainer, Form } from "@styled/styled-form";
import { Dispatch, FC, SetStateAction } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
// data
import { companyProfilesArray } from "@data/company/company-profiles";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
import FieldsObject from "@components/common/forms/dynamic-fields/fields-object";
import FieldsContact from "@components/common/forms/dynamic-fields/fields-contact";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// interfaces
import { ICompanyCreateInitState } from "@interfaces/company/company.inteface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface CompanyFormProps {
  data: ICompanyCreateInitState;
  register: UseFormRegister<ICompanyCreateInitState>;
  errors: FieldErrors<ICompanyCreateInitState>;
  watch: UseFormWatch<ICompanyCreateInitState>;
  setValue: UseFormSetValue<ICompanyCreateInitState>;
  control: Control<ICompanyCreateInitState>;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const CompanyForm: FC<CompanyFormProps> = ({
  data,
  register,
  errors,
  watch,
  setState = () => {},
  setValue,
  control
}): JSX.Element => {
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
