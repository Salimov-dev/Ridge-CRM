import { useSelector } from "react-redux";
// components
import ItemSidebar from "./item.sidebar-ui";
import ItemsTitleSidebar from "./items-title.sidebar-ui";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";
// icons
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

const ItemSidebarsListSidebar = ({
  selected,
  setSelected,
  colors,
  isCollapsed
}) => {
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());
  return (
    <>
      {isCurrentUserRoleCurator && (
        <ItemSidebar
          title="Команда"
          to="/users"
          icon={<PeopleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <ItemsTitleSidebar
        title="Меню"
        colors={colors.grey[300]}
        isCollapsed={isCollapsed}
      />
      <ItemSidebar
        title="Объекты"
        to="/objects"
        icon={<BusinessOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <ItemSidebar
        title="Сделки"
        to="/deals"
        icon={<BusinessCenterOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <ItemSidebar
        title="Встречи"
        to="/meetings"
        icon={<GroupsOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <ItemSidebar
        title="Презентации"
        to="/presentations"
        icon={<AssignmentOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <ItemSidebar
        title="Контакты"
        to="/contacts"
        icon={<ContactPhoneOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <ItemSidebar
        title="Компании"
        to="/companies"
        icon={<HandshakeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <ItemsTitleSidebar
        title="Активность"
        colors={colors.grey[300]}
        isCollapsed={isCollapsed}
      />
      <ItemSidebar
        title="Статистика"
        to="/statictics"
        icon={<DonutSmallOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />

      <ItemSidebar
        title="Проработка базы объектов"
        to="/objectsdatabase"
        icon={<DatasetOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />

      <ItemSidebar
        title="Календарь"
        to="/calendar"
        icon={<CalendarTodayOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default ItemSidebarsListSidebar;
