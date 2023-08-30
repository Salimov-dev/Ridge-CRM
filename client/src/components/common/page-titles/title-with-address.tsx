import { Box, Typography, styled } from "@mui/material";
import CloseButton from "../buttons/close-button";

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
  isEmptyFindedObject,
  getCity,
  getAddress,
  title,
  subtitle,
  onClose,
}) => {
  return (
    <Component>
      <Title>
        <Typography variant="h2">{title}</Typography>
        {!isEmptyFindedObject ? (
          <Typography
            variant="h2"
            sx={{ background: "yellow", color: "black", padding: '4px' }}
          >
            {getCity()}, {getAddress()}
          </Typography>
        ) : (
          <Typography
            variant="h2"
            sx={{
              background: !isEmptyFindedObject ? "yellow" : "red",
              color: !isEmptyFindedObject ? "black" : "white",
              padding: '0 4px'
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Title>
      <CloseButton onClose={onClose} />
    </Component>
  );
};

export default TitleWithAddress;
