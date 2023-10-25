import { Box, Typography, styled } from "@mui/material";
import Loader from "../loader/loader";
import DialogStyled from "./dialog-styled";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IsLoadingDialog = ({ text, isLoading }) => {
  return (
    <DialogStyled
      open={isLoading}
      maxWidth="sm"
      component={
        <>
          <Component>
            <Typography>{text}</Typography>
            <Loader />
          </Component>
        </>
      }
    />
  );
};

export default IsLoadingDialog;
