<template>
  <q-page class="flex">
    <q-card flat>
      <q-card-section>
        <div
          class="row q-py-sm q-px-lg text-h3 text-bolder full-width text-primary text-italic text-bold"
        >
          Fediverse+
        </div>
        <!-- <div class="row full-width text-h5 q-pt-sm q-px-lg">
          Izzup - an open source alternative to the corporate sharing options
        </div> -->
      </q-card-section>
      <q-card-section>
        <div
          class="row justify-center full-width"
          :style="Screen.lt.md ? 'width: 100%' : 'width: 90%'"
        >
          <div :class="Screen.lt.md ? 'col-12 q-pa-sm' : 'col-4 q-pa-lg'">
            <q-card class="q-px-sm fit">
              <q-card-section class="text-h4 text-primary text-italic text-bold"
                >What is it?</q-card-section
              >
              <q-separator></q-separator>
              <q-card-section class="text-body1"
                >Izzup offers a Mastodon client at
                <a href="https://what.izzup.com">what.izzup.com</a>.
              </q-card-section>
              <q-card-section class="text-body1">
                This is built on top of the
                <a href="https://github.com/elk-zone/elk"
                  >amazing Elk Mastodon client</a
                >. Like all our front end user interfaces it is written in Vue.
                We created our own fork called
                <a href="https://github.com/Ultri-Izzup/antlers">Antlers</a>,
                and will be adding some non-traditional Fediverse
                options.</q-card-section
              >
            </q-card>
          </div>
          <div :class="Screen.lt.md ? 'col-12 q-pa-sm' : 'col-4 q-pa-lg'">
            <q-card class="q-pa-sm fit">
              <q-card-section>
                <div class="text-h4 text-bold text-primary q-pb-sm text-italic">
                  How do I use it?
                </div>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section class="text-body1"
                >Izzup provides Fediverse accounts hosted in stable, scalable
                cloud environment at
                <a href="https://fedi.izzup.com">fedi.izzup.com</a>.
              </q-card-section>
              <q-card-section class="text-body1">
                This is built on top of a powerful and efficient Fediverse
                server,
                <a href="https://gotosocial.org/">GoToSocial</a>. Our hope is to
                run the default version witout any modifications. That will
                allow us a much easier upgrade path as new versions come
                out.</q-card-section
              >
            </q-card>
          </div>
          <div :class="Screen.lt.md ? 'col-12 q-pa-sm' : 'col-4 q-pa-lg'">
            <q-card class="q-pa-sm fit">
              <q-card-section>
                <div class="text-h4 text-bold text-primary q-pb-sm text-italic">
                  How do I get it?
                </div>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section class="text-body1">
                Izzup goes well beyond other Fediverse offerings, we offer a
                suite of publishing tools that help individuals and businesses
                better tell their story.
              </q-card-section>
              <q-card-section class="text-body1">
                <ul>
                  <li>Publish stories and articles</li>
                  <li>Share calendar events</li>
                  <li>List items for sale</li>
                  <li>Create and publish microsites</li>
                </ul>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { Screen } from "quasar";
</script>
