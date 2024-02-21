// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
// components
import LastContactForm from "@forms/last-contact.form";
// store
import { createLastContact } from "@store/last-contact/last-contact.store";
// schema
import { lastContactSchema } from "@schemas/last-contact.schema";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import HeaderWithCloseButton from "@common/page-headers/header-with-close-button";

const initialState = {
  date: dayjs(),
  result: "",
  objectId: ""
};

const CreateLastContact = React.memo(({ objectPageId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(lastContactSchema)
  });

  const data = watch();

  const onSubmit = (data) => {
    setIsLoading(true);

    const lastContactData = {
      date: data.date,
      objectId: data.objectId,
      result: capitalizeFirstLetter(data.result).trim()
    };

    dispatch<any>(createLastContact(lastContactData))
      .then(() => {
        onClose();
        toast.success("Последний контакт успешно создан!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (objectPageId) {
      setValue<any>("objectId", objectPageId);
    }
  }, [objectPageId]);

  return (
    <>
      <HeaderWithCloseButton
        title="Добавить последний контакт"
        color="white"
        margin="0 0 20px 0"
        background={colors.lastContact["primary"]}
        onClose={onClose}
      />
      <LastContactForm
        data={data}
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default CreateLastContact;
