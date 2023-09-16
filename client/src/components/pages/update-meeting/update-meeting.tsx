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
import MeetingForm from "../../common/forms/meeting-form/meeting-form";
// store
import { getObjectsList } from "../../../store/object/objects.store";
import { getCurrentUserId } from "../../../store/user/users.store";
import { getMeetingTypesList } from "../../../store/meeting/meeting-types.store";
import {
  getMeetingStatusesList,
  getMeetingStatusesLoadingStatus,
} from "../../../store/meeting/meeting-status.store";
import { getUpdateMeetingId } from "../../../store/meeting/update-meeting.store";
import {
  getMeetingById,
  removeMeeting,
  updateMeeting,
} from "../../../store/meeting/meetings.store";
// schema
import { meetingSchema } from "../../../schemas/meeting-schema";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import { useConfirm } from "material-ui-confirm";

const UpdateMeeting = ({ onClose }) => {
  const confirm = useConfirm();
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const meetingId = useSelector(getUpdateMeetingId());
  const meeting = useSelector(getMeetingById(meetingId));

  const isMeetingsLoading = useSelector(getMeetingStatusesLoadingStatus());
  const meetingTypes = useSelector(getMeetingTypesList());
  const statuses = useSelector(getMeetingStatusesList());
  const dispatch = useDispatch();

  const formatedMeeting = {
    ...meeting,
    date: meeting?.date ? dayjs(meeting?.date) : null,
    time: meeting?.time ? dayjs(meeting?.time) : null,
  };

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

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

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch(updateMeeting(newData, meetingId))
      .then(onClose())
      .then(toast.success("Встреча успешно изменена!"));
  };

  const handleRemoveMeeting = (meetingId) => {
    confirm({
      title: "Подтвердите удаление встречи",
      description: "Удалить встречу безвозвратно?",
      cancellationButtonProps: { color: "error" },
      confirmationButtonProps: { color: "success" },
      confirmationText: "Подтвердить",
      cancellationText: "Отмена",
    })
      .then(() => {
        dispatch(removeMeeting(meetingId))
          .then(onClose())
          .then(toast.success("Встреча успешно удалена!"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return meeting ? (
    <Box>
      <Header meeting={meeting} onClose={onClose} />
      <MeetingForm
        register={register}
        data={data}
        objects={transformObjects}
        meetingTypes={meetingTypes}
        onSubmit={onSubmit}
        onClose={onClose}
        onRemoveMeeting={handleRemoveMeeting}
        removeId={meetingId}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        isValid={isFullValid}
        setValue={setValue}
        statuses={statuses}
        isEditMode={isEditMode}
        isMeetingsLoading={isMeetingsLoading}
      />
      <FooterButtons
        onClose={onClose}
        onUpdate={handleSubmit(onSubmit)}
        onRemove={handleRemoveMeeting}
        removeId={meetingId}
        isValid={isFullValid}
        isEditMode={isEditMode}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateMeeting;
