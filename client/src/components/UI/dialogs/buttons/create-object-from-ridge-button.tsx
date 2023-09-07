import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCreateObjectFromRidgeOpenState, setCreateObjectFromRidgeOpenState, setUpdateObjectFromRidgeObjectId } from "../../../../store/ridge-object/create-object-from-ridge.store";

const CreateObjectFromRidgeButton = ({objectId}) => {
  const isLoading = useSelector(getCreateObjectFromRidgeOpenState());
  const dispatch = useDispatch();

  const handleOpenCreateObject = () => {
    dispatch(setUpdateObjectFromRidgeObjectId(objectId));
    dispatch(setCreateObjectFromRidgeOpenState(true));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleOpenCreateObject}
      disabled={isLoading}
      sx={{
        color: "white",
        background: "seaGreen",
        "&:hover": { background: "green" },
      }}
    >
      <Typography variant="body0">Создать объект</Typography>
    </Button>
  );
};

export default CreateObjectFromRidgeButton;
