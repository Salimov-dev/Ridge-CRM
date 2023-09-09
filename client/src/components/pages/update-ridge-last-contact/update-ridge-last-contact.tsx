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
import { getUpdateRidgeLastContactId } from "../../../store/ridge-last-contact/update-ridge-last-contact.store";
import { getRidgeLastContactsById, removeRidgeLastContact, updateRidgeLastContact } from "../../../store/ridge-last-contact/last-ridge-contact.store";
// schema
import { lastContactSchema } from "../../../schemas/last-contact-schema";

const UpdateRidgeLastContact = ({ onClose }) => {
  const dispatch = useDispatch();
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
  const isFullValid = !watchDate || !isValid;
  const isEditMode = lastContactId ? true : false;

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate };

    dispatch(updateRidgeLastContact(newData, lastContactId))
      .then(onClose())
      .then(toast.success("Последний контакт успешно изменен!"));
  };

  const handleRemoveRidgeLastContact = (lastContactId) => {
    dispatch(removeRidgeLastContact(lastContactId))
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
        onRemoveLastContact={handleRemoveRidgeLastContact}
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

export default UpdateRidgeLastContact;
