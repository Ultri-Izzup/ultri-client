<template>
  <q-page class="row items-center justify-evenly">
    <MdPreview v-model="aboutUsData" language="en-US" />
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import { config } from "md-editor-v3";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-table-of-contents";

config({
  markdownItConfig(mdit) {
    mdit.use(anchor, {
      permalink: anchor.permalink.headerLink()
    });
    mdit.use(toc);
  },
  markdownItPlugins(plugins) {
    return plugins.map((p) => {
      if (p.type === "image") {
        return {
          ...p,
          options: {
            ...p.options,
            classes: "my-class",
          },
        };
      }

      return p;
    });
  },
  editorExtensions: { iconfont: "https://xxx.cc" },
});

const aboutUsData = ref("loading...");

onMounted(async () => {
  fetch("/markdown/about-us.md")
    .then((response) => {
      return response.text();
    })
    .then((responseBody) => {
      aboutUsData.value = responseBody;
    });
});
</script>
