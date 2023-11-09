import { Box, Typography, styled } from "@mui/material";
import Loader from "../loader/loader";
import DialogStyled from "./dialog-styled";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TitlesContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: white;
  padding: 6px 10px;
`;

const Title = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  color: white;
  padding: 6px 10px 6px 9px;
  gap: 4px;
  background: ForestGreen;
`;

const SubTitle = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  color: white;
  padding: 6px 10px;
  gap: 7px;
  background: IndianRed
`;

const IsLoadingDialog = ({ text, isLoading }) => {
  return (
    <DialogStyled
      open={isLoading}
      maxWidth="sm"
      component={
        <>
          <Component>
            <TitlesContainer>
              <Title >
              <RotateLeftOutlinedIcon sx={{width: '30px', height: '30px'}}/>
              <Typography>{text}</Typography>
              </Title>
              <SubTitle >
              <ErrorOutlineOutlinedIcon sx={{width: '26px', height: '26px'}}/>
              <Typography>
              Не закрывайте окно или вкладку браузера и не переходите на
              другую страницу
              </Typography>
              </SubTitle>
            </TitlesContainer>
            <Loader width="60px" padding="10px 0" />
          </Component>
        </>
      }
    />
  );
};

export default IsLoadingDialog;
