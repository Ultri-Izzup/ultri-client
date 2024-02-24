<template>
  <label
    class="q-field row no-wrap items-start q-field--standard q-input q-field--float q-field--labeled q-field--with-bottom"
    ><!---->
    <div class="q-field__inner relative-position col self-stretch">
      <div class="q-field__control relative-position row no-wrap" tabindex="-1">
        <div
          class="q-field__control-container col relative-position row no-wrap q-anchor--skip"
        >
          <input
            class="q-field__native q-placeholder"
            tabindex="0"
            aria-label="{{label}}"
            type="text"
            v-model="val"
          />
          <div class="q-field__label no-pointer-events absolute ellipsis">
            {{ label }}
          </div>
          <!---->
        </div>
      </div>
      <div class="q-field__bottom row items-start q-field__bottom--animated">
        <div class="q-field__messages col">
          <div>{{ hint }}</div>
        </div>
        <!---->
      </div>
    </div>
    <!----></label
  >
</template>

<script setup>
const props = defineProps({
  label: String,
  hint: String,
  val: String,
});

const emit = defineEmits(["update"]);
</script>
