import { useDispatch, useSelector } from "react-redux";
import { loadUpdateMeetingOpenState } from "../store/meeting/update-meeting.store";

const useMeetings = (setOpenCreate, setUpdateMeetingOpenState) => {
  const isOpenUpdate = useSelector(loadUpdateMeetingOpenState());
  const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;
  
  const dispatch = useDispatch();

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCloseUpdate = () => {
    dispatch(setUpdateMeetingOpenState(false));
  };
  return {
    isOpenUpdate,
    center,
    mapZoom,
    handleOpenCreate,
    handleCloseCreate,
    handleCloseUpdate,
  };
};

export default useMeetings;
