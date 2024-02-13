import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 6px;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  gap: 4px;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
`;

const InformItem = ({ title, subtitle, unit = null }) => {
  return (
    <Component>
      <StyledTypography variant="h5" sx={{ fontWeight: "bold" }}>
        {title}
      </StyledTypography>
      <Container>
        <StyledTypography variant="h4" sx={{ color: "yellow" }}>
          {subtitle}
        </StyledTypography>
        <StyledTypography variant="h4" sx={{ color: "yellow" }}>
          {unit}
        </StyledTypography>
      </Container>
    </Component>
  );
};

export default InformItem;
