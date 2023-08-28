import { Box, Typography, styled } from "@mui/material";
import PageBackButton from "../buttons/page-back-button";

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
}) => {
  return (
    <Component>
      <Title>
        <Typography variant="h2">{title}</Typography>
        {!isEmptyFindedObject ? (
          <Typography
            variant="h2"
            sx={{ background: "yellow", color: "black" }}
          >
            {getCity()}, {getAddress()}
          </Typography>
        ) : (
          <Typography
            variant="h2"
            sx={{
              background: !isEmptyFindedObject ? "yellow" : "red",
              color: !isEmptyFindedObject ? "black" : "white",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Title>
      <PageBackButton />
    </Component>
  );
};

export default TitleWithAddress;
