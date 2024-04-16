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
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import UserEntityAuthor from "@components/common/user/user-entity-author";
import PageDialogs from "@components/common/dialog/page-dialogs";
// forms
import ContactForm from "@forms/contact/contact.form";
// schema
import { contactSchema } from "@schemas/contact/contact.schema";
// hooks
import useUpdateContact from "@hooks/contact/use-update-contact";
// store
import {
  getContactById,
  removeContact,
  updateContact
} from "@store/contact/contact.store";

const UpdateContact = React.memo(({ contactId, onClose }) => {
  const [stateDialogPages, setStateDialogPages] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    createCompanyPage: false
  });

  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const contact = useSelector(getContactById(contactId));

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: contact,
    mode: "onChange",
    resolver: yupResolver(contactSchema)
  });

  const data = watch();
  const watchObjects = watch("objects");
  const watchCompanies = watch("companies");
  const isValidRemoveButton = !watchCompanies?.length && !watchObjects?.length;

  const {
    previousObjects,
    removedObjects,
    addedObjects,
    previousCompanies,
    removedCompanies,
    addedCompanies
  } = useUpdateContact(contact, watch);

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = data;

    dispatch<any>(
      updateContact({
        newData,
        previousObjects,
        removedObjects,
        addedObjects,
        previousCompanies,
        removedCompanies,
        addedCompanies
      })
    )
      .then(() => {
        onClose();
        toast.success("Контакт успешно изменен!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleRemoveContact = (contactId) => {
    setIsLoading(true);
    dispatch<any>(removeContact(contactId))
      .then(onClose(), handleCloseConfirm())
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
        title="Править контакт"
        color="white"
        margin="0 0 20px 0"
        background="Navy"
        onClose={onClose}
      />
      <ContactForm
        data={data}
        watch={watch}
        control={control}
        register={register}
        errors={errors}
        setValue={setValue}
        setState={setStateDialogPages}
      />
      <UserEntityAuthor title="Контакт создал" userId={contact?.userId} />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleOpenConfirm}
        isValidRemoveButton={!isValidRemoveButton}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить безвозвратно?"
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccessClick={() => handleRemoveContact(contactId)}
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

export default UpdateContact;
