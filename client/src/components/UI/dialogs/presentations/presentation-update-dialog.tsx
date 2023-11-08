import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import { loadUpdatePresentationOpenState, setUpdatePresentationOpenState } from "../../../../store/presentation/update-presentation.store";
import UpdatePresentation from "../../../pages/update-presentation/update-presentation";
import React from "react";

const PresentationUpdateDialog = React.memo(() => {
  const dispatch = useDispatch();
  const isOpenUpdatePresentation = useSelector(loadUpdatePresentationOpenState());

  const handleCloseUpdate = () => {
    dispatch<any>(setUpdatePresentationOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdatePresentation onClose={handleCloseUpdate} />}
      onClose={handleCloseUpdate}
      open={isOpenUpdatePresentation}
      fullWidth={false}
    />
  );
});

export default PresentationUpdateDialog;
