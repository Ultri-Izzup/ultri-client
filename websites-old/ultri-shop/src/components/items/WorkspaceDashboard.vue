<template>
  <q-item clickable v-ripple to="/workspaces">
    <q-item-section avatar>
      <q-icon  name="mdi-folder-star-outline"></q-icon>
    </q-item-section>
    <q-item-section>
      <span class="text-body1">{{ $t('workspace.dashboard.label') }}</span>
    </q-item-section>
  </q-item>
</template>

<script setup>

</script>
