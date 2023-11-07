// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
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
  dateMyTask: null,
  timeMyTaks: null,
  commentMyTask: "",
};

const CreateLastContact = React.memo(({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
  const watchDate = watch<any>("date", null);
  const isFullValid = isValid && watchDate;

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

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, создаем `Последний контакт`"
      isLoading={isLoading}
    />
  ) : (
    <>
      <TitleWithCloseButton
        title="Добавить последний контакт"
        onClose={onClose}
        background="SaddleBrown"
        color="white"
      />
      <LastContactForm
        data={data}
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <FooterButtons
        onCreate={handleSubmit(onSubmit)}
        onClose={onClose}
        isValid={isFullValid}
      />
    </>
  );
});

export default CreateLastContact;
