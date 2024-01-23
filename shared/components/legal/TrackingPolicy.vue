<template>
  <div>
    <div
      :class="
        Screen.lt.md ? ' text-h6' : Screen.lt.lg ? ' text-h5 ' : 'text-h4'
      "
    >
      Tracking Policy
    </div>
    <div>Members wishing to particpate in the governance of the sites must agreee to tracking.</div>
    <div><q-checkbox v-model="trackingPolicyAccepted" label="I consent to the Tracking Policy"></q-checkbox></div>
  </div>
</template>

<script setup>
import { Screen } from "quasar";
import { storeToRefs } from "pinia";

import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const { trackingPolicyAccepted } = storeToRefs(userStore);
</script>
