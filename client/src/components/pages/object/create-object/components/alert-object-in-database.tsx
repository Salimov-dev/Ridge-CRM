import { Box, Typography, styled } from "@mui/material";
import { FC } from "react";

interface AlertObjectInDatabaseProps {
  isObjectAlreadyInDatabase: boolean;
}

const Component = styled(Box)`
  background: red;
  color: white;
  margin-bottom: 10px;
  padding: 4px 0;
`;

const AlertObjectInDatabase: FC<AlertObjectInDatabaseProps> = ({
  isObjectAlreadyInDatabase
}) => {
  return (
    isObjectAlreadyInDatabase && (
      <Component>
        <Typography variant="h4">
          ВНИМАНИЕ! Объект с таким адресом уже есть в Вашем списке объектов!
        </Typography>
      </Component>
    )
  );
};

export default AlertObjectInDatabase;
