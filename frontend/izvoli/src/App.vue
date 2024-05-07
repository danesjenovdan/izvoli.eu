<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import PageFooter from '@/components/PageFooter.vue'

const store = useStore()
const router = useRouter()

const quizFinished = computed(() => store.getters.getQuizFinished)
const currentRouteName = computed(() => router.currentRoute.value.name)

const restartQuiz = () => {
  store.dispatch('clearStore')
  router.push({ name: 'introduction' })
}
</script>

<template>
  <header class="header-wrapper">
    <img
      src="./assets/img/header-logo.svg"
      class="header-logo"
      alt="Izvoli EU, prva pomoč za evropske volitve"
    />
    <div class="buttons" v-if="quizFinished">
      <RouterLink
        v-if="currentRouteName != 'results'"
        class="show-results"
        :to="{ name: 'results' }"
      >
        Poglej rezultate
      </RouterLink>
      <button class="restart-quiz" @click="restartQuiz">Ponovno reši</button>
    </div>
  </header>
  <RouterView />
  <PageFooter v-if="currentRouteName != 'landing'"></PageFooter>
</template>

<style lang="scss">
@import '@/assets/fonts/selfhosted.css';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background: #7fb2ff;
  font-family: 'wf-manrope', sans-serif;
}

button {
  font: inherit;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 900px;

  @media (max-width: 575.98px) {
    padding-inline: 21px;
  }
}

.body {
  background-color: #fffbe9;
  border: 2px solid black;
  border-radius: 20px;
  overflow: hidden;
}

.header-wrapper {
  padding-top: 40px;
  padding-bottom: 42px;
  width: 100%;
  max-width: 900px;
  text-align: center;
  position: relative;

  @media (max-width: 575.98px) {
    padding-top: 26px;
    padding-bottom: 24px;
  }

  .header-logo {
    width: 292px;

    @media (max-width: 575.98px) {
      width: 194px;
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
      border-radius: 10px;
      font-size: 15px;
      line-height: 20px;
      font-weight: 800;
      color: black;
      text-decoration: none;
      cursor: pointer;

      @media (max-width: 575.98px) {
        font-size: 12px;
        line-height: 16px;
      }

      &::after {
        content: '';
        display: inline-block;
        width: 21px;
        height: 21px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-left: 4px;

        @media (max-width: 575.98px) {
          width: 16px;
          height: 16px;
      }
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.33);
      }

      &.show-results {
        &::after {
          background-image: url('./assets/img/eyes-right.svg');
        }

        &:hover::after {
          background-image: url('./assets/img/eyes-down.svg');
        }
      }

      &.restart-quiz {
        &::after {
          background-image: url('./assets/img/reset.svg');
        }
      }
    }
  }
}

.button-go {
  display: inline-flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  min-width: 322px;
  margin-inline: auto;
  padding: 15px 25px 15px 31px;
  background-color: #ffd100;
  color: black;
  border: 2px solid black;
  border-radius: 20px;
  font-size: 24px;
  line-height: 20px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.15s ease-in-out;
  cursor: pointer;

  @media (max-width: 575.98px) {
    min-width: 189px;
    padding: 10px 15px 10px 18px;
  }

  img {
    width: 34px;

    @media (max-width: 575.98px) {
      width: 28px;
    }
  }

  &:hover {
    transform: scale(0.9);
  }
}
</style>
