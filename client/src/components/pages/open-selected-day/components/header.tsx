import { Box, Typography, styled } from "@mui/material";
import { FormatTime } from "../../../../utils/date/format-time";
import { FormatDate } from "../../../../utils/date/format-date";
import CloseButtonIconButton from "../../../common/buttons/icons buttons/close-button-icon";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 8px;
`;

const Title = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

const Header = ({ onClose, dateCreate, marginBottom="40px" }) => {
  const selectedDate = FormatDate(dateCreate)
  
  return (
    <Component sx={{marginBottom: marginBottom}}>
      <Title>
        <Box sx={{ display: "flex", background: 'OrangeRed', padding: '0 4px' }}>
          <Typography variant="h2">Список дел на день: {selectedDate}</Typography>
        </Box>
      </Title>

      <CloseButtonIconButton onClose={onClose} />
    </Component>
  );
};

export default Header;
