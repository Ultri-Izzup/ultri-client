<template>
  <div>
    <div
      :class="
        Screen.lt.md ? ' text-h6' : Screen.lt.lg ? ' text-h5 ' : 'text-h4'
      "
    >
      Privacy Policy
    </div>
    <div>Privacy is important</div>
    <div><q-checkbox v-model="privacyPolicyAccepted" label="I consent to the Privacy Policy"></q-checkbox></div>
  </div>
</template>

<script setup>
import { Screen } from "quasar";
import { storeToRefs } from "pinia";

import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const { privacyPolicyAccepted } = storeToRefs(userStore);
</script>
