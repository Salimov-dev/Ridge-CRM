import { Box, Typography, styled } from "@mui/material";
import LoginButton from "./login-button";

const Component = styled(Box)`
  display: flex;
  // justify-content: space-between;
  justify-content: end;
  align-items: center;
  margin-bottom: 20px;
`;

const MainHeader = ({ isLoggedIn, background = "yellow", color = "black" }) => {
  return (
    <Component>
      {/* <Typography
        variant="h2"
        sx={{ background: background, color: color, padding: "0 4px" }}
      >
        Здесь будет какая-то важная информация
      </Typography> */}
      {!isLoggedIn && <LoginButton />}
    </Component>
  );
};

export default MainHeader;
