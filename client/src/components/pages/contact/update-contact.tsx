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
// store
import {
  getContactById,
  removeContact,
  updateContact
} from "@store/contact/contact.store";

const UpdateContact = React.memo(({ contactId, onClose }) => {
  const [state, setState] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    createCompanyPage: false
  });

  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
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

  const newObjects = watch("objects");
  const previousObjects = contact?.objects;
  const contactObjects = contact?.objects;
  const removedObjects = contactObjects?.filter(
    (obj) => !newObjects.some((item) => item.object === obj.object)
  );
  const addedObjects = newObjects?.filter(
    (newObject) =>
      !contactObjects?.some((obj) => obj.object === newObject.object)
  );

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = data;

    dispatch<any>(
      updateContact({ newData, previousObjects, removedObjects, addedObjects })
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

  const handleRemoveContact = (contactId) => {
    dispatch<any>(removeContact(contactId)).then(onClose());
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
        setState={setState}
      />
      <UserEntityAuthor title="Контакт создал" userId={contact?.userId} />
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
      <PageDialogs state={state} setState={setState} />
      <DialogConfirm
        question="Вы уверены, что хотите удалить безвозвратно?"
        open={open}
        onClose={handleClose}
        onSuccessClick={() => handleRemoveContact(contactId)}
      />
    </>
  );
});

export default UpdateContact;
