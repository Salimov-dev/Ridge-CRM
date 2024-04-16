import { Typography } from "@mui/material";

const ItemsTitleSidebar = ({ colors, isCollapsed, title }) => {
  return (
    <Typography
      variant="h6"
      color={colors}
      sx={{
        display: "flex",
        justifyContent: !isCollapsed ? "start" : "center",
        margin: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 0px",
        fontSize: !isCollapsed ? "inherit" : "12px"
      }}
    >
      {title}
    </Typography>
  );
};

export default ItemsTitleSidebar;
