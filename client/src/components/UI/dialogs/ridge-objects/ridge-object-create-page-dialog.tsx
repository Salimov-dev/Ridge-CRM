import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import {
  getCreateRidgeObjectOpenState,
  setCreateRidgeObjectOpenState,
} from "../../../../store/ridge-object/create-ridge-object.store";
import CreateRidgeObject from "../../../pages/create-ridge-object/create-ridge-object";

const RidgeObjectCreatePageDialog = () => {
  const dispatch = useDispatch();

  const isOpenCreateRidgeObject = useSelector(getCreateRidgeObjectOpenState());
  const handleCloseCreateRidgeObject = () => {
    dispatch<any>(setCreateRidgeObjectOpenState(false));
  };
  return (
    <DialogStyled
      component={<CreateRidgeObject onClose={handleCloseCreateRidgeObject} />}
      onClose={handleCloseCreateRidgeObject}
      open={isOpenCreateRidgeObject}
      maxWidth="xl"
    />
  );
};

export default RidgeObjectCreatePageDialog;
