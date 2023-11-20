<template>
  <q-page class="flex">
    {{route.query.token}}
    <div class="row full-width justify-center q-pt-lg fit">
      <q-card class="q-px-xl q-my-lg">
        <q-card-section style="min-width: 320px">
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
            <q-tab name="benefits" label="Benefits"></q-tab>
          </q-tabs>
          <q-separator></q-separator>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="signUp" class="q-pt-lg q-px-none">
              <div class="text-h5 text-primary">New Account</div>
              <div class="q-py-xs text-italic">
                Enter your information below.
              </div>
              <div>
                <q-form>
                  <q-input label="Contact Name"></q-input>
                  <q-input label="Email"></q-input>
                  <q-input label="Username"></q-input>
                  <q-input label="Password"></q-input>
                  <q-input label="Verify Password"></q-input>
                  <q-card-actions class="row justify-center q-pt-lg">
                    <q-btn label="Create Account" color="primary"></q-btn>
                  </q-card-actions>
                </q-form>
              </div>
            </q-tab-panel>

            <q-tab-panel name="signIn" class="q-pt-lg q-px-none">
              <div class="text-h5 text-primary">Welcome back!</div>
              <div class="q-py-xs text-italic">
                Enter your username and password below.
              </div>
              <div>
                <q-form>
                  <q-input label="Email"></q-input>
                  <q-input label="Password"></q-input>
                  <q-card-actions class="row justify-center q-pt-lg">
                    <q-btn label="Sign In" color="primary"></q-btn>
                  </q-card-actions>
                </q-form>
              </div>
            </q-tab-panel>

            <q-tab-panel name="benefits" class="q-pt-lg q-px-none">
              <span class="text-h5 text-primary">Advantages of Izzup</span>

              <div class="text-body1">
                <ul>
                  <li class="q-px-sm q-pb-sm">
                    A memorable, yet generic Fediverse address
                    <b><i>@izzup.com</i></b
                    >.
                  </li>
                  <li class="q-pa-sm">
                    Free and easy to use, no membership fees.
                  </li>
                  <li class="q-pa-sm">
                    Developed and supported by open source volunteers.
                  </li>
                  <li class="q-pa-sm">
                    Community managed, the members make all the community
                    decisions.
                  </li>
                  <li class="q-pa-sm">
                    Advanced publishing options:
                    <ul>
                      <li class="q-pa-sm">
                        Create stories and articles with rich media content.
                      </li>
                      <li class="q-pa-sm">
                        List items for sale or in-search-of.
                      </li>
                      <li class="q-pa-sm">
                        Share upcoming events and celebrations.
                      </li>
                      <li class="q-pa-sm">
                        Publish microsites with no programming knowledge.
                      </li>
                      <li class="q-pa-sm">
                        Shared-image editing, involve the community.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Screen } from "quasar";

import Session from "supertokens-web-js/recipe/session";
import { EmailVerificationClaim, verifyEmail } from "supertokens-web-js/recipe/emailverification";

import { useRoute } from "vue-router";

const route = useRoute();



onMounted(async () => {
  //if (await Session.doesSessionExist()) {

    console.log('TEST', await Session.doesSessionExist())
    let validationErrors = await Session.validateClaims();

    console.log('WHAT', EmailVerificationClaim)

    await consumeVerificationCode();

    console.log(validationErrors);
  //}
});

const consumeVerificationCode = async () => {
    try {
        let response = await verifyEmail();
        if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
            // This can happen if the verification code is expired or invalid.
            // You should ask the user to retry
            window.alert("Oops! Seems like the verification link expired. Please try again")
            //window.location.assign("/auth/verify-email") // back to the email sending screen.
        } else {
            // email was verified successfully.
            // window.location.assign("/")
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

const tab = ref("signUp");
</script>

<style lang="scss" scoped></style>
