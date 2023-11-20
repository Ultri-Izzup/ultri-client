<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="toolbar">
        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->
          <span class="nav-title"
            ><router-link to="/" class="no-link-style">{{$t('site.siteName')}}</router-link></span
          >
          <span class="gt-sm inline">
          &mdash;
          <span class="tagline">{{$t('site.tagline')}}</span></span>
        </q-toolbar-title>
        <q-space />
        <!-- <span v-if="!auth.isSignedIn" class="q-pr-sm">
          <q-btn @click="triggerSignInDialog()" dense flat icon="mdi-login"></q-btn>
          <q-tooltip>{{ $t("auth.signIn.hint") }}</q-tooltip>
        </span> -->
        <span v-if="auth.isSignedIn" class="q-pr-sm">
          <span>
            <NotificationButton></NotificationButton>
            <q-tooltip>{{ $t("notifications.hint") }}</q-tooltip>
          </span>
          <span>
            <MemberButton></MemberButton>
            <q-tooltip>{{ $t("member.hint") }}</q-tooltip>
          </span>
        </span>
      </q-toolbar>
    </q-header>

    <!-- <q-tabs align="left">
        <q-route-tab :href="'https://what.izzup.com'" label="Fediverse" target="_blank" />
        <q-route-tab to="/benefits" label="About" />
        <q-route-tab to="/fediverse" label="Fediverse" />
        <q-route-tab to="/benefits" label="Benefits" />
        <q-route-tab to="/governance" label="Governance" />
        <q-tab
          label="Join"
          clickable
          v-ripple
          @click="triggerAuthDialog('email')"
        />
      </q-tabs> -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <AuthDialog v-model="signInRequired"></AuthDialog>
    <WebConsentDialog v-model="webConsentStore.showDialog"></WebConsentDialog>
    <UOnboardingDialog v-model="showNewMemberDialog" />
    <!-- <DocumentDialog v-model="site.showDocumentDialog"></DocumentDialog> -->
    <u-dynamic-footer />
  </q-layout>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";

import AuthDialog from "../components/dialogs/AuthPasswordlessDialog.vue";
import WebConsentDialog from "../components/ultri/dialog/WebConsentDialog.vue";
import UOnboardingDialog from "../components/ultri/dialog/UOnboardingDialog.vue";

import MemberButton from "../components/ultri/button/MemberButton.vue";
import NotificationButton from "../components/ultri/button/NotificationButton.vue";

import { useAuthStore } from "../stores/auth";
import { useColorStore } from "../stores/color";
import { useWebConsentStore } from "../stores/webConsent";
import { useSiteStore } from "../stores/site";

import UDynamicFooter from "../components/ultri/UDynamicFooter.vue";

const $q = useQuasar();

const route = useRoute();

const auth = useAuthStore();
const color = useColorStore();
const webConsentStore = useWebConsentStore();
const site = useSiteStore();



// const triggerAuthDialog = async (view = "signUp") => {
//   //auth.signInRequired = true;
// };

const { isSignedIn, signInRequired, signOut, showNewMemberDialog, accounts } = storeToRefs(auth);

// const triggerSignInDialog = async () => {
//   if(webConsentStore.authEnabled) {
//     auth.setTargetUrl(route.path);
//     auth.setSignInRequired(true);
//   } else {
//     webConsentStore.triggerDialog(true, 'You must accept all Policies and consent to Authentication Cookies to sign in.')
//   }

// };

watch(
  () => color.darkMode,
  () => {
    if (color.darkMode) {
      $q.dark.set(true);
    } else {
      $q.dark.set(false);
    }
  },
  { immediate: true }
);

</script>

<style lang="scss" scoped>
.nav-title {
  font-size: 2em;
  font-weight: bolder;
  line-height: 1em;
  padding: 0;
  margin: 0;
  display: inline;
  font-style: italic;
}
.tagline {
  font-size: 1.2em;
  line-height: 1em;
  padding: 0;
  margin: 0;
  display: inline;
  font-style: italic;
}
.no-link-style {
  text-decoration: none;
  color: white;
}
</style>
