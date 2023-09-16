// libraries
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
// MUI
import { Box, styled } from "@mui/material";
// store
import { getOpenObjectPageId } from "../../../store/object/open-object-page.store";
import { createLastContact } from "../../../store/last-contact/last-contact.store";
// schema
import { lastContactSchema } from "../../../schemas/last-contact-schema";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const initialState = {
  date: dayjs(),
  result: "",
  objectId: "",
};
const Component = styled(Box)`
  width: 100%;
`;

const CreateLastContact = ({ onClose }) => {
  const dispatch = useDispatch();
  const objectPageId = useSelector(getOpenObjectPageId());

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(lastContactSchema),
  });

  const data = watch();
  const watchDate = watch("date", null);

  const isFullValid = isValid && watchDate;

  const onSubmit = (data) => {
    const newData = {
      ...data,
      result: capitalizeFirstLetter(data.result),
    };

    dispatch(createLastContact(newData))
      .then(onClose())
      .then(toast.success("Последний контакт успешно создан!"));
  };

  useEffect(() => {
    if (objectPageId) {
      setValue("objectId", objectPageId);
    }
  }, [objectPageId]);

  return (
    <Component>
      <TitleWithCloseButton
        title="Добавить последний контакт"
        onClose={onClose}
        background="SaddleBrown"
        color="white"
      />
      <LastContactForm
        data={data}
        register={register}
        onSubmit={onSubmit}
        onClose={onClose}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        isEditMode={false}
      />
    </Component>
  );
};

export default CreateLastContact;