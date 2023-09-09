import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import {
  getCreateLastContactOpenState,
  setCreateLastContactOpenState,
} from "../../../../store/last-contact/create-last-contact.store";
import CreateLastContact from "../../../pages/create-last-contact/create-last-contact";

const LastContactCreateDialog = () => {
  const dispatch = useDispatch();
  const isOpenCreateMeeting = useSelector(getCreateLastContactOpenState());

  const handleCloseCreateLastContact = () => {
    dispatch(setCreateLastContactOpenState(false));
  };

  return (
    <DialogStyled
      component={<CreateLastContact onClose={handleCloseCreateLastContact} />}
      onClose={handleCloseCreateLastContact}
      open={isOpenCreateMeeting}
      maxWidth="sm"
    />
  );
};

export default LastContactCreateDialog;
