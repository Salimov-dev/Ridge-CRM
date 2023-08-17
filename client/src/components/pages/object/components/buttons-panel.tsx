import { Box, Button, styled } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = () => {
  const objectId = useParams().objectId;
  const navigate = useNavigate();

  return (
    <Component>
      <Button
        color="success"
        variant="outlined"
        sx={{ height: "50px", color: "white" }}
        onClick={() => navigate("/map")}
      >
        <ArrowBackIosNewOutlinedIcon
          sx={{ width: "20px", height: "20px", marginRight: "5px" }}
        />{" "}
        карта
      </Button>
      <Button
        color="success"
        variant="outlined"
        sx={{ height: "50px", color: "white" }}
        onClick={() => navigate("/objects")}
      >
        <ArrowBackIosNewOutlinedIcon
          sx={{ width: "20px", height: "20px", marginRight: "5px" }}
        />{" "}
        объекты
      </Button>
      <Button
        color="secondary"
        variant="contained"
        sx={{ height: "50px" }}
        onClick={() => navigate(`/objects/${objectId}/edit`)}
      >
        ПРАВИТЬ
      </Button>
    </Component>
  );
};

export default ButtonsPanel;
