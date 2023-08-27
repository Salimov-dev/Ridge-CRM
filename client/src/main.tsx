import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { createStore } from "./store/create.store.ts";
// YMaps
import { YMaps } from "@pbe/react-yandex-maps";
// router
import { BrowserRouter } from "react-router-dom";
// providers
import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";

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
        </BrowserRouter>
      </YMaps>
    </ConfirmProvider>
  </Provider>
);
