import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { createStore } from "./store/create.store.ts";
import { BrowserRouter } from "react-router-dom";
import { ConfirmProvider } from "material-ui-confirm";
import { YMaps } from "@pbe/react-yandex-maps";

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
