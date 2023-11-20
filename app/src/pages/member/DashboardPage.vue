<template>
  <q-page :class="Screen.lt.md ? 'flex' : 'flex justify-center q-pt-md'">
    <div :style="Screen.lt.md ? 'width: 100%' : 'width: 80%; max-width: 900px'">
      <q-card
        :class="Screen.lt.sm ? 'q-mx-xs' : Screen.gt.md ? 'q-mx-lg' : 'q-mx-sm q-pa-md'"
      >
        <q-card-section>
          <div :class="'text-center ' +
              (Screen.lt.sm
                ? ' text-h6 q-pt-xs q-pb-sm '
                : Screen.gt.md
                ? ' text-h3 text-weight-medium q-pt-md q-pb-lg  '
                : ' text-h5 text-weight-medium  q-pt-sm q-pb-md ') ">
                {{auth.email}}
          </div>
          <div
            :class="
              'text-weight-bold text-primary ' +
              (Screen.lt.sm
                ? ' text-h6 q-pt-xs q-pb-sm '
                : Screen.gt.md
                ? ' text-h4 q-pt-md q-pb-lg  '
                : ' text-h5  q-pt-sm q-pb-md ')
            "
          >
            Claimed Accounts
          </div>
          <div>
            <q-list v-for="[key, account] in accounts" :key="key" bordered>
              <q-item
                clickable
                v-ripple
                :to="'/account/' + auth.realmFormat(account.domain)"
              >
                <q-item-section class="text-body1"
                  >{{ account.username }} @ {{ account.domain }}</q-item-section
                >
              </q-item>
            </q-list>
          </div>
        </q-card-section>
        <q-card-section v-if="availableDomains.length > 0">
          <div
            :class="
              'text-weight-bold text-primary ' +
              (Screen.lt.sm
                ? ' text-h6 '
                : Screen.gt.md
                ? ' text-h4 '
                : ' text-h5 ')
            "
          >
            Unclaimed Domains
          </div>
          <div v-if="available.length == 0 && unavailable.length == 0"
              :class="
              'text-body1 ' +
              (Screen.lt.sm
                ? ' q-py-xs '
                : Screen.gt.md
                ? ' q-py-md '
                : ' q-py-sm ')
            ">
            Check username availability in one or more domains.
          </div>
          <div v-if="unavailable.length > 0"
              :class="
              'text-body1 text-negative ' +
              (Screen.lt.sm
                ? ' q-py-xs '
                : Screen.gt.md
                ? ' q-py-md '
                : ' q-py-sm ')
            ">
            <div>The username is not available in:</div>
            <div class="text-weight-medium">{{unavailable.toLocaleString().replaceAll(',', ', ')}}</div>

          </div>

          <div class="row full-width justify-center q-pb-lg">
            <q-input label="username" v-model="username" style="width: 95%"></q-input>
            <div v-if="error" class="q-pa-xs text-primary"><span class="text-bold">Error:</span> {{ $t('error.' + error) }} <span v-if="error === 'invalid_characters'">(<span class="text-weight-bolder">{{ showInvalid(username)}}</span>)</span></div>
          </div>

          <div class="row full-width q-px-lg">
          <div v-for="domain in availableDomains" :key="domain.value" :class="Screen.lt.sm ? 'col-12' : 'col-6'">
            <q-checkbox v-model="newDomains" :val="domain.value" :label="domain.label" :class="unavailable.includes(domain.value) ? ' text-strike text-negative' : ''" >
              <q-icon v-if="unavailable.includes(domain.value)" name="mdi-account-alert" class="q-pl-xs"></q-icon>
              <q-icon v-if="available.includes(domain.value)" name="mdi-account-check" class="q-pl-xs"></q-icon>
            </q-checkbox>
          </div>
        </div>
        </q-card-section>
        <q-card-actions v-if="availableDomains.length > 0" class="justify-center">
          <q-btn v-if="(
            available.length == 0 && unavailable.length == 0  && availableDomains.length > 0)
            ||
            (available.length < newDomains.length)" @click="checkAvailability" label="Check Availability" color="primary" size="lg"></q-btn>
          <q-btn v-else @click="claimAvailable" label="Claim Selected" color="primary" size="lg"></q-btn>
        </q-card-actions>
        <q-card-section v-if="availableDomains.length === 0" class="text-center">
          <div class="text-h5">All domain accounts claimed.</div>
          <img src="../../assets/trophy.png" />
          <div class="text-h4">Thank you!</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Screen } from "quasar";

import { Fireworks } from "@fireworks-js/vue";

import { useAuthStore } from "../../stores/auth";

import UPasswordlessFlow from "../../components/ultri/UPasswordlessFlow.vue";
// import UFediverseFlow from "../../components/ultri/UFediverseFlow.vue";

const auth = useAuthStore();

const router = useRouter();

const { accounts, isSignedIn, welcomeAccount, showWelcome, availableDomains } =
  storeToRefs(auth);

const accountDomain = ref(null);

const error = ref(null);

const username = ref(null);

const options = ref({ opacity: 0.5 });

const newDomains = ref([]);
const unavailable = ref([]);
const available = ref([]);

const regex = /^[a-z0-9_]*$/

const showInvalid = (usernameString) => {
  const splitStr = usernameString.split('');
  const badChars = splitStr.filter((char)=> ! regex.test(char));
  const uniq = new Set(badChars);
  const uniqArr = [...uniq]
  return uniqArr.join(', ');
}

const checkAvailability = async () => {
  console.log(newDomains.value);
  console.log(username.value);
  error.value = null;
  const result = await auth.checkAvailabilityMulti(username.value, newDomains.value);
  if(result.status == "OK") {
    newDomains.value = result.available;
    available.value = result.available;
    unavailable.value = result.unavailable;
  }
  if(result.status == 'ERROR') {
    error.value = result.message;
  }
}

const claimAvailable = async () => {
  console.log(newDomains.value);
  console.log(username.value);
  error.value = null;
  const result = await auth.claimUsernameMulti(username.value, newDomains.value);
  if(result.status == "OK") {
    newDomains.value = [],
    available.value = [],
    unavailable.value = []
    username.value = null;
  }
  if(result.status == 'ERROR') {
    error.value = result.message;
  }
}

const closeFireworks = (toRoute) => {
  welcomeAccount.value = null;
  router.push(toRoute);
};

watch((username), (newVal, oldVal) => {
  available.value = [],
  unavailable.value = []
})
</script>
