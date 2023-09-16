import { Box, Typography, styled } from "@mui/material";
import OpenPageObjectIconButton from "../../../../../../components/common/buttons/icons buttons/open-page-object-icon";

const Container = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ObjectAddress = ({ deal, onClick, getObjectAddress }) => {
  return (
    <Container>
      <Typography variant="h6">{getObjectAddress(deal?.objectId)}</Typography>
      <OpenPageObjectIconButton onClick={onClick} />
    </Container>
  );
};

export default ObjectAddress;
