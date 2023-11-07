import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getObjectsLoadingStatus } from "../../../../store/object/objects.store";
import { setTransferObjectToAnotherManagerOpenState } from "../../../../store/object/transfer-object-to-another-manager.store";

const TransferObjectToAnotherManagerButton = () => {
  const isLoading = useSelector(getObjectsLoadingStatus());
  const dispatch = useDispatch();

  const handleOpenTransferObject = () => {
    dispatch<any>(setTransferObjectToAnotherManagerOpenState(true));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleOpenTransferObject}
      disabled={isLoading}
      sx={{
        color: "white",
        background: "MediumBlue",
        "&:hover": { background: "Blue" },
      }}
    >
      Передать объекты
    </Button>
  );
};

export default TransferObjectToAnotherManagerButton;
