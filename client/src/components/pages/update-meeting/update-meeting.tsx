// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import { getMeetingById, updateMeeting } from "../../../store/meetings.store";
import { getMeetingStatusesList } from "../../../store/meeting-status.store";
import { meetingSchema } from "../../../schemas/schemas";
import MeetingForm from "../../common/forms/meeting-form";
import { getObjectsList } from "../../../store/objects.store";
import { getMeetingTypesList } from "../../../store/meeting-types.store";
import { getCurrentUserId } from "../../../store/users.store";

const UpdateMeeting = () => {
  const { meetingId } = useParams();
  const meeting = useSelector(getMeetingById(meetingId));
  const objects = useSelector(getObjectsList());
  const statuses = useSelector(getMeetingStatusesList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEditMode = meetingId ? true : false;

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
  const watchStatus = watch("status", "");
  const watchObjectId = watch("objectId", "");
  const watchTypeMeeting = watch("meetingType", "");

  const onSubmit = (data) => {
    dispatch(updateMeeting(data, meetingId))
      .then(navigate(-1))
      .then(toast.success("Встреча успешно изменена!"));
  };

  return (
    <Box>
      <Header meeting={meeting} />
      <MeetingForm
        data={data}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        isValid={isValid}
        setValue={setValue}
        statuses={statuses}
        meetingTypes={meetingTypes}
        objects={transformObjects}
        isEditMode={isEditMode}
        watchObjectId={watchObjectId}
        watchStatus={watchStatus}
        watchTypeMeeting={watchTypeMeeting}
      />
    </Box>
  );
};

export default UpdateMeeting;
