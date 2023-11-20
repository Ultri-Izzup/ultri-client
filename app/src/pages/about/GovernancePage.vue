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
                ? ' text-h6 q-pt-xs '
                : Screen.gt.md
                ? ' text-h3 text-weight-medium q-pt-md  '
                : ' text-h5 text-weight-medium  q-pt-sm ') ">
                Governance
          </div>
          <div class="row full-width justify-center">
            <div class="col-9 text-body1">
              <p>Citizen members will govern the online communities using a combination of democratic and Sociocratic principles and practices.</p>
              <p>The overriding goal is to have the system governed by real human members, that have some skin in the game and share the desire for system longevity.</p>
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
                Basics
          </div>
          <div class="text-body1">
            <ul>
              <li>Not all members, can vote on all matters.</li>
              <li>Only citizen members are allowed to vote or submit proposals.</li>
              <li>The leader or delegate for a circle must be a citizen.</li>
              <li>Major decisions are made by the top level Management Circle.</li>
              <li>Day-to-day decisions are handled by the General Circle.</li>
              <li>The General Circle is composed of the leaders and delegates from all qualified circles.</li>
            </ul>
          </div>
        </q-card-section>
        <q-card-section>
          <div :class="
              (Screen.lt.sm
                ? ' text-body1 text-weight-bolder '
                : Screen.gt.md
                ? ' text-h4 text-weight-medium  '
                : ' text-h6 text-weight-medium  ') ">
                Path to Citizenship
          </div>
          <div class="text-body1">
            <ol>
              <li>Become a Member by creating an Izzup Fediverse account.</li>
              <li>Become a Contributor by creating useful content or comments.</li>
              <li>Contributors can apply for citizenship, referencing their activity here and elsewhere.</li>
              <li>A randomly chosen panel of current Citizens will accept or reject the application.</li>
            </ol>
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
