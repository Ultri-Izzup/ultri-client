const routes = [
  {
    path: "/about/services",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      drawer: "Homepage",
      app: "Izzup"
    },
    children: [
      { name: "aboutServices", path: "", component: () => import("pages/about/ServicesPage.vue") }
    ]
  },
  {
    path: "/about/funding",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      drawer: "Homepage",
      app: "Izzup"
    },
    children: [
      { name: "aboutFunding", path: "", component: () => import("pages/about/FundingPage.vue") }
    ]
  },
  {
    path: "/about/governance",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      drawer: "Homepage",
      app: "Izzup"
    },
    children: [
      { name: "aboutGovernance", path: "", component: () => import("pages/about/GovernancePage.vue") }
    ]
  },
  {
    path: "/about/hosting",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      drawer: "Homepage",
      app: "Izzup"
    },
    children: [
      { name: "aboutHosting", path: "", component: () => import("pages/about/HostingPage.vue") }
    ]
  },

];

export default routes;
