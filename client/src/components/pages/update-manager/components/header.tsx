import { Box, Typography, styled, Button } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px
`;

const Title = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Component>
      <Title>
        <Typography variant="h2">
        Редактировать менеджера:
        </Typography>
        <Typography variant="h2" sx={{ background: "yellow", color: "black" }}>
          {user?.name.lastName} {user?.name.firstName} {user?.name.surName}
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
