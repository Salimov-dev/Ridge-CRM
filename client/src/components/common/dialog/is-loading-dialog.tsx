import { Box, Typography, styled } from "@mui/material";
import Loader from "../loader/loader";
import DialogStyled from "./dialog-styled";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled(Box)`
  display: flex;
  align-items: center;
  color: black;
  padding: 6px 10px;
`;

const IsLoadingDialog = ({ text, isLoading }) => {
  return (
    <DialogStyled
      open={isLoading}
      maxWidth="sm"
      component={
        <>
          <Component>
            <Title sx={{  background: 'yellow'}}>
              <Typography sx={{}}>{text}</Typography>
            </Title>
            <Title sx={{background: 'red', color: 'white'}}>
              <Typography>
                Не закрывайте окно или вкладку браузера и не переходите на
                другую страницу
              </Typography>
            </Title>
            <Loader />
          </Component>
        </>
      }
    />
  );
};

export default IsLoadingDialog;
