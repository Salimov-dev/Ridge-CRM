// libraries
import { toast } from "react-toastify";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import MeetingForm from "../../common/forms/meeting-form/meeting-form";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
import TitleWithAddress from "../../common/page-titles/title-with-address";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import { createMeeting } from "../../../store/meeting/meetings.store";
import { getObjectsList } from "../../../store/object/objects.store";
import { getMeetingTypesList } from "../../../store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "../../../store/meeting/meeting-status.store";
// schema
import { meetingSchema } from "../../../schemas/meeting-schema";
// hooks
import useFindObject from "../../../hooks/object/use-find-object";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import transformObjectsForSelect from "../../../utils/objects/transform-objects-for-select";

const initialState = {
  status: "",
  meetingType: "",
  date: dayjs(),
  time: null,
  comment: "",
  objectId: null,
  result: "",
  location: {
    city: "",
    address: "",
    latitude: null,
    longitude: null,
    zoom: null,
  },
};

const CreateMeeting = React.memo(({
  objectPageId = "",
  onClose,
  dateCreate,
  isObjectPage = false,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const statuses = useSelector(getMeetingStatusesList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const currentUserId = useSelector(getCurrentUserId());

  const objects = useSelector(getObjectsList());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const transformObjects = transformObjectsForSelect(currentUserObjects);

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
  const watchDate = watch<any>("date", null);
  const watchTime = watch<any>("time", null);
  const isEmptyFindedObject = Boolean(Object.keys(findedObject)?.length);
  const isFullValid = isValid && watchDate && watchTime && isEmptyFindedObject;

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      result: capitalizeFirstLetter(data.result),
      location: {
        ...data.location,
        zoom: 16,
      },
    };

    dispatch<any>(createMeeting(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Встреча успешно создана!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  useEffect(() => {
    setValue<any>("location.city", getCity());
    setValue<any>("location.address", getAddress());
    setValue<any>("location.latitude", getLatitudeCoordinates());
    setValue<any>("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  useEffect(() => {
    if (isObjectPage) {
      setValue<any>("objectId", objectPageId);
    }
  }, [objectPageId]);

  useEffect(() => {
    if (dateCreate !== null) {
      setValue<any>("date", dateCreate);
    } else {
      setValue<any>("date", dayjs());
    }
  }, [dateCreate]);

  return (
    <>
      <TitleWithAddress
        isFindedObject={isEmptyFindedObject}
        city={getCity()}
        address={getAddress()}
        title="Добавить встречу:"
        subtitle="КЛИКНИТЕ по карте, чтобы выбрать место встречи"
        onClose={onClose}
      />

      <FindObjectOnMap />

      <MeetingForm
        data={data}
        objects={transformObjects}
        statuses={statuses}
        meetingTypes={meetingTypes}
        watch={watch}
        errors={errors}
        register={register}
        setValue={setValue}
        isObjectPage={isObjectPage}
      />

      <FooterButtons
        onClose={onClose}
        onCreate={handleSubmit(onSubmit)}
        isValid={isFullValid}
      />

      {isLoading && (
        <IsLoadingDialog
          text="Немного подождите, создаем новую `Встречу`"
          isLoading={isLoading}
        />
      )}
    </>
  );
});

export default CreateMeeting;
