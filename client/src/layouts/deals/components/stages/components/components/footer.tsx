import { Box, Typography, styled } from "@mui/material";
import { FormatDate } from "../../../../../../utils/date/format-date";
import UpdateElementIconButton from "../../../../../../components/common/buttons/icons buttons/update-element-icon";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Container = styled(Box)`
  display: flex;
  gap: 4px;
`;

const Footer = ({ deal, userName, onClick }) => {
  return (
    <Component>
      <Container>
        <Typography>{FormatDate(deal?.created_at)}</Typography>
        <Typography sx={{ fontStyle: "italic" }}>{userName}</Typography>
      </Container>
      <UpdateElementIconButton onClick={onClick} />
    </Component>
  );
};

export default Footer;
