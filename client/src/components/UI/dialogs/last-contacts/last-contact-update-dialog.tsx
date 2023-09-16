import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateLastContact from "../../../pages/update-last-contact/update-last-contact";
import {
  loadUpdateLastContactOpenState,
  setUpdateLastContactOpenState,
} from "../../../../store/last-contact/update-last-contact.store";

const LastContactUpdateDialog = () => {
  const dispatch = useDispatch();
  const isOpenUpdateMeeting = useSelector(loadUpdateLastContactOpenState());

  const handleCloseUpdate = () => {
    dispatch(setUpdateLastContactOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdateLastContact onClose={handleCloseUpdate} />}
      onClose={handleCloseUpdate}
      open={isOpenUpdateMeeting}
      fullWidth={false}
    />
  );
};

export default LastContactUpdateDialog;