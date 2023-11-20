<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <div class="row full-width q-pa-none q-ma-none">
        <span class="text-h5 q-pl-sm text-primary text-bold q-pt-xs">Consent and Acceptance</span>
        <q-space />
        <q-btn
          flat
          dense
          icon="mdi-close-circle-outline"
          color="primary"
          @click="reset()"
          v-close-popup
        ></q-btn>
      </div>
      <q-card-section v-if="message">
        <span class="col text-primary text-bold text-italic">{{ message }}</span>
      </q-card-section>
      <!-- POLICY -->
      <q-card-section>
        <div class="dialog-header row">
          <div class="col text-h6 text-weight-bold">
            {{ $t("webConsent.dialog.policies.headline") }}
          </div>
        </div>
        <div class="dialog-body">
          {{ $t("webConsent.dialog.policies.instructions") }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-toggle
          v-model="cookiePolicyAccepted"
          :label="$t('webConsent.dialog.policies.cookie.label')"
          :class="cookiePolicyAccepted ? '' : 'text-grey-7'"
        ></q-toggle>
        <span class="text-negative text-italic q-pl-xs">(required)</span>
        <q-btn
          @click="policyDialog('cookies')"
          no-caps
          flat
          label="[ View ]"
          class="text-caption"
        ></q-btn>
      </q-card-section>
      <q-card-section>
        <q-toggle
          v-model="privacyPolicyAccepted"
          :label="$t('webConsent.dialog.policies.privacy.label')"
          :class="privacyPolicyAccepted ? '' : 'text-grey-7'"
        ></q-toggle>
        <span class="text-negative text-italic q-pl-xs">(required)</span>
        <q-btn
          @click="policyDialog('privacy')"
          no-caps
          flat
          label="[ View ]"
          class="text-caption"
        ></q-btn>
      </q-card-section>

      <!-- COOKIES -->
      <q-card-section>
        <div class="dialog-header row">
          <div class="col text-h6 text-weight-bold">
            {{ $t("webConsent.dialog.cookie.headline") }}
          </div>
        </div>

        <div class="dialog-body">
          {{ $t("webConsent.dialog.cookie.instructions") }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-toggle
          v-model="trackingCookiesAccepted"
          :disable="!cookiePolicyAccepted"
          color="primary"
          :label="$t('webConsent.dialog.cookie.trackingCookies.label')"
          :class="trackingCookiesAccepted ? '' : 'text-grey-7'"
          ><q-tooltip v-if="!cookiePolicyAccepted"
            >You must accept the cookie policy first</q-tooltip
          ><q-tooltip v-else>Enable ALL cookies</q-tooltip></q-toggle
        >
      </q-card-section>

      <q-card-section>
        <span>
          <q-toggle
            v-model="authCookiesAccepted"
            :disable="!cookiePolicyAccepted"
            :label="$t('webConsent.dialog.cookie.authCookies.label')"
            :class="authCookiesAccepted ? '' : ' text-grey-7'"
            ><q-tooltip v-if="!cookiePolicyAccepted"
              >Required to sign in, the cookie policy must be accepted
              first.</q-tooltip
            ><q-tooltip v-else>Required to sign in</q-tooltip>
          </q-toggle>
        </span>
        <span class="text-negative text-italic q-pl-xs"
          >(required to sign in)</span
        >
      </q-card-section>

      <q-card-section>
        <div class="dialog-header row">
          <div class="col text-h6 text-weight-bold">
            {{ $t("webConsent.dialog.emails.headline") }}
          </div>
        </div>
        <div class="dialog-body">
          {{ $t("webConsent.dialog.emails.instructions") }}
        </div>
      </q-card-section>
      <q-card-section :class="marketingEmailsAccepted ? '' : 'text-grey-7'">
        <q-toggle
          v-model="marketingEmailsAccepted"
          :label="$t('webConsent.dialog.emails.marketingEmails.label')"
          :disable="!isSignedIn"
          ><q-tooltip v-if="!isSignedIn"
            >You must be signed in to manage email settings</q-tooltip
          ><q-tooltip v-else
            >We do not send many marketing emails.</q-tooltip
          ></q-toggle
        >
      </q-card-section>
    </q-card>
    <q-dialog
      v-model="showPolicyDialog"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div
        class="fit"
        :style="Screen.lt.md ? 'max-width: 98%' : 'max-width: 80%'"
      >
        <q-card class="full-width">
          <q-bar class="bg-primary">
            <q-space></q-space>

            <q-btn dense flat icon="mdi-close" v-close-popup>
              <q-tooltip>{{ $t("nav.close") }} </q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>
            <MdPreview v-model="policyData" language="en-US" />
          </q-card-section>
          <q-card-section>
            <q-toggle
              v-if="currentPolicy == 'privacy'"
              v-model="privacyPolicyAccepted"
              :label="
                $t(
                  'webConsent.dialog.policies.privacy.acceptance',
                  'I accept the Privacy Policy'
                )
              "
              :class="privacyPolicyAccepted ? '' : 'text-grey-7 text-strike'"
            ></q-toggle>
            <q-toggle
              v-if="currentPolicy == 'cookies'"
              v-model="cookiePolicyAccepted"
              :label="
                $t(
                  'webConsent.dialog.policies.cookie.acceptance',
                  'I accept the Cookie Policy'
                )
              "
              :class="cookiePolicyAccepted ? '' : 'text-grey-7 text-strike'"
            ></q-toggle>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, computed, watch } from "vue";
import { useDialogPluginComponent, Screen } from "quasar";
import { useI18n } from "vue-i18n";

import { useAuthStore } from "../../../stores/auth";
import { useWebConsentStore } from "../../../stores/webConsent";

import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const { t } = useI18n();

const auth = useAuthStore();
const webConsentStore = useWebConsentStore();

const policyData = ref("");
const mdData = ref({
  privacy: "",
  cookies: "",
});
const currentPolicy = ref();

const { isSignedIn } = storeToRefs(auth);

const {
  message,
  authCookiesAccepted,
  trackingCookiesAccepted,
  cookiePolicyAccepted,
  privacyPolicyAccepted,
  marketingEmailsAccepted
} = storeToRefs(webConsentStore);

// watch(() => webConsentStore.authEnabled, (newVal, oldVal) => {
//   console.log(oldVal, newVal)
//   if(newVal && webConsentStore.authWhenAble) {
//     console.log('CAN LOGIN')
//     webConsentStore.message = 'ACCESS ENABLED'
//     auth.setSignInRequired()
//   } else {
//     webConsentStore.message = null;
//   }
// })

const showPolicyDialog = ref(false);

const policyDialog = (policy) => {
  showPolicyDialog.value = true;

  currentPolicy.value = policy;

  switch (policy) {
    case "cookies":
      if (mdData.value[policy].length < 1) {
        fetch("/markdown/cookie-policy.md")
          .then((response) => {
            return response.text();
          })
          .then((responseBody) => {
            console.log(responseBody);
            mdData.value[policy] = responseBody;
            policyData.value = responseBody;
          });
      } else {
        policyData.value = mdData.value[policy];
      }
      break;
    case "privacy":
      if (mdData.value[policy].length < 1) {
        fetch("/markdown/privacy-policy.md")
          .then((response) => {
            return response.text();
          })
          .then((responseBody) => {
            mdData.value[policy] = responseBody;
            policyData.value = responseBody;
          });
      } else {
        policyData.value = mdData.value[policy];
      }
      break;
  }
};

const reset = async () => {};

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);
</script>

<style scoped lang="scss"></style>
