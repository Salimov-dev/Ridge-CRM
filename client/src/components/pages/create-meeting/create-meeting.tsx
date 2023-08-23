// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// components
import FindObjectOnMap from "../../common/find-object-on-map";
import MeetingForm from "../../common/forms/meeting-form";
// MUI
import { Box } from "@mui/material";
// store
import { getMeetingStatusesList } from "../../../store/meeting-status.store";
import { getCurrentUserId } from "../../../store/users.store";
import { getObjectsList } from "../../../store/objects.store";
// schema
import { meetingSchema } from "../../../schemas/schemas";
// hooks
import useFindObject from "../../../hooks/use-find-object";
// utils
import { capitalizeFirstLetter } from "../../../utils/capitalize-first-letter";
import { createMeeting } from "../../../store/meetings.store";
import TitleWithAddress from "../../common/page-titles/title-with-address";
import { getMeetingTypesList } from "../../../store/meeting-types.store";

const initialState = {
  status: "",
  meetingType: "",
  date: null,
  time: null,
  comment: "",
  objectId: "",
  location: {
    city: "",
    address: "",
    latitude: null,
    longitude: null,
    zoom: null,
  },
};

const CreateMeeting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const objects = useSelector(getObjectsList());
  const statuses = useSelector(getMeetingStatusesList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(meetingSchema),
  });

  const watchStatus = watch("status", "");
  const watchObjectId = watch("objectId", "");
  const watchTypeMeeting = watch("meetingType", "");

  const {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();
  
  const data = watch();

  const isEmptyFindedObject = Boolean(!Object.keys(findedObject)?.length);
  const isFullValid = data.date !== null && data.time !== null && isValid;

  const onSubmit = (data) => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      location: {
        ...data.location,
        zoom: 16,
      },
    };

    dispatch(createMeeting(newData))
      .then(navigate("/meetings"))
      .then(toast.success("Встреча успешно создана!"));
  };

  useEffect(() => {
    setValue("location.city", getCity());
    setValue("location.address", getAddress());
    setValue("location.latitude", getLatitudeCoordinates());
    setValue("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  return (
    <Box>
      <TitleWithAddress
        isEmptyFindedObject={isEmptyFindedObject}
        getCity={getCity}
        getAddress={getAddress}
        title="Создать встречу:"
        subtitle="Выберите место встречи на карте"
        path="meetings"
      />

      <FindObjectOnMap />

      <MeetingForm
        objects={transformObjects}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        isEmptyFindedObject={isEmptyFindedObject}
        statuses={statuses}
        meetingTypes={meetingTypes}
        watchObjectId={watchObjectId}
        watchStatus={watchStatus}
        watchTypeMeeting={watchTypeMeeting}
      />
    </Box>
  );
};

export default CreateMeeting;
