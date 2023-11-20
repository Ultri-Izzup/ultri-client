<template>
  <q-dialog ref="dialogRef" maximized persistent>
    <q-card class="q-dialog-plugin flex flex-center">
      <ConfettiExplosion v-if="showConfetti" />
      <q-card-section class=" align-center">
        <q-card>
          <q-card-section>

          </q-card-section>
          <q-card-section>

          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { nextTick, ref } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";

import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const showConfetti = ref(false);

const explodeConfetti = async () => {
  await nextTick();
  showConfetti.value = false;
  await nextTick();
  showConfetti.value = true;
};

explodeConfetti();

</script>

<style scoped lang="scss"></style>
