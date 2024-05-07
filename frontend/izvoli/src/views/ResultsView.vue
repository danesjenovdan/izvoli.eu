<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PartyDonutChart from '../components/PartyDonutChart.vue'

const store = useStore()
const router = useRouter()

const storeInitialized = computed(() => store.getters.getStoreInitialized)
const quizFinished = computed(() => store.getters.getQuizFinished)
const parties = computed(() => store.getters.getParties)
const results = computed(() => store.getters.getResults)
const chosenParties = ref([])
const partiesNoAnswer = computed(() => {
  const p = {}
  const partiesAnswered = [...results.value].map((el) => el.party_id)
  for (const [key, value] of Object.entries(parties.value)) {
    if (!partiesAnswered.includes(key)) {
      p[key] = value
    }
  }
  return p
})

const winners = computed(() => {
  const winners = [...results.value]
  winners.splice(3)
  return winners
})

const compareWithWinningParties = () => {
  const parties = [...results.value.map((res) => res.party_id)]
  parties.splice(3)
  store.commit('setPartiesToCompare', { parties: parties })
  router.push({ name: 'resultsByParty', params: { id: 1 } })
}

const compareWithChosenParties = () => {
  store.commit('setPartiesToCompare', { parties: chosenParties.value })
  router.push({ name: 'resultsByParty', params: { id: 1 } })
}

const compareWithAllParties = () => {
  chosenParties.value = [...results.value.map((res) => res.party_id)]
}

const unselectAllParties = () => {
  chosenParties.value = []
}

onMounted(() => {
  if (!storeInitialized.value) {
    store.dispatch('initializeStore').then((quiz_finished) => {
      if (!quiz_finished) {
        router.push('/')
      }
    })
  }
  if (!quizFinished.value) {
    router.push('/')
  }
})

function partyImageUrl(url) {
  if (!url) return ''
  const newUrl = new URL(url, store.getters.getApiUrl)
  return newUrl.toString()
}
</script>

<template>
  <main class="container">
    <div class="body" v-if="results.length > 0">
      <div class="content">
        <h1>Najbolj se ujemaš s:</h1>
        <div class="winners">
          <PartyDonutChart
            v-for="result in winners"
            :key="result.party_id"
            :result="result"
            :parties="parties"
          />
        </div>
        <div class="button-wrapper">
          <button class="button-go" @click="compareWithWinningParties">
            Primerjaj svoje odgovore s temi strankami
            <img src="../assets/img/puscica.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="more-info">
        <p>
          <span>Izberi stranke za primerjavo</span>
          <button @click="compareWithAllParties" v-if="chosenParties.length == 0">
            Izberi vse stranke
          </button>
          <button @click="unselectAllParties" v-if="chosenParties.length > 0">
            Odstrani vse stranke
          </button>
        </p>
        <div class="parties">
          <div v-for="party in results" :key="party.party_id" class="party">
            <label :for="`chosen-party-${party.party_id}`">
              <input
                type="checkbox"
                :id="`chosen-party-${party.party_id}`"
                :value="party.party_id"
                v-model="chosenParties"
              />
              <img :src="partyImageUrl(parties[party.party_id].image)" class="party-image" />
              {{ parties[party.party_id].name }}
            </label>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :aria-valuenow="party.percentage"
                aria-valuemin="0"
                :aria-valuemax="100"
                :style="{ width: `${party.percentage}%` }"
                :class="{ 'border-end': party.percentage > 0 && party.percentage < 100 }"
              ></div>
            </div>
            <span class="party-percentage">{{ party.percentage }} %</span>
          </div>
          <div v-for="party in partiesNoAnswer" :key="party.id" class="party">
            <label :for="`chosen-party-${party.id}`">
              <input
                type="checkbox"
                :id="`chosen-party-${party.id}`"
                :value="party.id"
                v-model="chosenParties"
              />
              <img :src="partyImageUrl(party.image)" class="party-image" />
              {{ party.name }}
            </label>
          </div>
        </div>
        <div class="button-wrapper">
          <button class="button-go" @click="compareWithChosenParties">
            Primerjaj svoje odgovore s temi strankami
            <img src="../assets/img/puscica.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="body">
      <div class="content">
        <h2>Primerjaj svoja stališča z drugimi evropskimi strankami</h2>
        <p>Neki kratek tagline, kaj se tu zgodi. Kao evropski spirit pa to bla bla bla.</p>
      </div>
    </div> -->
  </main>
</template>

<style lang="scss" scoped>
.body {
  .button-wrapper {
    margin-top: 42px;
    text-align: center;

    @media (max-width: 575.98px) {
      margin-top: 32px;
    }

    .button-go {
      font-size: 18px;
      line-height: 20px;
      padding-inline: 17px 17px;

      @media (max-width: 575.98px) {
        font-size: 15px;
        line-height: 16px;
      }
    }
  }

  .content {
    padding-inline: 100px;
    padding-top: 60px;
    padding-bottom: 56px;

    @media (max-width: 575.98px) {
      padding-inline: 21px;
      padding-top: 21px;
      padding-bottom: 32px;
    }

    h1 {
      margin-bottom: 20px;
      font-size: 32px;
      line-height: 40px;
      font-weight: 700;
      text-align: center;

      @media (max-width: 575.98px) {
        margin-bottom: 24px;
        font-size: 24px;
        line-height: 30px;
      }
    }

    .winners {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;

      @media (max-width: 575.98px) {
        gap: 8px;
      }
    }
  }

  .more-info {
    border-top: 2px solid black;
    background-color: #f2f7ff;
    padding-inline: 100px;
    padding-top: 60px;
    padding-bottom: 56px;

    @media (max-width: 575.98px) {
      padding-inline: 21px;
      padding-top: 32px;
      padding-bottom: 32px;
    }

    & > p {

      @media (max-width: 575.98px) {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      span {
        font-size: 18px;
        line-height: 20px;
        font-weight: 800;

        @media (max-width: 575.98px) {
          font-size: 15px;
          line-height: 16px;
        }
      }

      button {
        flex-shrink: 0;
        display: inline-flex;
        gap: 1px;
        align-items: flex-end;
        margin-left: 7px;
        padding: 0;
        background: transparent;
        border: none;
        border-bottom: 1px solid #0e3d97;
        color: #0e3d97;
        font-size: 15px;
        line-height: 1;
        cursor: pointer;

        @media (max-width: 575.98px) {
          font-size: 12px;
        }
      }
    }

    .parties {
      margin-top: 28px;

      .party {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        @media (max-width: 575.98px) {
          display: grid;
          grid-template-columns: 4fr 1fr;
          margin-bottom: 18px;
        }

        label {
          flex: 1.25;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 15px;
          line-height: 18px;
          font-weight: 800;

          @media (max-width: 575.98px) {
            grid-row: 1;
            grid-column: 1;
          }

          input[type='checkbox'] {
            flex-shrink: 0;
            appearance: none;
            background-color: transparent;
            margin: 2px 0 0 0;
            width: 16px;
            height: 16px;
            border: 1px solid black;
            border-radius: 4px;
            transform: translateY(-0.075em);
            cursor: pointer;
            position: relative;

            &:checked {
              background-color: #ffd100;

              &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 9px;
                height: 5px;
                border: solid black;
                border-width: 0 0 2px 2px;
                transform: scale(1) rotate(-45deg) translateX(-12%) translateY(90%);
              }
            }
          }

          .party-image {
            flex-shrink: 0;
            margin-left: 16px;
            margin-right: 9px;
            width: 36px;
            height: 36px;
            background-color: #ffffff;
            border: 1px solid black;
            border-radius: 9999px;
            object-fit: contain;
          }
        }

        .progress {
          flex: 2;
          height: 20px;
          margin-left: 10px;
          background-color: #ffffff;
          border: 1px solid black;
          border-radius: 10px;
          overflow: hidden;

          @media (max-width: 575.98px) {
            grid-row: 2;
            grid-column: 1 / -1;
            margin-left: 32px;
            margin-top: 8px;
          }

          .progress-bar {
            background-color: #65a3ff;
            height: 100%;
            border-radius: inherit;
            animation: progressBar 1.5s ease-in-out forwards;

            @keyframes progressBar {
              from {
                width: 0;
              }
            }

            &.border-end {
              border-right: 1px solid black;
            }
          }
        }

        .party-percentage {
          flex: 0.25;
          text-align: right;
          font-size: 15px;
          line-height: 18px;
          font-weight: 500;

          @media (max-width: 575.98px) {
            grid-row: 1;
            grid-column: 2;
          }
        }
      }
    }
  }
}
</style>
