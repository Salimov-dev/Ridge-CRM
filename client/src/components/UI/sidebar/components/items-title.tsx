import { Typography } from "@mui/material";

const ItemsTitle = ({ colors, isCollapsed, title }) => {
  return (
    <Typography
      variant="h6"
      color={colors}
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingRight: "7px",
        margin: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 6px",
        fontSize: !isCollapsed ? "inherit" : "12px",
      }}
    >
      {title}
    </Typography>
  );
};

export default ItemsTitle;
