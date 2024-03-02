// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
// schemas
import { companySchema } from "@schemas/company/company.shema";
// forms
import CompanyForm from "@forms/company/company.form";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
// store
import {
  getCompanyById,
  removeCompany,
  updateCompany
} from "@store/company/company.store";

const UpdateCompany = React.memo(({ companyId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const company = useSelector(getCompanyById(companyId));

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: company,
    mode: "onChange",
    resolver: yupResolver(companySchema)
  });

  const data = watch();

  const onSubmit = () => {
    setIsLoading(true);

    dispatch<any>(updateCompany(data))
      .then(() => {
        onClose();
        toast.success("Компания успешно изменена!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveContact = (companyId) => {
    dispatch<any>(removeCompany(companyId)).then(onClose());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderWithCloseButton
        title="Изменить компанию"
        color="black"
        margin="0 0 20px 0"
        onClose={onClose}
      />
      <CompanyForm
        data={data}
        watch={watch}
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleClickOpen}
        isUpdate={true}
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить безвозвратно?"
        open={open}
        onClose={handleClose}
        onSuccessClick={() => handleRemoveContact(companyId)}
      />
    </>
  );
});

export default UpdateCompany;
