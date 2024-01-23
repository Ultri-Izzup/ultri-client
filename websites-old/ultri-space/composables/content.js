import { computed } from "vue";
import { useQuasar } from "quasar";

export default function useContent() {

  const $q = useQuasar();

  const minMaxWidth = () => {
    return `max-width: ${maxWidth()}px; min-width: ${minWidth()}px`;
  }

  // Provide a reasonable max-width
  // 1920, 1440, 1024, 600, 0
  const maxWidth = () => {
    return $q.screen.gt.xl ? 2100 :
      $q.screen.lt.sm ? $q.screen.width * .95 : $q.screen.width * .75
  };

  const minWidth = () => {
    return $q.screen.gt.xl ? 1600 :
      $q.screen.lt.sm ? $q.screen.width * .75 : $q.screen.width * .50
  }

  return {
    maxWidth,
    minWidth,
    minMaxWidth
  };
}
