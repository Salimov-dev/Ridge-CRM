// libraries
import React, { useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import MeetingForm from "../../common/forms/meeting-form/meeting-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
// schema
import { meetingSchema } from "../../../schemas/meeting-schema";
// store
import { getObjectsList } from "../../../store/object/objects.store";
import { getCurrentUserId } from "../../../store/user/users.store";
import { getMeetingTypesList } from "../../../store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "../../../store/meeting/meeting-status.store";
import { getUpdateMeetingId } from "../../../store/meeting/update-meeting.store";
import {
  getMeetingById,
  getMeetingLoadingStatus,
  removeMeeting,
  updateMeeting,
} from "../../../store/meeting/meetings.store";
// utils
import transformObjectsForSelect from "../../../utils/objects/transform-objects-for-select";

const UpdateMeeting = React.memo(({ onClose }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const meetingId = useSelector(getUpdateMeetingId());
  const meeting = useSelector(getMeetingById(meetingId));

  const formatedMeeting = {
    ...meeting,
    date: meeting?.date ? dayjs(meeting?.date) : null,
    time: meeting?.time ? dayjs(meeting?.time) : null,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: formatedMeeting,
    mode: "onBlur",
    resolver: yupResolver(meetingSchema),
  });

  const data = watch();
  const watchDate = watch("date", null);
  const watchTime = watch("time", null);
  const isFullValid = isValid && watchDate && watchTime;
  const isEditMode = meetingId ? true : false;

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const meetingTypes = useSelector(getMeetingTypesList());
  const statuses = useSelector(getMeetingStatusesList());

  const transformObjects = transformObjectsForSelect(currentUserObjects)

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

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, изменяем `Встречу`"
      isLoading={isLoading}
    />
  ) : (
    <Box>
      <Header meeting={meeting} onClose={onClose} />
      <MeetingForm
        data={data}
        objects={transformObjects}
        meetingTypes={meetingTypes}
        statuses={statuses}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isEditMode={isEditMode}
        isMeetingsLoading={isMeetingsLoading}
      />
      <FooterButtons
        onClose={onClose}
        onUpdate={handleSubmit(onSubmit)}
        onRemove={handleClickOpen}
        isValid={isFullValid}
        isEditMode={isEditMode}
      />
      <ConfirmRemoveDialog
        removeId={meetingId}
        open={open}
        onClose={handleClose}
        onRemove={handleRemoveMeeting}
      />
    </Box>
  );
});

export default UpdateMeeting;
