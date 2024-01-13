// libraries
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
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
  padding: 0 0 0 0;
  margin-bottom: 16px;
`;

const TopBar = React.memo(() => {
  dayjs.locale("ru");
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Component sx={{ justifyContent: isLoggedIn ? "space-between" : "end" }}>
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
