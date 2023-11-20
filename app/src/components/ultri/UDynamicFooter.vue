<template>
  <q-footer>
    <q-toolbar
      class="toolbar"
    >
      <div class="row full-width">
        <!-- XS SCREEN -->
        <div class="xs row full-width">
          <div class="col">
            <q-btn
              size="md"
              dense
              flat
              no-caps
              icon="mdi-cookie"
              color="white"
              @click="webConsentStore.triggerDialog(false)"
            />
          </div>
          <div class="col q-pt-xs">
            <router-link
              to="/legal"
              class="toolbar-text-link q-pl-md"
              >{{ $t("nav.legal", "Legal") }}</router-link
            >
<!--
            <router-link
              to="/about"
              class="toolbar-text-link q-pl-md"
              >{{ $t("nav.about", "About") }}</router-link
            > -->
          </div>
          <div class="col q-pt-xs text-right text-primary">
            <q-toggle
              v-model="colorStore.darkMode"
              icon="mdi-theme-light-dark"
              dense
              size="md"
              color="grey-6"
            ></q-toggle>
            <router-link to="/" class="toolbar-text-link" color="primary">
              &copy;Izzup
            </router-link>
          </div>
        </div>

        <!-- LARGER THAN XS -->
        <div class="gt-xs row full-width">
          <q-btn
            size="md"
            dense
            flat
            no-caps
            :label="$t('nav.cookies', 'Cookies')"
            icon="mdi-cookie"
            color="white"
            @click="webConsentStore.triggerDialog(false)"
          />
          <q-space />
          <div class="col q-pt-xs text-right">
            <router-link to="/legal" class="toolbar-text-link" >{{
              $t("nav.legal", "Legal")
            }}</router-link>
          </div>
          <!-- <div class="col q-pt-xs text-right">
            <router-link to="/about" class="toolbar-text-link">{{
              $t("nav.about", "About")
            }}</router-link>
          </div> -->
          <div class="col q-pt-xs text-right">
            <a
              href="https://www.linkedin.com/company/ultri/"
              class="toolbar-text-link"
              >LinkedIn</a
            >
          </div>
          <div class="col q-pt-xs text-right text-primary">
            <q-toggle
              v-model="colorStore.darkMode"
              icon="mdi-theme-light-dark"
              dense
              size="md"
              color="grey-6"
            ><q-tooltip>Dark</q-tooltip></q-toggle>

            <router-link to="/" class="toolbar-text-link">
              &copy;2023 Izzup
            </router-link>
          </div>
        </div>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { useRoute } from "vue-router";

import { useColorStore } from "../../stores/color";
import { useWebConsentStore } from "../../stores/webConsent";

const route = useRoute();

const webConsentStore = useWebConsentStore();
const colorStore = useColorStore();
</script>

<style lang="scss"></style>
