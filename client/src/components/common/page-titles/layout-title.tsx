import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  margin-right: 50px;
`;

const LayoutTitle = ({ title, background = "yellow", color = "black" }) => {
  return (
    <Component>
      <Typography
        variant="h2"
        sx={{ background: background, color: color, padding: "0 10px" }}
      >
        {title}
      </Typography>
    </Component>
  );
};

export default LayoutTitle;
