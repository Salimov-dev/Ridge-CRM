import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateLastContact from "../../../pages/update-last-contact/update-last-contact";
import {
  loadUpdateLastContactOpenState,
  setUpdateLastContactOpenState,
} from "../../../../store/last-contact/update-last-contact.store";
import React from "react";

const LastContactUpdateDialog = React.memo(() => {
  const dispatch = useDispatch();
  const isOpenUpdateMeeting = useSelector(loadUpdateLastContactOpenState());

  const handleCloseUpdate = () => {
    dispatch<any>(setUpdateLastContactOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdateLastContact onClose={handleCloseUpdate} />}
      onClose={handleCloseUpdate}
      open={isOpenUpdateMeeting}
      fullWidth={false}
    />
  );
});

export default LastContactUpdateDialog;
