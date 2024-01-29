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
  const accounts = useStorage("accounts", {});
  const authDialogVisible = ref(false);
  const createdAt = useStorage("createdAt", null);
  const displayName = useStorage("displayName", null);
  const email = useStorage("email", null);
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
    return email.value && email.value.length > 0;
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

  /**
   * ACTIONS - Plain functions become store actions
   */
  const $reset = () => {
    accounts.value = {};
    authDialogVisible.value = false;
    cookieOptionsDisplayed.value = false;
    cookiePolicyAccepted.value = null;
    createdAt.value = null;
    displayName.value = null;
    email.value = null;
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
      email.value = response.user.email;
      // Don't bother storing the UID, its not dsplayed.
      // The API will always derive it from the auth token.

      // Set session value to celebrate and assist new members.
      if (response.createdNewUser || response.createdNewRecipeUser) {
        isNew.value = true;
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

  /**
   * RETURN ONLY WHAT IS NEEDED EXTERNALLY
   */
  return {
    // STATE
    accounts,
    authDialogVisible,
    cookieOptionsDisplayed,
    cookiePolicyAccepted,
    displayName,
    email,
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
    signinCookiesMet,
    signinRequirementsMet,

    // ACTIONS
    $reset,
    passwordlessRequest,
    passwordlessSubmitCode,
    setTargetPath,
    signOut,
    toggleAuthDialog,
    validateEmail,
    validatePasscode
  };
});
