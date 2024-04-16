import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const MessageContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 20px;
`;

const SuccessMessageSetupPassword = () => {
  return (
    <MessageContainer>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Новый пароль установлен!
      </Typography>
      <Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Обратитесь к своему Куратору для активации аккаунта,
        </Typography>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          после этого Вы сможете авторизоваться в Грядке ЦРМ
        </Typography>
      </Box>
    </MessageContainer>
  );
};

export default SuccessMessageSetupPassword;
