const routes = [
  {
    path: "/",
    name: "client",
    component: () => import("@/views/client/clientIndex.vue"),
    children: [
      {
        path: "",
        name: "index",
        meta: { title: "主页" },
        component: () => import("@/views/client/home/homeIndex.vue"),
      },
      {
        path: "blog",
        name: "blog",
        meta: { title: "博客" },
        component: () => import("@/views/client/blog/blogIndex.vue"),
        // children:[{
        //   path:'',
        //   name: 'blogIndex'
        // }]
      },
      {
        path: "illust",
        name: "illust",
        meta: { title: "插画" },
        component: () => import("@/views/client/illust/illustIndex.vue"),
      },
      {
        path: "project",
        name: "project",
        meta: { title: "项目" },
        component: () => import("@/views/client/project/projectIndex.vue"),
      },
    ],
  },
];
export default routes;
