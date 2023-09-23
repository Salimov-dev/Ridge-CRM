import { Box, styled } from "@mui/material";

const Component = styled(Box)`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoMatchRoute = () => {
  return (
    <Component>
      <h1>Страницы по такому адресу не существует :-(</h1>
      <h3>Проверьте вводимый адрес и попробуйте снова</h3>
    </Component>
  );
};

export default NoMatchRoute;
