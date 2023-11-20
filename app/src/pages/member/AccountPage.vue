<template>
  <q-page :class="Screen.lt.md ? 'flex' : 'flex justify-center  q-pt-md'">
    <div :style="Screen.lt.md ? 'width: 100%' : 'width: 80%; max-width: 900px'">
      <q-card
        :class="
          Screen.lt.sm
            ? 'q-mx-none'
            : Screen.gt.md
            ? 'q-mx-lg'
            : 'q-mx-sm q-pa-md'
        "
      >
        <q-card-section>
          <div :class="'text-center ' +
              (Screen.lt.sm
                ? ' text-h6 q-pt-xs q-pb-sm '
                : Screen.gt.md
                ? ' text-h3 text-weight-medium q-pt-md q-pb-lg  '
                : ' text-h5 text-weight-medium  q-pt-sm q-pb-md ') ">
                {{auth.email}}
          </div>
          <div class="row justify-center">
                      <q-icon
                        name="star"
                        :color="
                          auth.accountService(domain, 'fediverse').status ==
                          'active'
                            ? 'amber-11'
                            : 'grey-4'
                        "
                        size="30px"
                        ><q-tooltip>Member</q-tooltip></q-icon
                      >
                      <q-icon name="star" color="grey-4" size="30px"
                        ><q-tooltip>Contributor</q-tooltip></q-icon
                      >
                      <q-icon name="star" color="grey-4" size="30px"
                        ><q-tooltip>Citizen</q-tooltip></q-icon
                      >
                      <!-- <q-icon name="star" color="grey-4" size="30px"
                        ><q-tooltip>Delegate</q-tooltip></q-icon
                      > -->
                    </div>
          <div
            :class="
              'text-center ' +
              (Screen.lt.sm
                ? ' text-h6 q-pt-xs q-pb-sm '
                : Screen.gt.md
                ? ' text-h4 q-pt-md q-pb-lg  '
                : ' text-h5  q-pt-sm q-pb-md ')
            "
          >
          {{auth.accounts.get(domain).username}} &ndash;  {{ auth.domains.get(domain).domDisplay }}
          </div>
          <div
            :class="
              'text-primary text-weight-bold ' +
              (Screen.lt.sm
                ? ' text-h6 q-pt-xs q-pb-sm '
                : Screen.gt.md
                ? ' text-h4 q-pt-md q-pb-lg  '
                : ' text-h5  q-pt-sm q-pb-md ')
            "
          >
            Internet Services
          </div>
          <div>
            <q-list bordered separator>
              <!-- FEDIVERSE -->
              <q-expansion-item
                label="Fediverse"
                :header-class="Screen.lt.md ? ' text-h5 ' : ' text-h4'"
                group="service"
                @click="clearState()"
              >
                <template v-slot:header>
                  <!-- <q-item-section avatar>
                    <q-avatar
                      icon="bluetooth"
                      color="primary"
                      text-color="white"
                    ></q-avatar>
                  </q-item-section> -->

                  <q-item-section> Fediverse </q-item-section>

                  <q-item-section side>
                    <div class="row items-center">

                      <q-icon name="mdi-earth" size="40px" :color="
                          auth.accountService(domain, 'fediverse').status ==
                          'active'
                            ? 'green-9'
                            : 'grey-4'
                        "
                        ><q-tooltip>{{  auth.accountService(domain, 'fediverse').status ==
                          'active' ? 'Active' : 'Global' }}</q-tooltip></q-icon
                      >
                      <q-icon name="mdi-note-edit" size="40px" :color="
                          auth.accountService(domain, 'fediverse').status ==
                          'active'
                            ? 'green-9'
                            : 'grey-4'
                        "
                        ><q-tooltip>{{  auth.accountService(domain, 'fediverse').status ==
                          'active' ? 'Active' : 'Microblogging' }}</q-tooltip></q-icon
                      >
                    </div>
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section>
                    <q-expansion-item
                      label="Service Information"
                      :header-class="Screen.lt.md ? ' text-h6 ' : ' text-h5'"
                    >
                      <q-card v-if="auth.accounts.get(domain)">
                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Share with Friends
                          </div>
                          <div class="row full-width">
                            Address:
                            <span class="q-pl-sm text-weight-medium"
                              >&commat;{{
                                auth.accounts.get(domain).username
                              }}&commat;{{ domain }}</span
                            >
                          </div>
                          <div class="row full-width">
                            Profile Page:
                            <span class="q-pl-sm text-weight-medium"
                              >https://{{
                                auth.domains.get(domain).fediverseHost
                              }}.{{ domain }}/&commat;{{
                                auth.accounts.get(domain).username
                              }}</span
                            >
                          </div>
                        </q-card-section>

                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Client Configuration
                          </div>
                          <div class="row full-width">
                            Server:
                            <span class="q-pl-sm text-weight-medium"
                              >{{ auth.domains.get(domain).fediverseHost }}.{{
                                domain
                              }}</span
                            >
                          </div>
                          <div class="row full-width">
                            Login Email:
                            <span class="q-pl-sm text-weight-medium">{{
                              auth.email
                            }}</span>
                          </div>
                        </q-card-section>

                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Client Options
                          </div>
                          <div class="row full-width">
                            Hosted by Izzup:
                            <span class="q-pl-sm text-weight-medium"
                              ><a href="https://what.izzup.com"
                                >What.izzup.com</a
                              ></span
                            >
                          </div>
                          <div class="row full-width">
                            Third Party:
                            <span class="q-pl-sm text-weight-medium"
                              ><a href="https://joinmastodon.org/apps"
                                >Mastodon clients</a
                              ></span
                            >
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </q-card-section>

                  <q-card-section
                    v-if="
                      auth.accountService(domain, 'fediverse').status ==
                      'active'
                    "
                  >
                    <q-expansion-item
                      @click="clearState()"
                      label="Change Password"
                      :header-class="Screen.lt.md ? ' text-h6 ' : ' text-h5'"
                    >
                      <q-card>
                        <div>
                          Set a new secure password.
                        </div>
                        <q-form>
                          <q-input
                            label="Password"
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            autocomplete="new-password"
                          >
                            <template v-slot:append>
                              <q-icon
                                :name="
                                  showPassword ? 'visibility' : 'visibility_off'
                                "
                                class="cursor-pointer"
                                @click="showPassword = !showPassword"
                              ></q-icon>
                            </template>
                          </q-input>

                          <div
                            v-if="error"
                            class="row full-width justify-center text-weight-bold text-negative q-pt-xs"
                          >
                            {{ error }}
                          </div>

                          <q-input
                            label="Repeat Password"
                            v-model="passwordRepeat"
                            :type="showPassword ? 'text' : 'password'"
                            autocomplete="new-password"
                            :disable="passwordStrength < 90"
                          >
                            <template v-slot:append>
                              <q-icon
                                :name="
                                  showPassword ? 'visibility' : 'visibility_off'
                                "
                                class="cursor-pointer"
                                @click="showPassword = !showPassword"
                              ></q-icon>
                            </template>
                          </q-input>
                          <div class="row full-width justify-center q-py-md">
                            <div
                              :class="
                                'col-2 text-center' +
                                (password ? '  pwd-lvl-1 ' : ' pwd-lvl-unmet')
                              "
                              style="border-style: solid; border-width: 1px"
                            >
                              Weak
                            </div>
                            <div
                              :class="
                                'col-2 text-center ' +
                                (passwordStrength > 20
                                  ? '  pwd-lvl-2 '
                                  : ' pwd-lvl-unmet')
                              "
                              style="border-style: solid; border-width: 1px"
                            ></div>
                            <div
                              :class="
                                'col-2 text-center ' +
                                (passwordStrength > 45
                                  ? '  pwd-lvl-3 '
                                  : ' pwd-lvl-unmet')
                              "
                              style="border-style: solid; border-width: 1px"
                            ></div>
                            <div
                              :class="
                                'col-2 text-center ' +
                                (passwordStrength > 70
                                  ? '  pwd-lvl-4 '
                                  : ' pwd-lvl-unmet')
                              "
                              style="border-style: solid; border-width: 1px"
                            ></div>
                            <div
                              :class="
                                'col-2 text-center ' +
                                (passwordStrength >= 90
                                  ? '  pwd-lvl-5 '
                                  : ' pwd-lvl-unmet')
                              "
                              style="border-style: solid; border-width: 1px"
                            >
                              Secure
                            </div>
                          </div>
                        </q-form>
                        <q-card-actions class="justify-center">
                          <q-btn
                            @click="fediversePassword()"
                            size="lg"
                            label="Change Password"
                            color="primary"
                            class="q-my-sm"
                            :disable="
                              passwordStrength < 90 ||
                              password != passwordRepeat ||
                              formSubmitting
                            "
                          ></q-btn>
                        </q-card-actions>
                      </q-card>
                    </q-expansion-item>
                  </q-card-section>

                  <q-card-section v-else>
                    <div>Enter a secure password to enable service.</div>
                    <q-form>
                      <q-input
                        label="Password"
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        autocomplete="new-password"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="
                              showPassword ? 'visibility' : 'visibility_off'
                            "
                            class="cursor-pointer"
                            @click="showPassword = !showPassword"
                          ></q-icon>
                        </template>
                      </q-input>

                      <div
                        v-if="error"
                        class="row full-width justify-center text-weight-bold text-negative q-pt-xs"
                      >
                        {{ error }}
                      </div>

                      <q-input
                        label="Repeat Password"
                        v-model="passwordRepeat"
                        :type="showPassword ? 'text' : 'password'"
                        autocomplete="new-password"
                        :disable="passwordStrength < 90"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="
                              showPassword ? 'visibility' : 'visibility_off'
                            "
                            class="cursor-pointer"
                            @click="showPassword = !showPassword"
                          ></q-icon>
                        </template>
                      </q-input>
                      <div class="row full-width justify-center q-py-md">
                        <div
                          :class="
                            'col-2 text-center' +
                            (password ? '  pwd-lvl-1 ' : ' pwd-lvl-unmet')
                          "
                          style="border-style: solid; border-width: 1px"
                        >
                          Weak
                        </div>
                        <div
                          :class="
                            'col-2 text-center ' +
                            (passwordStrength > 20
                              ? '  pwd-lvl-2 '
                              : ' pwd-lvl-unmet')
                          "
                          style="border-style: solid; border-width: 1px"
                        ></div>
                        <div
                          :class="
                            'col-2 text-center ' +
                            (passwordStrength > 45
                              ? '  pwd-lvl-3 '
                              : ' pwd-lvl-unmet')
                          "
                          style="border-style: solid; border-width: 1px"
                        ></div>
                        <div
                          :class="
                            'col-2 text-center ' +
                            (passwordStrength > 70
                              ? '  pwd-lvl-4 '
                              : ' pwd-lvl-unmet')
                          "
                          style="border-style: solid; border-width: 1px"
                        ></div>
                        <div
                          :class="
                            'col-2 text-center ' +
                            (passwordStrength >= 90
                              ? '  pwd-lvl-5 '
                              : ' pwd-lvl-unmet')
                          "
                          style="border-style: solid; border-width: 1px"
                        >
                          Secure
                        </div>
                      </div>
                      <div class="text-center q-py-md">
                        <q-btn
                          @click="enableFediverse()"
                          size="lg"
                          rounded
                          label="Enable Fediverse"
                          class="q-px-large"
                          color="primary"
                          :disable="
                            passwordStrength < 90 ||
                            password != passwordRepeat ||
                            formSubmitting
                          "
                        ></q-btn>
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <!-- MATRIX -->
              <q-expansion-item
                label="Matrix"
                :header-class="Screen.lt.md ? ' text-h5 ' : ' text-h4'"
                group="service"
                @click="clearState()"
              >
                <template v-slot:header>
                  <!-- <q-item-section avatar>
                    <q-avatar
                      icon="bluetooth"
                      color="primary"
                      text-color="white"
                    ></q-avatar>
                  </q-item-section> -->

                  <q-item-section> Matrix </q-item-section>

                  <q-item-section side>
                    <div class="row items-center text-grey-4">
                      [matrix]
                      <q-tooltip>Matrix protocol</q-tooltip>
                    </div>
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section>
                    <q-expansion-item
                      label="Service Information"
                      :header-class="Screen.lt.md ? ' text-h6 ' : ' text-h5'"
                    >
                      <q-card>
                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Share with Friends
                          </div>
                          <div class="row full-width">
                            Address:
                            <span class="q-pl-sm text-weight-medium"
                              >&commat;{{
                                auth.accounts.get(domain).username
                              }}:{{ domain }}</span
                            >
                          </div>
                        </q-card-section>

                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Client Configuration
                          </div>
                          <div class="row full-width">
                            Server:
                            <span class="q-pl-sm text-weight-medium"
                              >{{ auth.domains.get(domain).matrixHost }}.{{
                                domain
                              }}</span
                            >
                          </div>
                          <div class="row full-width">
                            Login Email:
                            <span class="q-pl-sm text-weight-medium">{{
                              auth.email
                            }}</span>
                          </div>
                        </q-card-section>

                        <!-- <q-card-section>
                        <div :class="'row full-width text-weight-bold justify-center ' + (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')">Client Options</div>
                        <div class="row full-width">Hosted by Izzup: <span class="q-pl-sm text-weight-medium"><a href="https://what.izzup.com">What.izzup.com</a></span></div>
                        <div class="row full-width">Third Party: <span class="q-pl-sm text-weight-medium"><a href="https://joinmastodon.org/apps">Mastodon clients</a></span></div>
                      </q-card-section> -->
                      </q-card>
                    </q-expansion-item>
                  </q-card-section>
                  <q-card-section>
                    <div v-if="'matrix' in services">
                      Enter a secure password to change
                    </div>
                    <div v-else>Enter a secure password to enable</div>
                    <q-input
                      label="Password"
                      v-model="password"
                      type="password"
                    ></q-input>
                    <q-input
                      label="Repeat Password"
                      v-model="passwordRepeat"
                      type="password"
                    ></q-input>
                  </q-card-section>
                  <q-card-actions class="justify-center">
                    <q-btn
                      size="lg"
                      :label="
                        'matrix' in services
                          ? 'Change Password'
                          : 'Coming soon...'
                      "
                      color="primary"
                      :disable="true"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-expansion-item>

              <!-- SIP/VoIP -->
              <q-expansion-item
                label="SIP / VoIP"
                :header-class="Screen.lt.md ? ' text-h5 ' : ' text-h4'"
                group="service"
                @click="clearState()"
              >
                <template v-slot:header>
                  <!-- <q-item-section avatar>
                    <q-avatar
                      icon="bluetooth"
                      color="primary"
                      text-color="white"
                    ></q-avatar>
                  </q-item-section> -->

                  <q-item-section> SIP / VoIP </q-item-section>

                  <q-item-section side>
                    <div class="row items-center text-grey-4">
                      <q-icon name="mdi-phone" color="grey-4" size="40px"
                        ><q-tooltip>Voice</q-tooltip></q-icon
                      >
                      <q-icon name="mdi-video" color="grey-4" size="40px"
                        ><q-tooltip>Video</q-tooltip></q-icon
                      >
                    </div>
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section>
                    <q-expansion-item
                      label="Service Information"
                      :header-class="Screen.lt.md ? ' text-h6 ' : ' text-h5'"
                    >
                      <q-card>
                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Share with Friends
                          </div>
                          <div class="row full-width">
                            Address:
                            <span class="q-pl-sm text-weight-medium"
                              >{{
                                auth.accounts.get(domain).username
                              }}&commat;{{ domain }}</span
                            >
                          </div>
                        </q-card-section>

                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Client Configuration
                          </div>
                          <div class="row full-width">
                            Server:
                            <span class="q-pl-sm text-weight-medium"
                              >{{ auth.domains.get(domain).sipHost }}.{{
                                domain
                              }}</span
                            >
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </q-card-section>
                  <q-card-section>
                    <div v-if="'fediverse' in services">
                      Enter a secure password to change
                    </div>
                    <div v-else>Enter a secure password to enable</div>
                    <q-input
                      label="Password"
                      v-model="password"
                      type="password"
                    ></q-input>
                    <q-input
                      label="Repeat Password"
                      v-model="passwordRepeat"
                      type="password"
                    ></q-input>
                  </q-card-section>
                  <q-card-actions class="justify-center">
                    <q-btn
                      size="lg"
                      :label="
                        'fediverse' in services
                          ? 'Change Password'
                          : 'Coming soon...'
                      "
                      color="primary"
                      :disable="true"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-expansion-item>

              <!-- XMPP/Chat -->
              <q-expansion-item
                label="XMPP / Chat"
                :header-class="Screen.lt.md ? ' text-h5 ' : ' text-h4'"
                group="service"
                @click="clearState()"
              >
                <template v-slot:header>
                  <!-- <q-item-section avatar>
                    <q-avatar
                      icon="bluetooth"
                      color="primary"
                      text-color="white"
                    ></q-avatar>
                  </q-item-section> -->

                  <q-item-section> XMPP / Chat </q-item-section>

                  <q-item-section side>
                    <div class="row items-center text-grey-4">
                      <q-icon name="mdi-chat" color="grey-4" size="40px"
                        ><q-tooltip>Chat</q-tooltip></q-icon
                      >
                      <q-icon name="mdi-forum" color="grey-4" size="40px"
                        ><q-tooltip>Group chat</q-tooltip></q-icon
                      >
                    </div>
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section>
                    <q-expansion-item
                      label="Service Information"
                      :header-class="Screen.lt.md ? ' text-h6 ' : ' text-h5'"
                    >
                      <q-card>
                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Share with Friends
                          </div>
                          <div class="row full-width">
                            Address:
                            <span class="q-pl-sm text-weight-medium"
                              >{{
                                auth.accounts.get(domain).username
                              }}&commat;{{ domain }}</span
                            >
                          </div>
                        </q-card-section>

                        <q-card-section>
                          <div
                            :class="
                              'row full-width text-weight-bold justify-center ' +
                              (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')
                            "
                          >
                            Client Configuration
                          </div>
                          <div class="row full-width">
                            Server:
                            <span class="q-pl-sm text-weight-medium"
                              >{{ auth.domains.get(domain).xmppHost }}.{{
                                domain
                              }}</span
                            >
                          </div>
                        </q-card-section>

                        <!-- <q-card-section>
                        <div :class="'row full-width text-weight-bold justify-center ' + (Screen.lt.md ? ' text-body1 ' : ' text-h6 ')">Client Options</div>
                        <div class="row full-width">Hosted by Izzup: <span class="q-pl-sm text-weight-medium"><a href="https://what.izzup.com">What.izzup.com</a></span></div>
                        <div class="row full-width">Third Party: <span class="q-pl-sm text-weight-medium"><a href="https://joinmastodon.org/apps">Mastodon clients</a></span></div>
                      </q-card-section> -->
                      </q-card>
                    </q-expansion-item>
                  </q-card-section>
                  <q-card-section>
                    <div v-if="'fediverse' in services">
                      Enter a secure password to change
                    </div>
                    <div v-else>Enter a secure password to enable</div>
                    <q-input
                      label="Password"
                      v-model="password"
                      type="password"
                    ></q-input>
                    <q-input
                      label="Repeat Password"
                      v-model="passwordRepeat"
                      type="password"
                    ></q-input>
                  </q-card-section>
                  <q-card-actions class="justify-center">
                    <q-btn
                      size="lg"
                      :label="
                        'xmpp' in services
                          ? 'Change Password'
                          : 'Coming soon...'
                      "
                      color="primary"
                      :disable="true"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { Screen } from "quasar";

import { useAuthStore } from "../../stores/auth";

import { useScriptTag } from "@vueuse/core";

useScriptTag("/js/zxcvbn.js");

const route = useRoute();

const domain = computed(() => {
  return route.params.realm.replace("_", ".");
});

const services = computed(() => {
  return auth.getRealmServices(domain);
});

// Fetch Account Services onMounted

const auth = useAuthStore();

const password = ref(null);
const passwordRepeat = ref(null);
const passwordStrength = ref(0);
const showPassword = ref(false);
const error = ref(null);
const formSubmitting = ref(false);

const upperRegex = /^(?=.*[A-Z])/;
const lowerRegex = /^(?=.*[a-z])/;
const digitRegex = /^(?=.*[0-9])/;
const replacementRegex = /^(?=.*[!@$&*])/;
const lesserRegex = /^(?=.*["#%'()+/:;<=>?[\]^{|}~])/;
const separatorRegex = /^(?=.*[_\-.,])/;
const commonSequences = [
  "12345",
  "765432",
  "abc",
  "qwerty",
  "0123456789",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
  "abcdefghijklmnopqrstuvwxyz",
];

const username = auth.accounts.get(
  route.params.realm.replace("_", ".")
).username;
const email = auth.email;
const localPart = email.split("@")[0];

commonSequences.push(username);
commonSequences.push(localPart);

watch(password, (newValue) => {
  error.value = false;

  let base = 0;

  if (newValue) {
    // Don't check unless we've met min length
    if (newValue.length >= 8) {
      if (upperRegex.test(newValue)) {
        base = base + 26;
      }

      if (lowerRegex.test(newValue)) {
        base = base + 26;
      }

      if (digitRegex.test(newValue)) {
        base = base + 10;
      }

      if (replacementRegex.test(newValue)) {
        base = base + 5;
      }

      if (separatorRegex.test(newValue)) {
        base = base + 5;
      }

      if (lesserRegex.test(newValue)) {
        base = base + 22;
      }
    }

    let calcSize = 0;
    let lastChar = null;
    // let repeats = false;

    const strArray = Array.from(newValue);
    strArray.forEach((char) => {
      if (char != lastChar) {
        calcSize++;
        // if(repeats) {
        //   calcSize++;
        //   repeats = false;
        // }
      } else {
        //repeats = true;
      }
      lastChar = char;
    });

    commonSequences.forEach((seq) => {
      const backwards = Array.from(seq).reverse().join("");
      if (newValue.includes(seq) || newValue.includes(backwards)) {
        const len = seq.length;
        calcSize = calcSize - (len - 2);
      }
    });

    const guesses = Math.pow(base, calcSize);

    let entropy = Math.log2(guesses);

    if (entropy > 90) {
      const uniqSize = new Set(strArray).size;
      if (uniqSize < 4) {
        error.value = "Use more unique characters";
        entropy = 89;
      } else {
        const scoring = zxcvbn(newValue);
        if (scoring.score < 4) {
          error.value = "User more unique characters";
          entropy = 89;
        }
      }
    }

    passwordStrength.value = entropy;
  }
});

const clearState = () => {
  password.value = null;
  passwordRepeat.value = null;
  passwordStrength.value = 0;
  showPassword.value = false;
  error.value = null;
  formSubmitting.value = false;
};

const enableFediverse = async () => {
  console.log(password);
  formSubmitting.value = true;
  try {
    const result = await auth.provisionFediverse(domain.value, password.value);
    clearState();
  } catch (e) {
    error.value = e;
    formSubmitting.value = true;
  }
};

const fediversePassword = async () => {

  formSubmitting.value = true;
  try {
    const result = await auth.fediversePassword(domain.value, password.value);
    clearState();
  } catch (e) {
    error.value = e;
  }
};

onMounted(async () => {

  await  auth.getMemberAccountServices(route.params.realm);

});
</script>

<style lang="scss" scoped>
.body--light .pwd-lvl-unmet {
  color: $grey-9 !important;
  background-color: $grey-2 !important;
}

.body--dark .pwd-lvl-unmet {
  color: $grey-9 !important;
  background-color: $grey-2 !important;
}

.body--light .pwd-lvl-1 {
  color: $grey-1 !important;
  background-color: $green-5 !important;
}

.body--dark .pwd-lvl-1 {
  color: white !important;
  background-color: $green-5 !important;
}

.body--light .pwd-lvl-2 {
  color: $grey-1 !important;
  background-color: $green-6 !important;
}

.body--dark .pwd-lvl-2 {
  color: $grey-1 !important;
  background-color: $green-6 !important;
}

.body--light .pwd-lvl-3 {
  color: $grey-1 !important;
  background-color: $green-7 !important;
}

.body--dark .pwd-lvl-3 {
  color: $grey-1 !important;
  background-color: $green-7 !important;
}

.body--light .pwd-lvl-4 {
  color: $grey-1 !important;
  background-color: $green-8 !important;
}

.body--dark .pwd-lvl-4 {
  color: $grey-1 !important;
  background-color: $green-8 !important;
}

.body--light .pwd-lvl-5 {
  color: $grey-1 !important;
  background-color: $green-9 !important;
}

.body--dark .pwd-lvl-5 {
  color: $grey-1 !important;
  background-color: $green-9 !important;
}
</style>
