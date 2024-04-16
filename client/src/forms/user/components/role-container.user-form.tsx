import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Container = styled(Box)`
  display: flex;
  gap: 4px;
`;

const RoleContainerUserForm = ({ color, role, subtitle }) => {
  return (
    <Container>
      <Typography variant="h6">
        <span style={{ color: color }}>{role}</span> - {subtitle}
      </Typography>
    </Container>
  );
};

export default RoleContainerUserForm;
