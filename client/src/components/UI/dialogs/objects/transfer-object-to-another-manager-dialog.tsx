import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import {
  getTransferObjectToAnotherManagerOpenState,
  setTransferObjectToAnotherManagerOpenState,
} from "../../../../store/object/transfer-object-to-another-manager.store";
import TransferObjectToAnotherManager from "../../../pages/transfer-object-to-another-manager/transfer-object-to-another-manager";

const TransferObjectToAnotherManagerDialog = 
  ({ objectsToTransfer, setRowSelection }) => {
    const dispatch = useDispatch();

    const isOpenTransferObjects = useSelector(
      getTransferObjectToAnotherManagerOpenState()
    );

    const handleCloseTransferObjects = () => {
      dispatch<any>(setTransferObjectToAnotherManagerOpenState(false));
    };

    return (
      <DialogStyled
        onClose={handleCloseTransferObjects}
        open={isOpenTransferObjects}
        fullWidth={false}
        component={
          <TransferObjectToAnotherManager
            title="Передать объекты"
            objectsToTransfer={objectsToTransfer}
            onClose={handleCloseTransferObjects}
            setRowSelection={setRowSelection}
          />
        }
      />
    );
  }
;

export default TransferObjectToAnotherManagerDialog;
