import { defineStore } from 'pinia';

import { useStorage } from '@vueuse/core';

export const useWebConsentStore = defineStore('webConsent', {
  state: () => ({
    trackingCookiesAccepted: useStorage('trackingCookiesAccepted', false),
    authCookiesAccepted: useStorage('authCookiesAccepted', false),
    privacyPolicyAccepted: useStorage('privacyPolicyAccepted', false),
    cookiePolicyDisplayed: useStorage('cookiePolicyDisplayed', false),
    cookiePolicyAccepted: useStorage('cookiePolicyAccepted', false),
    marketingEmailsAccepted: useStorage('marketingEmailsAccepted', false),
    showDialog: useStorage('showDialog', false),
    disclaimers: useStorage('disclaimers', false),
    calOPPA: useStorage('calOPPA', false),
    eula: useStorage('eula', false),
    tos: useStorage('tos', false),
    message: null,
    authWhenAble: false
  }),

  getters: {
    accessEnabled(state) {
      if (state.authCookiesAccepted && state.cookiePolicyAccepted && state.privacyPolicyAccepted) {
        return true;
      }
      return false;
    }
  },

  actions: {
    $reset() {
      this.trackingCookiesAccepted = false,
      this.authCookiesAccepted = false,
      this.cookiePolicyDisplayed = false,
      this.privacyPolicyAccepted = false,
      this.cookiePolicyAccepted = false,
      this.marketingEmailsAccepted = false,
      this.tos = false,
      this.privacy = false,
      this.disclaimers = false,
      this.calOPPA = false,
      this.eula = false,
      this.showDialog = false,
      this.message = null,
      this.authWhenAble = false
    },
    triggerDialog(enableAuth=false, msg=null) {
      console.log(msg)
      this.showDialog = true;
      this.message = msg;
      if(enableAuth) {
        this.authWhenAble = true;
      }
    }
  }
});

