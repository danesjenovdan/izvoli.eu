<script setup>
import { computed, onMounted } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useMainStore } from "@/store.js";
import TheLoader from "@/components/TheLoader.vue";
import PageFooter from "@/components/PageFooter.vue";

const router = useRouter();
const store = useMainStore();

const currentRouteName = computed(() => router.currentRoute.value.name);

onMounted(() => {
  if (!store.loaded) {
    store.loadData();
  }
});
</script>

<template>
  <header class="header-wrapper">
    <RouterLink :to="{ name: 'landing' }" class="header-logo-link">
      <img
        src="./assets/img/header-logo.svg"
        class="header-logo"
        alt="Izvoli.si – prva pomoč za državnozborske volitve"
      />
    </RouterLink>
    <div class="buttons">
      <RouterLink
        v-if="
          store.loaded && store.quizFinished && currentRouteName !== 'results'
        "
        class="show-results"
        :to="{ name: 'results' }"
      >
        Poglej rezultate
      </RouterLink>
      <button class="restart-quiz" @click="store.restartQuiz">
        Ponovno reši
      </button>
    </div>
  </header>
  <RouterView v-if="store.loaded" />
  <main v-else class="loader-container">
    <TheLoader />
  </main>
  <PageFooter />
</template>

<style lang="scss">
@import "@/assets/fonts/selfhosted.css";

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background-image: linear-gradient(107.56deg, #c2def4 31.25%, #e9ff63 100%);
  background-attachment: fixed;
  font-family: "wf-freesans", sans-serif;
}

button {
  font: inherit;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-inline: 0.75rem;

  & > main {
    margin-bottom: auto;
  }
}

.container {
  width: 100%;
  max-width: 900px;
}

.body {
  background-color: #fff;
  border: 2px solid #000;
  overflow: hidden;
}

.header-wrapper {
  width: 100%;
  max-width: 900px;
  padding-block: 3.375rem;
  text-align: center;
  position: relative;

  @media (max-width: 575.98px) {
    padding-block: 2rem;
  }

  .header-logo-link {
    display: inline-block;

    .header-logo {
      width: 443px;

      @media (max-width: 575.98px) {
        width: 221px;
      }
    }

    &:focus-visible {
      outline: 2px solid #006fc3;
      outline-offset: 2px;
    }
  }

  .buttons {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    @media (max-width: 575.98px) {
      position: static;
      margin-top: 21px;
      align-items: center;
    }

    a,
    button {
      display: inline-flex;
      align-items: center;
      padding: 6px 11px 6px 14px;
      background: transparent;
      background-repeat: no-repeat;
      background-position: center right 11px;
      background-size: 21px;
      border: 2px solid black;
      font-size: 1rem;
      line-height: 1.2;
      font-weight: 700;
      color: #000;
      text-decoration: none;
      cursor: pointer;

      @media (max-width: 575.98px) {
        font-size: 0.875rem;
      }

      &::after {
        content: "";
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-left: 0.25rem;
      }

      &:hover {
        background-color: #fff;
      }

      &:focus-visible {
        outline: 2px solid #006fc3;
        outline-offset: 2px;
      }

      &.show-results {
        &::after {
          background-image: url("./assets/img/eyes-right.svg");
        }

        &:hover::after {
          background-image: url("./assets/img/eyes-down.svg");
        }
      }

      &.restart-quiz {
        &::after {
          background-image: url("./assets/img/reset.svg");
        }
      }
    }
  }
}

.loader-container {
  display: grid;
  place-items: center;
  min-height: 10rem;
}

.button-go {
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  min-width: 190px;
  margin-inline: auto;
  padding-inline: 1.3125rem;
  padding-block: 1rem;
  background-color: #bddc00;
  color: #000;
  border: 2px solid black;
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease-in-out;
  cursor: pointer;

  @media (max-width: 575.98px) {
    min-width: 140px;
    padding-inline: 1.125rem;
    padding-block: 0.75rem;
    font-size: 1.125rem;
    line-height: 1.125rem;
  }

  img {
    width: 1.3125rem;
    height: 1.3125rem;

    @media (max-width: 575.98px) {
      width: 1rem;
      height: 1rem;
    }
  }

  &:hover {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid #006fc3;
    outline-offset: 2px;
  }
}
</style>
