// libraries
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
// styled
import "./styles.css";
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
import grassImage from "./assets/grass.png"; // Путь к изображению
// theme
import { ColorModeContext, useMode } from "./theme/theme";
import AppRoutes from "./routes/routes";
import Sockets from "./sockets/sockets";
import styled from "@emotion/styled";

export const AppStyled = styled(Box)`
  display: flex;
  min-height: 100vh;
`;

export const RightSide = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px 50px 20px;
  width: 100%;
  background-image: url(${grassImage});
  background-repeat: repeat-x;
  background-size: auto 35px;
  background-position: bottom;
`;

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLoader>
          <Sockets />
          <ScrollToTop />
          <AppStyled>
            <Sidebar />
            <RightSide>
              <TopBar />
              <AppRoutes />
              <Footer />
            </RightSide>
          </AppStyled>
        </AppLoader>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        className="toast-container"
        autoClose={1500}
      />
    </ColorModeContext.Provider>
  );
}

export default App;
