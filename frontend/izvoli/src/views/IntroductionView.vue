<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const storeInitialized = computed(() => store.getters.getStoreInitialized)
const quizFinished = computed(() => store.getters.getQuizFinished)

onMounted(() => {
  console.log('introduction on mounted')
  if (!storeInitialized.value) {
    store.dispatch('initializeStore').then((quiz_finished) => {
      if (quiz_finished) {
        router.push('/rezultati')
      }
    })
  }
  if (quizFinished.value) {
    router.push('/rezultati')
  }
})
</script>

<template>
  <main class="container">
    <div class="body">
      <p class="introduction">
        Želiš izvedeti, kako si prihodnost Evropske unije predstavljajo politične stranke, ki bodo nastopile na
        prihajajočih volitvah v Evropski parlament?
      </p>
      <p>
        Z aplikacijo Izvoli.eu lahko preprosto preveriš, s katerimi strankami se najbolj ujemajo tvoja politična
        prepričanja. Odgovori na 30 trditev, primerjaj svoje odgovore s stališči strank in 9. junija sprejmi bolj
        premišljeno odločitev.
      </p>
      <div class="button-wrapper">
        <RouterLink to="/vprasanje/1" class="button-go">
          Začni <img src="../assets/img/puscica.svg" alt="" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.body {
  padding-inline: 100px;
  padding-top: 72px;
  padding-bottom: 56px;

  p {
    margin-bottom: 24px;
    font-size: 15px;
    line-height: 24px;

    &.introduction {
      font-size: 24px;
      line-height: 34px;
    }
  }

  .button-wrapper {
    margin-top: 56px;
    text-align: center;
  }
}
</style>
