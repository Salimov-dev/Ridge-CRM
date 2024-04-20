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
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import ContactForm from "@forms/contact/contact.form";
import PageDialogs from "@components/common/dialog/page-dialogs";
// schema
import { contactSchema } from "@schemas/contact/contact.schema";
// store
import { createContact } from "@store/contact/contact.store";
// initial-states
import { contactCreateInitialState } from "@initial-states/pages/contact-create.initial-state";

const CreateContact = React.memo(({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stateDialogPages, setStateDialogPages] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    createCompanyPage: false
  });

  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: contactCreateInitialState,
    mode: "onChange",
    resolver: yupResolver(contactSchema)
  });

  const data = watch();

  const onSubmit = (data) => {
    setIsLoading(true);

    dispatch<any>(createContact(data))
      .then(() => {
        onClose();
        toast.success("Контакт успешно создан!");
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
      <HeaderWithCloseButtonForPage
        title="Создать контакт"
        margin="0 0 20px 0"
        background="Indigo"
        onClose={onClose}
      />
      <ContactForm
        data={data}
        watch={watch}
        setState={setStateDialogPages}
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
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
      <PageDialogs state={stateDialogPages} setState={setStateDialogPages} />
    </>
  );
});

export default CreateContact;