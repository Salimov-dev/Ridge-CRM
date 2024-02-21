import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Typography)`
  margin: 0 0 10px 0;
  padding: 6px 12px;
  border-radius: 6px;
`;

const RowTitle = ({
  title,
  background,
  variant = "h4",
  padding = "0 12px 0 12px",
  margin = "auto"
}) => {
  return (
    <Box sx={{ width: "fit-content", margin: margin }}>
      <Component
        variant={variant}
        sx={{ background: background, padding: padding }}
      >
        {title}
      </Component>
    </Box>
  );
};

export default RowTitle;
