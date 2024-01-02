// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/header-with-close-button";
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
import FooterButtons from "../../common/forms/footer-buttons/success-cancel-form-buttons";
// store
import { getOpenObjectPageId } from "../../../store/object/open-object-page.store";
import { createLastContact } from "../../../store/last-contact/last-contact.store";
// schema
import { lastContactSchema } from "../../../schemas/last-contact-schema";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import SuccessCancelFormButtons from "../../common/forms/footer-buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";

const initialState = {
  date: dayjs(),
  result: "",
  objectId: "",
  dateMyTask: null,
  timeMyTaks: null,
  commentMyTask: "",
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
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(lastContactSchema),
  });

  const data = watch();

  const onSubmit = (data) => {
    setIsLoading(true);

    const lastContactData = {
      date: data.date,
      objectId: data.objectId,
      result: capitalizeFirstLetter(data.result).trim(),
    };

    dispatch<any>(createLastContact(lastContactData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Последний контакт успешно создан!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  useEffect(() => {
    if (objectPageId) {
      setValue<any>("objectId", objectPageId);
    }
  }, [objectPageId]);

  return (
    <>
      <TitleWithCloseButton
        title="Добавить последний контакт"
        background={colors.lastContact["primary"]}
        color="white"
        margin="0 0 20px 0"
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
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
    </>
  );
});

export default CreateLastContact;
