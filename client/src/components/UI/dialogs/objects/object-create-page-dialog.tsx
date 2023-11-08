import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateObject from "../../../pages/create-object/create-object";
import {
  getCreateObjectOpenState,
  setCreateObjectOpenState,
} from "../../../../store/object/create-object.store";
import React from "react";

const ObjectCreatePageDialog = React.memo(() => {
  const dispatch = useDispatch();

  const isOpenCreateObject = useSelector(getCreateObjectOpenState());
  const handleCloseCreateObject = () => {
    dispatch<any>(setCreateObjectOpenState(false));
  };
  return (
    <DialogStyled
      component={<CreateObject onClose={handleCloseCreateObject} />}
      onClose={handleCloseCreateObject}
      open={isOpenCreateObject}
      maxWidth="xl"
    />
  );
});

export default ObjectCreatePageDialog;
