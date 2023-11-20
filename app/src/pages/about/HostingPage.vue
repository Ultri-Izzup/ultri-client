<template>
  <q-page :class="Screen.lt.md ? 'flex' : 'flex justify-center  q-pt-md'">
    <div :style="Screen.lt.md ? 'width: 100%' : 'width: 80%; max-width: 800px'">
      <q-card
      flat
        :class="
          Screen.lt.sm
            ? 'q-mx-none'
            : Screen.gt.md
            ? 'q-mx-lg'
            : 'q-mx-sm q-pa-md'
        "
      >
        <q-card-section>
          <div :class="'text-primary text-center ' +
              (Screen.lt.sm
                ? ' text-h6 q-py-xs '
                : Screen.gt.md
                ? ' text-h3 text-weight-medium q-py-md  '
                : ' text-h5 text-weight-medium  q-py-sm ') ">
                HOSTING SERVICES
          </div>
          <div class="row full-width justify-center">
            <div class="col-9">
              <p class="text-h6 text-center text-weight-medium">Let our infrastructure power your open communciations.</p>
              <p class="text-body1">Our solutions are tailored to small businesses and communities that want to, or need to, own their data or manage their costs.</p>
              <ul>
                <li>Fediverse</li>
                <li>Matrix</li>
                <li>SIP / VoIP</li>
                <li>XMPP / Chat</li>
              </ul>
              <p>More are planned for 2024, become a member to <router-link to="/about/governance">take part in governing how these services evolve</router-link>.</p>
            </div>


          </div>
        </q-card-section>

      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { Screen } from "quasar";

</script>

<style lang="scss" scoped>

</style>
