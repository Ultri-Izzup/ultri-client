<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6 row">
        <q-avatar square>
          <img src="/mastodon/logo.svg" />
        </q-avatar>
        <span class="q-pt-sm q-pl-sm">Mastodon</span>
        <q-space></q-space>
        <span class="q-pt-sm text-weight-bolder text-primary text-italic"
          >Ultri.net</span
        >
      </div>
      <div class="text-center justify-center row">
        <span class="col"></span>
        <!-- <q-btn label="Connect"></q-btn>
        <span class="col-1"></span> -->
        <q-btn
          label="Visit Site"
          color="primary"
          href="https://ultri.net"
        ></q-btn>
        <span class="col"></span>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 row">
        <q-avatar square>
          <img src="/lemmy/logo.svg" />
        </q-avatar>
        <span class="q-pt-sm q-pl-sm">Lemmy</span>
        <q-space></q-space>
        <span class="q-pt-sm text-weight-bolder text-primary text-italic"
          >Ultri.world</span
        >
      </div>
      <div class="text-center justify-center row">
        <span class="col"></span>
        <!-- <q-btn label="Connect"></q-btn>
        <span class="col-1"></span> -->
        <q-btn
          label="Visit Site"
          color="primary"
          href="https://ultri.world"
        ></q-btn>
        <span class="col"></span>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 row">
        <q-avatar square>
          <img src="/firefish/logo.svg" />
        </q-avatar>
        <span class="q-pt-sm q-pl-sm">Firefish</span>
        <q-space></q-space>
        <span class="q-pt-sm text-weight-bolder text-primary text-italic"
          >Izzup.com</span
        >
      </div>
      <div class="text-center justify-center row">
        <span class="col"></span>
        <!--  <q-btn label="Connect"></q-btn>
        <span class="col-1"></span> -->
        <q-btn
          label="Visit Site"
          color="primary"
          href="https://izzup.com"
        ></q-btn>
        <span class="col"></span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import useRealms from "../../composables/realms.js";

const domain = ref();
const username = ref();

const reset = () => {
  domain.value = null;
  username.value = null;
};

// import useContent from "../../composables/content";
// const content = useContent();

const realms = useRealms();
</script>
