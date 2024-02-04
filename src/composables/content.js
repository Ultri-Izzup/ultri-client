import { computed } from "vue";
import { useQuasar } from "quasar";

export default function useContent() {
  const $q = useQuasar();

  const adjustedPa = () => {
    return $q.screen.gt.lg
      ? "q-pa-xl"
      : $q.screen.gt.md
      ? "q-pa-lg"
      : $q.screen.gt.sm
      ? "q-pa-md"
      : "q-pa-sm";
  };

  const adjustedPx = () => {
    return $q.screen.gt.lg
      ? "q-px-xl"
      : $q.screen.gt.md
      ? "q-px-lg"
      : $q.screen.gt.sm
      ? "q-px-md"
      : "q-px-sm";
  };

  const adjustedPy = () => {
    return $q.screen.gt.lg
      ? "q-py-xl"
      : $q.screen.gt.md
      ? "q-py-lg"
      : $q.screen.gt.sm
      ? "q-py-md"
      : "q-py-sm";
  };

  const adjustedMy = () => {
    return $q.screen.gt.lg
      ? "q-my-xl"
      : $q.screen.gt.md
      ? "q-my-lg"
      : $q.screen.gt.sm
      ? "q-my-md"
      : "q-my-sm";
  };

  const minMaxWidth = () => {
    return `max-width: ${maxWidth()}px; min-width: ${minWidth()}px`;
  };

  const minMaxReadableWidth = () => {
    return `max-width: ${maxReadableWidth()}px; min-width: ${minWidth()}px`;
  };

  const minMaxIdealWidth = () => {
    return `max-width: ${maxIdealWidth()}px; min-width: ${minWidth()}px`;
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

  // Provide an ideal max-width for single-column readable content
  // 1920, 1440, 1024, 600, 0
  const maxIdealWidth = () => {
    return $q.screen.gt.xl
      ? 900
      : $q.screen.gt.lg
      ? 750
      : $q.screen.gt.md
      ? 500
      : $q.screen.gt.sm
      ? 400
      : $q.screen.width * 0.95;
  };

  const minWidth = () => {
    return $q.screen.gt.xl
      ? 600
      : $q.screen.gt.lg
      ? 550
      : $q.screen.gt.md
      ? 400
      : $q.screen.gt.sm
      ? 300
      : $q.screen.width * 0.95;
  };

  return {
    adjustedPa,
    adjustedPx,
    adjustedPy,
    adjustedMy,
    maxWidth,
    maxReadableWidth,
    minWidth,
    minMaxIdealWidth,
    minMaxWidth,
    minMaxReadableWidth
  };
}
