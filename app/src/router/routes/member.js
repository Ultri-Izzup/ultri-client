const routes = [
  {
    path: "/account/:realm",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      drawer: "Homepage",
      app: "Izzup"
    },
    children: [
      { name: "memberRealms", path: "", component: () => import("pages/member/AccountPage.vue") }
    ]
  },

  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      drawer: "Member",
      app: "Izzup"
    },
    children: [
      { name: "memberDashboard", path: "", component: () => import("pages/member/DashboardPage.vue") }
    ]
  },

];

export default routes;
