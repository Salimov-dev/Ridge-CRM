import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateObjectFromRidge from "../../../pages/create-object-from-ridge/create-object-from-ridge";
import { getCreateObjectFromRidgeOpenState, setCreateObjectFromRidgeOpenState } from "../../../../store/ridge-object/create-object-from-ridge.store";
import { setUpdateRidgeObjectOpenState } from "../../../../store/ridge-object/update-ridge-object.store";

const ObjectFromRidgeCreatePageDialog = () => {
  const dispatch = useDispatch();

  const isOpenCreateObject = useSelector(getCreateObjectFromRidgeOpenState());

  const handleCloseCreateObject = () => {
    dispatch(setCreateObjectFromRidgeOpenState(false));
    dispatch(setUpdateRidgeObjectOpenState(true));
  };
  
  return (
    <DialogStyled
      component={<CreateObjectFromRidge onClose={handleCloseCreateObject} />}
      onClose={handleCloseCreateObject}
      open={isOpenCreateObject}
      maxWidth="xl"
    />
  );
};

export default ObjectFromRidgeCreatePageDialog;