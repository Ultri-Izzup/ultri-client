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
      <div class="q-pt-xl" :disable="!usernameValid">
        <div class="q-px-xs text-h6" :disable="!usernameValid">
          Select one or more domains
        </div>
        <div class="row fit text-body1 q-pt-sm">
          <div
            v-for="(item, key) in realms.realmList"
            :key="key"
            :class="content.columns() + ' q-pa-sm'"
          >
            <q-checkbox
              v-model="checkDoms"
              :val="key"
              :label="item.displayDomain"
              :disable="!usernameValid"
            ></q-checkbox>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="text-center justify-center">
      <q-btn
        label="Check Availability"
        color="primary"
        @click="checkAvailability"
        size="lg"
        :disable="!usernameValid"
      ></q-btn>
      <q-btn
        label="Claim Username"
        color="primary"
        @click="claimUsername"
        size="lg"
        :disable="!validToClaim"
      ></q-btn>
    </q-card-actions>
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
  console.log("NEW", newVal);
  console.log("OLD", oldVal);
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
    usernameMsg.value = "valid username";
    usernameMsgColor.value = " text-positive ";
  }
});
</script>
