import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import { getCreateRidgeLastContactOpenState, setCreateRidgeLastContactOpenState } from "../../../../store/ridge-last-contact/create-ridge-last-contact.store";
import CreateRidgeLastContact from "../../../pages/create-ridge-last-contact/create-ridge-last-contact";

const RidgeLastContactCreateDialog = () => {
  const dispatch = useDispatch();
  const isOpenCreateRidgeLastContact = useSelector(getCreateRidgeLastContactOpenState());

  const handleCloseCreateLastContact = () => {
    dispatch<any>(setCreateRidgeLastContactOpenState(false));
  };

  return (
    <DialogStyled
      component={<CreateRidgeLastContact onClose={handleCloseCreateLastContact} />}
      onClose={handleCloseCreateLastContact}
      open={isOpenCreateRidgeLastContact}
      maxWidth="sm"
    />
  );
};

export default RidgeLastContactCreateDialog;
