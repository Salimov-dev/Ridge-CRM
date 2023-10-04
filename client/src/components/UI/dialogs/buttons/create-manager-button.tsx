import { useDispatch } from "react-redux";
import { setCreateUserOpenState } from "../../../../store/user/create-user.store";
import MultiColorContainedButton from "../../../common/buttons/multi-color-contained-button";

const CreateManagerButton = () => {
  const dispatch = useDispatch();

  const handleOpenCreateManager = () => {
    dispatch<any>(setCreateUserOpenState(true));
  };

  return (
    <MultiColorContainedButton
      text="Добавить менеджера"
      fontColor="white"
      background="chocolate"
      backgroudHover="sienna"
      width={null}
      onClick={handleOpenCreateManager}
    />
  );
};

export default CreateManagerButton;
