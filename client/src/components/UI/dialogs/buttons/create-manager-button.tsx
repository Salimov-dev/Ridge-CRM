import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateUserOpenState } from "../../../../store/user/create-user.store";
import { getUsersLoadingStatus } from "../../../../store/user/users.store";
import MultiColorContainedButton from "../../../common/buttons/multi-color-contained-button";

const CreateManagerButton = () => {
  const isLoading = useSelector(getUsersLoadingStatus());
  const dispatch = useDispatch();

  const handleOpenCreateManager = () => {
    dispatch(setCreateUserOpenState(true));
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
