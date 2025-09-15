import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import "@/scss/element.scss";
import ElementPlus from "element-plus";
import "@/scss/global.scss";

const app = createApp(App).use(createPinia()).use(router).use(ElementPlus);
app.mount("#app");
