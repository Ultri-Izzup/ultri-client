<template>
  <q-header reveal bordered class="bg-primary text-white">
    <q-toolbar>
      <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

      <q-toolbar-title>
        <span class="text-h4 text-italic text-weight-bold">{{
          $t("site.name")
        }}</span>
      </q-toolbar-title>

      <q-space></q-space>

      <HeaderLinks></HeaderLinks>

      <q-btn
        @click="ui.toggleRightDrawer"
        :color="ui.authenticated ? 'light-green' : ''"
        dense
        flat
        round
        icon="mdi-account"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUIStore } from "../../stores/ui";

import HeaderLinks from "./header/HeaderLinks.vue";

const ui = useUIStore();
const { rightDrawerOpen } = storeToRefs(ui);
</script>
