<template>
  <q-item clickable v-ripple @click="signOut()">
    <q-item-section avatar>
      <q-icon name="mdi-logout"></q-icon>
    </q-item-section>
    <q-item-section>
      <span class="text-body1">{{ $t('auth.signOut') }}</span>
    </q-item-section>
  </q-item>
</template>

<script setup>

import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user.js";

const user = useUserStore();

const router = useRouter()

const signOut = async () => {
  await user.signOut();
  router.push('/')
}

</script>
