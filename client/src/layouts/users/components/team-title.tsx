import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Typography)`
  margin: 0 0 10px 0;
  padding: 6px 12px;
  border-radius: 6px;
`;

const TeamTitle = ({ title, background }) => {
  return (
    <Box sx={{ width: "fit-content" }}>
      <Component variant="h4" sx={{ background: background }}>
        {title}
      </Component>
    </Box>
  );
};

export default TeamTitle;
