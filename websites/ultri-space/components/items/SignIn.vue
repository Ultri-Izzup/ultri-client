<template>
  <q-item clickable v-ripple @click="userStore.toggleAuthDialog()">
    <q-item-section avatar>
      <q-icon name="mdi-login"></q-icon>
    </q-item-section>
    <q-item-section>
      <span class="text-body1">{{ $t('auth.signIn') }}</span>
    </q-item-section>
  </q-item>
</template>

<script setup>

import { useUserStore } from "../../stores/user.js";

const userStore = useUserStore();

</script>
