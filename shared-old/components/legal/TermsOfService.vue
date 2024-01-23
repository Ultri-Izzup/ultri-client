<template>
  <div>
    <div
      :class="
        Screen.lt.md ? ' text-h6' : Screen.lt.lg ? ' text-h5 ' : 'text-h4'
      "
    >
      Terms of Service
    </div>
    <div>We promise nothing, you promise to not be a bad actor.</div>
    <div><q-checkbox v-model="termsOfServiceAccepted" label="I consent to the Terms of Service"></q-checkbox></div>
  </div>
</template>

<script setup>
import { Screen } from "quasar";
import { storeToRefs } from "pinia";

import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const { termsOfServiceAccepted } = storeToRefs(userStore);
</script>
