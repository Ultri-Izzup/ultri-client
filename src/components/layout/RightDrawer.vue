<template>
  <div>
    <q-list bordered separator>
      <!-- MEMBER DASHBOARD -->
      <member-dashboard></member-dashboard>

      <!-- FEDIVERSE DASHBOARD -->
      <!-- <fediverse-dashboard></fediverse-dashboard> -->

      <!-- CANAVA DASHBOARD -->
      <!-- <canava-dashboard></canava-dashboard> -->

      <!-- WORKSPACES -->
      <!-- <workspace-dashboard></workspace-dashboard> -->

      <!-- DARKMODE -->
      <toggle-dark-mode></toggle-dark-mode>

      <!-- SUPPORT -->
      <community-support></community-support>

      <!-- SIGN IN / SIGN OUT -->
      <sign-out v-if="user.isSignedIn"></sign-out>
      <sign-in v-else></sign-in>
    </q-list>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import ToggleDarkMode from "../items/ToggleDarkMode.vue";
import SignIn from "../items/SignIn.vue";
import SignOut from "../items/SignOut.vue";
import MemberDashboard from "../items/MemberDashboard.vue";
// import CanavaDashboard from "../items/CanavaDashboard.vue";
// import FediverseDashboard from "../items/FediverseDashboard.vue";
// import WorkspaceDashboard from "../items/WorkspaceDashboard.vue";
import CommunitySupport from "../items/CommunitySupport.vue";

import { useUserStore } from "../../stores/user.js";

const user = useUserStore();
</script>
