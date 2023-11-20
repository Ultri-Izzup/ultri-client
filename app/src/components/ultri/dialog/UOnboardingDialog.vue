<template>
  <q-dialog ref="dialogRef" maximized persistent>
    <q-card
      :class="
        Screen.lt.md
          ? 'q-dialog-plugin flex full-width'
          : 'q-dialog-plugin flex flex-center full-width'
      "
    >
      <q-card-section
        class="justify-center text-center align-center"
        :style="
          Screen.lt.md
            ? 'width: 100%'
            : Screen.lt.lg
            ? 'width: 80%'
            : 'width: 70%'
        "
      >
        <q-stepper
          :flat="Screen.lt.md ? true : false"
          v-model="step"
          ref="stepper"
          color="primary"
          alternative-labels
          animated
          header-nav
          :vertical="Screen.lt.md"
        >
          <q-step
            :name="1"
            title="Welcome"
            active-icon="mdi-human-greeting"
            :done="step > 1"
            class="no-scroll"
          >
            <q-card
              flat
              :class="Screen.lt.md ? 'q-pa-ys text-left' : 'q-pa-md text-left'"
            >
              <q-card-section>
                <div
                  v-if="Screen.gt.sm"
                  class="text-h4 row full-width text-center justify-center text-weight-bolder text-italic lesser-text"
                >
                  Welcome to Izzup!
                </div>
                <div v-if="showConfetti" class="row full-width justify-center">
                  <ConfettiExplosion v-if="showConfetti" />
                </div>
              </q-card-section>
              <q-card-section>
                <div
                  :class="
                    Screen.lt.md
                      ? 'text-h6 lesser-text'
                      : 'text-h5 lesser-text row full-width text-center justify-center'
                  "
                >
                  Thank you for joining our community.
                </div>
              </q-card-section>
              <q-card-section>
                <div
                  :class="
                    Screen.lt.md
                      ? 'row full-width justify-center text-body1 lesser-text'
                      : 'row full-width justify-center text-h6 lesser-text'
                  "
                ></div>
                <q-separator></q-separator>
                <div class="text-center text-bold text-h4 q-pt-md text-italic">
                  Next steps
                </div>
                <div class="row full-width text-center justify-center">
                  <ol
                    :class="
                      Screen.lt.md
                        ? 'q-pl-sm text-body1 text-left'
                        : 'q-pa-none text-h6 text-left'
                    "
                  >
                    <li class="q-py-sm">Policies and cookies</li>
                    <li class="q-py-sm">Claim username</li>
                  </ol>
                </div>
                <div class="row justify-center q-pb-md">
                  <q-btn
                    @click="$refs.stepper.next()"
                    color="primary"
                    label="Continue"
                    size="xl"
                  ></q-btn>
                </div>
              </q-card-section>
            </q-card>
          </q-step>

          <q-step
            :name="3"
            title="Legal"
            icon="mdi-file-sign"
            active-icon="mdi-file-sign"
            :done="step > 3"
            class="no-scroll"
          >
            <div class="row full-width justify-center text-center">
              <q-card
                flat
                :class="
                  Screen.lt.md ? 'q-py-xs text-left' : 'q-pa-md text-left'
                "
              >
                <q-card-section>
                  <div class="text-body1 lesser-text text-italic">
                    Accept all policies and and the Application cookies
                  </div>
                </q-card-section>
                <!-- POLICY -->
                <q-card-section>
                  <div class="dialog-header row">
                    <div class="col text-h6 text-weight-bold">
                      {{ $t("webConsent.dialog.policies.headline") }}
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <q-toggle
                    v-model="cookiePolicyAccepted"
                    :label="$t('webConsent.dialog.policies.cookie.label')"
                    :class="cookiePolicyAccepted ? '' : 'text-grey-7'"
                  ></q-toggle>
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
                </q-card-section>

                <q-card-section>
                  <span>
                    <q-toggle
                      v-model="authCookiesAccepted"
                      :disable="!cookiePolicyAccepted"
                      :label="$t('webConsent.dialog.cookie.authCookies.label')"
                      :class="authCookiesAccepted ? '' : ' text-grey-7'"
                    >
                    </q-toggle>
                  </span>
                </q-card-section>

                <q-card-section>
                  <q-toggle
                    v-model="trackingCookiesAccepted"
                    :disable="!cookiePolicyAccepted"
                    color="primary"
                    :label="
                      $t('webConsent.dialog.cookie.trackingCookies.label')
                    "
                    :class="trackingCookiesAccepted ? '' : 'text-grey-7'"
                  ></q-toggle>
                  <span class="text-italic">(optional)</span>
                </q-card-section>
              </q-card>
            </div>
            <div class="row justify-center q-pb-md">
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                label="Continue"
                size="lg"
                :disabled="!webConsentStore.accessEnabled"
              ></q-btn>
            </div>
          </q-step>

          <q-step
            :disable="!webConsentStore.accessEnabled"
            :name="4"
            title="Username"
            icon="mdi-account-plus"
            active-icon="mdi-account-plus"
            :done="step > 4"
          >
            <div class="row full-width justify-center text-center">
              <q-card
                flat
                :class="
                  Screen.lt.md ? 'q-py-xs text-left' : 'q-pa-md text-left'
                "
                style="width: 300px"
              >
                <q-card-section>
                  <div class="text-h6 text-weight-bold">Username Rules</div>
                  <ul>
                    <li class="text-bold">Usernames cannot be changed</li>
                    <li>One username per domain</li>
                    <li>Must be between 5-30 characters</li>
                    <li>Character limits:</li>
                    <ul>
                      <li>Lowercase letters (a-z)</li>
                      <li>Digits (0-9)</li>
                      <li>Underscore (_)</li>
                    </ul>
                  </ul>
                  <q-input label="username" v-model="username"></q-input>
                  <div v-if="error" class="q-pa-xs text-primary"><span class="text-bold">Error:</span> {{ $t('error.' + error) }} <span v-if="error === 'invalid_characters'">({{ showInvalid(username)}})</span></div>
                </q-card-section>
                <q-card-actions  class="justify-center">
                  <q-btn @click="attempUsernameClaim()" label="Claim username" color="primary"></q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </q-step>
         </q-stepper>
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
import { nextTick, ref } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
import { storeToRefs } from "pinia";

import { Screen, useDialogPluginComponent } from "quasar";

import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import { useAuthStore } from "../../../stores/auth";
import { useWebConsentStore } from "../../../stores/webConsent";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const webConsentStore = useWebConsentStore();
const auth = useAuthStore();

const done1 = ref(false);
const done2 = ref(false);
const done3 = ref(false);
const done4 = ref(false);
const done5 = ref(false);

const policyData = ref("");
const mdData = ref({
  privacy: "",
  cookies: "",
});
const currentPolicy = ref(null);

const showConfetti = ref(false);

const username = ref(null);
const error = ref(null);

const step = ref(1);

const explodeConfetti = async () => {
  await nextTick();
  showConfetti.value = false;
  await nextTick();
  showConfetti.value = true;
};

const attempUsernameClaim = async () => {
  console.log(username.value)
    const claimResult = await auth.claimUsername(username.value, 'izzup.com');
    console.log(claimResult)
    if(claimResult.status == "OK") {
      reset();
      auth.welcomeAccount = 'izzup.com';
      onDialogOK();
    } else {
      error.value = claimResult.message;
    }
}

const {
  message,
  authCookiesAccepted,
  trackingCookiesAccepted,
  cookiePolicyAccepted,
  privacyPolicyAccepted,
  marketingEmailsAccepted,
} = storeToRefs(webConsentStore);

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

const regex = /^[a-z0-9_]*$/

const showInvalid = (usernameString) => {
  const splitStr = usernameString.split('');
  const badChars = splitStr.filter((char)=> ! regex.test(char));
  const uniq = new Set(badChars);
  const uniqArr = [...uniq]
  return uniqArr.join(', ');
}

const reset = () => {
  currentPolicy.value = null;
  showConfetti.value =false;
  username.value =null;
  error.value =null;
  step.value = 1;
}

explodeConfetti();
</script>

<style scoped lang="scss"></style>
