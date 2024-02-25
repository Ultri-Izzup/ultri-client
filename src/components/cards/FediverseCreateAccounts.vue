<template>
  <q-card flat>
    <template v-if="user.unclaimedDomains && user.unclaimedDomains.size > 0">
      <q-card-section>
        <div class="text-h6 row">
          <q-avatar square>
            <img src="/gotosocial/logo.svg" />
          </q-avatar>
          <span class="q-pt-sm q-pl-sm">GoToSocial</span>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-px-xs text-h6">Enter a username</div>
        <div class="text-center justify-center row full-width text-h2">
          <label
            class="q-field row full-width no-wrap items-start q-field--standard q-input q-field--float q-field--labeled q-field--with-bottom"
            style="max-width: 20em"
            ><!---->
            <div class="q-field__inner relative-position col self-stretch">
              <div
                class="q-field__control relative-position row full-width no-wrap"
                tabindex="-1"
              >
                <div
                  class="q-field__control-container col relative-position row full-width no-wrap q-anchor--skip"
                >
                  <input
                    class="q-field__native q-placeholder"
                    tabindex="0"
                    aria-label="username"
                    type="text"
                    v-model="username"
                    style="max-width: 20em"
                  />
                  <div
                    class="q-field__label no-pointer-events absolute ellipsis"
                  >
                    username
                  </div>
                </div>
              </div>
              <div v-if="usernameMsg" class="text-negative text-center">
                {{ usernameMsg }}
              </div>
            </div>
            <div class="text-h4 q-pt-md">
              <span v-if="usernameValid" class="text-positive">&#10004;</span>
              <span v-else-if="!usernameValid && username" class="text-negative"
                >&cross;</span
              >
              <span v-else> &nbsp; </span>
            </div>
          </label>
        </div>
        <div v-if="usernameValid" class="q-pt-md">
          <div class="q-px-xs text-h6">Select one or more domains</div>
          <div class="row fit text-body1 q-pt-sm">
            <div
              v-for="[key, item] in user.unclaimedDomains"
              :key="key"
              :class="content.columns() + ' q-pa-sm '"
            >
              <q-checkbox
                v-model="checkboxDoms"
                :val="key"
                :label="item.displayDomain"
                :disable="
                  !usernameValid ||
                  claimedDoms.includes(key) ||
                  exhaustedDoms.includes(key) ||
                  typeof user.fediverseAccounts[key] === 'object'
                "
                :class="
                  claimedDoms.includes(key) ? ' text-strike text-grey-5' : ' '
                "
              ></q-checkbox>
              <div class="text-caption text-center q-pt-none">
                <span v-if="availableDoms.includes(key)" class="text-positive"
                  >Available</span
                >
                <span
                  v-else-if="claimedDoms.includes(key)"
                  class="text-negative text-bold"
                  >Claimed</span
                >
                <span
                  v-else-if="user.fediverseAccounts[key]"
                  class="text-grey-5"
                  >@{{ user.fediverseAccounts[key].username }}@{{ key }}</span
                >
                <span
                  v-else-if="exhaustedDoms.includes(key)"
                  class="text-grey-5"
                  >Existing domain account</span
                >
                <span v-else>&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions
        v-if="username.length > 0"
        class="text-center justify-center"
      >
        <q-btn
          label="Check Availability"
          color="primary"
          @click="checkAvailability"
          size="lg"
          :disable="!usernameValid || !validToCheck"
          class="q-ma-sm"
        ></q-btn>
      </q-card-actions>
      <q-card-actions
        v-if="username.length > 0"
        class="text-center justify-center"
      >
        <q-btn
          label="Claim Username"
          color="primary"
          @click="claimUsername"
          size="lg"
          :disable="!validToClaim"
          class="q-ma-sm"
        ></q-btn>
      </q-card-actions>
      <q-card-section>
        <div class="row full-width">
          <div class="text-h6 full-width text-center">
            Claim your username now!
          </div>
          <!-- {{ claimableDoms }} -->
          <div
            v-for="dom in availableDoms"
            :key="dom"
            class="full-width text-center"
          >
            @{{ username }}@{{ dom }}
          </div>
        </div>
      </q-card-section>
    </template>
    <template v-else>
      <q-card-section>
        <div class="text-h6 row">
          <q-avatar square>
            <img src="/gotosocial/logo.svg" />
          </q-avatar>
          <span class="q-pt-sm q-pl-sm">GoToSocial</span>
          <q-space></q-space>
          <span class="q-pt-md text-caption text-italic">All Claimed</span>
        </div>
        <div class="text-center justify-center row">
          <span class="col"></span>
          <q-btn
            rounded
            label="Manage"
            color="primary"
            @click="emit('useTab', 'manage')"
          ></q-btn>
          <span class="col"></span>
        </div>
      </q-card-section>
    </template>
    <template v-if="username.length < 1">
      <q-separator></q-separator>
      <q-card-section>
        <div class="text-h6 row">
          <q-avatar square>
            <img src="/mastodon/logo.svg" />
          </q-avatar>
          <span class="q-pt-sm q-pl-sm">Mastodon</span>
          <q-space></q-space>
          <span class="q-pt-sm text-weight-bolder text-primary text-italic"
            >Ultri.net</span
          >
        </div>
        <div class="text-center justify-center row">
          <span class="col"></span>
          <q-btn
            rounded
            label="Join"
            color="primary"
            href="https://ultri.net/auth/sign_up"
          ></q-btn>
          <span class="col"></span>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="text-h6 row">
          <q-avatar square>
            <img src="/lemmy/logo.svg" />
          </q-avatar>
          <span class="q-pt-sm q-pl-sm">Lemmy</span>
          <q-space></q-space>
          <span class="q-pt-sm text-weight-bolder text-primary text-italic"
            >Ultri.world</span
          >
        </div>
        <div class="text-center justify-center row">
          <span class="col"></span>
          <!-- <q-btn label="Connect"></q-btn>
        <span class="col-1"></span> -->
          <q-btn
            rounded
            label="Join"
            color="primary"
            href="https://ultri.world/signup"
          ></q-btn>
          <span class="col"></span>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="text-h6 row">
          <q-avatar square>
            <img src="/firefish/logo.svg" />
          </q-avatar>
          <span class="q-pt-sm q-pl-sm">Firefish</span>
          <q-space></q-space>
          <span class="q-pt-sm text-weight-bolder text-primary text-italic"
            >Izzup.com</span
          >
        </div>
        <div class="text-center justify-center row">
          <span class="col"></span>
          <!--  <q-btn label="Connect"></q-btn>
        <span class="col-1"></span> -->
          <q-btn
            rounded
            label="Join"
            color="primary"
            href="https://izzup.com"
          ></q-btn>
          <span class="col"></span>
        </div>
      </q-card-section>
    </template>
  </q-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import useRealms from "../../composables/realms.js";

import useContent from "../../composables/content";

import UIn from "../input/UIn.vue";

import { useUserStore } from "../../stores/user";

const emit = defineEmits(["useTab"]);

const user = useUserStore();

const checkboxDoms = ref([]);
const availableDoms = ref([]);
const claimedDoms = ref([]);
const exhaustedDoms = ref([]);
const username = ref("");
const usernameValid = ref(false);
const usernameMsg = ref(null);
const usernameMod = ref(false);

const content = useContent();

const reset = () => {
  checkboxDoms.value = [];
  availableDoms.value = [];
  claimedDoms.value = [];
  exhaustedDoms.value = [];
  username.value = null;
  usernameValid.value = false;
  usernameMsg.value = null;
  usernameMod.value = false;
};

const realms = useRealms();

const checkAvailability = async () => {
  const checkResult = await user.fediverseAvailability(
    username.value,
    checkboxDoms.value
  );
  console.log("CHECK AVAILABILITY RESULT", checkResult);

  availableDoms.value = checkResult.domains.available;
  claimedDoms.value = [
    ...checkResult.domains.usernameClaimed,
    ...claimedDoms.value,
  ];
  exhaustedDoms.value = [
    ...checkResult.domains.realmExhausted,
    ...exhaustedDoms.value,
  ];

  // Uncheck invalid domains
  // checkboxDoms.value = [...availableDoms.value];
};

const claimableDoms = computed(() => {
  return availableDoms.value.filter((x) => checkboxDoms.value.includes(x));
});

const validToCheck = computed(() => {
  // username is valid and at least one checkbox domain has unknown availability
  return (
    usernameValid.value &&
    checkboxDoms.value.length > 0 &&
    !checkboxDoms.value.every(
      (val) =>
        availableDoms.value.includes(val) || claimedDoms.value.includes(val)
    )
  );
});

const validToClaim = computed(() => {
  return (
    usernameValid.value && claimableDoms.value.length > 0 && !validToCheck.value
  );
});

const claimUsername = async () => {
  // Submit domains that are verified as available and are still checked.
  const claimResult = await user.claimUsername(
    username.value,
    claimableDoms.value
  );
  console.log("CLAIM USERNAME RESULT", claimResult);

  if (claimResult.domains.successfulClaims.length > 0) {
    checkboxDoms.value = [];
    availableDoms.value = [];
    claimedDoms.value = [];
    exhaustedDoms.value = [];
  }
  emit("useTab", "manage");
};

watch(
  username,
  (newVal, oldVal) => {
    console.log("CHANGING USERNAME FROM ", oldVal, " TO ", newVal);
    availableDoms.value = [];
    claimedDoms.value = [];
    exhaustedDoms.value = [];
    usernameValid.value = user.validateUsername(newVal);
    const lower = newVal.toLowerCase();
    if (newVal != lower) {
      usernameMsg.value = "no UPPERCASE allowed";
      usernameMod.value = true;
      username.value = lower;
    } else if (!/^[a-z0-9_]*$/.test(newVal)) {
      usernameMsg.value = "only lowercase, digits and underscore ";
      usernameMod.value = true;
      username.value = oldVal;
    } else if (newVal.length < 3) {
      usernameMsg.value = "minimum 3 characters";
    } else if (newVal.length > 20) {
      usernameMsg.value = "maximum 20 characters";
    } else {
      if (!usernameMod.value) {
        usernameMsg.value = "";
      }
      usernameMod.value = false;
    }
  },
  { flush: true }
);
</script>
