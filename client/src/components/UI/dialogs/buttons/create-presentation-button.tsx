import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreatePresentationOpenState,
  setCreatePresentationOpenState,
} from "../../../../store/presentation/create-presentation.store";

const CreatePresentationButton = ({
  variant = "contained",
  background = "SaddleBrown",
  color = "white",
}) => {
  const isLoading = useSelector(getCreatePresentationOpenState());
  const dispatch = useDispatch();

  const handleOpenCreateObject = () => {
    dispatch<any>(setCreatePresentationOpenState(true));
  };

  return (
    <Button
      variant={variant}
      color="success"
      onClick={handleOpenCreateObject}
      disabled={isLoading}
      sx={{
        color: color,
        borderColor: "MediumSeaGreen",
        background: background,
        "&:hover": { color: "white", background: "Chocolate" },
      }}
    >
      Добавить презентацию
    </Button>
  );
};

export default CreatePresentationButton;
