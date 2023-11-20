<template>
  <q-card flat>
    <q-card-section :class="Screen.lt.md ? 'q-pa-xs' : 'q-pa-lg'">
      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="username">
          <q-card flat>
            <q-card-section class="text-h4 text-weight-bolder text-italic">
              Choose username
            </q-card-section>
            <q-card-section>

              <q-input
                :label="$t('auth.username.label')"
                class="text-h6"
                v-model="username"
                outlined
              ></q-input>

            </q-card-section>
            <q-card-section>

              <q-select
                :label="$t('auth.domain.label')"
                class="text-h6"
                v-model="domain"
                :options="availableDomains"
                option-value="domain"
                option-label="domDisplay"
                outlined
              ></q-select>

              <!-- <div class="q-pt-sm text-grey-7">Your first Fediverse accoount </div> -->
              </q-card-section>
            <q-card-actions class="justify-center">
              <q-btn
                :label="$t('auth.checkUsernameAvailability.label')"
                no-caps
                color="primary"
                size="xl"
                class="text-weight-bold"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="password">
          <q-card flat>
            <q-card-section class="text-h4 text-weight-bolder text-italic">
              Set a secure password
            </q-card-section>
            <q-card-section>
              <q-input
                :label="$t('auth.passcode.label')"
                class="text-h6"
                v-model="password"
                outlined
              ></q-input>
            </q-card-section>
            <q-card-actions class="justify-center">
              <q-btn
                :label="$t('auth.signIn.label')"
                no-caps
                color="primary"
                size="xl"
                class="text-weight-bold"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { Screen } from "quasar";


import { useAuthStore } from "../../stores/auth";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const panel = ref("username");

const username = ref(null);
const validUsername = ref(true);
const usernameSubmitted = ref(false);

const domain = ref('Izzup.com');

const password = ref(null);
const validPassword = ref(true);
const passwordError = ref(null);

const domains = [
  {
    domain: 'izzup.com',
    domDisplay: 'Izzup.com'
  },
  {
    domain: 'opensociocracy.org',
    domDisplay: 'OpenSociocracy.org'
  },
  {
    domain: 'cycleopedia.org',
    domDisplay: 'CycleOpedia.org'
  },
  {
    domain: 'expertgaming.com',
    domDisplay: 'ExpertGaming.com'
  },
  {
    domain: 'homebrewingbeer.com',
    domDisplay: 'HomebrewingBeer.com'
  },
  {
    domain: 'sportsword.com',
    domDisplay: 'SportsWord.com'
  },
  {
    domain: 'usevue.org',
    domDisplay: 'useVue.org'
  },
  {
    domain: 'maxpets.com',
    domDisplay: 'MaxPets.com'
  },
  {
    domain: 'bikemechanic.info',
    domDisplay: 'BikeMechanic.Info'
  },
  {
    domain: 'brewmasters.us',
    domDisplay: 'Brewmasters.us'
  },
  {
    domain: 'collectorsword.com',
    domDisplay: 'CollectorsWord.com'
  },
  {
    domain: 'maxrecipes.com',
    domDisplay: 'MaxRecipes.com'
  },
  {
    domain: 'ezvegetarian.com',
    domDisplay: 'EZVegetarian.com'
  }
]

const usernamePasswordSubmitted = ref(false);

const auth = useAuthStore();

const availableDomains = computed(() => {
  // if(!auth.hasBaseAccount) {
  //   return
  //   [
  //     {
  //       domain: 'izzup.com',
  //       domDisplay: 'Izzup.com'
  //     }
  //   ];
  // }
  return domains;
})


// const onEmailSubmit = async () => {
//   if (auth.validateEmail(email.value)) {

//     emailSubmitted.value = true;
//     await auth.passwordlessRequest(email.value);
//     panel.value = 'passcode';
//   } else {
//     validEmail.value = false;
//   }
// };

// const onPasscodeSubmit = async () => {
//   if (auth.validatePasscode(passcode.value)) {

//     passcodeSubmitted.value = true;

//     try {
//     const result = await auth.passwordlessOTP(passcode.value);
//     console.log(result);

//     switch (result.status) {
//       case "OK":
//         console.log(auth.$state)
//         if(auth.isNewMember) {
//           panel.value = "username"
//         }
//         break;

//       case "INCORRECT_USER_INPUT_CODE_ERROR":
//         passcodeError.value =
//           t("auth.error.INCORRECT_USER_INPUT_CODE_ERROR");
//         passcodeSubmitted.value = false;
//         break;

//       case "EXPIRED_USER_INPUT_CODE_ERROR":
//         passcodeError.value = t("auth.error.EXPIRED_USER_INPUT_CODE_ERROR");
//         passcodeSubmitted.value = false;
//         break;

//       case "LOGIN_FAILED_ERROR":
//         passcodeError.value = null;
//         passcodeSubmitted.value = false;
//         emailSubmitted.value = false;
//         panel.value = "email";
//         break;
//     }
//   } catch (e) {
//     console.error(e);
//   }


//   } else {
//     validEmail.value = false;
//   }
// };

// watch(email, (newVal, oldVal) => {
//   if(!validEmail.value) {
//     validEmail.value = auth.validateEmail(newVal);
//   }
// })

// watch(passcode, (newVal, oldVal) => {
//   if(!validPasscode.value) {
//     validPasscode.value = auth.validatePasscode(newVal);
//   }
// })
</script>
