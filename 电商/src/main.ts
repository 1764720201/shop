import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import TypeNav from "@/components/TypeNav/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import "@/mock/mockServer";
import mitt from "mitt";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import pinia from "./stores";
import LazyLoad from "lazy-load-vue3";
import maomi from "./assets/images/maomi.jpeg";
const Mitt = mitt();
declare module "vue" {
  export interface ComponentCustomProperties {
    $Bus: typeof Mitt;
  }
}
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("TypeNav", TypeNav);
app.component("Pagination", Pagination);
app.use(createPinia());
app.use(pinia);
app.use(router);

app.use(LazyLoad, { component: true, loading: maomi });
app.config.globalProperties.$Bus = Mitt;
app.mount("#app");
