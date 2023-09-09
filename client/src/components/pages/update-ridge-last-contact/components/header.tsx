import { Box, Typography, styled } from "@mui/material";
import { FormatDate } from "../../../../utils/date/format-date";
import CloseButtonIcon from "../../../common/buttons/close-button-icon";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 8px;
  margin-bottom: 40px;
`;

const Title = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

const Header = ({ lastContact, onClose }) => {
  return (
    <Component>
      <Title>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h2">
            Редактировать последний контакт от:
          </Typography>
          <Typography
            variant="h2"
            sx={{ background: "yellow", color: "black", marginLeft: "4px" }}
          >
            {FormatDate(lastContact?.date)}
          </Typography>
        </Box>
      </Title>

      <CloseButtonIcon onClose={onClose} />
    </Component>
  );
};

export default Header;
