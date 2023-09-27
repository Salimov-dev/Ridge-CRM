import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import replace from "@rollup/plugin-replace";

export default defineConfig({
  plugins: [
    react(),
    replace({
      __YANDEX_API_KEY__: JSON.stringify(
        "fe7c4f02-9876-404c-91b2-c6816e373307"
      ),
    }),
  ],
});
