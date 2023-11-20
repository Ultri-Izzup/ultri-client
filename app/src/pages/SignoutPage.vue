<template>
  <q-page class="flex flex-center">
    Signing out...
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const router = useRouter();

auth.signOut();
router.push("/")
</script>
