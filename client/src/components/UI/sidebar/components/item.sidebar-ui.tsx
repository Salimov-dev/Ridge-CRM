import { MenuItem } from "react-pro-sidebar";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "@theme/theme";

const ItemSidebar = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100]
      }}
      onClick={() => setSelected(to)}
      icon={
        <Tooltip title={title} placement="top-start" arrow>
          <Box
            sx={{
              color: selected === to ? colors.sidebar["menuItemActive"] : null
            }}
          >
            {icon}
          </Box>
        </Tooltip>
      }
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default ItemSidebar;
