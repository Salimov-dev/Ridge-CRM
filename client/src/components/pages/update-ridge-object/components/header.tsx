import { Box, Typography, styled } from "@mui/material";
import CloseButton from "../../../common/buttons/close-button";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const Title = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = ({ object, onClose }) => {
  return (
    <Component>
      <Title>
        <Typography variant="h2">Изменить объект:</Typography>
        <Box sx={{ background: "yellow", color: "black" }}>
          <Typography variant="h2">
            {object?.location?.city}, {object?.location?.address}
          </Typography>
        </Box>
      </Title>

      <CloseButton onClose={onClose} />
    </Component>
  );
};

export default Header;
