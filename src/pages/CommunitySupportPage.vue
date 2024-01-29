<template>
  <q-page :class="page.flexTopCenter()">
    <q-card class="fit" :style="content.minMaxWidth()">
      <q-card-section>
        <span class="text-h2">Community Support</span>
      </q-card-section>
      <q-card-section>
        <div>Support is available from our Community Support Team.</div>
        <ol>
          <li>Join <a href="https://ultri.world/signup">Ultri.world</a></li>
          <li>
            Post your question in
            <a href="https://ultri.world/c/support">Community Support</a>
          </li>
        </ol>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn
          href="https://ultri.world/c/community_support"
          label="Ask Community"
          color="primary"
          no-caps
          v-ripple
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import usePage from "../composables/page";
import useContent from "../composables/content";

const page = usePage();
const content = useContent();
</script>
