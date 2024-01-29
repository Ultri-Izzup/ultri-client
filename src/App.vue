<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import Passwordless from "supertokens-web-js/recipe/passwordless";

SuperTokens.init({
  enableDebugLogs: false, // process.env.SUPERTOKENS_DEBUG,
  appInfo: {
    apiDomain: process.env.API_DOMAIN,
    apiBasePath: "/auth",
    appName: process.env.APPNAME,
  },
  recipeList: [
    Session.init({ getTokenTransferMethod: () => "cookie" }),
    Passwordless.init(),
  ],
});

export default defineComponent({
  name: "App",
});
</script>
