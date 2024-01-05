import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  margin-right: 50px;
`;

const HeaderLayout = ({
  title,
  background = "yellow",
  color = "black",
  margin = "0 0 20px 0",
}) => {
  return (
    <Component sx={{ margin: margin }}>
      <Typography
        variant="h2"
        sx={{ background: background, color: color, padding: "0 10px" }}
      >
        {title}
      </Typography>
    </Component>
  );
};

export default HeaderLayout;