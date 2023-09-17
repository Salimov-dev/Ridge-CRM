// libraries
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
// store
import { getUpdateRidgeLastContactId } from "../../../store/ridge-last-contact/update-ridge-last-contact.store";
import {
  getRidgeLastContactsById,
  removeRidgeLastContact,
  updateRidgeLastContact,
} from "../../../store/ridge-last-contact/last-ridge-contact.store";
// schema
import { lastContactSchema } from "../../../schemas/last-contact-schema";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const UpdateRidgeLastContact = ({ onClose }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const lastContactId = useSelector(getUpdateRidgeLastContactId());
  const lastContact = useSelector(getRidgeLastContactsById(lastContactId));

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
    const newData = {
      ...data,
      result: capitalizeFirstLetter(data.result),
      date: transformedDate,
    };
    dispatch(updateRidgeLastContact(newData, lastContactId))
      .then(onClose())
      .then(toast.success("Последний контакт успешно изменен!"));
  };

  const handleRemoveRidgeLastContact = (lastContactId) => {
    dispatch(removeRidgeLastContact(lastContactId))
      .then(onClose())
      .then(toast.success("Последний контакт успешно удален!"));
    setOpen(false);
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
        onRemove={handleRemoveRidgeLastContact}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateRidgeLastContact;
