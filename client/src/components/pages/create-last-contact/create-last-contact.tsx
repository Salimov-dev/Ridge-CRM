// libraries
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
// MUI
import { Box, styled } from "@mui/material";
// store
import { createTask } from "../../../store/task/tasks.store";
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
  const watchDate = watch<any>("date", null);

  const isFullValid = isValid && watchDate;

  const onSubmit = (data) => {
    const lastContactData = {
      date: data.date,
      objectId: data.objectId,
      result: capitalizeFirstLetter(data.result),
    };

    dispatch<any>(createLastContact(lastContactData))
    .then(() => {
      if (data.dateMyTask && data.timeMyTaks && data.commentMyTask) {
        const myTaskData = {
          date: data.dateMyTask,
          time: data.timeMyTaks,
          objectId: objectPageId,
          comment: data.commentMyTask,
          isDone: false,
        };
        dispatch<any>(createTask(myTaskData))
          .then(() => onClose()); 
      } else {
        onClose();
      }
    });
  };

  useEffect(() => {
    if (objectPageId) {
      setValue<any>("objectId", objectPageId);
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
        errors={errors}
        setValue={setValue}
      />
      <FooterButtons
        onCreate={handleSubmit(onSubmit)}
        onClose={onClose}
        isValid={isFullValid}
      />
    </Component>
  );
};

export default CreateLastContact;
