<template>
  <router-view />
</template>

<script setup>
import { watch } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";

import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import Passwordless from "supertokens-web-js/recipe/passwordless";
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
import EmailVerification from "supertokens-web-js/recipe/emailverification";

import { useAuthStore } from "./stores/auth";
import { useWebConsentStore } from "./stores/webConsent";

const authStore = useAuthStore();
const webConsentStore = useWebConsentStore();

const { isSignedIn, signOut, hasBaseAccount } = storeToRefs(authStore);

const { cookiePolicyAccepted, authCookiesAccepted, trackingCookiesAccepted } = storeToRefs(webConsentStore);

watch(isSignedIn, () => {
  if(!isSignedIn.value) {
    authStore.$reset();
    webConsentStore.$reset();
  }
});

watch(cookiePolicyAccepted, async () => {
  if(!cookiePolicyAccepted.value) {
    trackingCookiesAccepted.value = false;
    authCookiesAccepted.value = false;
    // Only Sign Out if they have Fediverse accounts
    if(authStore.hasBaseAccount) {
      await authStore.signOut();
    }
  }
});

let apiHost;
if (process.env.DEV) {
  apiHost = "https://api.example.com";
}
if (process.env.PROD) {
  apiHost = "https://api.izzup.com";
}

SuperTokens.init({
  // enableDebugLogs: true,
  appInfo: {
    apiDomain: apiHost,
    apiBasePath: "/auth",
    appName: "Izzup",
  },
  recipeList: [
    Session.init({ getTokenTransferMethod: () => "cookie" }),
    EmailPassword.init(),
    Passwordless.init(),
    EmailVerification.init()
  ],
});


const $q = useQuasar();

</script>
