<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="row full-width q-pa-none q-ma-none">
        <span  class="text-h4 q-pl-md q-pb-md q-pt-sm text-bold text-grey-5">{{ user.targetPath ? 'Sign In Required' : 'Sign In' }}</span>
        <q-space />
        <q-btn
          flat
          dense
          icon="mdi-close-circle-outline"
          color="grey-6"
          @click="reset()"
          v-close-popup
          class="q-pb-md"
        ></q-btn>
      </q-card-section>
      <q-card-section>
        <q-tab-panels v-model="tab" animated class="q-px-md">
          <q-tab-panel name="email" class="q-pt-none q-px-none">
            <div class="text-h5">Enter your email address</div>
            <div class="q-py-xs text-italic">
              We will send you a one-time passcode.
            </div>
            <div>
              <q-form>
                <q-input v-model="email" label="Email" type="email"></q-input>
                <q-card-actions class="row justify-center q-pt-lg">
                  <q-btn
                    icon="mdi-email-fast-outline"
                    :disable="!submitEnabled"
                    label="Send Passcode"
                    color="primary"
                    @click="requestOTP()"
                  ><q-tooltip>close</q-tooltip></q-btn>
                </q-card-actions>
              </q-form>
            </div>
          </q-tab-panel>

          <q-tab-panel name="code" class="q-pt-lg q-px-none">
            <div class="text-h5 text-primary">Enter OTP</div>
            <div class="q-py-xs text-italic">
              Enter the one-time passcode provided in the email.
            </div>
            <div>
              <q-form>
                <q-input v-model="code" label="OTP"></q-input>
                <q-card-actions class="row justify-center q-pt-lg">
                  <!-- <q-btn label="Cancel" color="secondary"  @click="reset()" v-close-popup></q-btn> -->
                  <q-btn
                    label="Sign In"
                    :disable="!submitPasscodeEnabled"
                    color="primary"
                    @click="submitOTP()"
                  ></q-btn>
                </q-card-actions>
              </q-form>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useRouter } from "vue-router";

// import { useScriptTag } from "@vueuse/core";

import { useUserStore } from "../../stores/user";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();

const tab = ref("email");
const email = ref(null);
const code = ref(null);
const validEmail = ref(false);
const validCode = ref(false);
const emailSubmitted = ref(false);
const codeSubmitted = ref(false);

const user = useUserStore();

const submitEnabled = computed(() => {
  return validEmail.value && !emailSubmitted.value ? true : false;
});

const submitPasscodeEnabled = computed(() => {
  return validCode.value;
});

const requestOTP = async () => {
  emailSubmitted.value = true;
  await user.passwordlessRequest(email.value);
  tab.value = 'code';
}

const submitOTP = async () => {
  codeSubmitted.value = true;
  try {
    const result = await user.passwordlessSubmitCode(code.value);

    switch (result.status) {
      case "OK":
        onDialogOK();
        if(user.targetPath) {
          router.push(user.targetPath)
        } else {
          router.push('/member/dashboard')
        }
        reset();
        break;

      case "INCORRECT_USER_INPUT_CODE_ERROR":
        codeError.value =
          t("auth.error.INCORRECT_USER_INPUT_CODE_ERROR") +
          (result.maximumCodeInputAttempts -
            result.failedCodeInputAttemptCount);
        codeSubmitted.value = false;
        break;

      case "EXPIRED_USER_INPUT_CODE_ERROR":
        codeError.value = t("auth.error.EXPIRED_USER_INPUT_CODE_ERROR");
        codeSubmitted.value = false;
        break;

      case "LOGIN_FAILED_ERROR":
        codeError.value = null;
        codeSubmitted.value = false;
        emailSubmitted.value = false;
        tab.value = "email";
        break;
    }
  } catch (e) {
    console.error(e);
  }
};

const reset = () => {
  tab.value = "email";
  email.value = null;
  emailSubmitted.value = false;
  code.value = null;
  user.setTargetPath(null);
};

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogOK } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

watch(email, (newValue, oldValue) => {
  if (user.validateEmail(newValue)) {
    validEmail.value = true;
  } else {
    validEmail.value = false;
  }
});

watch(code, (newValue, oldValue) => {
  if (user.validatePasscode(newValue)) {
    validCode.value = true;
  } else {
    validCode.value = false;
  }
});

</script>

<style scoped lang="scss"></style>
