import { computed } from "vue";
import { useQuasar } from "quasar";

export default function usePage() {
  const $q = useQuasar();

  // Provide a reasonable max-width
  // 1920, 1440, 1024, 600, 0
  const flexCenter = () => {
    return `flex justify-center ${
      $q.screen.gt.lg
        ? " q-py-xl "
        : $q.screen.gt.md
        ? " q-py-lg "
        : $q.screen.gt.sm
        ? " q-py-md "
        : " q-py-sm "
    }`;
  };

  // Provide a reasonable max-width
  // 1920, 1440, 1024, 600, 0
  const topCenter = () => {
    return `full-width justify-center ${
      $q.screen.gt.lg
        ? " q-py-xl "
        : $q.screen.gt.md
        ? " q-py-lg "
        : $q.screen.gt.sm
        ? " q-py-md "
        : " q-py-sm "
    }`;
  };

  return {
    flexCenter,
    topCenter
  };
}
