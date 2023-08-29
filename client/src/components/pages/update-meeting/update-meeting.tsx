// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import MeetingForm from "../../common/forms/meeting-form/meeting-form";
// store
import { meetingSchema } from "../../../schemas/schemas";
import { getObjectsList } from "../../../store/object/objects.store";
import { getCurrentUserId } from "../../../store/user/users.store";
import { getMeetingTypesList } from "../../../store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "../../../store/meeting/meeting-status.store";
import {
  getMeetingById,
  updateMeeting,
} from "../../../store/meeting/meetings.store";
import Loader from "../../common/loader/loader";
import {
  getUpdateMeetingId,
} from "../../../store/meeting/update-meeting.store";

const UpdateMeeting = ({ onClose }) => {
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const meetingId = useSelector(getUpdateMeetingId());
  const meeting = useSelector(getMeetingById(meetingId));
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

  const isFullValid = data.date !== null && data.time !== null && isValid;
  const isEditMode = meetingId ? true : false;

  const onSubmit = (data) => {
    dispatch(updateMeeting(data, meetingId))
      .then(onClose())
      .then(toast.success("Встреча успешно изменена!"));
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
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        isValid={isFullValid}
        setValue={setValue}
        statuses={statuses}
        isEditMode={isEditMode}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateMeeting;
