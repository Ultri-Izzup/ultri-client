import { defineStore } from 'pinia';

import { useStorage } from '@vueuse/core';

export const useSiteStore = defineStore('site', {
  state: () => ({
    showDocumentDialog: useStorage('showDocumentDialog', false),
    mdDocs: useStorage('mdDocs', new Map()),
  }),

  getters: {

  },

  actions: {
    reset() {
      this.showDocumentDialog = false;
    },
    displayMdFile(mdFile) {
      fetch("/markdown/cookie-policy.md")
      .then((response) => {
        return response.text();
      })
      .then((responseBody) => {
        console.log(responseBody);
        mdData.value[policy] = responseBody;
        policyData.value = responseBody;
      });

    }
  }
});
