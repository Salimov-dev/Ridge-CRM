// libraries
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, styled, useTheme } from "@mui/material";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
// components
import Header from "./components/header";
import ItemsList from "./components/items-list";
// store
import { setSidebarCollapsState } from "../../../store/sidebar-collaps-state.store";
// other
import { tokens } from "../../../theme";

const Component = styled(Box)`
  height: 100vh;
  overflow-x: hidden;
`;

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [selected, setSelected] = useState(setSelectedMenuItem());
  const [isCollapsed, setIsCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebar-collaps-state"))
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  function setSelectedMenuItem() {
    if (currentPath === "/") {
      return "Главная";
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
    if (currentPath === "/ridge") {
      return "Грядка";
    }
    if (currentPath === "/deals") {
      return "Сделки";
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
        <Menu>
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
