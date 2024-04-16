import { BrowserRouter } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Box } from "@mui/material";
import App from "./App.tsx";
import { createStore } from "./store/create.store.ts";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <YMaps
      query={{
        apikey: "fe7c4f02-9876-404c-91b2-c6816e373307"
      }}
      version={"2.1"}
    >
      <BrowserRouter>
        <App />
        <Box style={{ width: "10px" }}>
          <ScrollUpButton
            ContainerClassName="AnyClassForContainer"
            TransitionClassName="AnyClassForTransition"
          ></ScrollUpButton>
        </Box>
      </BrowserRouter>
    </YMaps>
  </Provider>
);
