<template>
  <q-page class="flex">

    <div class="row full-width justify-center q-pt-lg">
    <q-card class="q-mx-xl q-my-lg q-pa-xl" >
      <q-card-section class="text-bold text-h4 text-italic">
        <span class="text-primary">Advantages of Izzup</span>

        <div :class="Screen.lt.md ? 'text-body1' : 'text-h4'">
          <ul>
            <li class="q-pa-sm">
              A memorable and generic Fediverse address <b><i>@izzup.com</i></b
              >.
            </li>
            <li class="q-pa-sm">Free and easy to use, no member fees.</li>
            <li class="q-pa-sm">
              Developed and supported by open source volunteers.
            </li>
            <li class="q-pa-sm">
              Community managed, the members make all the community decisions.
            </li>
            <li class="q-pa-sm">
              Advanced publishing options:
              <ul>
                <li class="q-pa-sm">
                  Create stories and articles with rich media content.
                </li>
                <li class="q-pa-sm">
                  Publish microsites with no programming knowledge.
                </li>
                <li class="q-pa-sm">
                  Shared-image editing, involve the community.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </q-card-section>
    </q-card>
  </div>
  </q-page>
</template>

<script setup>

import { Screen } from "quasar"
</script>
