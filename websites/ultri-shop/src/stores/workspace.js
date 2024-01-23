import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

// SuperTokens/Ultri Auth support
import Session from "supertokens-web-js/recipe/session";
import { api } from "boot/axios";

import useWorkspace from "../composables/workspace";
const workspace = useWorkspace();


/**
 * The User store manages user functionality and state,
 * from being an anonymous visitor, to being an authenticated member.
 */
export const useWorkspaceStore = defineStore("workspace", () => {

  /**
   * STATE - Store state is defined using refs.
   * These should be consumed using Pinia storeToRefs.
   * These should all be accounted for in the $reset function as well.
   */
  const workspaces = useStorage("workspaces", new Map());

  /**
   * GETTERS
   */
  const getWorkspaces = async () => {
    return workspace.getWorkspaces();
  }

  /**
   * ACTIONS - Plain functions become store actions
   */
  const $reset = () => {
    workspaces.value = {};
  }


  /**
   * RETURN ONLY WHAT IS NEEDED EXTERNALLY
   */
  return {
    // STATE
    workspaces

    // GETTERS

    // ACTIONS
    $reset
  };
});
