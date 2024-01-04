// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import SuccessCancelFormButtons from "@components/common/forms/success-cancel-form-buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import MeetingForm from "@components/common/forms/meeting.form";
// schema
import { meetingSchema } from "@schemas/meeting-schema";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";
import { getMeetingTypesList } from "@store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "@store/meeting/meeting-status.store";
import {
  getMeetingById,
  getMeetingLoadingStatus,
  removeMeeting,
  updateMeeting,
} from "@store/meeting/meetings.store";
import DialogConfirm from "@components/common/dialog/dialog-confirm";

const UpdateMeeting = React.memo(({ meetingId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const meeting = useSelector(getMeetingById(meetingId));

  const formatedMeeting = {
    ...meeting,
    date: meeting?.date ? dayjs(meeting?.date) : null,
    time: meeting?.time ? dayjs(meeting?.time) : null,
  };
  console.log("formatedMeeting", formatedMeeting);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: formatedMeeting,
    mode: "onChange",
    resolver: yupResolver(meetingSchema),
  });

  const data = watch();
  console.log("data", data);

  const isEditMode = meetingId ? true : false;

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const meetingTypes = useSelector(getMeetingTypesList());
  const statuses = useSelector(getMeetingStatusesList());

  const onSubmit = (data) => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch<any>(updateMeeting(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Встреча успешно изменена!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  const handleRemoveMeeting = (meetingId) => {
    dispatch<any>(removeMeeting(meetingId)).then(onClose());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderWithCloseButton
        title="Изменить встречу"
        color="white"
        margin="0 0 20px 0"
        background={colors.meeting["primary"]}
        onClose={onClose}
      />
      <MeetingForm
        data={data}
        objects={currentUserObjects}
        meetingTypes={meetingTypes}
        statuses={statuses}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isEditMode={isEditMode}
        isMeetingsLoading={isMeetingsLoading}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleClickOpen}
        isUpdate={true}
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить безвозвратно?"
        open={open}
        onClose={handleClose}
        onSuccessClick={() => handleRemoveMeeting(meetingId)}
      />
    </>
  );
});

export default UpdateMeeting;
