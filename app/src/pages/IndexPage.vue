<template>
  <q-page class="flex justify-center">
    <div
      v-if="!isSignedIn"
      class="q-pa-none"
      :style="Screen.lt.md ? 'width: 100%' : 'width: 80%; max-width: 900px'"
    >
      <q-card flat>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="join" label="Join"></q-tab>
          <q-tab name="services" label="Services"></q-tab>
          <q-tab name="domains" label="Domains"></q-tab>
          <q-tab name="ownIt" label="Own It"></q-tab>
        </q-tabs>
        <q-separator></q-separator>

        <q-tab-panels v-model="tab" animated>
          <!-- JOIN -->
          <q-tab-panel name="join">
            <q-card-section

            >
              <div :class="
              'text-primary text-weight-bolder text-italic ' +
                (Screen.lt.sm
                  ? 'text-h4 '
                  : Screen.gt.lg
                  ? 'text-h2'
                  : 'text-h3')
              ">
                Join Now!
              </div>
              <div :class="
              'text-weight-medium text-italic ' +
                (Screen.lt.sm
                  ? 'text-h5 '
                  : Screen.gt.lg
                  ? 'text-h3'
                  : 'text-h4')
              ">Free and Open Source</div>
            </q-card-section>
            <q-card-section class="q-pa-none q-ma-none">
              <div class="row full-width justify-center">
                <u-passwordless-flow
                  :style="
                    Screen.lt.md ? '' : 'min-width: 600px; max-width: 800px;'
                  "
                ></u-passwordless-flow>
              </div>
            </q-card-section>
            <q-card-section
              :class="
                Screen.lt.sm
                  ? 'row text-h6 full-width justify-center text-center'
                  : 'row text-h5 text-weight-bold full-width justify-center text-center '
              "
            >
              Keep the corporations out of your communications.
            </q-card-section>
          </q-tab-panel>
          <!-- SERVICES -->
          <q-tab-panel name="services">

              <div class="row full-width text-center justify-center">
                <q-card flat
                  class="q-py-lg"
                  :style="
                    Screen.lt.md ? '' : 'min-width: 600px; max-width: 800px;'
                  "
                >
                  <q-card-section>
                    <div
                      class="text-h3 text-weight-bold text-center text-italic text-primary"
                    >
                      Fediverse+
                    </div>
                  </q-card-section>
                  <q-card-section
                    :class="
                      Screen.lt.sm
                        ? 'text-body1 text-bold'
                        : Screen.gt.lg
                        ? 'text-h4'
                        : 'text-h4 text-center'
                    "
                  >
                    One identity across multiple services
                  </q-card-section>
                  <q-card-section
                    :class="
                      Screen.lt.md
                        ? 'text-body1'
                        : Screen.gt.lg
                        ? 'text-h5'
                        : 'text-h6 text-center'
                    "
                  >
                    <div class="row text-weight-medium lesser-text">
                      <div
                        :class="
                          Screen.lt.md
                            ? 'row full-width q-px-md'
                            : 'row full-width q-px-xl q-py-xs'
                        "
                      >
                        <div>Fediverse</div>
                        <q-space></q-space>
                        <div class="text-weight-medium">
                          @<span class="text-primary">username</span>@izzup.com
                        </div>
                      </div>

                      <div
                        :class="
                          Screen.lt.md
                            ? 'row full-width q-px-md'
                            : 'row full-width q-px-xl  q-py-xs'
                        "
                      >
                        <div>Matrix</div>
                        <q-space></q-space>
                        <div class="text-weight-medium">
                          @<span class="text-primary">username</span>:izzup.com
                        </div>
                      </div>

                      <div
                        :class="
                          Screen.lt.md
                            ? 'row full-width q-px-md'
                            : 'row full-width q-px-xl q-py-xs'
                        "
                      >
                        <div>XMPP/Chat</div>
                        <q-space></q-space>
                        <div class="text-weight-medium">
                          <span class="text-primary">username</span>@izzup.com
                        </div>
                      </div>

                      <div
                        :class="
                          Screen.lt.md
                            ? 'row full-width q-px-md'
                            : 'row full-width q-px-xl q-py-xs'
                        "
                      >
                        <div>SIP/VoIP</div>
                        <q-space></q-space>
                        <div class="text-weight-medium">
                          <span class="text-primary">username</span>@izzup.com
                        </div>
                      </div>

                      <!-- <div :class="Screen.lt.md ? 'row full-width q-px-md' : 'row full-width q-px-xl'">
              <div>Dynamic DNS</div>
              <q-space></q-space>
              <div class="text-weight-medium">
                <span class="text-primary text-italic">username</span
                >.net.izzup.com
              </div>
            </div>

            <div :class="Screen.lt.md ? 'row full-width q-px-md' : 'row full-width q-px-xl'">
              <div>Ecommerce</div>
              <q-space></q-space>
              <div class="text-weight-medium">
                <span class="text-primary text-italic">username</span
                >.shop.izzup.com
              </div>
            </div> -->
                    </div>
                  </q-card-section>
                </q-card>
              </div>

          </q-tab-panel>
          <!-- DOMAINS -->
          <q-tab-panel name="domains">
              <div class="row full-width justify-center text-center q-pb-xl">
                <q-card
                flat
                  class="q-py-lg"
                  :style="
                    Screen.lt.md ? '' : 'min-width: 600px; max-width: 800px;'
                  "
                >
                  <q-card-section>
                    <div
                      class="text-h3 text-weight-bold text-center text-italic text-primary"
                    >
                      <span class="gt-sm">Multiple </span>Domains
                    </div>
                  </q-card-section>
                  <q-card-section
                    :class="
                      Screen.lt.sm
                        ? 'text-body1 text-bold text-center'
                        : Screen.gt.lg
                        ? 'text-h4 text-center'
                        : 'text-h4 text-center'
                    "
                  >
                    Choose your community
                  </q-card-section>
                  <q-card-section class="q-mx-md lesser-text">
                    <div
                      :class="
                        Screen.lt.sm
                          ? 'row full-width text-center'
                          : 'row full-width text-center text-h6'
                      "
                    >
                      <div class="col-6">
                        <div class="q-py-xs">BikeMechanic.info</div>
                        <div class="q-py-xs">OpenSociocracy.org</div>
                        <div class="q-py-xs">ExpertGaming.com</div>
                        <div class="q-py-xs">useVue.org</div>
                      </div>
                      <div class="col-6">
                        <div class="q-py-xs">SportsWord.com</div>
                        <div class="q-py-xs">CycleOpedia.org</div>
                        <div class="q-py-xs">Brewmasters.us</div>
                        <div class="q-py-xs">HomebrewingBeer.com</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
          </q-tab-panel>
          <!-- OWN IT -->
          <q-tab-panel name="ownIt">
            <div class="row full-width justify-center text- q-pb-xl">
                <q-card
                flat
                  class="q-py-lg"
                  :style="
                    Screen.lt.md ? '' : 'min-width: 600px; max-width: 800px;'
                  "
                >
                  <q-card-section>
                    <div
                      class="text-h3 text-weight-bold text-center text-italic text-primary"
                    >
                      Own It
                    </div>
                  </q-card-section>
                  <q-card-section
                    :class="
                      Screen.lt.sm
                        ? 'text-body1 text-bold text-center'
                        : Screen.gt.lg
                        ? 'text-h4 text-center'
                        : 'text-h4 text-center'
                    "
                  >
                    Community owned and operated
                  </q-card-section>
                  <q-card-section class="q-mx-md lesser-text">
                    <div
                      :class="
                        Screen.lt.sm
                          ? 'row full-width text-center'
                          : 'row full-width text-center text-h5'
                      "
                    >
                      <div class="full-width">
                        <div class="row full-width justify-center q-py-xs">
                          Developed and supported by members
                        </div>
                        <div class="row full-width justify-center q-py-xs">
                          Community funded
                        </div>
                        <div class="row full-width justify-center q-py-xs">
                          Member managed and governed
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <div v-else>
      <q-card style="max-width: 800px">
        <q-card-section class="text-center">
          <div class="text-h2 q-py-xl text-primary text-weight-bolder">
            Coming Soon!
          </div>
          <div class="text-h3 q-py-xl">
            The best content from our members and around the web.
          </div>
          <div class="text-h4 q-py-xl">
            <router-link to="/dashboard">Account Dashboard</router-link>
          </div>
        </q-card-section>
      </q-card>
      <Fireworks
        ref="fw"
        v-if="welcomeAccount"
        :autostart="true"
        :options="options"
        :style="{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: '#000',
        }"
      />
    </div>
    <q-dialog v-model="showWelcome">
      <q-card :class="Screen.lt.sm ? 'q-py-md' : 'q-pa-md'">
        <q-card-section>
          <div
            :class="
              'text-primary text-weight-medium ' +
              (Screen.lt.sm ? 'text-h4 q-pb-sm' : ' text-h3 q-pb-lg')
            "
          >
            Congratulations!
          </div>
          <div
            :class="
              ' text-center text-weight-bold ' +
              (Screen.lt.sm ? ' text-h5 ' : ' text-h4 ')
            "
          >
            {{ auth.accounts.get(welcomeAccount).username }}
          </div>
          <div class="text-body1 q-pa-sm">
            You can now provision a variety of open source communication and
            sharing services on:
          </div>
          <div
            :class="
              ' text-center text-weight-bold' +
              (Screen.lt.sm ? ' text-h5 ' : ' text-h4 ')
            "
          >
            {{ welcomeAccount }}
          </div>
        </q-card-section>
        <q-card-actions class="justify-center">
          <q-btn
            @click="
              closeFireworks('/account/' + auth.realmFormat(welcomeAccount))
            "
            label="Setup Services"
            color="primary"
          ></q-btn>
        </q-card-actions>
        <q-separator
          :class="Screen.lt.sm ? 'q-mt-md' : 'q-mt-lg'"
        ></q-separator>
        <q-card-section class="text-center">
          <div>&mdash; OR &mdash;</div>
          <div class="text-body1 q-pa-sm">
            Claim a username in another domain.
          </div>
        </q-card-section>
        <q-card-actions class="justify-center">
          <q-btn
            @click="closeFireworks('/dashboard')"
            label="New Username"
            color="primary"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Screen } from "quasar";

import { Fireworks } from "@fireworks-js/vue";

import { useAuthStore } from "../stores/auth";

import UPasswordlessFlow from "../components/ultri/UPasswordlessFlow.vue";
// import UFediverseFlow from "../components/ultri/UFediverseFlow.vue";

const auth = useAuthStore();

const router = useRouter();

const { isSignedIn, welcomeAccount, showWelcome, availableDomains } =
  storeToRefs(auth);

//const accountDomain = ref(null);

const options = ref({ opacity: 0.5 });

const tab = ref("join");

const closeFireworks = (toRoute) => {
  welcomeAccount.value = null;
  router.push(toRoute);
};
</script>
