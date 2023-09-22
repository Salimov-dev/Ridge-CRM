// libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
// components
import Header from "./components/header";
import ItemsList from "./components/items-list";
// store
import { setSidebarCollapsState } from "../../../store/sidebar-collaps-state.store";
// other
import { tokens } from "../../../theme";
import { getCurrentUserId, getIsUserCurator } from "../../../store/user/users.store";

const Component = styled(Box)`
  height: 100vh;
  overflow-x: hidden;
`;

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [selected, setSelected] = useState(setSelectedMenuItem());
  const [isCollapsed, setIsCollapsed] = useState(true);
  const currentUserId = useSelector(getCurrentUserId())
  const isCurator = useSelector(getIsUserCurator(currentUserId))

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
        display: "flex",
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
      <Box
        sx={{
          minWidth: "6px",
          backgroundImage:
            "linear-gradient(to bottom, white, white 33%, blue 33%, blue 66%, red 66%, red)",
          height: "100%",
        }}
      ></Box>
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          <Header
            isCollapsed={isCollapsed}
            setIsCollapsed={handleSetCollapsed}
            colors={colors}
          />
          <ItemsList
            selected={selected}
            setSelected={setSelected}
            colors={colors}
            isCurator={isCurator}
            isCollapsed={isCollapsed}
          />
        </Menu>
      </ProSidebar>
    </Component>
  );
};

export default Sidebar;
