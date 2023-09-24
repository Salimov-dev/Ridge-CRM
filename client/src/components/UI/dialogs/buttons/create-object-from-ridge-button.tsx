import { useDispatch } from "react-redux";
import {
  setCreateObjectFromRidgeOpenState,
  setUpdateObjectFromRidgeObjectId,
} from "../../../../store/ridge-object/create-object-from-ridge.store";
import PositiveOutlinedButton from "../../../common/buttons/positive-outlined-button";

const CreateObjectFromRidgeButton = ({ data, objectId, onUpdate }) => {
  const dispatch = useDispatch();

  const handleOpenCreateObject = () => {
    const updateData = {...data}
    onUpdate(updateData)
      .then(()=>dispatch<any>(setUpdateObjectFromRidgeObjectId(objectId)))
      .then(()=>dispatch<any>(setCreateObjectFromRidgeOpenState(true)));
  };

  return (
    <PositiveOutlinedButton
      title="Создать объект в таблицу"
      onClick={handleOpenCreateObject}
    />
  );
};

export default CreateObjectFromRidgeButton;
