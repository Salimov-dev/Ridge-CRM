import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import FindObjectOnMap from "@components/common/find-object-on-map/find-object-on-map";
// forms
import MeetingForm from "@forms/meeting/meeting.form";
// initial-states
import { meetingCreateInitialState } from "@initial-states/pages/meeting-create.initial-state";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// schemas
import { meetingSchema } from "@schemas/meeting/meeting.schema";
// store
import { createMeeting } from "@store/meeting/meetings.store";

interface ContentCreateMeetingPageProps {
  state: IDialogPagesState;
  onClose: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  getCity: () => void;
  getAddress: () => void;
  getLatitudeCoordinates: () => void;
  getLongitudeCoordinates: () => void;
  findedObject: Record<string, any>;
}

const ContentCreateMeetingPage: FC<ContentCreateMeetingPageProps> = ({
  state,
  onClose,
  setIsLoading,
  getCity,
  getAddress,
  getLatitudeCoordinates,
  getLongitudeCoordinates,
  findedObject
}) => {
  const dispatch: any = useDispatch();

  const objectPageId = state.objectId;
  const dateCreate = state.dateCreate;

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: meetingCreateInitialState,
    mode: "onChange",
    resolver: yupResolver<any>(meetingSchema)
  });

  const data = watch();

  const onSubmit = () => {
    setIsLoading(true);

    dispatch(createMeeting(data))
      .then(() => {
        onClose();
        toast.success("Встреча успешно создана!");
      })
      .catch((error: string) => {
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
      <FindObjectOnMap />
      <MeetingForm
        data={data}
        watch={watch}
        errors={errors}
        register={register}
        setValue={setValue}
        isObjectPage={!!objectPageId}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
    </>
  );
};

export default ContentCreateMeetingPage;
