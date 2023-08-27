import { Typography } from "@mui/material";

const ItemsTitle = ({ colors, isCollapsed, title }) => {
  return (
    <Typography
      variant="h6"
      color={colors}
      sx={{
        m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 6px",
        fontSize: !isCollapsed ? "inherit" : "12px",
      }}
    >
      {title}
    </Typography>
  );
};

export default ItemsTitle;
