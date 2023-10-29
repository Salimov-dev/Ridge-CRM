import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import { loadOpenSelectedDayOpenState, setOpenSelectedDayOpenState } from "../../../../store/calendar/open-selected-day.store";
import OpenSelectedDay from "../../../pages/open-selected-day/open-selected-day";

const OpenSelectedDayDialog = ({dateCreate}) => {
  const dispatch = useDispatch();
  const isOpenSelectedDay = useSelector(loadOpenSelectedDayOpenState());

  const handleCloseUpdate = () => {
    dispatch<any>(setOpenSelectedDayOpenState(false));
  };

  return (
    <DialogStyled
      component={<OpenSelectedDay onClose={handleCloseUpdate} dateCreate={dateCreate}/>}
      onClose={handleCloseUpdate}
      open={isOpenSelectedDay}
      fullWidth={false}
    />
  );
};

export default OpenSelectedDayDialog;
