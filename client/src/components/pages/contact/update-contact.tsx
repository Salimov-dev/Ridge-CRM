// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { yupResolver } from "@hookform/resolvers/yup";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
// import ContactForm from "@components/common/forms/Contact.form";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
// schema
// import { ContactSchema } from "@schemas/Contact.schema";
// store
// import { getContactsList } from "@store/Contact/Contacts.store";
import { getCurrentUserId } from "@store/user/users.store";
// import { getContactTypesList } from "@store/Contact/Contact-types.store";
// import { getContactStatusesList } from "@store/Contact/Contact-status.store";
// import {
//   getContactById,
//   getContactLoadingStatus,
//   removeContact,
//   updateContact
// } from "@store/contact/contacts.store";

const UpdateContact = React.memo(({ contactId, onClose, isContactPage }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const contact = useSelector(getContactById(contactId));

  // const formatedContact = {
  //   ...contact,
  //   date: contact?.date ? dayjs(contact?.date) : null,
  //   time: contact?.time ? dayjs(contact?.time) : null
  // };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    // defaultValues: formatedContact,
    mode: "onChange"
    // resolver: yupResolver(contactSchema)
  });

  const data = watch();

  const isEditMode = contactId ? true : false;

  const contacts = useSelector(getContactsList());
  const currentUserId = useSelector(getCurrentUserId());
  // const currentUserContacts = contacts?.filter(
  //   (obj) => obj?.userId === currentUserId
  // );
  // const isContactsLoading = useSelector(getContactLoadingStatus());
  // const contactTypes = useSelector(getContactTypesList());
  // const statuses = useSelector(getContactStatusesList());

  const onSubmit = (data) => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch<any>(updateContact(newData))
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
        title="Изменить встречу"
        color="white"
        margin="0 0 20px 0"
        // background={colors.contact["primary"]}
        onClose={onClose}
      />
      {/* <ContactForm
        data={data}
        Contacts={currentUserContacts}
        types={ContactTypes}
        statuses={statuses}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isEditMode={isEditMode}
        isContactsLoading={isContactsLoading}
        isContactPage={isContactPage}
      /> */}
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
        onSuccessClick={() => handleRemoveContact(contactId)}
      />
    </>
  );
});

export default UpdateContact;
