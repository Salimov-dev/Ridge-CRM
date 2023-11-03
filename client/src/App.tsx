// libraries
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
// components
import TopBar from "./components/UI/topbar/topbar";
import Sidebar from "./components/UI/sidebar/sidebar";
import Footer from "./components/common/footer/footer";
// styled
import { AppStyled, RightSide } from "./styled";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
// hoc
import AppLoader from "./hoc/app-loader";
// utils
import ScrollToTop from "./utils/other/scroll-to-top";
// theme
import { ColorModeContext, useMode } from "./theme";
import AppRoutes from "./routes/routes";

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
                <AppRoutes />
              </Box>
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
