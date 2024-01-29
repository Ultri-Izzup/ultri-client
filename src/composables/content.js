import { computed } from "vue";
import { useQuasar } from "quasar";

export default function useContent() {
  const $q = useQuasar();

  const minMaxWidth = () => {
    return `max-width: ${maxWidth()}px; min-width: ${minWidth()}px`;
  };

  const minMaxReadableWidth = () => {
    return `max-width: ${maxReadableWidth()}px; min-width: ${minWidth()}px`;
  };

  // Provide a reasonable max-width for rich content
  // 1920, 1440, 1024, 600, 0
  const maxWidth = () => {
    return $q.screen.gt.xl
      ? 2100
      : $q.screen.lt.sm
      ? $q.screen.width * 0.95
      : $q.screen.width * 0.75;
  };

  // Provide a reasonable max-width for single-column readable content
  // 1920, 1440, 1024, 600, 0
  const maxReadableWidth = () => {
    return $q.screen.gt.xl
      ? 1200
      : $q.screen.gt.lg
      ? 900
      : $q.screen.gt.md
      ? 800
      : $q.screen.gt.sm
      ? 550
      : $q.screen.width * 0.95;
  };

  const minWidth = () => {
    return $q.screen.gt.xl
      ? 1600
      : $q.screen.lt.sm
      ? $q.screen.width * 0.75
      : $q.screen.width * 0.5;
  };

  return {
    maxWidth,
    maxReadableWidth,
    minWidth,
    minMaxWidth,
    minMaxReadableWidth
  };
}
