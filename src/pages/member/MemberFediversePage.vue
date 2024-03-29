<template>
  <q-page :class="page.topCenter()">
    <div class="full-width text-center text-h2 q-pb-md">Fediverse Accounts</div>
    <div class="row full-width justify-center">
      <q-card
        flat
        class="q-pa-none full-width"
        :style="content.minMaxReadableWidth()"
      >
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <!-- <q-tab name="overview" label="Overview"></q-tab> -->
          <q-tab name="manage" label="Manage"></q-tab>
          <q-tab name="create" label="Create"></q-tab>
        </q-tabs>

        <q-separator></q-separator>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="manage" class="q-px-none">
            <FediverseManageAccounts
              @use-tab="switchTab"
            ></FediverseManageAccounts>
          </q-tab-panel>

          <q-tab-panel name="create" class="q-px-none">
            <FediverseCreateAccounts
              @use-tab="switchTab"
            ></FediverseCreateAccounts>
          </q-tab-panel>
        </q-tab-panels>

        <!-- <FediverseAccounts :class="content.adjustedPy()"></FediverseAccounts> -->
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { storeToRefs } from "pinia";
import { useMeta } from "quasar";

import { useUserStore } from "../../stores/user";

import usePage from "../../composables/page";
import useContent from "../../composables/content";

import FediverseCreateAccounts from "../../components/cards/FediverseCreateAccounts.vue";
import FediverseManageAccounts from "../../components/cards/FediverseManageAccounts.vue";

const user = useUserStore();
// const { fediverseAccounts } = storeToRefs(user);

const page = usePage();
const content = useContent();

const metaData = {
  // sets document title
  title: "Member Fediverse Accounts",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Ultri`,

  // meta tags
  meta: {
    description: { name: "description", content: "Page 1" },
    keywords: { name: "keywords", content: "Quasar website" },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - My Website`;
      },
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};

useMeta(metaData);

const tab = ref("create");

const switchTab = (newTab) => {
  tab.value = newTab;
};

onMounted(() => {
  user.getFediverseAccounts();
  if (user.unclaimedDomains.size < 1) {
    tab.value = "manage";
  }
});
</script>
