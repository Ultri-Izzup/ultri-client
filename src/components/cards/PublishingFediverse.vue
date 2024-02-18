<template>
  <q-card flat class="row full-width">
    <q-card-section>
      <div class="row">
        <p class="text-h5 full-width">Publishing Fediverse </p>
        <div class="text-body1 q-pt-md full-width">
          <p class="row justify-center">
            Access these Fediverse domains using a third-party client.
          </p>
          <div class="row justify-center">
            <ul>
          <li>Works with many Mastodon clients.</li>
          <li>Limit of one username per domain.</li>
          <li>Use the same, or different, username in each domain.</li>
        </ul>
      </div>
      </div>
      </div>
    </q-card-section>
    <q-card-actions class="justify-center full-width">
      <q-space></q-space>
      <q-btn icon-right="img:/gotosocial/logo.svg" label="Join Now" to="/member/fediverse" color="primary" size="xl" rounded></q-btn>
      <q-space></q-space>
    </q-card-actions>
    <q-card-section class="justify-center full-width">
        <p class="text-h6 full-width text-center">Fediverse Publishing Domains</p>
        <p class="row justify-center text-body1 full-width">
          <ul>
            <li v-for="(item, key) in realms.realmMap" :key="key">
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
