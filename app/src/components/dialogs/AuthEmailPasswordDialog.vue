<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin ">
      <div class="row full-width q-pa-none q-ma-none">
          <q-space />
          <q-btn flat dense icon="mdi-close-circle-outline" color="primary" @click="reset()" v-close-popup></q-btn>
        </div>
      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="signUp" label="Sign Up"></q-tab>
          <q-tab name="signIn" label="Sign In"></q-tab>
        </q-tabs>
        <q-separator></q-separator>

        <q-tab-panels v-model="tab" animated class="q-px-md">
          <q-tab-panel name="signUp" class="q-pt-lg q-px-none">
            <div class="text-h5 text-primary">New Account</div>
            <div class="q-py-xs text-italic">Enter your email and password below.</div>
            <div>
              <q-form>
                <q-input v-model="email" label="Email" type="email"></q-input>
                <q-input v-model="username" label="Username" type="username"></q-input>
                <q-input v-model="password" label="Password" type="password"></q-input>
                <q-input v-if="validPassword" type="password" v-model="verifyPassword" label="Verify Password"></q-input>
                <p v-if="password && !validPassword" class="text-negative text-center q-pt-sm">Please enter a more secure password</p>
                <p v-if="validPassword && verifyPassword && ( password != verifyPassword )"  class="text-negative text-center q-pt-sm">Passwords must match<q-icon name="mdi-alert-circle-outline" /></p>
                <q-card-actions class="row justify-center q-pt-lg">
                  <q-btn label="Create Account" color="primary" @click="signUp()"></q-btn>
                </q-card-actions>
              </q-form>
            </div>
          </q-tab-panel>

          <q-tab-panel name="signIn" class="q-pt-lg q-px-none">
            <div class="text-h5 text-primary">Welcome back!</div>
            <div class="q-py-xs text-italic">
              Enter your email and password below.
            </div>
            <div>
              <q-form>
                <q-input v-model="email" label="Email"></q-input>
                <q-input v-model="password" label="Password"></q-input>
                <q-card-actions class="row justify-center q-pt-lg">
                  <!-- <q-btn label="Cancel" color="secondary"  @click="reset()" v-close-popup></q-btn> -->
                  <q-btn label="Sign In" color="primary" @click="signIn()"></q-btn>
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
import { ref, watch } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useRouter } from "vue-router";

import Session from "supertokens-web-js/recipe/session";
import { EmailVerificationClaim, sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";

import { useScriptTag } from "@vueuse/core";

import { useAuthStore } from "../../stores/auth";
import { useI18n } from "vue-i18n";

useScriptTag(
  "/js/zxcvbn.js"
);

const { t } = useI18n();

const router = useRouter();

const tab = ref("signUp");
const email = ref(null);
const username = ref(null);
const password = ref(null);
const verifyPassword = ref(null);
const validEmail = ref(false);
const validPassword = ref(false);
const emailSubmitted = ref(false);

const auth = useAuthStore();

const reset = () => {
  email.value = null;
  username.value = null;
  password.value = null;
  verifyPassword.value = null;
  validPassword.value = false;
  validEmail.value = false;
  emailSubmitted.value = false;
};

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
  // 'ok',
]);

const { dialogRef, onDialogOK } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

const signUp = async () => {

  const result = await auth.signUp(email.value, password.value)

  if (result.data.status === 'OK') {
    //router.push('/auth/verify-email');
    onDialogOK();
    await shouldSendEmail();
    //await sendEmail();
  }

}

const shouldSendEmail = async () => {
    if (await Session.doesSessionExist()) {
        let validationErrors = await Session.validateClaims();

        console.log(validationErrors)

        if (validationErrors.length === 0) {
            // user has verified their email address
            return true;
        } else {
          for (const err of validationErrors) {
              if (err.validatorId === EmailVerificationClaim.id) {
                  // email is not verified
                  // Send the verification email to the user
                  await sendEmail();
              }
          }
        }
    }
    // a session does not exist, or email is not verified
    return false
}

const sendEmail = async () => {
    try {
        let response = await sendVerificationEmail();
        console.log(response)
        if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
            // This can happen if the info about email verification in the session was outdated.
            // Redirect the user to the home page
            window.location.assign("/");
        } else {
            // email was sent successfully.
            window.alert("Please check your email and click the link in it")
        }
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert(err.message);
        }
    }
}

watch(email, (newValue, oldValue) => {
  if (auth.validateEmail(newValue)) {
    validEmail.value = true;
  } else {
    validEmail.value = false;
  }
});

watch(password, (newValue) => {
  // Minimum 9 characters
  if(newValue && newValue.length >= 10) {

    // Does it have letters and numbers?
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])/

    if(regex.test(newValue)) {

      const scoring = zxcvbn(newValue);

      if (scoring.score >= 3) {
        validPassword.value = true;
      }
    }

  } else {
    validPassword.value = false;
  }

});


</script>

<style scoped lang="scss"></style>
