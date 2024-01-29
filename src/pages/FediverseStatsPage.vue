<template>
  <q-page :class="page.flexTopCenter()">
    <q-card flat class="fit" :style="content.minMaxReadableWidth()">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="premier" label="Recommended"></q-tab>
        <q-tab name="publishing" label="Publishing"></q-tab>
        <q-tab name="faq" label="FAQ"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="premier">
          <div class="text-h5">Industry Leaders</div>
          <div>
            <p>
              If you are new to the Fediverse we suggest you start with a
              Firefish or Mastodon account, either provides a micro-blogging
              experience that surpasses Twitter or Facebook. Mastodon is the
              undisputed leader in the number of users, using a Mastodon
              accounts ensures your posts have maximum compatiblity with the
              largets possible user base. Firefish is hands-down the most
              feature-rich, Fediverse client and server combination.
            </p>
            <p>
              An additional "threadiverse" account is recommended for full
              particpation in the "thread" oriented Fediverse implemented by
              Lemmy and KBin.
            </p>
          </div>
          <div class="text-left">
            <ul>
              <li>Free signup, community funded.</li>
              <li>Dedicated website, no installation required.</li>
              <li>All use ActivityPub for federation.</li>
            </ul>
          </div>

          <div class="text-h6">Micro-blogging</div>
          <div class="text-caption">Share your story</div>

          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="img:firefish/true.svg"
              label="Izzup.com"
              caption="Firefish"
              group="premier"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  <div class="q-pb-sm">
                    Recommended for personal Fediverse acccess, it is more
                    feature-rich than Mastodon.
                  </div>

                  <div>
                    <span class="text-bold">Firefish Features:</span>
                    <ul class="text-left">
                      <li>Post Quoting</li>
                      <li>Rich text formatting</li>
                      <li>Emoji reactions</li>
                      <li>Reply threading</li>
                      <li>Account migration</li>
                      <li>Chat</li>
                      <li>Galleries</li>
                      <li>Groups</li>
                    </ul>
                  </div>
                </q-card-section>
                <q-card-actions class="justify-center">
                  <q-btn
                    size="lg"
                    label="Join Now!"
                    rounded
                    color="primary"
                    href="https://izzup.com/"
                  ></q-btn>
                </q-card-actions>
                <q-card-section>
                  <div class="text-caption row">
                    <q-space></q-space>
                    <a
                      href="https://joinfirefish.org/blog/en/introducing_firefish/"
                      >Firefish project</a
                    >
                    <q-space></q-space>
                    <a href="https://joinfirefish.org/join/"
                      >Other Firefish servers</a
                    >
                    <q-space></q-space>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              icon="img:mastodon/mastodon_logotype.svg"
              label="Ultri.net"
              caption="Mastodon"
              group="premier"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  <div class="q-pb-sm">
                    Recommended for business or professional Fediverse acccess.
                  </div>

                  <div>
                    <span class="text-bold">Mastodon Features:</span>
                    <ul class="text-left">
                      <li>Largest user base</li>
                      <li>Maximum compatability</li>
                      <li>More than 10k servers</li>
                      <li>One million active users</li>
                      <li>Replaces Twitter, Facebook and LinkedIn</li>
                    </ul>
                  </div>
                </q-card-section>
                <q-card-actions class="justify-center">
                  <q-btn
                    size="lg"
                    label="Join Now!"
                    rounded
                    color="primary"
                    href="https://ultri.net/auth/sign_up"
                  ></q-btn>
                </q-card-actions>
                <q-card-section>
                  <div class="text-caption row">
                    <q-space></q-space>
                    <a href="https://joinmastodon.org/">Mastodon project</a>
                    <q-space></q-space>
                    <a href="https://mastodonservers.net/servers"
                      >Other Mastodon servers</a
                    >
                    <q-space></q-space>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>

          <div class="text-h6 q-pt-md">Discussion / Link Sharing</div>
          <div class="text-caption">Engage with a community</div>

          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="img:lemmy/lemmy_logo.svg"
              label="Ultri.world"
              caption="Lemmy"
              group="premier"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  <div class="q-pb-sm">
                    Take part in discussions with the community.
                  </div>

                  <div>
                    <span class="text-bold">Lemmy Features:</span>
                    <ul class="text-left">
                      <li>Replacement for Reddit</li>
                      <li>Over 700 servers</li>
                      <li>More tha 40k active users</li>
                    </ul>
                  </div>
                </q-card-section>
                <q-card-actions class="justify-center">
                  <q-btn
                    size="lg"
                    label="Join Now!"
                    rounded
                    color="primary"
                    href="https://ultri.world/signup"
                  ></q-btn>
                </q-card-actions>
                <q-card-section>
                  <div class="text-caption row">
                    <q-space></q-space>
                    <a href="https://join-lemmy.org/">Lemmy project</a>
                    <q-space></q-space>
                    <a href="https://join-lemmy.org/instances"
                      >Other Lemmy servers</a
                    >
                    <q-space></q-space>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-tab-panel>

        <!-- <q-tab-panel name="publishing">
          <div class="text-h6">Publishing</div>
          We use hyper efficient open-source Fediverse software to provide
          publishing under a large number of domains.
        </q-tab-panel> -->

        <q-tab-panel name="faq">
          <div class="text-h5">Frequently Asked Questions</div>
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              label="What is the Fediverse?"
              group="faq"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  The Fediverse is the "universe of federated social sites". For
                  federated serviers to communicate they must use the same
                  protoco. The most popular is ActivityPub, used in Mastodon,
                  Firefish, Lemmy, GoToSocial and others. Other less popular
                  protocols worth investigating Disapora, Matrix, Zot and DFRN.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              label="Do I need multiple accounts?"
              group="faq"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  <ul>
                    <li>You DO NOT NEED multiple accounts.</li>
                    <li>
                      There are good reasons for having multiple accounts, it's
                      preferred in many scenarios.
                    </li>
                    <li>
                      You need an account for each protocol you wish to use. You
                      can't use your Mastodon ActivityPub based account to
                      access Disapora or Matrix servers.
                    </li>
                    <li>
                      Any ActivityPub servers should be able to connect with
                      other ActivityPub servers. Not all the same features will
                      be available.
                    </li>
                  </ul>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              label="Why would I use multiple accounts?"
              group="faq"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  <p>
                    Multiple accounts allow you to keep your various personal
                    and business interests separate. For micro-blogging and
                    general sharing we suggest Izzup.com for personal use and
                    Ultri.net for professional use.
                  </p>
                  <p>
                    An account on a micro-blogging site won't provide full
                    functionality on a community site like Lemmy. We suggest
                    combing an Ultri.world account with your micro-blogging
                    choice.
                  </p>
                  <p>
                    We have a variety of domains to add content to your sharing,
                    allowing followers to choose the accounts that matter to
                    them.
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <!-- <q-expansion-item
              expand-separator
              label="How do I choose an instance?"
              group="faq"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  We recommend starting with an account on a Firefish or
                  Mastodon server. Mastodon is the most popular, but Firefish
                  has more features.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              label="How do I tag posts?"
              group="faq"
            >
              <q-card>
                <q-card-section class="q-px-xl"> </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              label="How do I mention remote users in posts?"
              group="faq"
            >
              <q-card>
                <q-card-section class="q-px-xl"> </q-card-section>
              </q-card>
            </q-expansion-item> -->

            <q-expansion-item
              expand-separator
              label="Who owns the Fediverse?"
              group="faq"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  <p>
                    <span class="text-bold">No single entity owns it.</span>
                    Each instance is independently owned and operated and
                    determines for itself what, if any, user fees are required
                    for that instance.
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              label="How is the Fediverse governed?"
              group="faq"
            >
              <q-card>
                <q-card-section class="q-px-xl">
                  <p>
                    Each instance maintains it's own list of banned or whitelist
                    information. That can be defined at the memeber or domain
                    level.
                  </p>
                  <p>
                    Individual users can also maintain their own banned user
                    list.
                  </p>
                  <p>
                    The features of the Fediverse are determined by the
                    developers and what they are willing to code.
                  </p>
                  <p>At Ultri, our communities are managed by the members.</p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import usePage from "../composables/page";
import useContent from "../composables/content";

const page = usePage();
const content = useContent();

const metaData = {
  // sets document title
  title: "Fediverse Services",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Ultri`,

  // meta tags
  meta: {
    description: { name: "description", content: "Page 1" },
    keywords: { name: "keywords", content: "Quasar website" },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - My Website`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <html> attributes
  htmlAttr: {
    "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    "action-scope": "xyz", // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};

useMeta(metaData);

const tab = ref("premier");
</script>
