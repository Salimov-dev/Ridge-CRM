import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, FC, SetStateAction } from "react";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import ItemOnMap from "@components/common/map/item-on-map/item-on-map";
// forms
import MeetingForm from "@forms/meeting/meeting.form";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// hooks
import useRemoveItem from "@hooks/item/use-remove-item";
// schemas
import { meetingSchema } from "@schemas/meeting/meeting.schema";
// store
import {
  getMeetingById,
  removeMeeting,
  updateMeeting
} from "@store/meeting/meetings.store";

interface ContentUpdateMeetingPageProps {
  state: IDialogPagesState;
  isLoading: boolean;
  onClose: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const ContentUpdateMeetingPage: FC<ContentUpdateMeetingPageProps> = ({
  state,
  onClose,
  isLoading,
  setIsLoading
}): JSX.Element => {
  const dispatch = useDispatch();

  const meetingId = state.meetingId;
  const meeting = useSelector(getMeetingById(meetingId));
  const address = `${meeting?.city}, ${meeting?.address}`;
  const latitude = meeting?.latitude || null;
  const longitude = meeting?.longitude || null;
  const mapZoom = meeting?.zoom || null;
  const center = [latitude, longitude];
  const formatedMeeting = {
    ...meeting,
    date: meeting?.date ? dayjs(meeting?.date) : null,
    time: meeting?.time ? dayjs(meeting?.time) : null
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: formatedMeeting,
    mode: "onChange",
    resolver: yupResolver<any>(meetingSchema)
  });

  const data = watch();
  const objectPageId = state.objectId;

  const onSubmit = () => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch<any>(updateMeeting(newData))
      .then(() => {
        onClose();
        toast.success("Встреча успешно изменена!");
      })
      .catch((error: string) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const {
    openConfirm,
    handleOpenConfirm,
    handleCloseConfirm,
    handleRemoveItem
  } = useRemoveItem({
    onRemove: removeMeeting(meetingId),
    onClose,
    setIsLoading
  });

  return (
    <>
      <ItemOnMap
        mapZoom={mapZoom}
        hintContent={address}
        center={center}
        isLoading={isLoading}
      />
      <MeetingForm
        data={data}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isUpdatePage={!!meetingId}
        isObjectPage={!!objectPageId}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleOpenConfirm}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить безвозвратно?"
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccessClick={() => handleRemoveItem()}
      />
    </>
  );
};

export default ContentUpdateMeetingPage;
