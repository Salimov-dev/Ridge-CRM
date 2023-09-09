import { useDispatch } from "react-redux";
import {
  setCreateObjectFromRidgeOpenState,
  setUpdateObjectFromRidgeObjectId,
} from "../../../../store/ridge-object/create-object-from-ridge.store";
import PositiveOutlinedButton from "../../../common/buttons/positive-outlined-button";

const CreateObjectFromRidgeButton = ({ objectId }) => {
  const dispatch = useDispatch();

  const handleOpenCreateObject = () => {
    dispatch(setUpdateObjectFromRidgeObjectId(objectId));
    dispatch(setCreateObjectFromRidgeOpenState(true));
  };

  return (
    <PositiveOutlinedButton
      title="Создать объект в талицу"
      onClick={handleOpenCreateObject}
    />
  );
};

export default CreateObjectFromRidgeButton;
