<template>
  <q-card flat>
    <q-card-section>
      <div>
        <p class="text-h5">Headless Fediverse</p>
        <p class="text-h6">Keep your interests separate</p>
        <ul>
          <li>Works with any Mastodon client.</li>
          <li>Limit of one username per domain.</li>
          <li>Use the same, or different, username in each domain.</li>
        </ul>
      </div>
    </q-card-section>
    <q-card-actions class="justify-center">
      <q-icon name="img:/gotosocial/logo.svg" size="sm"></q-icon>
      <q-space></q-space>
      <q-icon name="img:/gotosocial/logo.svg" size="lg"></q-icon>
      <q-space></q-space>
      <q-btn label="Join Now" to="/member/fediverse" color="primary" size="xl" rounded></q-btn>
      <q-space></q-space>
      <q-icon name="img:/gotosocial/logo.svg" size="lg"></q-icon>
      <q-space></q-space>
      <q-icon name="img:/gotosocial/logo.svg" size="sm"></q-icon>
    </q-card-actions>
    <q-card-section>
        <p class="text-h6">Fediverse Publishing Domains</p>
        <p class="text-body1">
          <ul>
            <li v-for="(item, key) in realms.realmList" :key="key">
              {{ item.displayDomain }}
            </li>
          </ul>
        </p>
    </q-card-section>
  </q-card>
</template>

<script setup>
import useRealms from "../../composables/realms.js";

import useContent from "../../composables/content";
const content = useContent();

const realms = useRealms();
</script>
