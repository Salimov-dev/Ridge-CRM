import { Box, IconButton, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";

const HeaderSidebar = ({
  isCollapsed,
  setIsCollapsed,
  colors,
  setSelected
}) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => {
        navigate("/");
        setSelected("Главная");
      }}
      sx={{
        margin: "14px 0 20px 16px",
        color: colors.grey[100],
        cursor: "pointer",
        "&:hover": {
          color: "yellow"
        }
      }}
    >
      {!isCollapsed && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ margin: "0 20px 0 8px" }}
        >
          <Typography variant="h3" color={colors.grey[100]}>
            Грядка
          </Typography>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default HeaderSidebar;
