import { Box, Typography, styled } from "@mui/material";
import ButtonStyled from "@components/common/buttons/button-styled.button";

const Component = styled(Box)`
  display: flex;
  // justify-content: space-between;
  justify-content: end;
  align-items: center;
  margin-bottom: 20px;
`;

const MainHeader = ({
  handleOpenLoginPage,
  isLoggedIn,
  background = "yellow",
  color = "black",
}) => {
  return (
    <Component>
      {/* <Typography
        variant="h2"
        sx={{ background: background, color: color, padding: "0 4px" }}
      >
        Здесь будет какая-то важная информация
      </Typography> */}
      {!isLoggedIn && (
        <ButtonStyled
          title="Войти"
          style="MANAGER_TASK"
          variant="contained"
          onClick={handleOpenLoginPage}
        />
      )}
    </Component>
  );
};

export default MainHeader;
