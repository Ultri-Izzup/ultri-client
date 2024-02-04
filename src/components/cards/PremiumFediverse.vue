<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h5">Premium Fediverse</div>
      <div class="text-body1 q-pt-md">
        <p>
          We offer the leading Fediverse services for micro-blogging and
          threaded discussion.
        </p>
        <ul>
          <li>Mastodon <q-icon name="img:mastodon/logo.svg"></q-icon></li>
          <li>Lemmy <q-icon name="img:lemmy/logo.svg"></q-icon></li>
          <li>Firefish <q-icon name="img:firefish/logo.svg"></q-icon></li>
        </ul>

        <q-card :class="content.adjustedMy()">
          <q-card-section class="row text-center bg-primary text-white">
            <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">
              Ultri.net
            </div>
            <q-space></q-space>
            <div class="text-h6 q-pr-md">Mastodon</div>
            <q-avatar square>
              <img src="mastodon/logo.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-body1">
              A micro-blogging alternative to Twitter.
            </div>
            <div>
              <ul>
                <li>930,000 Active Users</li>
                <li>7,000,000 Total Users</li>
                <li>11,000 Servers</li>
              </ul>
            </div>
          </q-card-section>
          <q-card-actions class="justify-center q-pb-md">
            <q-btn
              href="https://ultri.net/auth/sign_up"
              label="Join Now"
              rounded
              color="primary"
              size="lg"
            ></q-btn>
          </q-card-actions>
        </q-card>

        <q-separator></q-separator>

        <q-card :class="content.adjustedMy()">
          <q-card-section class="row text-center bg-primary text-white">
            <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">
              Ultri.world
            </div>
            <q-space></q-space>
            <div class="text-h6 q-pr-md">Lemmy</div>
            <q-avatar square>
              <img src="lemmy/logo.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-body1">
              Threaded discussions, similar to Reddit.
            </div>
            <div>
              <ul>
                <li>38,000 Active Users</li>
                <li>413,000 Total Users</li>
                <li>874 Servers</li>
              </ul>
            </div>
          </q-card-section>
          <q-card-actions class="justify-center q-pb-md">
            <q-btn
              label="Join Now"
              rounded
              color="primary"
              size="lg"
              href="https://ultri.world/signup"
            ></q-btn>
          </q-card-actions>
        </q-card>

        <q-separator :class="content.adjustedMy()"></q-separator>

        <q-card :class="content.adjustedMy()">
          <q-card-section class="row text-center bg-primary text-white">
            <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">
              Izzup.com
            </div>
            <q-space></q-space>
            <div class="text-h6 q-pr-md">Firefish</div>
            <q-avatar square>
              <img src="firefish/logo.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-body1">
              An alternative to Facebook for posts, pages, groups and chat.
            </div>
            <div>
              <ul>
                <li>6,000 Active Users</li>
                <li>22,000 Total Users</li>
                <li>458 Servers</li>
              </ul>
            </div>
          </q-card-section>
          <q-card-actions class="justify-center q-pb-md">
            <q-btn
              href="https://izzup.com"
              label="Join Now"
              rounded
              color="primary"
              size="lg"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import useContent from "../../composables/content";
import { useQuasar } from "quasar";

const $q = useQuasar();

const content = useContent();
</script>
