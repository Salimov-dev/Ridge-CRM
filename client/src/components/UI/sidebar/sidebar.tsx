// libraries
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled, useTheme } from "@mui/material";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
// theme
import { tokens } from "@theme/theme";
// components
import Header from "./components/header";
import ItemsList from "./components/items-list";
// store
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import {
  getCurrrentPathState,
  setCurrrentPathState,
} from "@store/current-path.store";

const Component = styled(Box)(({ colors }) => ({
  display: "flex",
  "& .ps-sidebar-container": {
    background: `${colors.primary[400]} !important`,
  },
  "& .ps-sidebar-root": {
    border: "none",
  },
  "& .pro-icon-wrapper": {
    backgroundColor: "transparent !important",
  },
  "& .ps-menu-button:hover": {
    color: "#868dfb !important",
    backgroundColor: "inherit !important",
  },
  "& .ps-menu-button.ps-active": {
    color: "#868dfb !important",
  },
}));

const RidgeName = styled(Box)`
  font-size: 32px;
  transform: rotate(-90deg);
  position: absolute;
  left: -45px;
  bottom: 100px;
  white-space: nowrap;
`;

const CountryColors = styled(Box)`
  min-width: 6px;
  background-image: linear-gradient(
    to bottom,
    white,
    white 33%,
    blue 33%,
    blue 66%,
    red 66%,
    red
  );
`;

const Sidebar = React.memo(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currentPath = useSelector(getCurrrentPathState());
  const [selected, setSelected] = useState(currentPath);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  function setSelectedMenuItem() {
    if (currentPath === "/") {
      return "Главная";
    }
    if (currentPath === "/statictics") {
      return "Статистика";
    }
    if (currentPath === "/objects") {
      return "Объекты";
    }
    if (currentPath === "/users") {
      return "Менеджеры";
    }
    if (currentPath === "/meetings") {
      return "Встречи";
    }
    if (currentPath === "/calendar") {
      return "Календарь";
    }
    if (currentPath === "/deals") {
      return "Сделки";
    }
    if (currentPath === "/presentations") {
      return "Презентации";
    }
    if (currentPath === "/objectsdatabase") {
      return "Проработка базы объектов";
    }
    return "";
  }

  const handleSetCollapsed = (value) => {
    setIsCollapsed(value);
  };

  useEffect(() => {
    setSelected(setSelectedMenuItem());
  }, [setSelectedMenuItem()]);

  useEffect(() => {
    dispatch<any>(setCurrrentPathState(window.location.pathname));
  }, [selected]);

  return (
    <Component colors={colors}>
      <CountryColors />
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          <Header
            isCollapsed={isCollapsed}
            setIsCollapsed={handleSetCollapsed}
            colors={colors}
            setSelected={setSelected}
          />
          <ItemsList
            selected={selected}
            setSelected={setSelected}
            colors={colors}
            isCurator={isCurator}
            isCollapsed={isCollapsed}
          />
        </Menu>
        <RidgeName>Г Р Я Д К А</RidgeName>
      </ProSidebar>
    </Component>
  );
});

export default Sidebar;
