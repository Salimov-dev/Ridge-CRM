import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  background: red;
  color: white;
  margin-bottom: 10px;
  padding: 4px 0;
`;

const AlertObjectInDatabase = () => {
  return (
    <Component>
      <Typography variant="h4">
        ВНИМАНИЕ! Объект с таким адресом уже есть в Вашем списке объектов!
      </Typography>
    </Component>
  );
};

export default AlertObjectInDatabase;
