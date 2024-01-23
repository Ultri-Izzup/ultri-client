const ultri_shop_routes = [
  // HOME
  {
    path: "/ewf",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "ultri-shop-home",
        component: () => import("pages/UltriShopIndexPage.vue")
      }
    ]
  }
];

export default ultri_shop_routes;
