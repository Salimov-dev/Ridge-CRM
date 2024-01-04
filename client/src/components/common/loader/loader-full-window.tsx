import { Box } from "@mui/material";
import Loader from "./loader";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";

const Component = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  opacity: 0.2;
  z-ndex: 99999999;
`;

const LoaderFullWindow = ({ color = "grey", size = 75, isLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    isLoading && (
      <Component sx={{ color: colors.grey[600] }}>
        <Loader size={size} color={color} />
      </Component>
    )
  );
};

export default LoaderFullWindow;
