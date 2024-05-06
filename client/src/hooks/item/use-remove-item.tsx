import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface useRemoveItemProps {
  onRemove: (itemId: string) => void;
  onClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface useRemoveItemReturnType {
  openConfirm: boolean;
  handleOpenConfirm: () => void;
  handleCloseConfirm: () => void;
  handleRemoveItem: () => void;
}

const useRemoveItem = ({
  onRemove,
  onClose,
  setIsLoading
}: useRemoveItemProps): useRemoveItemReturnType => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const dispatch: any = useDispatch();

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleRemoveItem = (): void => {
    setIsLoading(true);
    dispatch(onRemove)
      .then(() => {
        onClose();
        handleCloseConfirm();
      })
      .catch((error: string) => {
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
