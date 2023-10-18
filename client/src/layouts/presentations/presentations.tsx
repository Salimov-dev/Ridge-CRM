import { Typography, Tooltip, Box, Button } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CreatePresentationButton from "../../components/UI/dialogs/buttons/create-presentation-button";
import PresentationCreatePageDialog from "../../components/UI/dialogs/presentations/presentation-create-page-dialog";

const Presentations = () => {
  return (
    <Box>
      <LayoutTitle title="Презентации"/>
      <CreatePresentationButton/>

      <PresentationCreatePageDialog/>
    </Box>
  );
};

export default Presentations;
