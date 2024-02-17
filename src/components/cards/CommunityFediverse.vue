<template>
  <q-card flat class="row full-width">
    <q-card-section>
      <div class="row">
        <div class="text-h5 full-width">Community Fediverse</div>
        <div class="text-body1 q-pt-md full-width">
          <p class="row justify-center">
            We offer the leading Fediverse services for micro-blogging and
            threaded discussion.
          </p>
          <div class="row justify-center">
            <ul>
              <li>Mastodon <q-icon name="img:mastodon/logo.svg"></q-icon></li>
              <li>Lemmy <q-icon name="img:lemmy/logo.svg"></q-icon></li>
              <li>Firefish <q-icon name="img:firefish/logo.svg"></q-icon></li>
            </ul>
          </div>

          <q-card :class="content.adjustedMy()">
            <q-card-section class="row text-center bg-primary text-white">
              <q-avatar
                square
                :class="$q.screen.gt.sm ? 'q-mr-md' : 'q-mr-sm'"
                :size="$q.screen.gt.sm ? 'lg' : 'md'"
              >
                <img src="mastodon/logo.svg" />
              </q-avatar>
              <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">
                Mastodon
              </div>
              <q-space></q-space>
              <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">
                Ultri.net
              </div>
            </q-card-section>
            <q-card-section class="row justify-center">
              <div class="text-body1 full-width justify-center text-center">
                A micro-blogging alternative to Twitter.
              </div>
              <div class="row justify-center">
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
              <q-avatar
                square
                :class="$q.screen.gt.sm ? 'q-mr-md' : 'q-mr-sm'"
                :size="$q.screen.gt.sm ? 'lg' : 'md'"
              >
                <img src="lemmy/logo.svg" />
              </q-avatar>
              <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">Lemmy</div>
              <q-space></q-space>
              <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">
                Ultri.world
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-body1 full-width justify-center text-center">
                Threaded discussions, similar to Reddit.
              </div>
              <div class="row justify-center">
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
              <q-avatar
                square
                :class="$q.screen.gt.sm ? 'q-mr-md' : 'q-mr-sm'"
                :size="$q.screen.gt.sm ? 'lg' : 'md'"
              >
                <img src="firefish/logo.svg" />
              </q-avatar>
              <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">
                Firefish
              </div>
              <q-space></q-space>
              <div :class="$q.screen.gt.sm ? 'text-h4' : 'text-h5'">
                Izzup.com
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-body1 full-width justify-center text-center">
                An alternative to Facebook for posts, pages, groups and chat.
              </div>
              <div class="row justify-center">
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
