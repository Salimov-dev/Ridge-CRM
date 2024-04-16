import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AppLoader from "./hoc/app-loader";
import ScrollToTop from "@utils/scroll-to-top/scroll-to-top";
import { ColorModeContext, useMode } from "./theme/theme";
import Sockets from "./sockets/sockets";
import AppStyled from "@layouts/app/app-styled";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLoader>
          <Sockets />
          <ScrollToTop />
          <AppStyled />
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
