import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0 0 4px;
`;

const MessageUpdateUser = ({ title, background }) => {
  return (
    <Component
      sx={{
        background: background
      }}
    >
      <Typography variant="h5">{title}</Typography>
    </Component>
  );
};

export default MessageUpdateUser;
