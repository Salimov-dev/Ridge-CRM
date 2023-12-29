import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "./dialog-styled";
import React from "react";

const DialogPage = React.memo(({ state, onClose, component }) => {
  return (
    <DialogStyled
      component={component}
      onClose={onClose}
      open={state.create}
      maxWidth="xl"
    />
  );
});

export default DialogPage;
