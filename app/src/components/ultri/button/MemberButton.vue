<template>
  <q-btn-dropdown flat dense no-caps dropdown-icon="mdi-account">
    <q-list>

      <!-- <q-item
        clickable
        v-close-popup
        to="/member/fediverse"
      >
        <q-item-section avatar>
          <q-icon name="mdi-earth" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('fediverse.title', 'Fediverse') }}</q-item-label>
        </q-item-section>
      </q-item> -->

      <q-item
        clickable
        v-close-popup
        to="/dashboard"
      >
        <q-item-section avatar>
          <q-icon name="mdi-view-dashboard" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('member.dashboard.title', 'Dashboard') }}</q-item-label>
        </q-item-section>
      </q-item>




      <q-item
        clickable
        v-close-popup
        v-if="!authStore.isSignedIn"
        @click="triggerSignInDialog()"
      >
        <q-item-section avatar>
          <q-icon name="mdi-login" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("nav.signIn") }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
        v-if="authStore.isSignedIn"
        @click="platformSignOut('/')"
      >
        <q-item-section avatar>
          <q-icon name="mdi-logout" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("nav.signOut") }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup language="ts">
import { useAuthStore } from "../../../stores/auth";
import { useColorStore } from "../../../stores/color";
import { useWebConsentStore } from "../../../stores/webConsent";

import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

import { storeToRefs} from "pinia";

import { useRouter, useRoute } from "vue-router";

import { ref } from "vue";

const router = useRouter();
const route = useRoute();

const $q = useQuasar();

const authStore = useAuthStore();
const colorStore = useColorStore();
const webConsentStore = useWebConsentStore();

const platformSignOut = async(path="/") => {
  router.push(path)
  await authStore.signOut();
}

const { locale } = useI18n({ useScope: "global" });

const locales = [
  { value: "en-US", label: "English" },
  { value: "es", label: "Español" },
  { value: "ro", label: "Romanian" },
];

const {
  authCookiesAccepted
} = storeToRefs(webConsentStore);

const triggerSignInDialog = async () => {
  if(authCookiesAccepted.value) {
    authStore.setTargetUrl(route.path);
    authStore.setSignInRequired(true);
  } else {
    webConsentStore.triggerDialog(true, 'You must accept the Cookie Policy and enable Authentication Cookies to sign in.')
  }

};
</script>
