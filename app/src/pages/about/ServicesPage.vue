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
                Services
          </div>
          <div class="row full-width justify-center">
            <div class="col-9 text-body1">
              <p>Four services will be supported in 2023.</p>
              <ul>
                <li>Fediverse</li>
                <li>Matrix</li>
                <li>SIP / VoIP</li>
                <li>XMPP / Chat</li>
              </ul>
              <p>More are planned for 2024, become a member to take part in <router-link to="/about/governance">governing how these services evolve</router-link>.</p>
              <p>All services use open source software and are community supported and developed. You can <router-link to="/about/hosting">use our infrastructure</router-link> to fast track your Fediverse or open source communications.</p>
              <p>We will create a unified web client to access all services seamlessly. For now, we'll host customized versions of existing open source clients for each service. </p>
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
                Fediverse
          </div>
          <div class="text-body1">
            <ul>
              <li>Provides microblogging services for sharing.</li>
              <li>Similar to posts on Facebook, Twitter, LinkedIn, etc.</li>
              <li>This service is required to participate in <router-link to="/about/governance">governance</router-link>.</li>
              <li>We support the ActivityPub protocol used by <a href="https://mastodon.social/explore">Mastodon</a>.</li>
              <li><a href="https://gotosocial.org/">GoToSocial</a> is used as the ActivityPub server.</li>
              <li>We host a <a href="https://what.izzup.com">fork of the Elk Fediverse web client</a>.</li>
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
                Matrix
          </div>
          <div class="text-body1">
            <ul>
              <li>Secure, decentralized chat communications.</li>
              <li>Many <a href="https://matrix.org/ecosystem/clients/">Matrix clients</a> are available.</li>
              <li>Matrix will be part of our P2P marketplace solutions.</li>
              <li>We are still investigating what <a href="https://matrix.org/ecosystem/servers/">Matrix servers</a> and client we will support.</li>
              <li>Matrix support <a href="https://matrix.org/docs/matrix-concepts/end-to-end-encryption">End-to-End encryption</a> with proper configuration. </li>
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
                SIP / VoIP
          </div>
          <div class="text-body1">
            <ul>
              <li>While focused on voice and video, it will also support text chat.</li>
              <li>There are a variety of open source and proprietary <a href="https://en.wikipedia.org/wiki/List_of_SIP_software">SIP clients</a></li>
              <li><a href="https://www.linphone.org/">Linphone</a> provides and End-to-End encryption option for SIP.</li>
              <li>We will use the <a href="https://www.kamailio.org/">Kamailio SIP server</a>.</li>
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
                XMPP / Chat
          </div>
          <div class="text-body1">
            <ul>
              <li>While focused on text chat, it will also support voice and video.</li>
              <li>There are a variety of open source and proprietary <a href="https://xmpp.org/software/?platform=all-platforms">XMPP clients</a></li>
              <li>We will use the <a href="https://prosody.im/">Prosody chat server</a>.</li>
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
