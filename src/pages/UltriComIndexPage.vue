<template>
  <q-page class="flex flex-center page-text">
    <div class="gt-sm row full-width justify-center text-h2 text-bold">
      {{ $t("homepage.headline2") }}
    </div>
    <div
      class="row full-width text-h1 text-center justify-center text-weight-bold"
    >
      {{ $t("homepage.headline") }}
    </div>
    <q-btn
      size="xl"
      rounded
      label="Fediverse Access"
      class="q-pa-lg text-weight-bolder"
      color="primary"
      to="/fediverse"
    ></q-btn>
    <div
      class="gt-sm row full-width text-h3 text-center justify-center text-italic"
    >
      {{ $t("homepage.headline3_1") }}
      <br />
      {{ $t("homepage.headline3_2") }}
      <br />
      {{ $t("homepage.headline3_4") }}
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
