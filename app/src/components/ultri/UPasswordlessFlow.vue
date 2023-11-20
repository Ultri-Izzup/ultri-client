<template>
  <q-card flat>
    <q-card-section :class="Screen.lt.md ? 'q-pa-xs' : ''">
      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="email">
          <q-card flat>
            <q-card-section :class="Screen.lt.sm ? 'text-h5 text-weight-bolder ' : 'text-h4 text-weight-bolder '">
              Sign in with email
            </q-card-section>
            <q-card-section>
              <q-input
                :label="$t('auth.email.label')"
                class="text-h6"
                v-model="email"
                outlined
              ></q-input>
              <div v-if="!validEmail" class="row justify-center q-pt-xs text-negative text-italic">
                <q-icon name="mdi-alert-circle" class="q-pt-xs"></q-icon> &nbsp; <span class="text-body1"> {{ $t("auth.email.error.invalid") }}</span>
              </div>
            </q-card-section>
            <q-card-actions class="justify-center">
              <q-btn
                @click="onEmailSubmit"
                :label="$t('auth.passcode.send.label')"
                :disabled="emailSubmitted || !validEmail"
                no-caps
                color="primary"
                size="xl"
                class="text-weight-bold"
                icon="mdi-email-fast-outline"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="passcode">
          <q-card flat>
            <q-card-section class="text-h4 text-weight-bolder text-italic">
              Enter one-time passcode
            </q-card-section>
            <q-card-section>
              <q-input
                :label="$t('auth.passcode.label')"
                class="text-h6"
                v-model="passcode"
                outlined
              ></q-input>
              <div v-if="!validPasscode" class="row justify-center q-pt-xs text-negative text-italic">
                <q-icon name="mdi-alert-circle" class="q-pt-xs"></q-icon> &nbsp; <span class="text-body1"> {{ passcodeError }}</span>
              </div>
              <div v-if="passcodeError" class="row justify-center q-pt-xs text-negative text-italic">
                <q-icon name="mdi-alert-circle" class="q-pt-xs"></q-icon> &nbsp; <span class="text-body1"> {{ passcodeError }}</span>
              </div>
            </q-card-section>
            <q-card-actions class="justify-center">
              <q-btn
                @click="onPasscodeSubmit"
                :label="$t('auth.signIn.label')"
                no-caps
                color="primary"
                size="xl"
                class="text-weight-bold"
                :disabled="passcodeSubmitted || !validPasscode"
                icon="mdi-login-variant"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { Screen } from "quasar";

import { useAuthStore } from "../../stores/auth";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const panel = ref("email");

const email = ref(null);
const validEmail = ref(true);
const emailSubmitted = ref(false);

const passcode = ref(null);
const validPasscode = ref(true);
const passcodeError = ref(null);
const passcodeSubmitted = ref(false);

const formError = ref(null);

const auth = useAuthStore();

const reset = () => {
  panel.value = "email";
  email.value = null;
  validEmail.value = true;
  emailSubmitted.value = false;
  passcode.value = null;
  validPasscode.value = true;
  passcodeError.value = null;
  passcodeSubmitted.value = false;
}

const onEmailSubmit = async () => {
  if (auth.validateEmail(email.value)) {

    emailSubmitted.value = true;
    await auth.passwordlessRequest(email.value);
    panel.value = 'passcode';
  } else {
    validEmail.value = false;
  }
};

const onPasscodeSubmit = async () => {
  if (auth.validatePasscode(passcode.value)) {

    passcodeSubmitted.value = true;

    try {
    const result = await auth.passwordlessOTP(passcode.value);
    console.log(result);

    switch (result.status) {
      case "OK":
        if(auth.isNewMember) {
          //
        }
        reset();
        break;

      case "INCORRECT_USER_INPUT_CODE_ERROR":
        passcodeError.value =
          t("auth.error.INCORRECT_USER_INPUT_CODE_ERROR");
        passcodeSubmitted.value = false;
        break;

      case "EXPIRED_USER_INPUT_CODE_ERROR":
        passcodeError.value = t("auth.error.EXPIRED_USER_INPUT_CODE_ERROR");
        passcodeSubmitted.value = false;
        break;

      case "LOGIN_FAILED_ERROR":
        passcodeError.value = null;
        passcodeSubmitted.value = false;
        emailSubmitted.value = false;
        panel.value = "email";
        break;
    }
  } catch (e) {
    console.error(e);
  }


  } else {
    validEmail.value = false;
  }
};

watch(email, (newVal, oldVal) => {
  if(!validEmail.value) {
    validEmail.value = auth.validateEmail(newVal);
  }
})

watch(passcode, (newVal, oldVal) => {
  if(!validPasscode.value) {
    validPasscode.value = auth.validatePasscode(newVal);
  }
})
</script>
