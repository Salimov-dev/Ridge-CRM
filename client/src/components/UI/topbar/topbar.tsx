// libraries
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
import { useLocation } from "react-router-dom";
// components
import TopBarCurrentDate from "./components/topbar-current-date";
import TopBarRightSide from "./components/topbar-right-side";
import TopBarWeeklyResults from "./components/topbar-weekly-results";
// store
import { getIsLoggedIn } from "@store/user/users.store";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const TopBar = React.memo(() => {
  dayjs.locale("ru");
  const isLoggedIn = useSelector(getIsLoggedIn());
  const location = useLocation();

  const currentPath = location.pathname;
  const isHomePage = currentPath === "/";

  return (
    <Component
      sx={{
        justifyContent: isLoggedIn ? "space-between" : "end",
        padding: isHomePage ? "0 20px 0 20px" : "0"
      }}
    >
      {isLoggedIn ? (
        <>
          <TopBarCurrentDate />
          <TopBarWeeklyResults />
        </>
      ) : null}
      <TopBarRightSide />
    </Component>
  );
});

export default TopBar;
