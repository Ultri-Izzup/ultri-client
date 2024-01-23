<template>
  <q-layout view="hHh lpR fFf" class="overflow-hidden-y">
    <page-header></page-header>

    <!-- <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
    </q-drawer> -->

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <right-drawer></right-drawer>
    </q-drawer>

    <q-page-container class="col">

        <div  v-if="showConfetti" class="row fit justify-center">
          <!-- <q-btn @click="ui.explodeConfetti()" label="Celebrate!"></q-btn> -->
          <ConfettiExplosion v-if="showConfetti"
            :stageHeight="$q.screen.height - 100"
            :stageWidth="$q.screen.width - 100" />
        </div>


      <router-view />
    </q-page-container>

    <policy-dialog v-model="policyDialogVisible"></policy-dialog>
    <auth-dialog v-model="authDialogVisible"></auth-dialog>

    <page-footer></page-footer>
  </q-layout>
</template>

<script setup>
import { storeToRefs } from "pinia";
import ConfettiExplosion from "vue-confetti-explosion";

import { useQuasar } from "quasar";

import PageHeader from "../components/layout/PageHeader.vue";
import PageFooter from "../components/layout/PageFooter.vue";
import RightDrawer from "../components/layout/RightDrawer.vue";

// GLOBAL DIALOGS
import AuthDialog from "../components/dialogs/AuthDialog.vue";
import PolicyDialog from "../components/dialogs/PolicyDialog.vue";

import { useUIStore } from "../stores/ui";
import { useUserStore } from "../stores/user";

const $q = useQuasar();

const ui = useUIStore();
const { rightDrawerOpen, policyDialogVisible, showConfetti } = storeToRefs(ui);

const userStore = useUserStore();
const { authDialogVisible } = storeToRefs(userStore);
</script>
