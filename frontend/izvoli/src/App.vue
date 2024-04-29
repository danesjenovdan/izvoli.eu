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
@import '@/assets/base.css';

.header-wrapper {
  padding-top: 40px;
  padding-bottom: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  width: 900px;

  .header-logo {
    width: 292px;
  }

  .buttons {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: end;

    a,
    button {
      display: inline-flex;
      align-items: center;
      font-size: 15px;
      font-weight: 800;
      color: black;
      text-decoration: none;
      line-height: 20px;
      padding: 4px 8px;
      border: 2px solid black;
      border-radius: 10px;
      margin-bottom: 10px;
      background-color: #65a3ff;
      cursor: pointer;

      img {
        width: 20px;
        height: auto;
        margin-left: 4px;
      }
    }
  }
}
</style>
