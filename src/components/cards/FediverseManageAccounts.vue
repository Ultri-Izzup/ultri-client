<template>
  <q-card flat>
    <q-card-section v-if="fediverseAccounts && fediverseAccounts.size > 0">
      <div class="text-h6 row">
        <q-avatar square>
          <img src="/gotosocial/logo.svg" />
        </q-avatar>
        <span class="q-pt-sm q-pl-sm">GoToSocial</span>
      </div>
      <q-list bordered class="rounded-borders" separator>
        <q-expansion-item
          v-for="[key, val] in fediverseAccounts"
          :key="key"
          expand-separator
          icon="img:/gotosocial/logo.svg"
          expand-icon="mdi-cog-outline"
          expanded-icon="mdi-cog"
          :label="key"
          :caption="'@' + val.username + '@' + key + ' &mdash; ' + val.status"
          group="fedi"
          ><q-form>
            <q-card>
              <q-card-section>
                <div v-if="val.status === 'reserved'" class="text-italic">
                  <span class="text-weight-medium">{{
                    "@" + val.username + "@" + key
                  }}</span>
                  is reserved.
                </div>
                <div v-if="val.status === 'reserved'" class="text-h6">
                  Enter password to activate
                </div>
                <div>
                  <q-input
                    v-model="password"
                    filled
                    :type="isPwd ? 'password' : 'text'"
                    autocomplete="new-password"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      ></q-icon>
                    </template>
                  </q-input>
                  Scorea: {{ passwd.score(password, [val.username]) }}
                  <!-- <password-meter :password="password" @score="onScore" />
                  Score: {{ score }} -->
                  <div class="row full-width">
                    <div class="col bg-grey-3">&nbsp;</div>
                    <div class="col bg-grey-3">&nbsp;2</div>
                    <div class="col bg-grey-3">&nbsp;3</div>
                    <div class="col bg-grey-3">&nbsp;4</div>
                    <div class="col bg-grey-3">&nbsp;5</div>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions class="justify-center">
                <q-btn
                  label="Activate"
                  color="primary"
                  :disable="score < 4"
                ></q-btn>
              </q-card-actions>
            </q-card>
          </q-form>
        </q-expansion-item>
      </q-list>
    </q-card-section>
    <q-card-section v-else>
      <div class="text-h6 row">
        <q-avatar square>
          <img src="/gotosocial/logo.svg" />
        </q-avatar>
        <span class="q-pt-sm q-pl-sm">GoToSocial</span>
        <q-space></q-space>
        <span class="q-pt-md text-caption text-italic">No claimed domains</span>
      </div>
      <div class="text-center justify-center row">
        <span class="col"></span>
        <!-- <q-btn label="Connect"></q-btn>
        <span class="col-1"></span> -->
        <q-btn
          rounded
          label="Create Account"
          color="primary"
          @click="emit('useTab', 'create')"
        ></q-btn>
        <span class="col"></span>
      </div>
    </q-card-section>
    <q-separator></q-separator>
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
          rounded
          label="Sign In"
          color="primary"
          href="https://ultri.net/auth/sign_in"
        ></q-btn>
        <span class="col"></span>
      </div>
    </q-card-section>
    <q-separator></q-separator>
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
          rounded
          label="Sign In"
          color="primary"
          href="https://ultri.world/login"
        ></q-btn>
        <span class="col"></span>
      </div>
    </q-card-section>
    <q-separator></q-separator>
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
          rounded
          label="Sign In"
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
import { storeToRefs } from "pinia";

import PasswordMeter from "vue-simple-password-meter";

import useRealms from "../../composables/realms.js";
import usePassword from "../../composables/password.js";

import { useUserStore } from "../../stores/user";

const domain = ref();
const username = ref();
const score = ref(null);

const user = useUserStore();
const { fediverseAccounts } = storeToRefs(user);

const emit = defineEmits(["useTab"]);

const isPwd = ref(true);
const password = ref(null);
const pwdStrength = ref(0);

const reset = () => {
  domain.value = null;
  username.value = null;
};

const onScore = (payload) => {
  console.log(payload.score); // from 0 to 4
  console.log(payload.strength); // one of : 'risky', 'guessable', 'weak', 'safe' , 'secure'
  score.value = payload.score;
};

// import useContent from "../../composables/content";
// const content = useContent();

const realms = useRealms();
const passwd = usePassword();
</script>
