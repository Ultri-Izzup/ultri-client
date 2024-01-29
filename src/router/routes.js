let routes = [];
let siteRoutes = [];

switch (process.env.REALM) {
  case "ultri.shop":
    siteRoutes = [
      {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
          {
            path: "",
            name: "home",
            component: () => import("pages/UltriShopIndexPage.vue")
          }
        ]
      }
    ];
    break;

  case "ultri.com":
    siteRoutes = [
      {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
          {
            path: "",
            name: "home",
            component: () => import("pages/UltriComIndexPage.vue")
          }
        ]
      },
      {
        path: "/fediverse",
        component: () => import("layouts/MainLayout.vue"),
        children: [
          {
            path: "",
            name: "fediverseInfo",
            component: () => import("pages/FediverseInfoPage.vue")
          }
        ]
      }
    ];
    break;

  case "ultri.space":
    siteRoutes = [
      {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
          {
            path: "",
            name: "home",
            component: () => import("pages/UltriSpaceIndexPage.vue")
          }
        ]
      }
    ];
    break;
}

const defaultRoutes = [
  // ABOUT
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "aboutPage",
        component: () => import("pages/AboutPage.vue")
      }
    ]
  },

  // POLICY PAGE
  {
    path: "/legal/:policy",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "policyPage",
        component: () => import("pages/PolicyPage.vue")
      }
    ]
  },

  // PUBLIC FEDIVERSE PAGE
  {
    path: "/fediverse",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "fediversePublic",
        component: () => import("pages/FediversePage.vue")
      }
    ]
  },

  // PUBLIC CANAVA PAGE
  {
    path: "/canava",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "canavaPublic",
        component: () => import("pages/CanavaPage.vue")
      }
    ]
  },

  // MEMBER DASHBOARD
  {
    path: "/member/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "memberDashboard",
        component: () => import("pages/MemberDashboardPage.vue"),
        meta: { requiresAuth: true }
      }
    ]
  },

  // FEDIVERSE DASHBOARD
  {
    path: "/member/fediverse",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "fediverseDashboard",
        component: () => import("pages/FediverseDashboardPage.vue")
      }
    ]
  },

  // CANAVA DASHBOARD
  {
    path: "/member/canava",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "canavaDashboard",
        component: () => import("pages/CanavaDashboardPage.vue")
      }
    ]
  },

  // WORKSPACES
  {
    path: "/workspaces",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "workspaceDashboard",
        component: () => import("pages/WorkspacesDashboardPage.vue")
      }
    ]
  },

  // COMMUNITY SUPPORT
  {
    path: "/community/support",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "communitySupport",
        component: () => import("pages/CommunitySupportPage.vue")
      }
    ]
  },

  // CATCHALL
  // Always leave this as last one
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
];

routes = [...siteRoutes, ...defaultRoutes];

export default routes;
