<template>
  <div>
    <div
      :class="
        Screen.lt.md ? ' text-h6' : Screen.lt.lg ? ' text-h5 ' : 'text-h4'
      "
    >
      Cookie Policy
    </div>
    <div>Chocolate Chip is best</div>
    <div><q-checkbox v-model="reqCookiesAccepted" label="I consent to the REQUIRED cookies"></q-checkbox></div>
    <div><q-checkbox v-model="extTrackingAccepted" label="I consent to ALL cookies"></q-checkbox></div>
  </div>
</template>

<script setup>
import { Screen } from "quasar";
import { storeToRefs } from "pinia";

import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const { reqCookiesAccepted, extTrackingAccepted } = storeToRefs(userStore);
</script>
