import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { createStore } from "./store/create.store.ts";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
// YMaps
import { YMaps } from "@pbe/react-yandex-maps";
// router
import { BrowserRouter } from "react-router-dom";
// providers
import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";
import { Box } from "@mui/material";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfirmProvider>
      <YMaps
        query={{
          apikey: import.meta.env.VITE_YANDEX_API_KEY,
        }}
        version={"2.1"}
      >
        <BrowserRouter>
          <App />
          <Box style={{ width: "10px" }}>
            <ScrollUpButton
              ContainerClassName="AnyClassForContainer"
              TransitionClassName="AnyClassForTransition"
            >
            </ScrollUpButton>
          </Box>
        </BrowserRouter>
      </YMaps>
    </ConfirmProvider>
  </Provider>
);
