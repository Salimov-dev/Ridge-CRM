import { Box, Typography, styled } from "@mui/material";
import PageBackButton from "../../../common/buttons/page-back-button";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
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

      <PageBackButton onClick={onClose} />
    </Component>
  );
};

export default Header;
