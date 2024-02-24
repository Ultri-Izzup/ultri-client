<script setup>
const model = defineModel();
const emit = defineEmits(["update"]);

function update() {
  model.value++;
}
</script>

<template>UIn<input v-model="model" /></template>
