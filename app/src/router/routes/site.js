const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      drawer: "Homepage",
      app: "Izzup"
    },
    children: [
      { name: "home", path: "", component: () => import("pages/IndexPage.vue") }
    ]
  },

  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AboutPage.vue") }
    ]
  },

  {
    path: "/about/:tab",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AboutPage.vue") }
    ]
  },

  {
    path: "/legal",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LegalPage.vue") }
    ]
  },

  {
    path: "/legal/:policy",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LegalPage.vue") }
    ]
  },

  {
    path: "/data-request",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DataRequestPage.vue") }
    ]
  },

  {
    path: '/benefits',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BenefitsPage.vue') }
    ]
  },

  {
    path: '/fediverse',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FediversePage.vue') }
    ]
  },

  {
    path: '/governance',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GovernancePage.vue') }
    ]
  },

  {
    path: '/signout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignoutPage.vue') }
    ]
  },

];

export default routes;
