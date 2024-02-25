// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import PageDialogs from "@components/common/dialog/page-dialogs";
// forms
import CompanyForm from "@forms/company/company.form";
// store
import { createCompany } from "@store/company/company.store";
// schema
import { companySchema } from "@schemas/company.shema";

const initialState = {
  name: "",
  profile: "",
  contacts: [],
  objects: []
};

const CreateCompany = React.memo(({ onClose, isHideElement }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    createCompanyPage: false,
    contactId: null
  });

  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(companySchema)
  });

  const data = watch();

  const onSubmit = (data) => {
    setIsLoading(true);

    dispatch<any>(createCompany(data))
      .then(() => {
        onClose();
        toast.success("Компания успешно создана!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <HeaderWithCloseButton
        title="Создать компанию"
        margin="0 0 20px 0"
        background="Crimson"
        onClose={onClose}
      />
      <CompanyForm
        data={data}
        watch={watch}
        setState={setState}
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        isHideElement={isHideElement}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
      <PageDialogs state={state} setState={setState} />
    </>
  );
});

export default CreateCompany;
