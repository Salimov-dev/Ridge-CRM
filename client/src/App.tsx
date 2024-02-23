// libraries
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
// styled
import "./styles.css";
import styled from "@emotion/styled";
import "react-toastify/dist/ReactToastify.css";
// components
import TopBar from "./components/UI/topbar/topbar";
import Sidebar from "./components/UI/sidebar/sidebar";
import Footer from "./components/common/footer/footer";
// hoc
import AppLoader from "./hoc/app-loader";
// utils
import ScrollToTop from "./utils/other/scroll-to-top";
// image
import grassImage from "./assets/grass.png";
// theme
import { ColorModeContext, useMode } from "./theme/theme";
// routes
import AppRoutes from "./routes/routes";
// sockets
import Sockets from "./sockets/sockets";

export const AppStyled = styled(Box)`
  display: flex;
  min-height: 100vh;
`;

export const RightSide = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-image: url(${grassImage});
  background-repeat: repeat-x;
  background-size: auto 35px;
  background-position: bottom;
`;

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const currentPath = location.pathname;
  const isHomePage = currentPath === "/";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLoader>
          <Sockets />
          <ScrollToTop />
          <AppStyled>
            <Sidebar />
            <RightSide sx={{ padding: isHomePage ? "0" : "0 20px 50px 20px" }}>
              <TopBar />
              <AppRoutes />
              <Footer />
            </RightSide>
          </AppStyled>
        </AppLoader>
      </ThemeProvider>
      <ToastContainer
        position="bottom-left"
        className="toast-container"
        autoClose={2200}
      />
    </ColorModeContext.Provider>
  );
}

export default App;
