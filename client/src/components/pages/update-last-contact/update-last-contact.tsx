// libraries
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
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

const UpdateLastContact = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const lastContactId = useSelector(getUpdateLastContactId());
  const lastContact = useSelector(getLastContactsById(lastContactId));
  const dispatch = useDispatch();

  const formatedLastContact = {
    ...lastContact,
    date: lastContact?.date ? dayjs(lastContact?.date) : null,
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
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate };

    dispatch<any>(updateLastContact(newData))
      .then(onClose())
  };

  const handleRemoveLastContact = (lastContactId) => {
    dispatch<any>(removeLastContact(lastContactId))
      .then(onClose())
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return lastContact ? (
    <Box>
      <Header lastContact={lastContact} onClose={onClose} />
      <LastContactForm
        data={data}
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <FooterButtons
        onUpdate={handleSubmit(onSubmit)}
        onClose={onClose}
        onRemove={handleClickOpen}
        removeId={lastContactId}
        isEditMode={isEditMode}
        isValid={isFullValid}
      />
      <ConfirmRemoveDialog
        removeId={lastContactId}
        open={open}
        onClose={handleClose}
        onRemove={handleRemoveLastContact}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateLastContact;
