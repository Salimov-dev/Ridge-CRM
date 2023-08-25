import { Typography, Tooltip } from "@mui/material";
import Item from "./item";
// styled
import { ItemsListContainer } from "../styled/styled";
// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

const ItemsList = ({ isCollapsed, selected, setSelected, colors }) => {
  return (
    <ItemsListContainer>
      <Item
        title="Главная"
        to="/"
        icon={
          <Tooltip title="Главная" placement="top-start" arrow>
            <HomeOutlinedIcon />
          </Tooltip>
        }
        selected={selected}
        setSelected={setSelected}
      />

      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{
          m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 6px",
          fontSize: !isCollapsed ? "inherit" : "12px",
        }}
      >
        Активность
      </Typography>
      <Item
        title="Объекты"
        to="/objects"
        icon={
          <Tooltip title="Объекты" placement="top-start" arrow>
            <BusinessOutlinedIcon />
          </Tooltip>
        }
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Сделки"
        to="/deal"
        icon={<BusinessCenterOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Встречи"
        to="/meetings"
        icon={
          <Tooltip title="Встречи" placement="top-start" arrow>
            <GroupsOutlinedIcon />
          </Tooltip>
        }
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Календарь"
        to="/calendar"
        icon={<CalendarTodayOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />

      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{
          m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 12px",
          fontSize: !isCollapsed ? "inherit" : "12px",
        }}
      >
        Команда
      </Typography>
      <Item
        title="Менеджеры"
        to="/users"
        icon={
          <Tooltip title="Менеджеры" placement="top-start" arrow>
            <PeopleOutlinedIcon />
          </Tooltip>
        }
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Презентации"
        to="/presentations"
        icon={
          <Tooltip title="Презентации" placement="top-start" arrow>
            <AssignmentOutlinedIcon />
          </Tooltip>
        }
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Результаты"
        to="/results"
        icon={<TableChartOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{
          m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 18px",
          fontSize: !isCollapsed ? "inherit" : "12px",
        }}
      >
        Другое
      </Typography>
      <Item
        title="Материалы"
        to="/materials"
        icon={<HelpOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </ItemsListContainer>
  );
};

export default ItemsList;
