<template>
  <q-btn-dropdown flat dense icon="mdi-cookie">
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md">{{ $t("cookie.settings.acceptance.label") }}</div>
        <!-- <q-toggle
          v-model="cookiePolicyAccepted"
          :label="$t('cookie.settings.cookiePolicy.label')"
        ></q-toggle> -->
        <q-toggle
          v-model="reqCookiesAccepted"
          :label="$t('cookie.settings.requiredCookies.label')"
        ></q-toggle>
        <!-- <q-toggle
          v-model="intTrackingAccepted"
          :label="$t('cookie.settings.internalTrackingCookies.label')"
        ></q-toggle> -->
        <q-toggle
          v-model="extTrackingAccepted"
          :label="$t('cookie.settings.externalTrackingCookies.label')"
        ></q-toggle>
      </div>

      <q-separator vertical inset class="q-mx-lg"></q-separator>

      <div class="column items-center">
        <div class="q-mt-xs q-mb-md">
          <div class="text-h6 q-mb-md">{{ $t("cookie.settings.cookiePolicy.label") }}</div>
          <q-btn
            color="primary"
            :label="$t('cookie.settings.cookiePolicy.viewLabel')"
            push
            size="md"
            no-caps=""
            @click="displayCookiePolicy()"
          ></q-btn>
        </div>

      </div>
    </div>
  </q-btn-dropdown>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useUserStore } from "../../stores/user";
import { useUIStore } from "../../stores/ui";

const userStore = useUserStore();
const {
  cookiePolicyAccepted,
  extTrackingAccepted,
  intTrackingAccepted,
  reqCookiesAccepted,
} = storeToRefs(userStore);

const uiStore = useUIStore();
const { policyDialogVisible } = storeToRefs(uiStore);

const displayCookiePolicy = () => {
  uiStore.setDialogPolicy('cookie-policy')
  policyDialogVisible.value = true;
}

</script>

<style lang="scss" scoped>
.level-header {
  border-bottom-style: solid;
  border-color: grey;
  border-width: 1px;
}
.level {
  border-style: solid;
  border-color: grey;
  border-width: 1px;
  border-radius: 1em;
}
</style>
