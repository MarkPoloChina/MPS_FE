import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import packageJson from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/scss/var.scss" as *;',
      },
    },
  },
  define: {
    __FE_BUILD__: JSON.stringify(new Date().toLocaleString()),
    __FE_VERSION__: JSON.stringify(packageJson.version),
  },
  server: {
    proxy: {
      "/api":
        loadEnv("development", "./").VITE_API_MODE === "local"
          ? {
              target: "http://localhost:3000",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
            }
          : {
              target: "https://www.markpolo.cn/",
              changeOrigin: true,
              secure: true,
            },
      "/static": {
        target: "https://mps-cos.markpolo.cn/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/static/, ""),
      },
    },
  },
});
