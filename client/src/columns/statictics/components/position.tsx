import { Box, Typography, styled } from "@mui/material";

const Container = styled(Box)`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Position = ({ onlyTitle, item, title, background, color = "white" }) => {
  return (
    <Container
      sx={{
        background: background,
        color: color,
      }}
    >
      {onlyTitle ? <Typography>{title}</Typography> : item?.length}
    </Container>
  );
};

export default Position;
