import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const Title = styled(Typography)`
  background: yellow;
  color: black;
`;

const LayoutTitle = ({ text }) => {
  return (
    <Component>
      <Title variant="h2">{text}</Title>
    </Component>
  );
};

export default LayoutTitle;
