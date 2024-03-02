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
  setCurrrentPathState
} from "@store/current-path.store";

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

const Sidebar = React.memo(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const currentPath = useSelector(getCurrrentPathState());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const handleSetCollapsed = (value) => {
    setIsCollapsed(value);
  };

  useEffect(() => {
    setSelected(currentPath);
  }, [currentPath]);

  useEffect(() => {
    dispatch<any>(setCurrrentPathState("/users"));
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
