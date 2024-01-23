<template>
  <q-page class="flex flex-center">
    {{workspaces}}
    <div class="col">
    <q-input v-model="workspaceName" label="Name"></q-input>
    <q-input v-model="workspaceDescription" label="Description"></q-input>
    <q-btn label="Create Workspace" @click="addWorkspace"></q-btn>
  </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useWorkspace from "../composables/workspace";

const wksp = useWorkspace();

const workspaces = ref(null);
const workspaceName = ref(null);
const workspaceDescription = ref(null);

onMounted(async () => {
  workspaces.value = await wksp.getWorkspaces();
  console.log(workspaces);
});

const addWorkspace = async () => {
  res2 = await wksp.addWorkspace(workspaceName.value, workspaceDescription.value);
  console.log(res2);
}

console.log()
</script>
