import "dayjs/locale/ru";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import MainHeader from "./components/main-header";
import LoginDialog from "../../components/UI/dialogs/main/login-dialog";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user/users.store";
import { Box, Typography, styled } from "@mui/material";

const Logo = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <>
      <MainHeader isLoggedIn={isLoggedIn}/>
      <Logo>
        <Typography
          sx={{ fontSize: "80px", fontWeight: "700", marginBottom: "-10px" }}
        >
          Г Р Я Д К А
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          НАША СИСТЕМА АВТОМАТИЗАЦИИ ДЛЯ ОТДЕЛОВ РАЗВИТИЯ
        </Typography>
      </Logo>

      <LoginDialog/>
    </>
  );
};

export default Main;
