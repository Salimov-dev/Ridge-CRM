import { Box, Typography, styled } from "@mui/material";
import CloseButtonIconButton from "../buttons/icons buttons/close-button-icon";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const Container = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled(Typography)`
  background: yellow;
  color: black;
  padding: 4px;
`;

const TitleWithAddress = ({
  isFindedObject,
  city,
  address,
  title,
  subtitle,
  onClose,
}) => {
  return (
    <Component>
      <Container>
        <Typography variant="h2">{title}</Typography>
        {isFindedObject ? (
          <Title variant="h2">
            {city}, {address}
          </Title>
        ) : (
          <Typography
            variant="h2"
            sx={{
              background: isFindedObject ? "yellow" : "Crimson",
              color: isFindedObject ? "black" : "white",
              padding: "0 4px",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
      <CloseButtonIconButton onClose={onClose} />
    </Component>
  );
};

export default TitleWithAddress;
