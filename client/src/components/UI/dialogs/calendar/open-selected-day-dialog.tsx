import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import OpenSelectedDay from "../../../pages/open-selected-day/open-selected-day";
import {
  loadOpenSelectedDayOpenState,
  setOpenSelectedDayOpenState,
} from "../../../../store/calendar/open-selected-day.store";

const OpenSelectedDayDialog = ({ dateCreate, tasks, meetings }) => {
  const dispatch = useDispatch();
  const isOpenSelectedDay = useSelector(loadOpenSelectedDayOpenState());

  const handleCloseUpdate = () => {
    dispatch<any>(setOpenSelectedDayOpenState(false));
  };

  return (
    <DialogStyled
      component={
        <OpenSelectedDay
          onClose={handleCloseUpdate}
          dateCreate={dateCreate}
          tasks={tasks}
          meetings={meetings}
        />
      }
      onClose={handleCloseUpdate}
      open={isOpenSelectedDay}
      fullWidth={false}
    />
  );
};

export default OpenSelectedDayDialog;
