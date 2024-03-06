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
  background = "linear-gradient(to right, DarkOrange , OrangeRed)",
  color = "white",
  margin = "0 0 20px 0",
  justifyContent = "start",
  width = "inherit"
}) => {
  return (
    <Component sx={{ margin: margin, justifyContent: justifyContent }}>
      <Typography
        variant="h2"
        sx={{
          width: width,
          background: background,
          color: color,
          padding: "0px 8px",
          textAlign: "center",
          borderRadius: "4px"
        }}
      >
        {title}
      </Typography>
    </Component>
  );
};

export default HeaderLayout;
