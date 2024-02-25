<template>
  <div class="row full-width q-pt-xs">
    <div class="col bg-grey-3" style="max-height: 4px">
      <div
        :class="scoreColor"
        :style="
          'max-width: ' +
          (passwordScore / secureScore) * 100 +
          '%; max-height: 4px'
        "
      >
        &nbsp;
      </div>
    </div>
    <!-- <div class="col bg-grey-3 q-mx-xs" style="max-height: 4px">
      <div
        :class="scoreColor"
        :style="'width: ' + segmentLength(2) + '%; max-height: 4px'"
      >
        &nbsp;
      </div>
    </div>
    <div class="col bg-grey-3 q-mx-xs" style="max-height: 4px">
      <div
        :class="scoreColor"
        :style="'width: ' + segmentLength(3) + '%; max-height: 4px'"
      >
        &nbsp;
      </div>
    </div>
    <div class="col bg-grey-3 q-mx-xs" style="max-height: 4px">
      <div
        :class="scoreColor"
        :style="'width: ' + segmentLength(4) + '%; max-height: 4px'"
      >
        &nbsp;
      </div>
    </div>
    <div class="col bg-grey-3 q-ml-xs" style="max-height: 4px">
      <div
        :class="scoreColor"
        :style="'width: ' + segmentLength(5) + '%; max-height: 4px'"
      >
        &nbsp;
      </div>
    </div> -->
  </div>
  <div v-if="showScore">Score: {{ passwordScore }}</div>
</template>

<script setup>
import { ref, computed } from "vue";
import usePassword from "../composables/password.js";

const model = defineModel();
const props = defineProps({
  secureScore: {
    type: Number,
    default: 60,
  },
  showScore: {
    type: Boolean,
    default: false,
  },
  userStrings: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["score", "secureScore"]);

const passwd = usePassword();

const passwordScore = computed(() => {
  const newScore = passwd.score(model.value, props.userStrings);
  emit("score", { score: newScore });
  return newScore;
});

const percentSecure = computed(() => {
  return (passwordScore.value / props.secureScore) * 100;
});

const scoreColor = computed(() => {
  let val = "bg-grey-4";

  if (percentSecure.value < 20) {
    val = "bg-green-2";
  } else if (percentSecure.value < 30) {
    val = "bg-green-3";
  } else if (percentSecure.value < 40) {
    val = "bg-green-4";
  } else if (percentSecure.value < 50) {
    val = "bg-green-5";
  } else if (percentSecure.value < 60) {
    val = "bg-green-6";
  } else if (percentSecure.value < 70) {
    val = "bg-green-7";
  } else if (percentSecure.value < 80) {
    val = "bg-green-8";
  } else if (percentSecure.value < 100) {
    val = "bg-green-9";
  } else if (percentSecure.value >= 100) {
    val = "bg-green-10";
  }

  return val;
});

const passwdIsSecure = ref(false);
</script>
