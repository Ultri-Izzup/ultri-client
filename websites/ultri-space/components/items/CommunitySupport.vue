<template>
  <q-item clickable v-ripple to="/community/support">
    <q-item-section avatar>
      <q-icon  name="mdi-lifebuoy"></q-icon>
    </q-item-section>
    <q-item-section>
      <span class="text-body1">{{ $t('communitySupport.label') }}</span>
    </q-item-section>
  </q-item>
</template>

<script setup>
// import { useUIStore } from "../../stores/ui";

// const ui = useUIStore();
</script>
