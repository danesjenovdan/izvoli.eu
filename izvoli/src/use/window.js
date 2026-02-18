import { ref, onMounted, onUnmounted, computed } from "vue";

export function useWindowWidth() {
  const width = ref(window.innerWidth);

  function update() {
    width.value = window.innerWidth;
  }

  onMounted(() => window.addEventListener("resize", update));
  onUnmounted(() => window.removeEventListener("resize", update));

  return { width };
}

export function useIsMobile() {
  const { width } = useWindowWidth();
  const isMobile = computed(() => width.value <= 575.98);
  return { isMobile };
}
