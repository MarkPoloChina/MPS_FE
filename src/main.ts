import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/scss/element.scss";
import ElementPlus from "element-plus";
import "highlight.js/scss/vs2015.scss";

const app = createApp(App).use(store).use(router).use(ElementPlus);
app.mount("#app");
