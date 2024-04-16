// libraries
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import TopBarCurrentDate from "./components/current-date.topbar-ui";
import TopBarRightSide from "./components/right-side.topbar-ui";
import TopBarWeeklyResults from "./components/weekly-results.topbar-ui";
// store
import { getIsLoggedIn } from "@store/user/users.store";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const TopBarUI = React.memo(() => {
  dayjs.locale("ru");
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Component
      sx={{
        justifyContent: isLoggedIn
          ? "space-between"
          : { xs: "center", lg: "end" },
        padding: isLoggedIn ? "0" : "0 20px 0 20px",
        marginBottom: { xs: isLoggedIn ? "0" : "40px", lg: "inherit" }
      }}
    >
      {isLoggedIn ? (
        <>
          <TopBarCurrentDate />
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <TopBarWeeklyResults />
          </Box>
        </>
      ) : null}
      <TopBarRightSide />
    </Component>
  );
});

export default TopBarUI;
