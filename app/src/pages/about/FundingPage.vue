<template>
  <q-page :class="Screen.lt.md ? 'flex' : 'flex justify-center  q-pt-md'">
    <div :style="Screen.lt.md ? 'width: 100%' : 'width: 80%; max-width: 600px'">
      <q-card flat
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
                ? ' text-h6 q-pt-xs q-pb-sm '
                : Screen.gt.md
                ? ' text-h3 text-weight-medium q-pt-md q-pb-lg  '
                : ' text-h5 text-weight-medium  q-pt-sm q-pb-md ') ">
                Funding
          </div>
          <div class="row full-width justify-center">
            <div class="col-9 text-body1">
              <p>Our goal is to be able to offer free Fediverse sharing and forums for average users.</p>
              <p>Fees from advertising and advanced services geared towards businesses and power users will fund the free services.</p>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div :class="
              (Screen.lt.sm
                ? ' text-body1 text-weight-bolder '
                : Screen.gt.md
                ? ' text-h4 text-weight-medium  '
                : ' text-h6 text-weight-medium  ') ">
                Revenue Streams
          </div>
          <div class="text-body1">
            <ul>
              <li>Posting fees for P2P marketplace</li>
              <li>Advertising on public content pages</li>
              <li>Hosting fees for Fediverse, Matrix, SIP and XMMP</li>
            </ul>
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
