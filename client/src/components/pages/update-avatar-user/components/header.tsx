import { Box, Typography, styled } from "@mui/material";
import CloseButtonIconButton from "../../../common/buttons/icons buttons/close-button-icon";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 8px;
  margin-bottom: 20px;
`;

const Title = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

const Header = ({ onClose }) => {
  return (
    <Component>
      <Title>
        <Box sx={{ display: "flex", background: 'Lime', color: 'black', padding: '0 4px' }}>
          <Typography variant="h2">Править аватарку</Typography>
        </Box>
      </Title>

      <CloseButtonIconButton onClose={onClose} />
    </Component>
  );
};

export default Header;
