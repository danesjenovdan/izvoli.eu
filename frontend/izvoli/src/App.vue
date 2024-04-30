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
  router.push('/')
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
      <RouterLink to="/rezultati" v-if="currentRouteName != 'results'">
        Poglej rezultate
        <img src="./assets/img/eyes-right.svg" alt="" />
      </RouterLink>
      <button class="" @click="restartQuiz">
        Ponovno reši
        <img src="./assets/img/reset.svg" alt="" />
      </button>
    </div>
  </header>
  <RouterView />
  <PageFooter></PageFooter>
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

.body {
  max-width: 900px;
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

  .header-logo {
    width: 292px;
  }

  .buttons {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: end;
    justify-content: center;

    a,
    button {
      display: inline-flex;
      align-items: center;
      padding: 6px 11px 6px 14px;
      background: transparent;
      border: 2px solid black;
      border-radius: 10px;
      font-size: 15px;
      line-height: 20px;
      font-weight: 800;
      color: black;
      text-decoration: none;
      cursor: pointer;

      img {
        width: 21px;
        height: auto;
        margin-left: 4px;
      }
    }
  }
}
</style>
