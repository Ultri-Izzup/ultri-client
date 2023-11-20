<template>
  <q-page class="flex">
    <q-card flat class="row full-width">
      <div class="col">
      <q-card-section>
        <div
          class="row full-width q-py-sm q-px-lg text-h3 text-bolder full-width text-primary text-italic text-bold"
        >
          Izzup Governance
        </div>
        <div class="row full-width text-h5 q-pt-sm q-px-lg">
          An member governed alternative to the corporate sharing options
        </div>
      </q-card-section>
      <q-card-section class="row full-width">
        <div
          class="row justify-center full-width"
          :style="Screen.lt.md ? 'width: 100%' : 'width: 90%'"
        >
          <div class="col-12 q-px-md">
            <q-card class="q-pa-sm fit">
              <q-card-section class="text-h4 text-primary text-italic text-bold"
                >Community Managed Social</q-card-section
              >
              <q-separator></q-separator>
              <q-card-section class="text-body1">
                <div class="text-h5">
                  Community Standards
                </div>
                <p>The community will define the community standards they want to enforced for all Izzup content.</p>
                <div class="text-h5">
                  Peer Judgement
                </div>
                <p>All complaints and issue will be resolved by a random jury of peer members. All parties will present their evidecne and the jury will determine the proper outcome.</p>
                <div class="text-h5">
                  Censorship
                </div>
                <p>Members will decide who and what should be censored and to what degree. The publisher will get to present their side of things.</p>
                <div class="text-h5">
                  Bans and Reinstatements
                </div>
                <p>All bans and reinstatements will be decided by a general vote of members.</p>
                <div class="text-h5">
                  Federated Peering
                </div>
                <p>Members will get to decide which Fediverse servers we peer with, and which we ban.</p>

              </q-card-section
              >
            </q-card>
          </div>
        </div>
      </q-card-section>
    </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { Screen } from "quasar";
</script>
