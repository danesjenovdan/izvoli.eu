<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const storeInitialized = computed(() => store.getters.getStoreInitialized)
const quizFinished = computed(() => store.getters.getQuizFinished)

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
})
</script>

<template>
  <main class="container">
    <div class="body">
      <h1>Kako uporabljati aplikacijo?</h1>
      <div class="buttons">
        <div>
          <div class="instructions">
            <div>Se ne strinjaš?</div>
            <span>Pritisni spodnji gumb <!-- ali potegni kartico v levo --></span>
          </div>
          <button type="button" class="disagree">
            <img src="../assets/img/ne-strinjam.svg" />
          </button>
        </div>
        <div>
          <div class="instructions">
            <div>Se strinjaš?</div>
            <span>Pritisni spodnji gumb <!-- ali potegni kartico v desno --></span>
          </div>
          <button type="button" class="agree">
            <img src="../assets/img/strinjam.svg" />
          </button>
        </div>
      </div>
      <div class="buttons">
        <div>
          <div class="instructions">Prejšnja trditev</div>
          <button type="button" class="back">
            <div>
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
            </div>
          </button>
        </div>
        <div>
          <div class="instructions">Brez stališča</div>
          <button type="button" class="skip">
            <div>
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
            </div>
          </button>
        </div>
      </div>
      <div class="button-wrapper">
        <RouterLink :to="{ name: 'question', params: { id: 1 } }" class="button-go">
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

  @media (max-width: 575.98px) {
    padding-inline: 21px;
    padding-top: 24px;
    padding-bottom: 33px;
  }

  h1 {
    margin-bottom: 23px;
    font-size: 21px;
    line-height: 23px;
    font-weight: 800;
    text-align: center;
  }

  .buttons {
    display: flex;
    gap: 20px;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-block: 42px;
    border-top: 2px solid black;

    @media (max-width: 575.98px) {
      gap: 9px;
      padding-block: 32px;
    }

    & > div {
      max-width: 110px;
      text-align: center;

      .instructions {
        margin-bottom: 9px;
        font-size: 12px;
        line-height: 14px;
        font-weight: 500;

        div {
          margin-bottom: 4px;
          font-size: 18px;
          line-height: 20px;
          font-weight: 700;
          text-transform: uppercase;
        }
      }

      button {
        margin-inline: auto;
      }
    }

    .agree,
    .disagree,
    .back,
    .skip {
      background: transparent;
      border: 2px solid black;
      border-radius: 20px;
      display: flex;
      gap: 6px;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
    }

    .back,
    .skip {
      padding: 14px 10px;
      width: auto;
      font-size: 10px;
      line-height: 1;
      font-weight: 500;
      color: inherit;
      text-decoration: none;

      & > div {
        display: flex;
      }

      img {
        height: 16px;
        transform: rotate(90deg);

        &:first-of-type {
          margin-right: -6px;
        }
      }

      &:hover {
        background-color: #fff;
      }
    }

    .skip {
      justify-content: flex-end;

      img {
        transform: rotate(-90deg);
      }
    }

    .agree,
    .disagree {
      gap: 10px;
      background-color: #fff;
      padding: 20px 18px 20px 21px;
      width: auto;
      font-size: 18px;
      line-height: 20px;
      font-weight: 800;

      img {
        width: 28px;
      }

      &:hover {
        background-color: #ffe368;
      }
    }
  }

  .button-wrapper {
    text-align: center;
  }
}
</style>
