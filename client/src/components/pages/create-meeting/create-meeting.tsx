// libraries
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import MeetingForm from "../../common/forms/meeting-form/meeting-form";
import TitleWithAddress from "../../common/page-titles/title-with-address";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
// MUI
import { Box } from "@mui/material";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import { getObjectsList } from "../../../store/object/objects.store";
import { getMeetingStatusesList } from "../../../store/meeting/meeting-status.store";
// schema
import { meetingSchema } from "../../../schemas/schemas";
// hooks
import useFindObject from "../../../hooks/use-find-object";
// utils
import { createMeeting } from "../../../store/meeting/meetings.store";
import { getMeetingTypesList } from "../../../store/meeting/meeting-types.store";
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

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
      />

      <FindObjectOnMap />

      <MeetingForm
        register={register}
        objects={transformObjects}
        statuses={statuses}
        meetingTypes={meetingTypes}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        isEmptyFindedObject={isEmptyFindedObject}
      />
    </Box>
  );
};

export default CreateMeeting;
