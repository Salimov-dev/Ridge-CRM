import { Box, Button, styled } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PageBackButton from "../../../common/buttons/page-back-button";
import EditButton from "../../../common/buttons/edit-button";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = () => {
  const objectId = useParams().objectId;
  const navigate = useNavigate();

  return (
    <Component>
      <PageBackButton path="/objects" text="Объекты" />
      <PageBackButton />
      <EditButton path={`/objects/${objectId}/edit`} />
    </Component>
  );
};

export default ButtonsPanel;
