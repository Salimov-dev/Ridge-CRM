import { Box, styled } from "@mui/material";

const Container = styled(Box)`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const TableCell = ({ objects, objectsWithPhone }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <Container
        sx={{
          background: "yellow",
          color: "black",
        }}
      >
        Объекты: {objects?.length}шт
      </Container>
      <Container
        sx={{
          background: "FireBrick",
        }}
      >
        С телефоном: {objectsWithPhone?.length}шт
      </Container>
      <Container
        sx={{
          background: "RoyalBlue",
        }}
      >
        Презентаций: {0}шт
      </Container>
    </Box>
  );
};

export default TableCell;
