import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  padding: 0 10px;
  justify-content: center;
`;

const Subtitle = ({ title, onClick }) => {
  return (
    <Component>
      <Typography
        sx={{
          marginBottom: "10px",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        onClick={onClick}
      >
        {title}
      </Typography>
    </Component>
  );
};

export default Subtitle;
