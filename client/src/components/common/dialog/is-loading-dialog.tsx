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
  color: white;
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
            <Loader padding="10px 0"/>
            <Title sx={{  background: 'ForestGreen'}}>
              <Typography sx={{}}>{text}</Typography>
            </Title>
            <Title sx={{background: 'IndianRed'}}>
              <Typography>
                Не закрывайте окно или вкладку браузера и не переходите на
                другую страницу
              </Typography>
            </Title>
          </Component>
        </>
      }
    />
  );
};

export default IsLoadingDialog;
