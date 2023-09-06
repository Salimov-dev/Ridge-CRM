// libraries
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
// components
import MeetingForm from "../../common/forms/meeting-form/meeting-form";
import TitleWithAddress from "../../common/page-titles/title-with-address";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
// MUI
import { Box, styled } from "@mui/material";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import { createMeeting } from "../../../store/meeting/meetings.store";
import { getObjectsList } from "../../../store/object/objects.store";
import { getMeetingTypesList } from "../../../store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "../../../store/meeting/meeting-status.store";
// schema
import { meetingSchema } from "../../../schemas/schemas";
// hooks
import useFindObject from "../../../hooks/object/use-find-object";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const initialState = {
  status: "",
  meetingType: "",
  date: dayjs(),
  time: null,
  comment: "",
  objectId: "",
  result: "",
  location: {
    city: "",
    address: "",
    latitude: null,
    longitude: null,
    zoom: null,
  },
};
const Component = styled(Box)`
  width: 100%;
`;

const CreateMeeting = ({ objectPageId, onClose, dateCreate }) => {
  const statuses = useSelector(getMeetingStatusesList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const currentUserId = useSelector(getCurrentUserId());

  const objects = useSelector(getObjectsList());
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
  const watchDate = watch("date", null);
  const watchTime = watch("time", null);
  const isFullValid = !watchDate || !watchTime || !isValid;

  const isEmptyFindedObject = Boolean(!Object.keys(findedObject)?.length);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      result: capitalizeFirstLetter(data.comment),
      location: {
        ...data.location,
        zoom: 16,
      },
    };
    console.log("newData", newData);

    dispatch(createMeeting(newData))
      .then(onClose())
      .then(toast.success("Встреча успешно создана!"));
  };

  useEffect(() => {
    setValue("location.city", getCity());
    setValue("location.address", getAddress());
    setValue("location.latitude", getLatitudeCoordinates());
    setValue("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  useEffect(() => {
    if (objectPageId) {
      setValue("objectId", objectPageId);
    }
  }, [objectPageId]);

  useEffect(() => {
    if (dateCreate !== null) {
      setValue("date", dateCreate);
    } else {
      setValue("date", dayjs());
    }
  }, [dateCreate]);

  return (
    <Component>
      <TitleWithAddress
        isEmptyFindedObject={isEmptyFindedObject}
        getCity={getCity}
        getAddress={getAddress}
        title="Добавить встречу:"
        subtitle="Выберите место встречи на карте"
        onClose={onClose}
      />

      <FindObjectOnMap />

      <MeetingForm
        register={register}
        data={data}
        objects={transformObjects}
        statuses={statuses}
        meetingTypes={meetingTypes}
        objectPageId={objectPageId}
        onSubmit={onSubmit}
        onClose={onClose}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        isEmptyFindedObject={isEmptyFindedObject}
      />
    </Component>
  );
};

export default CreateMeeting;
