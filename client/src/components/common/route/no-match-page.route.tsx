import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoMatchPageRoute = () => {
  return (
    <Component>
      <Typography variant="h1">
        Страницы по такому адресу не существует :-(
      </Typography>
      <Typography variant="h3">
        Проверьте введенный адрес и попробуйте снова
      </Typography>
    </Component>
  );
};

export default NoMatchPageRoute;
