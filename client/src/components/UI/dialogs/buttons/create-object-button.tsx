import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getObjectsLoadingStatus } from "../../../../store/object/objects.store";
import { setCreateObjectOpenState } from "../../../../store/object/create-object.store";

const CreateObjectButton = () => {
  const isLoading = useSelector(getObjectsLoadingStatus());
  const dispatch = useDispatch();

  const handleOpenCreateObject = () => {
    dispatch(setCreateObjectOpenState(true));
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

export default CreateObjectButton;