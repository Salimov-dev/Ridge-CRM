// libraries
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
import FooterButtons from "../../common/forms/footer-buttons/success-cancel-form-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
// store
import { getUpdateLastContactId } from "../../../store/last-contact/update-last-contact.store";
import {
  getLastContactsById,
  removeLastContact,
  updateLastContact,
} from "../../../store/last-contact/last-contact.store";
// schema
import { lastContactSchema } from "../../../schemas/last-contact-schema";

const UpdateLastContact = React.memo(({ onClose }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lastContactId = useSelector(getUpdateLastContactId());
  const lastContact = useSelector(getLastContactsById(lastContactId));

  const formatedLastContact = {
    ...lastContact,
    date: lastContact?.date ? dayjs(lastContact?.date) : null,
    dateMyTask: null,
    timeMyTaks: null,
    commentMyTask: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: formatedLastContact,
    mode: "onBlur",
    resolver: yupResolver(lastContactSchema),
  });

  const data = watch();
  const watchDate = watch("date", null);
  const isFullValid = isValid && watchDate;
  const isEditMode = lastContactId ? true : false;

  const onSubmit = (data) => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate };

    dispatch<any>(updateLastContact(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Последний контакт успешно изменен!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  const handleRemoveLastContact = (lastContactId) => {
    dispatch<any>(removeLastContact(lastContactId)).then(onClose());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return lastContact ? (
    <Box>
      {isLoading ? (
        <IsLoadingDialog
          text="Немного подождите, изменяем `Последний контакт`"
          isLoading={isLoading}
        />
      ) : (
        <>
          <Header lastContact={lastContact} onClose={onClose} />
          <LastContactForm
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            isUpdate={true}
          />
          <FooterButtons
            onUpdate={handleSubmit(onSubmit)}
            onClose={onClose}
            onRemove={handleClickOpen}
            isEditMode={isEditMode}
            isValid={isFullValid}
          />
          <ConfirmRemoveDialog
            removeId={lastContactId}
            open={open}
            onClose={handleClose}
            onRemove={handleRemoveLastContact}
          />
        </>
      )}
    </Box>
  ) : (
    <Loader />
  );
});

export default UpdateLastContact;
