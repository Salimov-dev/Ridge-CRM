import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";
// components
import PageBackButton from "../../../common/buttons/page-back-button";
import EditButton from "../../../common/buttons/edit-button";
import LinkButton from "../../../common/buttons/link-button";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = () => {
  const objectId = useParams().objectId;

  return (
    <Component>
      <LinkButton path="/objects" text="Объекты" />
      <PageBackButton />
      <EditButton path={`/objects/${objectId}/edit`} />
    </Component>
  );
};

export default ButtonsPanel;
