<template>
  <div>
    <div>
      <span v-if="route.name != 'canvasPage'">
        <span class="q-pr-lg text-body2 text-weight-bold">
          <q-btn-dropdown flat color="primary" label="Products" no-caps>
            <q-list>
              <q-item clickable v-close-popup href="/fediverse">
                <q-item-section>
                  <q-item-label>Fediverse</q-item-label>
                  <q-item-label caption>Fediverse made easy</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup href="/workspaces">
                <q-item-section>
                  <q-item-label>Workspaces</q-item-label>
                  <q-item-label caption>Hybrid data management</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup href="/canava">
                <q-item-section>
                  <q-item-label>Canava</q-item-label>
                  <q-item-label caption>Custom Canvas Tool</q-item-label>
                </q-item-section>
              </q-item>
<!--
              <q-item clickable v-close-popup href="/bord">
                <q-item-section>
                  <q-item-label>Bord</q-item-label>
                  <q-item-label caption>Dashboard Builder</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup href="/vot">
                <q-item-section>
                  <q-item-label>Voto</q-item-label>
                  <q-item-label caption>Voting and Decisions</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup href="/websted">
                <q-item-section>
                  <q-item-label>Websted</q-item-label>
                  <q-item-label caption>Microsite Builder</q-item-label>
                </q-item-section>
              </q-item> -->

            </q-list>
          </q-btn-dropdown>
        </span>
        <span class="q-pr-lg">
          <q-btn-dropdown flat color="primary" label="Editors" no-caps>
            <q-list>
              <q-item clickable v-close-popup href="/editors/markdown">
                <q-item-section>
                  <q-item-label>Markdown</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup href="/editors/json">
                <q-item-section>
                  <q-item-label>JSON</q-item-label>
                </q-item-section>
              </q-item>

              <!-- <q-item clickable v-close-popup href="/editors/json-schema">
                <q-item-section>
                  <q-item-label>JSON Schema</q-item-label>
                </q-item-section>
              </q-item> -->

              <q-item clickable v-close-popup href="/editors/image">
                <q-item-section>
                  <q-item-label>Image</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                tag="a"
                href="/editors/audio"
                target="_new"
              >
                <q-item-section>
                  <q-item-label>Audio</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                tag="a"
                href="/editors/openapi"
                target="_new"
              >
                <q-item-section>
                  <q-item-label>OpenAPI</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </span>

      <span v-if="authStore.isSignedIn">
        <NotificationsButton></NotificationsButton>
        <q-tooltip>{{ $t("notifications.hint") }}</q-tooltip>
      </span>

      <!-- MEMBER BUTTON -->
      <span>
        <MemberButton></MemberButton>
        <q-tooltip>{{ $t("member.hint") }}</q-tooltip>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useColorStore } from "../../stores/color";
import { useAuthStore } from "../../stores/auth";

import MemberButton from "./button/MemberButton.vue";
import NotificationsButton from "./button/NotificationsButton.vue";

const route = useRoute();

// Stores
const colorStore = useColorStore();
const authStore = useAuthStore();

</script>

<style lang="scss"></style>
