import { useState } from "react";

const useConfirmDialog = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return { openConfirm, handleOpenConfirm, handleCloseConfirm };
};

export default useConfirmDialog;
