// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { toast } from "react-toastify";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
// dialogs
import DialogPages from "@dialogs/dialog-pages";
// forms
import CompanyForm from "@forms/company/company.form";
// initial-states
import { companyCreateInitialState } from "@initial-states/pages/company-create.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// store
import { createCompany } from "@store/company/company.store";
// schema
import { companySchema } from "@schemas/company/company.shema";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface CreateCompanyProps {
  onClose: () => void;
}

const CreateCompany: FC<CreateCompanyProps> = React.memo(
  ({ onClose }): JSX.Element => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogPages, setStateDialogPages] =
      useState<IDialogPagesState>(dialogePagesState);

    const {
      register,
      watch,
      handleSubmit,
      control,
      setValue,
      formState: { errors }
    } = useForm({
      defaultValues: companyCreateInitialState,
      mode: "onChange",
      resolver: yupResolver<any>(companySchema)
    });

    const data = watch();

    const onSubmit = () => {
      setIsLoading(true);

      dispatch<any>(createCompany(data))
        .then(() => {
          onClose();
          toast.success("Компания успешно создана!");
        })
        .catch((error: string) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Создать компанию"
          margin="0 0 20px 0"
          background="Crimson"
          onClose={onClose}
        />
        <CompanyForm
          data={data}
          register={register}
          watch={watch}
          errors={errors}
          setState={setStateDialogPages}
          setValue={setValue}
          control={control}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          disabledRemoveButton={true}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
        <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
      </>
    );
  }
);

export default CreateCompany;
