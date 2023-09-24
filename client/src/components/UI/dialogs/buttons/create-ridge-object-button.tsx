import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateRidgeObjectOpenState } from "../../../../store/ridge-object/create-ridge-object.store";
import { getRidgeObjectStatusLoading } from "../../../../store/ridge-object/ridge-object-status.store";

const CreateRidgeObjectButton = () => {
  const isLoading = useSelector(getRidgeObjectStatusLoading());
  const dispatch = useDispatch();

  const handleOpenCreateRidgeObject = () => {
    dispatch<any>(setCreateRidgeObjectOpenState(true));
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
      Создать объект
    </Button>
  );
};

export default CreateRidgeObjectButton;
