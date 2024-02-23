import { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useFieldArray } from "react-hook-form";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// components
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
import RowTitle from "@components/common/titles/row-title";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// import OpenPageCompanyIconButton from "@components/common/buttons/icons buttons/open-page-Company.button-icon";
import PageDialogs from "@components/common/dialog/page-dialogs";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getCompaniesByUserId } from "@store/company/Companies.store";
import { getCurrentUserId } from "@store/user/users.store";

const FieldsCompany = ({
  data,
  register,
  setValue,
  watch,
  errors,
  setState,
  control
}) => {
  const [openCompany, setOpenCompany] = useState({
    companyPage: false,
    companyId: false
  });

  const currentUserId = useSelector(getCurrentUserId());
  // const CompaniesList = useSelector(getCompaniesByUserId(currentUserId));
  const watchCompanyId = watch("companyId");

  // const { handleOpenCreateCompanyPage } = useDialogHandlers(setState);

  // const { handleOpenCompanyPage } = useDialogHandlers(setOpenCompany);

  const {
    fields: fieldCompanies,
    append: appenCompany,
    remove: removeCompany
  } = useFieldArray({
    name: "companies",
    control
  });

  const lastCompanyIndex = fieldCompanies.length - 1;

  const handleChangeCompany = (companyIndex, currentState) => {
    const updatedCompanies = data.Companies.map((company, index) => {
      if (index === companyIndex) {
        return { ...company, isDefault: !currentState }; // Инвертируем состояние текущего объекта
      } else if (company.isDefault) {
        return { ...company, isDefault: false }; // Если у другого объекта isDefault был true, устанавливаем его в false
      }
      return company;
    });

    setValue("companies", updatedCompanies);
  };

  const handleRemoveCompany = (index) => {
    handleChangeCompany(index, false);
    removeCompany(index);
  };
  return (
    <>
      <RowTitle
        title="Связан с компаниями"
        background="OrangeRed"
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
                label="Объект"
                register={register}
                name={`сompanies.${index}.сompany`}
                // options={сompaniesList}
                value={data.Companies?.[index].Company}
                errors={errors?.Companies?.[index]?.Company}
                setValue={setValue}
                watchItemId={watchCompanyId}
                optionLabel={(option) => `${option?.city}, ${option?.address}`}
              />
              <OpenPageCompanyIconButton
                title={null}
                disabled={!data.Companies?.[index].Company}
                // onClick={() =>
                // handleOpenCompanyPage(data.Companies?.[index].Company)
                // }
              />
            </Box>
          );
        } else {
          return null;
        }
      })}
      <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
        <ButtonStyled
          title="Создать компанию"
          style="CREATE_NEW_COMPANY"
          width="100%"
          size="small"
          icon={<AddCircleIcon />}
          // onClick={handleOpenCreateObjectPage}
        />
        <ButtonStyled
          title="Добавить компанию"
          style="ADD_NEW_COMPANY"
          width="100%"
          size="small"
          icon={<AddCircleIcon />}
          // onClick={handleOpenCreateCompanyPage}
        />
        {/* <ButtonStyled
          title="Добавить объект"
          style="ADD_NEW_Company"
          width="100%"
          size="small"
          icon={<ControlPointOutlinedIcon />}
          onClick={() => appenCompany({ Company: "" })}
        /> */}
        {/* <ButtonStyled
          title="Удалить объект"
          style="REMOVE_SOME_NEW"
          width="100%"
          size="small"
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveCompany(lastCompanyIndex)} // передаем функцию removePhone с аргументом
        /> */}
      </Box>
      <PageDialogs state={openCompany} setState={setOpenCompany} />
    </>
  );
};

export default FieldsCompany;
