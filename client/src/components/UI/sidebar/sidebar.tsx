// libraries
import { useState, useEffect } from "react";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
// components
import Header from "./components/header";
import ItemsList from "./components/items-list";
// styles
import { Component } from "./styled/styled";
// store
import { setSidebarCollapsState } from "../../../store/sidebar-collaps-state.store";
// other
import { tokens } from "../../../theme";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebar-collaps-state"))
  );
  const [currentPath, setCurrentPath] = useState("");
  const [selected, setSelected] = useState(setSelectedMenuItem());

  function setSelectedMenuItem() {
    if (currentPath === "/") {
      return "Главная";
    }
    if (currentPath === "/objects") {
      return "Таблица объектов";
    }
    if (currentPath === "/map") {
      return "Объекты на карте";
    }
    if (currentPath === "/users") {
      return "Менеджеры";
    }
    if (currentPath === "/meetings") {
      return "Встречи";
    }
    return "";
  }

  const handleSetCollapsed = (value) => {
    setIsCollapsed(value);
    dispatch(setSidebarCollapsState(value));
  };

  useEffect(() => {
    setSelected(setSelectedMenuItem());
  }, [setSelectedMenuItem()]);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <Component
      sx={{
        height: "inherit",
        minWidth: !isCollapsed ? "220px" : "inherit",
        "& .ps-sidebar-container": {
          overflow: "hidden",
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-sidebar-root": {
          height: "100%",
          border: "none",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
          backgroundColor: "inherit !important",
        },
        "& .ps-menu-button.ps-active": {
          color: "#868dfb !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <Header
            isCollapsed={isCollapsed}
            setIsCollapsed={handleSetCollapsed}
            colors={colors}
          />

          <ItemsList
            isCollapsed={isCollapsed}
            selected={selected}
            setSelected={setSelected}
            colors={colors}
          />
        </Menu>
      </ProSidebar>
    </Component>
  );
};

export default Sidebar;
