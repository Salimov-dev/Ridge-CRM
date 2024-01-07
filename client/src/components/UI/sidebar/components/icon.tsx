import { Tooltip } from "@mui/material";

const Icon = ({ selected, icon }) => {
  return (
    <Tooltip title="Статистика" placement="top-start" arrow>
      {icon}
      {/* <Icon sx={{ color: selected === "/statictics" ? "yellow" : "inherit" }} /> */}
    </Tooltip>
  );
};

export default Icon;
