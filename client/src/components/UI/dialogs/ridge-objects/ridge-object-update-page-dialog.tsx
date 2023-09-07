import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateRidgeObject from "../../../pages/update-ridge-object/update-ridge-object";
import {
  loadUpdateRidgeObjectOpenState,
  setUpdateRidgeObjectOpenState,
} from "../../../../store/ridge-object/update-ridge-object.store";

const RidgeObjectUpdatePageDialog = () => {
  const dispatch = useDispatch();
  const isOpenUpdateObject = useSelector(loadUpdateRidgeObjectOpenState());

  const handleCloseEditRidgeObject = () => {
    dispatch(setUpdateRidgeObjectOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdateRidgeObject onClose={handleCloseEditRidgeObject} />}
      onClose={handleCloseEditRidgeObject}
      open={isOpenUpdateObject}
      maxWidth="lg"
    />
  );
};

export default RidgeObjectUpdatePageDialog;
