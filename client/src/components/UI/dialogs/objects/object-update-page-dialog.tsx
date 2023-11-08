import { useDispatch, useSelector } from "react-redux";
import {
  getUpdateObjectOpenState,
  setUpdateObjectOpenState,
} from "../../../../store/object/update-object.store";
import UpdateObject from "../../../pages/update-object/update-object";
import DialogStyled from "../../../common/dialog/dialog-styled";
import React from "react";

const ObjectUpdatePageDialog = React.memo(() => {
  const dispatch = useDispatch();
  const isOpenUpdateObject = useSelector(getUpdateObjectOpenState());

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
});

export default ObjectUpdatePageDialog;
