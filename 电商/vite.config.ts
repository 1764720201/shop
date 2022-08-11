import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    VueSetupExtend(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        changeOrigin: true,
      },
    },
  },
});
