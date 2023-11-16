// libraries
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
// MUI
import { Box, styled } from "@mui/material";
// store
import { getIsLoggedIn } from "../../../store/user/users.store";
// components
import TopBarCurrentDate from "./components/topbar-current-date";
import TopBarRightSide from "./components/topbar-right-side";
import TopBarWeeklyResults from "./components/topbar-weekly-results";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 0;
  margin-bottom: 16px;
`;

const TopBar = React.memo(() => {
  dayjs.locale("ru");
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Component>
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
