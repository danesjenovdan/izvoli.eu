<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PartyAnswer from '@/components/PartyAnswer.vue'
import ResultsProgress from '@/components/ResultsProgress.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const questionIndex = computed(() => parseInt(route.params.id, 10) - 1)
const questionNumber = computed(() => questionIndex.value + 1)

const storeInitialized = computed(() => store.getters.getStoreInitialized)
const questionsList = computed(() => store.getters.getQuestionsList)
const questionsNo = computed(() => questionsList.value.length)
const questionId = computed(() => questionsList.value[questionIndex.value])
const question = computed(() => store.state.questions[questionId.value])
const questionTags = computed(() => {
  const tagEntries = Object.entries(store.state.questions).map(([key, value]) => {
    return [key, value.tag]
  })
  return Object.fromEntries(tagEntries)
})
const answers = computed(() => store.getters.getAnswers)
const parties = computed(() => store.getters.getParties)
const partiesToCompare = computed(() => store.getters.getPartiesToCompare)

onMounted(() => {
  if (!storeInitialized.value) {
    store.dispatch('initializeStore').then((quiz_finished) => {
      if (quiz_finished) {
        router.push('/rezultati')
      }
    })
  }
})
</script>

<template>
  <main class="container">
    <div class="body" v-if="question">
      <ResultsProgress
        :current="questionNumber"
        :count="questionsNo"
        :list="questionsList"
        :answers="answers"
        :tags="questionTags"
      />
      <div class="content">
        <span v-if="question.tag">{{ question.tag }}</span>
        <h1>{{ question.title }}</h1>
        <p>{{ question.description }}</p>
        <RouterLink :to="{ name: 'resultsByParty', params: { id: questionNumber - 1 } }" class="back"
          :class="{ hidden: questionIndex <= 0 }">
          <img src="../assets/img/arrow.svg" />
        </RouterLink>
        <RouterLink :to="{ name: 'resultsByParty', params: { id: questionNumber + 1 } }" class="skip"
          :class="{ hidden: questionIndex >= questionsNo - 1 }">
          <img src="../assets/img/arrow.svg" />
        </RouterLink>
      </div>

      <div class="more-info">
        <div class="my-answer">
          <span>Tvoj odgovor</span>
          <div v-if="answers[questionId] == 'YES'">
            <img src="../assets/img/strinjam.svg" />
            Se strinjam
          </div>
          <div v-if="answers[questionId] == 'NO'">
            <img src="../assets/img/ne-strinjam.svg" />
            Se ne strinjam
          </div>
          <div v-if="answers[questionId] == 'NEUTRAL'">
            <img src="../assets/img/neopredeljen.svg" />
            Brez stališča
          </div>
        </div>
        <div class="parties">
          <div v-for="party in partiesToCompare" :key="party" class="party">
            <div class="head">
              <img :src="parties[party].image" class="party-image" />
              <span>{{ parties[party].name }}</span>
            </div>
            <PartyAnswer :party="question.parties[party]"></PartyAnswer>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.hidden {
  visibility: hidden;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.content {
  padding: 50px 100px;
  position: relative;

  @media (max-width: 575.98px) {
    padding-inline: 21px;
    padding-top: 81px;
    padding-bottom: 32px;
  }

  & > span {
    display: inline-block;
    margin-bottom: 16px;
    padding: 4px 8px;
    background-color: #FFFFFF;
    border-radius: 9999px;
    font-size: 12px;
    line-height: 1;

    @media (max-width: 575.98px) {
      position: absolute;
      top: 35px;
      left: 0;
      right: 0;
      margin-inline: auto;
      width: fit-content;
    }
  }

  h1 {
    margin-bottom: 20px;
    font-size: 32px;
    line-height: 40px;
    font-weight: 700;

    @media (max-width: 575.98px) {
      font-size: 24px;
      line-height: 30px;
    }
  }

  & > p {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 30px;

    @media (max-width: 575.98px) {
      font-size: 15px;
      line-height: 22px;
      margin-bottom: 0;
    }
  }

  .back,
  .skip {
    width: 36px;
    height: 36px;
    border: solid 2px black;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50px;

    @media (max-width: 575.98px) {
      top: 28px;
    }

    &:hover {
      background-color: #ffe368;
    }
  }

  .back {
    left: 25px;
  }

  .skip {
    right: 25px;

    img {
      transform: rotate(180deg);
    }
  }
}

.more-info {
  border-top: 2px solid black;
  background-color: #f2f7ff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 50px 100px;

  @media (max-width: 575.98px) {
    padding-inline: 21px;
    padding-block: 32px;
  }

  .my-answer {
    background-color: #ffffff;
    padding: 20px;
    font-size: 18px;
    font-weight: 800;
    display: flex;
    gap: 8px;
    align-items: center;

    @media (max-width: 575.98px) {
      font-size: 15px;
      line-height: 20px;
      justify-content: space-between;
      padding: 18px 7px;
      margin-inline: -7px;
    }

    & > span {
      flex: 1;

      @media (max-width: 575.98px) {
        min-width: initial;
      }
    }

    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      min-width: 145px;

      @media (max-width: 575.98px) {
        justify-content: flex-end;
      }
    }

    img {
      width: 28px;
      margin-right: 10px;
      margin-bottom: 5px;

      @media (max-width: 575.98px) {
        width: 24px;
      }
    }
  }

  .parties {
    font-size: 15px;
    line-height: 20px;
    font-weight: 800;

    @media (max-width: 575.98px) {
      font-size: 13px;
      line-height: 18px;
    }

    .party {
      display: flex;
      gap: 8px;
      align-items: start;
      padding: 20px 0;
      width: 100%;
      border-bottom: 1px solid black;

      @media (max-width: 575.98px) {
        padding-block: 14px;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .party-image {
        flex-shrink: 0;
        width: 34px;
        height: 34px;
        border: 1px solid black;
        border-radius: 18px;
        margin-right: 9px;
        object-fit: contain;
      }
    }

    .head {
      flex: 1;
      display: flex;
      align-items: center;

      @media (max-width: 575.98px) {
        min-width: initial;
        max-width: 58%;
      }
    }
  }
}
</style>
