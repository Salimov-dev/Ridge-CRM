import { Icon, Tooltip } from "@mui/material";
import Item from "./item";
// components
import ItemsTitle from "./items-title";
// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";

const ItemsList = ({
  selected,
  setSelected,
  colors,
  isCurator,
  isCollapsed,
}) => {
  return (
    <>
      <Item
        title="Главная"
        to="/"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <ItemsTitle
        title="Активность"
        colors={colors.grey[300]}
        isCollapsed={isCollapsed}
      />
      <Item
        title="Статистика"
        to="/statictics"
        icon={<DonutSmallOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Объекты"
        to="/objects"
        icon={<BusinessOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Проработка базы объектов"
        to="/objectsdatabase"
        icon={<DatasetOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Сделки"
        to="/deals"
        icon={<BusinessCenterOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Встречи"
        to="/meetings"
        icon={<GroupsOutlinedIcon />}
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
      <Item
        title="Презентации"
        to="/presentations"
        icon={<AssignmentOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />

      {isCurator ? (
        <>
          <ItemsTitle
            title="Команда"
            colors={colors.grey[300]}
            isCollapsed={isCollapsed}
          />
          <Item
            title="Менеджеры"
            to="/users"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </>
      ) : null}
    </>
  );
};

export default ItemsList;
