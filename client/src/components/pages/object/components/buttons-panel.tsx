import { Box, Button, styled } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PageBackButton from "../../../common/buttons/page-back-button";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = () => {
  const objectId = useParams().objectId;
  const navigate = useNavigate();

  return (
    <Component>
      <PageBackButton path="/map" text="Карта" />
      <PageBackButton path="/objects" text="Объекты" />
      <PageBackButton path={-1} />

      <Button
        color="secondary"
        variant="contained"
        sx={{ height: "50px" }}
        onClick={() => navigate(`/objects/${objectId}/edit`)}
      >
        Править
      </Button>
    </Component>
  );
};

export default ButtonsPanel;
