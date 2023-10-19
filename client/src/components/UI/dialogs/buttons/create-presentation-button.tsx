import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCreatePresentationOpenState, setCreatePresentationOpenState } from "../../../../store/presentation/create-presentation.store";

const CreatePresentationButton = () => {
  const isLoading = useSelector(getCreatePresentationOpenState());
  const dispatch = useDispatch();

  const handleOpenCreateObject = () => {
    dispatch<any>(setCreatePresentationOpenState(true));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleOpenCreateObject}
      disabled={isLoading}
      sx={{
        color: "white",
        background: "SaddleBrown",
        "&:hover": { background: "Chocolate" },
      }}
    >
      Добавить презентацию
    </Button>
  );
};

export default CreatePresentationButton;
