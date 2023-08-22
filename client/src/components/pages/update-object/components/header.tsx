import { Box, Typography, styled, Button } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Title = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = ({ object }) => {
  const navigate = useNavigate();
  return (
    <Component>
      <Title>
        <h1>Изменить объект:</h1>
        <Typography variant="h3" sx={{ background: "yellow", color: "black" }}>
          {object?.location?.city}, {object?.location?.address}
        </Typography>
      </Title>

      <Button
        color="success"
        variant="outlined"
        sx={{ height: "50px", color: "white" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewOutlinedIcon
          sx={{ width: "20px", height: "20px", marginRight: "5px" }}
        />{" "}
        Назад
      </Button>
    </Component>
  );
};

export default Header;
