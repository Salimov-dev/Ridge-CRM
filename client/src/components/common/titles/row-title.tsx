import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Typography)`
  margin: 0px 0 10px 0;
  padding: 6px 12px 28px 12px;
  border-radius: 4px;
  height: 32px;
`;

const RowTitle = ({
  title,
  background,
  variant = "h5",
  padding = "0 12px 0 12px",
  margin = "auto"
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "start",
        margin: margin
      }}
    >
      <Component
        variant={variant}
        sx={{
          background: background,
          padding: padding
        }}
      >
        {title}
      </Component>
    </Box>
  );
};

export default RowTitle;
