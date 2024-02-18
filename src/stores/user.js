import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

// SuperTokens/Ultri Auth support
import Session from "supertokens-web-js/recipe/session";

import {
  createCode,
  consumeCode
} from "supertokens-web-js/recipe/passwordless";

import { api } from "boot/axios";

import useRealms from "../composables/realms";
const realms = useRealms();

/**
 * The User store manages user functionality and state,
 * from being an anonymous visitor, to being an authenticated member.
 */
export const useUserStore = defineStore("user", () => {
  /**
   * STATE - Store state is defined using refs.
   * These should be consumed using Pinia storeToRefs.
   * These should all be accounted for in the $reset function as well.
   */

  // Boolean signifying if the vistor was shown the cookie options.
  const cookieOptionsDisplayed = useStorage("cookieOptionsDisplayed", false);

  // Auth state props
  const credentialAccounts = useStorage("credentialAccounts", new Map());
  const fediverseAccounts = useStorage("fediverseAccounts", new Map());
  const authDialogVisible = ref(false);
  const createdAt = useStorage("createdAt", null);
  const displayName = useStorage("displayName", null);
  const authEmail = useStorage("authEmail", null);
  const isNew = ref(false); // Is this their first sign in?
  const targetPath = useStorage("targetPath", null); // Nav path awaiting sign in

  // Policy acceptance props
  const cookiePolicyAccepted = useStorage("cookiePolicyAccepted", null);
  const privacyPolicyAccepted = useStorage("privacyPolicyAccepted", null);
  const termsOfServiceAccepted = useStorage("termsOfServiceAccepted", null);
  const trackingPolicyAccepted = useStorage("trackingPolicyAccepted", null);

  // Cookie acceptance props
  const extTrackingAccepted = useStorage("extTrackingAccepted", false);
  const intTrackingAccepted = useStorage("intTrackingAccepted", false);
  const reqCookiesAccepted = useStorage("reqCookiesAccepted", false);

  /**
   * GETTERS - *Computed* functions become store getters
   */
  const isSignedIn = computed(() => {
    return authEmail.value && authEmail.value.length > 0;
  });

  // Has the user granted internal tracking?
  // Netizen status is required to allow part in governance.
  const isNetizen = computed(() => {
    return (
      signinRequirementsMet.value === true && intTrackingAccepted.value === true
    );
  });

  // Are minimum required cookies accepted?
  const signinCookiesMet = computed(() => {
    return (
      cookiePolicyAccepted.value === true && reqCookiesAccepted.value === true
    );
  });

  // Are minimum required cookies accepted?
  const netizenCookiesMet = computed(() => {
    return (
      signinCookiesMet.value === true && extTrackingAccepted.value === true
    );
  });

  // Are minimum required cookies and policies accepted?
  const signinRequirementsMet = computed(() => {
    return (
      privacyPolicyAccepted.value === true &&
      cookiePolicyAccepted.value === true &&
      termsOfServiceAccepted.value === true &&
      reqCookiesAccepted.value === true
    );
  });

  const unclaimedDomains = computed(() => {
    const unclaimed = {};

    return unclaimed;
  });

  /**
   * ACTIONS - Plain functions become store actions
   */
  const $reset = () => {
    credentialAccounts.value = new Map();
    fediverseAccounts.value = new Map();
    authDialogVisible.value = false;
    cookieOptionsDisplayed.value = false;
    cookiePolicyAccepted.value = null;
    createdAt.value = null;
    displayName.value = null;
    authEmail.value = null;
    extTrackingAccepted.value = false;
    intTrackingAccepted.value = false;
    isNew.value = false;
    privacyPolicyAccepted.value = null;
    reqCookiesAccepted.value = false;
    targetPath.value = null;
    termsOfServiceAccepted.value = null;
    trackingPolicyAccepted.value = null;
  };

  const setTargetPath = (path) => {
    targetPath.value = path;
  };

  const passwordlessRequest = async (email) => {
    try {
      console.log("SENDING Login Email: ", email);
      const response = await createCode({
        email
      });
      console.log("RESPONSE", response);
    } catch (err) {
      console.log("ERROR", err);
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you,
        // or if the input email / phone number is not valid.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  };

  const passwordlessSubmitCode = async (code) => {
    try {
      console.log("SENDING Login Code: ", code);
      const response = await consumeCode({
        userInputCode: code
      });

      // Store the user data we care about
      authEmail.value = response.user.emails[0];
      // Don't bother storing the UID, its not used in the client.
      // The API will always derive it from the auth token.

      // Set session value to celebrate and assist new members.
      if (response.createdNewUser || response.createdNewRecipeUser) {
        isNew.value = true;
      }

      const credentialAccountData = await api.get("/credential");
      console.log(credentialAccountData);
      const foundAccounts = credentialAccountData.data.accounts;

      if (foundAccounts && foundAccounts.length > 0) {
        for (const account of foundAccounts) {
          credentialAccounts.value.set(account.realm, {
            displayName: account.displayName
          });
        }
      }

      return { status: "OK" };
    } catch (err) {
      console.log("ERROR", err);
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you,
        // or if the input email / phone number is not valid.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  };

  const signOut = async () => {
    await Session.signOut();
    $reset();
  };

  const toggleAuthDialog = () => {
    authDialogVisible.value = !authDialogVisible.value;
  };

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
  };

  const validatePasscode = (otp) => {
    return /^[0-9]{6}$/.test(otp);
  };

  const validateUsername = (username) => {
    return /^[a-z0-9_]{3,20}$/.test(username);
  };

  const fediverseAvailability = async (username, domains) => {
    const availability = await api.post("/fediverse/username/available", {
      username: username,
      domains: domains
    });

    return availability.data;
  };

  const claimUsername = async (username, domains) => {
    const claim = await api.post("/fediverse/username/claim", {
      username: username,
      domains: domains
    });

    for (const dom in claim.data.domains) {
      fediverseAccounts.set(dom, {
        username: username,
        status: "reserved"
      });
    }

    console.log(claim);

    return claim.data;
  };

  const getFediverseAccounts = async () => {
    const accountData = await api.get("/fediverse");

    console.log(accountData.data);

    for (const acct of accountData.data.accounts) {
      fediverseAccounts.value[acct.domain] = {
        username: acct.username,
        status: acct.status
      };
    }
  };

  /**
   * RETURN ONLY WHAT IS NEEDED EXTERNALLY
   */
  return {
    // STATE
    credentialAccounts,
    fediverseAccounts,
    authDialogVisible,
    cookieOptionsDisplayed,
    cookiePolicyAccepted,
    displayName,
    authEmail,
    extTrackingAccepted,
    intTrackingAccepted,
    isNew,
    privacyPolicyAccepted,
    reqCookiesAccepted,
    targetPath,
    termsOfServiceAccepted,
    trackingPolicyAccepted,

    // GETTERS
    isNetizen,
    isSignedIn,
    netizenCookiesMet,
    unclaimedDomains,
    signinCookiesMet,
    signinRequirementsMet,

    // ACTIONS
    $reset,
    claimUsername,
    fediverseAvailability,
    getFediverseAccounts,
    passwordlessRequest,
    passwordlessSubmitCode,
    setTargetPath,
    signOut,
    toggleAuthDialog,
    validateEmail,
    validatePasscode,
    validateUsername
  };
});
