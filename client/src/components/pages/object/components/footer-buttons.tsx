import { Box } from "@mui/material";
import LinkButton from "../../../common/buttons/link-button";
import PageBackButton from "../../../common/buttons/page-back-button";
import EditButton from "../../../common/buttons/edit-button";

const FooterButtons = ({ objectId }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "end", gap: "4px" }}>
      <LinkButton path="/objects" text="Объекты" />
      <PageBackButton />
      <EditButton path={`/objects/${objectId}/edit`} />
    </Box>
  );
};

export default FooterButtons;
