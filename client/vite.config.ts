import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import replace from "@rollup/plugin-replace";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    replace({
      __YANDEX_API_KEY__: JSON.stringify("fe7c4f02-9876-404c-91b2-c6816e373307")
    })
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@common": path.resolve(__dirname, "./src/components/common"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@columns": path.resolve(__dirname, "./src/columns"),
      "@forms": path.resolve(__dirname, "./src/forms"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@schemas": path.resolve(__dirname, "./src/schemas"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@sockets": path.resolve(__dirname, "./src/sockets"),
      "@hoc": path.resolve(__dirname, "./src/hoc"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@config": path.resolve(__dirname, "./src/config")
    }
  }
});
