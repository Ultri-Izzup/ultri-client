<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6 row">
        <q-avatar square>
          <img src="/gotosocial/logo.svg" />
        </q-avatar>
        <span class="q-pt-sm q-pl-sm">GoToSocial</span>
      </div>
      <div class="q-px-xs q-pt-md text-h6">Enter a username</div>
      <div class="text-center justify-center row full-width text-h2">
        <!-- <span class="q-pt-md q-pr-xs text-h5"> @ </span> -->
        <span
          ><q-input
            v-model="username"
            label="username"
            class="text-h5"
          ></q-input
        ></span>
        <div
          :class="
            usernameMsgColor +
            ' row full-width text-caption text-center justify-center'
          "
        >
          <span v-if="usernameValid">&#10004;</span>
          <span v-if="!usernameValid && usernameMsg">&cross;</span>
          &nbsp;{{ usernameMsg }}
        </div>
      </div>
      <div v-if="usernameValid" class="q-pt-md">
        <div class="q-px-xs text-h6">Select one or more domains</div>
        <div class="row fit text-body1 q-pt-sm">
          <div
            v-for="(item, key) in realms.realmList"
            :key="key"
            :class="content.columns() + ' q-pa-sm '"
          >
            <q-checkbox
              v-model="checkDoms"
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
              <span v-else-if="user.fediverseAccounts[key]" class="text-grey-5"
                >@{{ user.fediverseAccounts[key].username }}@{{ key }}</span
              >
              <span v-else-if="exhaustedDoms.includes(key)" class="text-grey-5"
                >Existing domain account</span
              >
              <span v-else>&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions v-if="usernameValid" class="text-center justify-center">
      <q-btn
        label="Check Availability"
        color="primary"
        @click="checkAvailability"
        size="lg"
        :disable="!usernameValid || validToClaim"
        class="q-ma-sm"
      ></q-btn>
      <!-- <q-btn
        label="Claim Username"
        color="primary"
        @click="claimUsername"
        size="lg"
        :disable="!validToClaim"
        class="q-ma-sm"
      ></q-btn> -->
    </q-card-actions>
    <q-card-actions v-if="usernameValid" class="text-center justify-center">
      <!--
      <q-btn
        label="Check Availability"
        color="primary"
        @click="checkAvailability"
        size="lg"
        :disable="!usernameValid || validToClaim"
        class="q-ma-sm"
      ></q-btn>
      -->
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
        <div
          v-for="dom in availableDoms"
          :key="dom"
          class="full-width text-center"
        >
          @{{ username }}@{{ dom }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import useRealms from "../../composables/realms.js";

import useContent from "../../composables/content";

import { useUserStore } from "../../stores/user";

const user = useUserStore();

const checkDoms = ref([]);
const availableDoms = ref([]);
const claimedDoms = ref([]);
const exhaustedDoms = ref([]);
const username = ref();
const usernameValid = ref(false);
const usernameMsg = ref(null);
const usernameMsgColor = ref(" text-negative ");

const validToClaim = computed(() => {
  return (
    usernameValid.value &&
    availableDoms.value.length > 0 &&
    checkDoms.value.length > 0 &&
    checkDoms.value.every((val) => availableDoms.value.includes(val))
  );
});

const content = useContent();

const reset = () => {
  checkDoms.value = [];
  availableDoms.value = [];
  claimedDoms.value = [];
  exhaustedDoms.value = [];
  username.value = null;
  usernameValid.value = false;
  usernameMsg.value = null;
};

const realms = useRealms();

const checkAvailability = async () => {
  const checkResult = await user.fediverseAvailability(
    username.value,
    checkDoms.value
  );
  console.log("CHECK AVAILABILITY RESULT", checkResult);

  availableDoms.value = checkResult.domains.available;
  claimedDoms.value = checkResult.domains.usernameClaimed;
  exhaustedDoms.value = checkResult.domains.realmExhausted;

  // Uncheck invalid domains
  checkDoms.value = [...availableDoms.value];
};

const claimUsername = async () => {
  const checkResult = await user.fediverseAvailability(
    username.value,
    checkDoms.value
  );
  console.log("CHECK AVAILABILITY RESULT", checkResult);

  availableDoms.value = checkResult.domains.available;
  claimedDoms.value = checkResult.domains.usernameClaimed;
  exhaustedDoms.value = checkResult.domains.realmExhausted;
};

watch(username, (newVal, oldVal) => {
  availableDoms.value = [];
  claimedDoms.value = [];
  exhaustedDoms.value = [];
  usernameValid.value = user.validateUsername(newVal);
  if (!/^[a-z0-9_]*$/.test(newVal)) {
    usernameMsgColor.value = " text-negative ";
    usernameMsg.value = "lowercase letters, digits and underscore allowed";
  } else if (newVal.length < 3) {
    usernameMsgColor.value = " text-negative ";
    usernameMsg.value = "minimum 3 characters";
  } else if (newVal.length > 20) {
    usernameMsgColor.value = " text-negative ";
    usernameMsg.value = "maximum 20 characters";
  } else {
    usernameMsg.value = "valid";
    usernameMsgColor.value = " text-positive ";
  }
});
</script>
