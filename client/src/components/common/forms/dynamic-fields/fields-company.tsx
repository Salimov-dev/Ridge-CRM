import { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useFieldArray } from "react-hook-form";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// components
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
import RowTitle from "@components/common/titles/row-title";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import OpenPageObjectIconButton from "@components/common/buttons/icons buttons/open-page-object.button-icon";
import PageDialogs from "@components/common/dialog/page-dialogs";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getCompaniesList } from "@store/company/company.store";

const FieldsCompany = ({
  data,
  register,
  setValue,
  watch,
  errors,
  setState,
  control,
  isHideElement = false
}) => {
  const [openCompany, setOpenCompany] = useState({
    companyPage: false,
    companyId: false
  });

  const watchCompanyId = watch("companyId");

  const { handleOpenCreateCompanyPage } = useDialogHandlers(setState);
  const { handleOpenUpdateCompanyPage } = useDialogHandlers(setOpenCompany);

  const {
    fields: fieldCompanies,
    append: appendCompany,
    remove: removeCompany
  } = useFieldArray({
    name: "companies",
    control
  });

  const companiesList = useSelector(getCompaniesList());
  const lastCompanyIndex = fieldCompanies.length - 1;

  const handleRemoveCompany = (index) => {
    removeCompany(index);
  };

  return (
    <>
      <RowTitle
        title="Связь с компаниями"
        background="Crimson"
        margin="14px 0 -6px 0"
      />
      {fieldCompanies?.map((field, index) => {
        if (field.id) {
          return (
            <Box
              key={field.id}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              <AutocompleteStyled
                label="Компания"
                register={register}
                name={`companies.${index}.company`}
                options={companiesList}
                value={data.companies?.[index].company}
                errors={errors?.companies?.[index]?.company}
                setValue={setValue}
                watchItemId={watchCompanyId}
                optionLabel={(option) => option.name}
              />
              <OpenPageObjectIconButton
                containerWidth="70px"
                title={null}
                disabled={!data.companies?.[index].company}
                onClick={() =>
                  handleOpenUpdateCompanyPage(data.companies?.[index].company)
                }
              />
            </Box>
          );
        } else {
          return null;
        }
      })}
      <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
        {!isHideElement && (
          <ButtonStyled
            title="Создать компанию"
            style="CREATE_NEW_COMPANY"
            width="100%"
            size="small"
            icon={<AddCircleIcon />}
            onClick={handleOpenCreateCompanyPage}
          />
        )}
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
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveCompany(lastCompanyIndex)} // передаем функцию removePhone с аргументом
        />
      </Box>
      <PageDialogs state={openCompany} setState={setOpenCompany} />
    </>
  );
};

export default FieldsCompany;
