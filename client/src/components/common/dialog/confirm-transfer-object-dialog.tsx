import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ConfirmTransferObjectDialog = ({ open, onClose, onTransfer }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Подтвердите своё действие
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите передать объекты другому Менеджеру?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} sx={{color: "white"}}>
            Отмена
          </Button>
          <Button onClick={onTransfer} sx={{color: "white"}}>Подтверждаю</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmTransferObjectDialog;
