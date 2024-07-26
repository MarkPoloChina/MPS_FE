import { createRouter, createWebHistory } from "vue-router";
import routes from "./client/index";

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  scrollBehavior(to, from, _savedPosition) {
    if (from.name === "illustDate" && to.name === "illustDate") return;
    if (from.fullPath === to.fullPath) return;
    return { top: 0 };
  },
  routes: [
    ...routes,
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/views/404.vue"),
    },
  ],
});
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title + " | MPS";
  }
});
export default router;
