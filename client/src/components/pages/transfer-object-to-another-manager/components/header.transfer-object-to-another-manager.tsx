import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Container = styled(Box)`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const HeaderTransferObjectToAnotherManager = ({ objects }) => {
  return (
    <>
      <Container>
        <Typography variant="h5">Количество объектов к передаче:</Typography>
        <Typography
          variant="h5"
          sx={{
            background: objects.length ? "ForestGreen" : "Crimson",
            padding: "6px",
            borderRadius: "4px"
          }}
        >
          {objects?.length}шт
        </Typography>
      </Container>
      {objects.length ? (
        <Container>
          <Typography
            variant="h5"
            sx={{
              background: "RoyalBlue",
              padding: "6px",
              borderRadius: "4px"
            }}
          >
            Выберите Менеджера,
          </Typography>
          <Typography variant="h5">которому будут переданы объекты:</Typography>
        </Container>
      ) : null}
    </>
  );
};

export default HeaderTransferObjectToAnotherManager;
