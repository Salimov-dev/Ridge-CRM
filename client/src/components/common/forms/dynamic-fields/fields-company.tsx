import { Dispatch, FC, SetStateAction, useState } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray
} from "react-hook-form";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// components
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
import RowTitle from "@components/common/titles/row-title";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import OpenPageElementIconButton from "@components/common/button-icons/open-page-element.button-icon";
import DeleteElementIcon from "@components/common/button-icons/delete-element-icon";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getCompaniesList } from "@store/company/company.store";
// dialogs
import companiesDialogsState from "@dialogs/dialog-handlers/companies.dialog-handlers";

interface FieldsCompanyProps {
  data: any;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors<any>;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  control?: Control<any>;
}

const FieldContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const FieldsCompany: FC<FieldsCompanyProps> = ({
  data,
  register,
  setValue,
  watch,
  errors,
  setState,
  control
}): JSX.Element => {
  const watchCompanyId = watch("companyId");

  const { handleOpenCreateCompanyPage, handleOpenUpdateCompanyPage } =
    companiesDialogsState({ setState });

  const {
    fields: fieldCompanies,
    append: appendCompany,
    remove: removeCompany
  } = useFieldArray({
    name: "companies",
    control
  });

  const lastCompanyIndex = fieldCompanies.length - 1;
  const companiesList = useSelector(getCompaniesList());

  const filteredCompanies = companiesList?.filter(
    (company) =>
      !fieldCompanies.some(
        (fieldCompany) => fieldCompany.company === company._id
      )
  );

  const handleRemoveCompany = (index) => {
    removeCompany(index);
  };

  return (
    <>
      <RowTitle
        title="Связь с компаниями"
        background="linear-gradient(to right, Crimson , DarkRed)"
        margin="14px 0 -8px 0"
      />
      {fieldCompanies?.map((field, index) => {
        if (field.id) {
          return (
            <FieldContainer key={field.id}>
              <DeleteElementIcon
                onClick={() => handleRemoveCompany(index)}
                error={errors?.companies}
              />
              <AutocompleteStyled
                label="Компания"
                register={register}
                name={`companies.${index}.company`}
                options={
                  data.companies?.[index].company
                    ? companiesList
                    : filteredCompanies
                }
                value={data.companies?.[index].company}
                errors={errors?.companies?.[index]?.company}
                setValue={setValue}
                watchItemId={watchCompanyId}
                optionLabel={(option) => option.name}
              />
              <OpenPageElementIconButton
                height="100%"
                width="24px"
                title={null}
                disabled={!data.companies?.[index].company}
                onClick={() =>
                  handleOpenUpdateCompanyPage(data.companies?.[index].company)
                }
              />
            </FieldContainer>
          );
        } else {
          return null;
        }
      })}
      <ButtonsContainer>
        <ButtonStyled
          title="Создать компанию"
          style="CREATE_NEW_COMPANY"
          width="100%"
          size="small"
          icon={<AddCircleIcon />}
          onClick={() => handleOpenCreateCompanyPage()}
        />
        <ButtonStyled
          title="Добавить компанию"
          style="ADD_NEW_COMPANY"
          width="100%"
          size="small"
          icon={<AddCircleIcon />}
          onClick={() => appendCompany({})}
        />
        <ButtonStyled
          title="Удалить компанию"
          style="REMOVE_SOME_NEW"
          width="100%"
          size="small"
          disabled={!data?.companies?.length}
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveCompany(lastCompanyIndex)}
        />
      </ButtonsContainer>
    </>
  );
};

export default FieldsCompany;
