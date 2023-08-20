import { Typography, styled } from "@mui/material";

const Title = styled(Typography)`
  background: yellow;
  color: black;
`;

const ObjectName = ({ city, address }) => {
  return (
    <Title variant="h2">
      {city}, {address}
    </Title>
  );
};

export default ObjectName;
