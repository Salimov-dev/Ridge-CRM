import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface useRemoveItemProps {
  onRemove: (itemId: string) => void;
  onClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useRemoveItem = ({
  onRemove,
  onClose,
  setIsLoading
}: useRemoveItemProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleRemoveItem = () => {
    setIsLoading(true);
    dispatch(onRemove)
      .then(() => {
        onClose();
        handleCloseConfirm();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    openConfirm,
    handleOpenConfirm,
    handleCloseConfirm,
    handleRemoveItem
  };
};

export default useRemoveItem;
