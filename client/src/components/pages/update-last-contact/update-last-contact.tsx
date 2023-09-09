// libraries
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
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
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
  const dispatch = useDispatch();
  const lastContactId = useSelector(getUpdateLastContactId());
  const lastContact = useSelector(getLastContactsById(lastContactId));

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
  const isFullValid = !watchDate || !isValid;
  const isEditMode = lastContactId ? true : false;

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate };

    dispatch(updateLastContact(newData, lastContactId))
      .then(onClose())
      .then(toast.success("Последний контакт успешно изменен!"));
  };

  const handleRemoveLastContact = (lastContactId) => {
    dispatch(removeLastContact(lastContactId))
      .then(onClose())
      .then(toast.success("Последний контакт успешно удален!"));
  };

  return lastContact ? (
    <Box>
      <Header lastContact={lastContact} onClose={onClose} />
      <LastContactForm
        data={data}
        register={register}
        onSubmit={onSubmit}
        onClose={onClose}
        removeId={lastContactId}
        onRemoveLastContact={handleRemoveLastContact}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        isEditMode={isEditMode}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateLastContact;
