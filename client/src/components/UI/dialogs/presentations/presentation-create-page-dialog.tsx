import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreatePresentation from "../../../pages/create-presentation/create-presentation";
import {
  getCreatePresentationOpenState,
  setCreatePresentationOpenState,
} from "../../../../store/presentation/create-presentation.store";
import React from "react";

const PresentationCreatePageDialog = React.memo(({ setConfettiActive }) => {
  const dispatch = useDispatch();

  const isOpenCreatePresentation = useSelector(
    getCreatePresentationOpenState()
  );
  const handleCloseCreatePresentation = () => {
    dispatch<any>(setCreatePresentationOpenState(false));
  };

  return (
    <DialogStyled
      component={
        <CreatePresentation
          onClose={handleCloseCreatePresentation}
          setConfettiActive={setConfettiActive}
        />
      }
      onClose={handleCloseCreatePresentation}
      open={isOpenCreatePresentation}
      maxWidth="sm"
    />
  );
});

export default PresentationCreatePageDialog;
