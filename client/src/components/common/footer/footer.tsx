import { Box, Button, Divider, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: end;
`;

const Menu = styled(Box)`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Component>
      <Menu>
        <Button
          variant="outlined"
          sx={{ color: "gray" }}
          onClick={() => navigate("/")}
        >
          Главная
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          variant="outlined"
          sx={{ color: "gray" }}
          onClick={() => navigate("/objects")}
        >
          Объекты
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          variant="outlined"
          sx={{ color: "gray" }}
          onClick={() => navigate("/")}
        >
          Сделки
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          variant="outlined"
          sx={{ color: "gray" }}
          onClick={() => navigate("/meetings")}
        >
          Встречи
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          variant="outlined"
          sx={{ color: "gray" }}
          onClick={() => navigate("/calendar")}
        >
          Календарь
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          variant="outlined"
          sx={{ color: "gray" }}
          onClick={() => navigate("/users")}
        >
          Менеджеры
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          variant="outlined"
          sx={{ color: "gray" }}
          onClick={() => navigate("/")}
        >
          Презентации
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          variant="outlined"
          sx={{ color: "gray" }}
          onClick={() => navigate("/")}
        >
          Результаты
        </Button>
      </Menu>
    </Component>
  );
};

export default Footer;
