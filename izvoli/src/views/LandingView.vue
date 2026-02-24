<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  router.push({ name: "introduction" });
});
</script>

<template>
  <main class="container">
    <div class="body">
      <p>
        22. marca ti pomagamo ugotoviti, s katero listo se tvoja politična
        stališča najbolj ujemajo.
      </p>
      <p>Se vidimo kmalu!</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.body {
  padding-inline: 6rem;
  padding-block: 4.5rem;

  @media (max-width: 575.98px) {
    padding-inline: 1.5rem;
    padding-block: 2rem;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.5;
    text-align: center;

    @media (max-width: 575.98px) {
      font-size: 1.25rem;
    }

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
}
</style>
