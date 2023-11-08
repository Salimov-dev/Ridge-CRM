import { useDispatch, useSelector } from "react-redux";
import {
  loadUpdateObjectOpenState,
  setUpdateObjectOpenState,
} from "../../../../store/object/update-object.store";
import UpdateObject from "../../../pages/update-object/update-object";
import DialogStyled from "../../../common/dialog/dialog-styled";
import React from "react";

const ObjectUpdatePageDialog = () => {
  const dispatch = useDispatch();
  const isOpenUpdateObject = useSelector(loadUpdateObjectOpenState());

  const handleCloseEditObject = () => {
    dispatch<any>(setUpdateObjectOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdateObject onClose={handleCloseEditObject} />}
      onClose={handleCloseEditObject}
      open={isOpenUpdateObject}
      maxWidth="xl"
    />
  );
};

export default ObjectUpdatePageDialog;
