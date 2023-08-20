import { Typography, styled } from "@mui/material";

const Title = styled(Typography)`
  background: yellow;
  color: black;
`;

const ObjectName = ({ city, district, address }) => {
  return (
    <Title variant="h2">
      {city}, {district}
      р-н, {address}
    </Title>
  );
};

export default ObjectName;
