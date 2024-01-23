<template>
  <q-item clickable v-ripple to="/member/fediverse" :disable="! ui.authenticated">
    <q-item-section avatar>
      <q-icon  name="mdi-earth"></q-icon>
    </q-item-section>
    <q-item-section>
      <span class="text-body1">{{ $t('fediverse.dashboard.label') }}</span>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useUIStore } from "../../stores/ui";

const ui = useUIStore();
</script>
