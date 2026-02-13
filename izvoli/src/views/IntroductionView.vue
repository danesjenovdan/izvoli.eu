<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const storeInitialized = computed(() => store.getters.getStoreInitialized)
const quizFinished = computed(() => store.getters.getQuizFinished)

const isMobile = ref(window.innerWidth <= 575.98)

function calcMobile() {
  isMobile.value = window.innerWidth <= 575.98
}

onMounted(() => {
  if (!storeInitialized.value) {
    store.dispatch('initializeStore').then((quiz_finished) => {
      if (quiz_finished) {
        router.push({ name: 'results' })
      }
    })
  }
  if (quizFinished.value) {
    router.push({ name: 'results' })
  }
  window.addEventListener('resize', calcMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', calcMobile)
})
</script>

<template>
  <main class="container">
    <div class="body">
      <p class="introduction">
        Želiš izvedeti, kako si prihodnost Evropske unije predstavljajo politične stranke, ki bodo
        nastopile na prihajajočih volitvah v Evropski parlament?
      </p>
      <p>
        Z aplikacijo Izvoli.eu lahko preprosto preveriš, s katerimi strankami se najbolj ujemajo
        tvoja politična prepričanja.
      </p>
      <ul>
        <li>Odgovori na 30 trditev.</li>
        <li>Primerjaj svoje odgovore s stališči strank.</li>
        <li>Na volitvah 9. junija sprejmi bolj premišljeno odločitev.</li>
      </ul>
      <div class="button-wrapper">
        <RouterLink
          :to="
            isMobile
              ? { name: 'instructions' }
              : {
                  name: 'question',
                  params: { id: 1 }
                }
          "
          class="button-go"
        >
          Začni <img src="../assets/img/puscica.svg" alt="" />
        </RouterLink>
      </div>
      <p class="notice">Reševanje kviza je anonimno.</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.body {
  padding-inline: 100px;
  padding-top: 72px;
  padding-bottom: 56px;

  @media (max-width: 575.98px) {
    padding-inline: 21px;
    padding-top: 24px;
    padding-bottom: 33px;
  }

  p,
  ul {
    margin-bottom: 24px;
    font-size: 15px;
    line-height: 24px;

    &.introduction {
      font-size: 24px;
      line-height: 34px;

      @media (max-width: 575.98px) {
        font-size: 21px;
        line-height: 27px;
      }
    }
  }

  ul {
    padding: 0;
    padding-left: 1em;
    list-style: '➜';

    li {
      padding-left: 0.25em;
    }
  }

  .button-wrapper {
    margin-top: 56px;
    text-align: center;

    @media (max-width: 575.98px) {
      margin-top: 33px;
    }
  }

  .notice {
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
    color: #545454;
  }
}
</style>
