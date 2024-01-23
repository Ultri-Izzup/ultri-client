<template>
  <q-item clickable v-ripple @click="uiStore.toggleDarkMode()">
    <q-item-section avatar>
      <q-icon name="mdi-theme-light-dark"></q-icon>
    </q-item-section>
    <q-item-section>
      <span v-if="darkMode" class="text-body1">Switch to light mode</span>
      <span v-else class="text-body1">Switch to dark mode</span>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useUIStore } from "../../stores/ui";

const uiStore = useUIStore();
const { darkMode } = storeToRefs(uiStore);
</script>
