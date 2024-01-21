// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import MeetingForm from "@components/common/forms/meeting.form";
import FindObjectOnMap from "@common/find-object-on-map/find-object-on-map";
import SuccessCancelFormButtons from "@components/common/forms/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
// schema
import { meetingSchema } from "@schemas/meeting.schema";
// hooks
import useFindObject from "@hooks/object/use-find-object";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// store
import { getCurrentUserId } from "@store/user/users.store";
import { createMeeting } from "@store/meeting/meetings.store";
import { getObjectsList } from "@store/object/objects.store";
import { getMeetingTypesList } from "@store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "@store/meeting/meeting-status.store";

const initialState = {
  status: "",
  type: "",
  date: null,
  time: null,
  comment: "",
  objectId: null,
  // result: "",
  city: "",
  address: "",
  latitude: null,
  longitude: null,
  // zoom: null,
};

const CreateMeeting = React.memo(
  ({ objectPageId = "", onClose, dateCreate, isObjectPage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);
    const statuses = useSelector(getMeetingStatusesList());
    const meetingTypes = useSelector(getMeetingTypesList());
    const currentUserId = useSelector(getCurrentUserId());

    const objects = useSelector(getObjectsList());
    const currentUserObjects = objects?.filter(
      (obj) => obj?.userId === currentUserId
    );

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: initialState,
      mode: "onChange",
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

    const isEmptyFindedObject = !!Object.keys(findedObject)?.length;

    const onSubmit = (data) => {
      setIsLoading(true);

      dispatch<any>(createMeeting(data))
        .then(() => {
          onClose();
          toast.success("Встреча успешно создана!");
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    useEffect(() => {
      setValue<any>("city", getCity());
      setValue<any>("address", getAddress());
      setValue<any>("latitude", getLatitudeCoordinates());
      setValue<any>("longitude", getLongitudeCoordinates());
    }, [findedObject]);

    useEffect(() => {
      setValue<any>("objectId", objectPageId);
    }, []);

    useEffect(() => {
      if (dateCreate !== null) {
        setValue<any>("date", dateCreate);
      } else {
        setValue<any>("date", null);
      }
    }, [dateCreate]);

    return (
      <>
        <HeaderWithCloseButton
          title={
            !isEmptyFindedObject
              ? "КЛИКНИТЕ по карте, чтобы выбрать место встречи"
              : `Встреча по адресу: ${getCity()}, ${getAddress()}`
          }
          color={!isEmptyFindedObject ? "white" : "black"}
          margin="0 0 20px 0"
          background={
            !isEmptyFindedObject ? colors.error["red"] : colors.header["gold"]
          }
          onClose={onClose}
        />
        <FindObjectOnMap />
        <MeetingForm
          data={data}
          objects={currentUserObjects}
          statuses={statuses}
          types={meetingTypes}
          watch={watch}
          errors={errors}
          register={register}
          setValue={setValue}
          isObjectPage={isObjectPage}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
      </>
    );
  }
);

export default CreateMeeting;
