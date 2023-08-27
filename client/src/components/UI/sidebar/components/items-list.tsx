import { Tooltip } from "@mui/material";
import Item from "./item";
// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import ItemsTitle from "./items-title";

const ItemsList = ({ isCollapsed, selected, setSelected, colors }) => {
  return (
    <>
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

      <ItemsTitle
        title="Активность"
        colors={colors.grey[300]}
        isCollapsed={isCollapsed}
      />
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

      <ItemsTitle
        title="Команда"
        colors={colors.grey[300]}
        isCollapsed={isCollapsed}
      />
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

      <ItemsTitle
        title="Другое"
        colors={colors.grey[300]}
        isCollapsed={isCollapsed}
      />
      <Item
        title="Материалы"
        to="/materials"
        icon={<HelpOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default ItemsList;
