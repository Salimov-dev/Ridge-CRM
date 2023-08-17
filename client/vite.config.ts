import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import replace from "@rollup/plugin-replace";

export default defineConfig({
  plugins: [
    react(),
    replace({
      __YANDEX_API_KEY__: JSON.stringify(process.env.VITE_YANDEX_API_KEY),
    }),
  ],
});
