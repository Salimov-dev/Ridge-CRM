import { Box, Dialog, styled } from "@mui/material";

const Container = styled(Box)`
  width: 1200px;
  padding: 20px;
`;

const DialogStyled = ({ component, onClose, open, maxWidth }) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth={maxWidth} scroll="body"
    >
      <Container>{component}</Container>
    </Dialog>
  );
};

export default DialogStyled;
