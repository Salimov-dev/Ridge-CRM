import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import ObjectPage from "../../../pages/object-page/object-page";
import {
  loadOpenObjectPageOpenState,
  setOpenObjectPageOpenState,
} from "../../../../store/object/open-object-page.store";
import React from "react";

const ObjectPageDialog = () => {
  const dispatch = useDispatch();
  const isOpenObjectPage = useSelector(loadOpenObjectPageOpenState());

  const handleCloseObjectPage = () => {
    dispatch<any>(setOpenObjectPageOpenState(false));
  };

  return (
    <DialogStyled
      component={<ObjectPage onClose={handleCloseObjectPage} />}
      onClose={handleCloseObjectPage}
      open={isOpenObjectPage}
      maxWidth="xl"
    />
  );
};

export default ObjectPageDialog;
