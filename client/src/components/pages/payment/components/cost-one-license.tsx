import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: yellow;
  padding: 10px;
  color: black;
  margin: 0 0 10px;
`;

const CostOneLicense = ({ licenseCost }) => {
  return (
    <Component>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Стоимость подписки на 1 пользователя: {licenseCost}₽/день
      </Typography>
    </Component>
  );
};

export default CostOneLicense;
