<template>
  <q-item clickable v-ripple to="/member/dashboard">
    <q-item-section avatar>
      <q-icon  name="mdi-view-dashboard"></q-icon>
    </q-item-section>
    <q-item-section>
      <span class="text-body1">{{ $t('dashboard.label') }}</span>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useUIStore } from "../../stores/ui";

const ui = useUIStore();
</script>
