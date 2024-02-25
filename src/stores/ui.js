import { ref, watch, nextTick, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useQuasar, QSpinnerPie } from "quasar";
import { useStorage } from "@vueuse/core";

import { useUserStore } from "./user";

/**
 * The UI store manages UI functionality and state.
 */
export const useUIStore = defineStore("ui", () => {
  const $q = useQuasar();

  const user = useUserStore();

  const { isNew } = storeToRefs(user);

  // STATE - Store state is defined refs
  const darkMode = useStorage("darkMode", false);
  const isLoading = ref(false);
  const rightDrawerOpen = useStorage("rightDrawerOpen", false);
  const policyDialogVisible = useStorage("policyDialogVisible", false);
  const dialogPolicy = useStorage("dialogPolicy", null);
  const showConfetti = ref(false);

  // GETTERS - Computed functions become store getters
  const authenticated = computed(() => {
    console.log("UI", user.isSignedIn);
    return user.isSignedIn ? true : false;
  });

  // ACTIONS - Plain functions become store actions

  const $reset = () => {
    darkMode.value = false;
    isLoading.value = false;
    rightDrawerOpen.value = false;
    policyDialogVisible.value = false;
    dialogPolicy.value = null;
    showConfetti.value = false;
  };

  const setDialogPolicy = (policy) => {
    dialogPolicy.value = policy;
  };

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    $q.dark.set(darkMode.value);
  };

  const toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value;
  };

  const explodeConfetti = async () => {
    await nextTick();
    showConfetti.value = false;
    await nextTick();
    showConfetti.value = true;
  };

  // WATCHERS

  // Set darkMode from store/localStorage
  watch(
    () => darkMode,
    () => {
      if (darkMode.value) {
        $q.dark.set(true);
      } else {
        $q.dark.set(false);
      }
    },
    { immediate: true }
  );

  // Default loading spinner to show during async operations
  watch(
    isLoading,
    (newVal, oldVal) => {
      if (newVal) {
        $q.loading.show({
          delay: 400, // ms
          spinner: QSpinnerPie,
          backgroundColor: "grey-2",
          message: "Loading great things...",
          messageColor: "black"
        });
      } else {
        $q.loading.hide();
      }
    },
    { immediate: true }
  );

  // Celebrate new member signin
  watch(isNew, (newVal, oldVal) => {
    if (newVal) {
      console.log("welcome new user");
      explodeConfetti();
    }
  });

  /**
   * RETURN ONLY WHAT IS NEEDED EXTERNALLY
   */
  return {
    // STATE
    darkMode,
    dialogPolicy,
    isLoading,
    rightDrawerOpen,
    policyDialogVisible,
    showConfetti,

    // GETTERS
    authenticated,

    // ACTIONS
    toggleDarkMode,
    toggleRightDrawer,
    setDialogPolicy,
    explodeConfetti
  };
});
