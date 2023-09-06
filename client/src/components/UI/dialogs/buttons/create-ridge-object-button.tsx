import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getObjectsLoadingStatus } from "../../../../store/object/objects.store";
import { setCreateRidgeObjectOpenState } from "../../../../store/ridge-object/create-ridge-object.store";

const CreateRidgeObjectButton = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getObjectsLoadingStatus());

  const handleOpenCreateRidgeObject = () => {
    dispatch(setCreateRidgeObjectOpenState(true));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleOpenCreateRidgeObject}
      disabled={isLoading}
      sx={{
        color: "white",
        background: "purple",
        "&:hover": { background: "darkOrchid" },
      }}
    >
      <Typography variant="body0">Создать объект</Typography>
    </Button>
  );
};

export default CreateRidgeObjectButton;
