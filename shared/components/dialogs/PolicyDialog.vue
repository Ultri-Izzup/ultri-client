<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin full-width">
      <q-card-section class="text-center">
        <div class="text-h6">{{ $t('policy.dialog.header')}}</div>
        <div class="text-italic">{{ $t('policy.dialog.coverage')}}</div>
      </q-card-section>
      <q-tabs
          v-model="dialogPolicy"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="cookie-policy" :label="$t('policy.cookie.label')"></q-tab>
          <q-tab name="privacy-policy" :label="$t('policy.privacy.label')"></q-tab>
          <q-tab name="terms-of-service" :label="$t('policy.terms.label')"></q-tab>
          <q-tab name="tracking-policy" :label="$t('policy.tracking.label')"></q-tab>
      </q-tabs>
      <q-card-section>
        <q-tab-panels v-model="dialogPolicy" animated class="q-px-md">

          <q-tab-panel name="cookie-policy" class="q-pt-lgmd q-px-none">
            <cookie-policy></cookie-policy>
          </q-tab-panel>

          <q-tab-panel name="privacy-policy" class="q-pt-md q-px-none">
            <privacy-policy></privacy-policy>
          </q-tab-panel>

          <q-tab-panel name="terms-of-service" class="q-pt-md q-px-none">
            <terms-of-service></terms-of-service>
          </q-tab-panel>

          <q-tab-panel name="tracking-policy" class="q-pt-md q-px-none">
            <tracking-policy></tracking-policy>
          </q-tab-panel>

        </q-tab-panels>
        <q-card-actions class="justify-center">
          <q-btn :label="$t('control.close')" color="primary" @click="closeDialog()"></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { storeToRefs } from "pinia";

import CookiePolicy from "../legal/CookiePolicy.vue";
import PrivacyPolicy from "../legal/PrivacyPolicy.vue";
import TermsOfService from "../legal/TermsOfService.vue";
import TrackingPolicy from "../legal/TrackingPolicy.vue";

import { useUIStore } from "../../stores/ui";

const uiStore = useUIStore();
const { dialogPolicy, policyDialogVisible } = storeToRefs(uiStore)

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

const closeDialog = () => {
  onDialogCancel();
  policyDialogVisible.value = false;
  dialogPolicy.value = null;
}
</script>

<style scoped lang="scss"></style>
