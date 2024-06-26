// libraries
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
// theme
import { tokens } from "@theme/theme";
// components
import HeaderSidebar from "./components/header.sidebar-ui";
import ItemsListSidebar from "./components/items-list.sidebar-ui";
// hooks
import useWindowWidth from "@hooks/window-width/use-window-width";

const Component = styled(Box)(({ colors }) => ({
  display: "flex",
  "& .ps-sidebar-container": {
    background: `${colors.primary[400]} !important`
  },
  "& .ps-sidebar-root": {
    border: "none"
  },
  "& .pro-icon-wrapper": {
    backgroundColor: "transparent !important"
  },
  "& .ps-menu-button:hover": {
    color: `${colors.sidebar["menuItemActive"]} !important`,
    backgroundColor: "inherit !important"
  },
  "& .ps-menu-button.ps-active": {
    color: `${colors.sidebar["menuItemActive"]} !important`
  }
}));

const RidgeName = styled(Box)`
  font-size: 24px;
  transform: rotate(-90deg);
  position: absolute;
  left: -22px;
  bottom: 80px;
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

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

const SidebarUI = React.memo(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const windowWidth = useWindowWidth();
  const sidebarShow = windowWidth > 600;

  const { pathname: currentPath } = useLocation();

  const handleSetCollapsed = (value) => {
    setIsCollapsed(value);
  };

  useEffect(() => {
    setSelected(currentPath);
  }, [currentPath]);

  return (
    <Component colors={colors}>
      <CountryColors />

      {sidebarShow && (
        <ProSidebar collapsed={isCollapsed}>
          <Menu>
            <HeaderSidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={handleSetCollapsed}
              colors={colors}
              setSelected={setSelected}
            />
            <ItemsListSidebar
              selected={selected}
              setSelected={setSelected}
              colors={colors}
              isCollapsed={isCollapsed}
            />
          </Menu>

          <Link href="https://ridge-crm.ru/" rel="noopener noreferrer">
            <RidgeName>Г Р Я Д К А</RidgeName>
          </Link>
        </ProSidebar>
      )}
    </Component>
  );
});

export default SidebarUI;
