import { Box, Typography, styled } from "@mui/material";
import CloseButtonIconButton from "../buttons/icons buttons/close-button-icon";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const Title = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
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
      <Title>
        <Typography variant="h2">{title}</Typography>
        {isFindedObject ? (
          <Typography
            variant="h2"
            sx={{ background: "yellow", color: "black", padding: "4px" }}
          >
            {city}, {address}
          </Typography>
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
      </Title>
      <CloseButtonIconButton onClose={onClose} />
    </Component>
  );
};

export default TitleWithAddress;
