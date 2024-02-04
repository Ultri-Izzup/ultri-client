<template>
  <q-page :class="page.topCenter()">
    <div class="row full-width justify-center text-center">
      <AboutUltri></AboutUltri>
    </div>
  </q-page>
</template>

<script setup>
import usePage from "../composables/page";
import AboutUltri from "../components/cards/AboutUltri.vue";

const page = usePage();
</script>
