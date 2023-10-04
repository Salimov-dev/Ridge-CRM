// libraries
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// layouts
import Main from "./layouts/main/main";
import Signup from "./layouts/sigup/signup";
import Users from "./layouts/users/users";
import Login from "./layouts/login/login";
import Profile from "./layouts/profile/profile";
import Objects from "./layouts/objects/objects";
import Calendar from "./layouts/calendar/calendar";
import Meetings from "./layouts/meetings/meetings";
import Presentations from "./layouts/presentations/presentations";
// components
import Deals from "./layouts/deals/deals";
import TopBar from "./components/UI/topbar/topbar";
import Sidebar from "./components/UI/sidebar/sidebar";
import Footer from "./components/common/footer/footer";
import UpdateProfile from "./components/pages/update-profile/update-profile";
// styled
import "./styles.css";
import { AppStyled, RightSide } from "./styled";
import "react-toastify/dist/ReactToastify.css";
// hoc
import AppLoader from "./hoc/app-loader";
// utils
import ScrollToTop from "./utils/other/scroll-to-top";
// theme
import { ColorModeContext, useMode } from "./theme";
import NoMatchRoute from "./components/common/rout/no-match";
import RequireAuth from "./layouts/users/require-auth";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLoader>
          <ScrollToTop />
          <AppStyled>
            <Sidebar />
            <RightSide>
              <Box>
                <TopBar />
                <Routes>
                  <Route
                    index
                    path="/"
                    element={
                      <RequireAuth>
                        <Main />
                      </RequireAuth>
                    }
                  />
                  <Route
                    index
                    path="*"
                    element={
                      <RequireAuth>
                        <NoMatchRoute />
                      </RequireAuth>
                    }
                  />

                  <Route path="auth" element={<Login />}>
                    <Route index element={<Navigate to="/auth/login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Route>

                  <Route path="auth" element={<Signup />}>
                    <Route index element={<Navigate to="/auth/SignUp" />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Route>

                  <Route path="users">
                    <Route
                      index
                      element={
                        <RequireAuth>
                          <Users />
                        </RequireAuth>
                      }
                    />
                    <Route path="*" element={<Navigate to="/users" />} />
                  </Route>

                  <Route path="profile" element={<Profile />}>
                    <Route index element={<Navigate to="/profile" />} />
                    <Route
                      path=":userId?/profileUpdate"
                      element={
                        <RequireAuth>
                          <UpdateProfile />
                        </RequireAuth>
                      }
                    />
                    <Route path="*" element={<Navigate to="/profile" />} />
                  </Route>

                  <Route path="objects">
                    <Route
                      index
                      element={
                        <RequireAuth>
                          <Objects />
                        </RequireAuth>
                      }
                    />
                    <Route path="*" element={<Navigate to="/objects" />} />
                  </Route>

                  <Route path="meetings">
                    <Route
                      index
                      element={
                        <RequireAuth>
                          <Meetings />
                        </RequireAuth>
                      }
                    />
                    <Route path="*" element={<Navigate to="/meetings" />} />
                  </Route>

                  <Route path="calendar">
                    <Route
                      index
                      element={
                        <RequireAuth>
                          <Calendar />
                        </RequireAuth>
                      }
                    />
                    <Route path="*" element={<Navigate to="/calendar" />} />
                  </Route>

                  <Route path="deals">
                    <Route
                      index
                      element={
                        <RequireAuth>
                          <Deals />
                        </RequireAuth>
                      }
                    />
                    <Route path="*" element={<Navigate to="/deals" />} />
                  </Route>

                  <Route path="presentations">
                    <Route
                      index
                      element={
                        <RequireAuth>
                          <Presentations />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/presentations" />}
                    />
                  </Route>
                </Routes>
              </Box>
              <Footer />
            </RightSide>
          </AppStyled>
        </AppLoader>
      </ThemeProvider>
      <ToastContainer position="bottom-left" />
    </ColorModeContext.Provider>
  );
}

export default App;
