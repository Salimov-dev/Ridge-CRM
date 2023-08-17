import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { createStore } from "./store/create.store.ts";
import { BrowserRouter } from "react-router-dom";
import { ConfirmProvider } from "material-ui-confirm";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfirmProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
    </ConfirmProvider>
  </Provider>
);
