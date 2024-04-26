<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useStore } from 'vuex';

import Footer from '@/components/Footer.vue'

const store = useStore();
const router = useRouter();

const quizFinished = computed(() => store.getters.getQuizFinished);

const restartQuiz = () => {
  store.dispatch("clearStore");
  router.push("/");
}
</script>

<template>
  <header class="header-wrapper">
    <img src="./assets/img/header-logo.svg" class="header-logo" />
    <div class="buttons" v-if="quizFinished">
      <RouterLink to="/rezultati">
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
  <Footer></Footer>
</template>

<style lang="scss">
@import '@/assets/fonts/selfhosted.css';
@import '@/assets/base.css';

.header-wrapper {
  padding-top: 20px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 900px;

  .buttons {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: end;

    a, button {
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
      background-color: #65A3FF;
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
